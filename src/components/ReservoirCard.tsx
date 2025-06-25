import React, { useState } from 'react';
import { Reservoir } from '../types';
import reservoirImg from "../assets/reservoir.svg";
import reservoirNameImg from "../assets/reservoir-name.svg";
import fullnessImg from "../assets/fullness.svg";
import stuffImg from "../assets/stuff.svg";
import volumeImg from "../assets/volume.svg";
import lockiconImg from "../assets/lock-icon.svg";
import "../styles/ReservoirCard.css";
import "../styles/Actions.css";
import "../styles/Units.css";
import "../styles/LockStatus.css";
import "../styles/EditNameActions.css";
import { ConfirmModal } from "./ConfirmModal";
import { ReservoirField } from "./ReservoirField";
import galkaImg from "../assets/galka.svg";
import pencilImg from "../assets/pencil.svg";

interface ReservoirCardProps {
  reservoir: Reservoir | null;
  onSave: (reservoir: Reservoir) => void;
  onCancel: () => void;
  onDelete: () => void;
  onToggleLock: () => void;
  products: { id: number; name: string }[];
}

export function ReservoirCard({
  reservoir,
  onSave,
  onCancel,
  onDelete,
  onToggleLock,
  products,
  showToast,
}: ReservoirCardProps & { showToast: (msg: string, type?: "error" | "success" | "info") => void }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [editReservoir, setEditReservoir] = useState<Reservoir | null>(reservoir);
  const [isEditingName, setIsEditingName] = useState(false);
  const [hoverName, setHoverName] = useState(false);
  const [tempName, setTempName] = useState(reservoir?.name || "");
  const [unit, setUnit] = useState<'tons' | 'percent'>('tons'); 

  React.useEffect(() => {
    setEditReservoir(reservoir);
    setTempName(reservoir?.name || "");
  }, [reservoir]);

  if (!editReservoir) return null;
  const isEditable = !editReservoir.isLocked;

  const handleFieldChange = (field: keyof Reservoir, value: unknown) => {
    setEditReservoir(prev =>
      prev
        ? {
            ...prev,
            [field]:
              (["capacity", "volume"].includes(field as string))
                ? value === "" ? "" : Number(value)
                : value,
          }
        : prev
    );
  };

  const handleCancelEditName = () => {
    setTempName(editReservoir?.name || "");
    setIsEditingName(false);
  };

  const handleSaveEditName = () => {
    handleFieldChange("name", tempName);
    setIsEditingName(false);
  };

  const handleSave = () => {
    onSave(editReservoir);
  };

  const handleDelete = async () => {
    if (!editReservoir) return;
    if (editReservoir.isLocked) {
      showToast("Нельзя удалить заблокированный резервуар.", "error");
      return;
    }
    try {
      onDelete();
    } catch (e) {
      showToast("Ошибка удаления резервуара", "error");
    }
  };

  const percent =
    editReservoir.capacity > 0
      ? Math.round((editReservoir.volume / editReservoir.capacity) * 100)
      : 0;

  return (
    <div className="reservoir-card">
      <div className="reservoir-card-title">Информация о резервуаре</div>
      <img src={reservoirImg} alt="Резервуар" className="reservoir-card-img" />
      <div
        className="info-field"
        onMouseEnter={() => setHoverName(true)}
        onMouseLeave={() => setHoverName(false)}
        style={{ position: "relative" }}
      >
        <span className="icons">
          <img src={reservoirNameImg} alt="" width={27} height={27} />
        </span>
        {isEditable && isEditingName ? (
          <>
            <input
              type="text"
              value={tempName}
              onChange={e => setTempName(e.target.value)}
              className="edit-name-input"
              autoFocus
              style={{ flex: 1 }}
            />
            {hoverName && (
              <span className="edit-name-actions">
                <button
                  className="icon-btn"
                  title="Сохранить"
                  onClick={handleSaveEditName}
                  tabIndex={0}
                  type="button"
                >
                  <img src={galkaImg} alt="Сохранить" />
                </button>
                <button
                  className="icon-btn"
                  title="Отменить"
                  onClick={handleCancelEditName}
                  tabIndex={0}
                  type="button"
                >
                  <img src={pencilImg} alt="Отменить" />
                </button>
              </span>
            )}
          </>
        ) : (
          <>
            <div
              className="info-field-view"
              style={{ flex: 1, cursor: isEditable ? "pointer" : "default" }}
              onClick={() => isEditable && setIsEditingName(true)}
            >
              {editReservoir.name}
            </div>
            {isEditable && hoverName && (
              <span className="edit-name-actions">
                <button
                  className="icon-btn"
                  title="Сохранить"
                  style={{ opacity: 0.5, pointerEvents: "none" }}
                  tabIndex={-1}
                  type="button"
                >
                  <img src={galkaImg} alt="Сохранить" />
                </button>
                <button
                  className="icon-btn"
                  title="Редактировать"
                  onClick={() => setIsEditingName(true)}
                  tabIndex={0}
                  type="button"
                >
                  <img src={pencilImg} alt="Редактировать" />
                </button>
              </span>
            )}
          </>
        )}
      </div>

      <ReservoirField
        icon={stuffImg}
        value={
          isEditable
            ? products.find(p => p.name === editReservoir.product?.name)?.id ?? ""
            : editReservoir.product?.name ?? ""
        }
        editable={isEditable}
        options={products.map(p => ({ value: p.id, label: p.name }))}
        onChange={v =>
          handleFieldChange(
            "product",
            { name: products.find(p => p.id === Number(v))?.name || "" }
          )
        }
      />
      <ReservoirField
        icon={volumeImg}
        value={editReservoir.capacity}
        editable={isEditable}
        type="number"
        onChange={v => handleFieldChange("capacity", v)}
      />
      <div className="units">
        <span
          className={`unit-one${unit === 'tons' ? ' selected' : ''}`}
          onClick={() => setUnit('tons')}
          style={{ cursor: "pointer" }}
        >
          ТОННЫ
        </span>
        <span
          className={`unit-two${unit === 'percent' ? ' selected' : ''}`}
          onClick={() => setUnit('percent')}
          style={{ cursor: "pointer" }}
        >
          %
        </span>
      </div>
      <ReservoirField
        icon={fullnessImg}
        value={
          unit === 'tons'
            ? editReservoir.volume
            : `${percent}%`
        }
        editable={isEditable && unit === 'tons'}
        type="number"
        onChange={v => handleFieldChange("volume", v)}
      />
      <div className="actions">
  {isEditable && (
    <>
      <button className="save-btn" onClick={handleSave}>
        Сохранить
      </button>
      <button className="cancel-btn" onClick={onCancel}>
        Отменить
      </button>
    </>
  )}
</div>
      <div className="lock-status">
        <span className="icons">
          <img src={lockiconImg} alt=""/>
        </span>
        {editReservoir.isLocked
          ? "Резервуар заблокирован"
          : "Резервуар не заблокирован"}
        <label className="switch">
          <input
            type="checkbox"
            checked={editReservoir.isLocked}
            onChange={() => setConfirmOpen(true)}
          />
          <span className="slider"></span>
        </label>
      </div>
      <button className="delete-btn" onClick={() => setDeleteConfirmOpen(true)}>
        Удалить резервуар
      </button>
      <ConfirmModal
        open={confirmOpen}
        onConfirm={() => {
          setConfirmOpen(false);
          onToggleLock();
        }}
        onCancel={() => setConfirmOpen(false)}
        text={
          editReservoir.isLocked
            ? "Вы действительно хотите разблокировать резервуар?"
            : "Вы действительно хотите заблокировать резервуар?"
        }
      />
      <ConfirmModal
        open={deleteConfirmOpen}
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
        text="Вы действительно хотите удалить резервуар?"
      />
    </div>
  );  
}
