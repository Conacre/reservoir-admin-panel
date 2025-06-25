import { useState, useRef, useEffect } from "react";
import { Header } from "./components/Header";
import { ReservoirList } from "./components/ReservoirList";
import { Scrollbar } from "./components/Scrollbar";
import { ReservoirCard } from "./components/ReservoirCard";
import {
  getReservoirs,
  addReservoir,
  updateReservoir,
  deleteReservoir,
  toggleLockReservoir,
  getProducts,
} from "./services/reservoirs";
import { useReservoirContext } from "./context/Context";
import { Reservoir } from "./types";
import { Toast, ToastProps } from "./components/Toast";
import { validateReservoir } from "./utils/validateReservoir";

function App() {
  const {
    reservoirs,
    setReservoirs,
    selected,
    setSelected,
    loading,
    setLoading,
    error,
    setError,
  } = useReservoirContext();

  const [products, setProducts] = useState<{ id: number; name: string }[]>([]);
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    fetchReservoirs();
    fetchProducts();
  }, []);

  const fetchReservoirs = async () => {
    setLoading(true);
    try {
      const data = await getReservoirs();
      setReservoirs(Array.isArray(data) ? data : []);
      setSelected(Array.isArray(data) && data.length > 0 ? data[0] : null);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Ошибка загрузки"));
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Ошибка загрузки типов продукта"));
    }
  };

  const handleAddReservoir = () => {
    setSelected({
      id: 0,
      name: "",
      productId: 1,
      capacity: 0,
      volume: 0,
      isLocked: false,
    });
  };

  const showToast = (message: string, type: ToastProps["type"] = "info") => {
    setToasts((prev) => [...prev, { message, type, onClose: () => {} }]);
  };

  useEffect(() => {
    if (toasts.length > 0) {
      setToasts((prev) =>
        prev.map((t, i) =>
          i === 0
            ? { ...t, onClose: () => setToasts((p) => p.slice(1)) }
            : t
        )
      );
    }
  }, [toasts.length]);

  const handleSave = async (reservoir: Reservoir) => {
    const errorMsg = validateReservoir(reservoir, reservoirs, products);
    if (errorMsg) {
      showToast(errorMsg, "error");
      return;
    }
    setLoading(true);
    try {
      const productId = products.find(
        (p) => p.name === reservoir.product?.name
      )?.id;

      if (!reservoir.id || reservoir.id === 0) {
        const prepared = {
          name: reservoir.name,
          capacity: Number(reservoir.capacity) || 0,
          volume: Number(reservoir.volume) || 0,
          productId,
          isLocked: reservoir.isLocked,
        };
        const newReservoir = await addReservoir(prepared);
        setReservoirs([...reservoirs, newReservoir]);
        setSelected(newReservoir);
      } else {
        const updated = await updateReservoir(String(reservoir.id), {
          ...reservoir,
          productId,
        });
        setReservoirs(reservoirs.map((r) => (r.id === updated.id ? updated : r)));
        setSelected(updated);
      }
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Ошибка сохранения"));
      showToast(e instanceof Error ? e.message : "Ошибка сохранения", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelected(null);
  };

  const handleDelete = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      await deleteReservoir(String(selected.id));
      setReservoirs(reservoirs.filter((r) => r.id !== selected.id));
      setSelected(null);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Ошибка удаления"));
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLock = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const updated = await toggleLockReservoir(String(selected.id));
      setReservoirs(reservoirs.map((r) => (r.id === updated.id ? updated : r)));
      setSelected(updated);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Ошибка блокировки"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header
        onAddReservoir={handleAddReservoir}
        onScreenClick={() => showToast("Я так и не понял смысл этой кнопки :)")}
      />
      <ReservoirList
        listRef={listRef}
        reservoirs={reservoirs}
        loading={loading}
        error={error}
        selected={selected}
        onSelect={setSelected}
      />
      <Scrollbar listRef={listRef} />
      {selected && (
        <ReservoirCard
          reservoir={selected}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
          onToggleLock={handleToggleLock}
          products={products}
          showToast={showToast}
        />
      )}
      <div className="toast-container">
        {toasts.map((toast, i) => (
          <Toast key={i} {...toast} />
        ))}
      </div>
    </div>
  );
}

export default App;
