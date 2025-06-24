import { useState } from "react";
import "../styles/ReservoirList.css";
import lockiconImg from "../assets/lock-icon-2.svg";
import searchImg from "../assets/Search.svg";
import { Reservoir } from "../types";

interface ReservoirListProps {
  listRef: React.RefObject<HTMLUListElement | null>;
  reservoirs: Reservoir[];
  loading: boolean;
  error: Error | null;
  selected: Reservoir | null;
  onSelect: (r: Reservoir) => void;
}

export function ReservoirList({
  listRef,
  reservoirs,
  loading,
  error,
  selected,
  onSelect,
}: ReservoirListProps) {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = reservoirs.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="reservoir-list-container">
      <form
        className="reservoir-search-form"
        onSubmit={(e) => {
          e.preventDefault();
          setSearchQuery(query);
        }}
      >
        <input
          className="reservoir-search"
          type="text"
          placeholder="Список резервуаров"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="search-btn"
          aria-label="Поиск"
        >
          <img src={searchImg} alt="Поиск" />
        </button>
      </form>
      <ul className="reservoir-list" ref={listRef}>
        {loading && <li className="empty">Загрузка...</li>}
        {error && <li className="empty">Ошибка: {error.message}</li>}
        {!loading && !error && filtered.length === 0 && (
          <li className="empty">Ничего не найдено</li>
        )}
        {!loading &&
          !error &&
          filtered.map((r) => (
            <li
              key={r.id}
              className={
                "reservoir-item reservoir-item-btn" +
                (selected && selected.id === r.id ? " selected" : "")
              }
              tabIndex={0}
              role="button"
              aria-label={`Резервуар ${r.name}`}
              onClick={() => onSelect(r)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelect(r);
              }}
            >
              <b>{r.name}</b>
              {r.isLocked && (
                <img
                  src={lockiconImg}
                  alt="Заблокирован"
                  className="lock-icon-right"
                  style={{ marginLeft: "auto" }}
                />
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
