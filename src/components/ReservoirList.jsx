import { useState } from 'react'
import '../styles/ReservoirList.css'

export function ReservoirList({
  listRef,
  reservoirs,
  loading,
  error,
  selected,
  onSelect
}) {
  const [query, setQuery] = useState('')

  const filtered = reservoirs.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="reservoir-list-container">
      <form
        className="reservoir-search-form"
        onSubmit={e => { e.preventDefault(); }}
      >
        <input
          className="reservoir-search"
          type="text"
          placeholder="Поиск по названию"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
      <ul className="reservoir-list" ref={listRef}>
        {loading && <li className="empty">Загрузка...</li>}
        {error && <li className="empty">Ошибка: {error.message}</li>}
        {!loading && !error && filtered.length === 0 && (
          <li className="empty">Ничего не найдено</li>
        )}
        {!loading && !error && filtered.map(r => (
          <li
            key={r.id}
            className={
              'reservoir-item reservoir-item-btn' +
              (selected && selected.id === r.id ? ' selected' : '')
            }
            tabIndex={0}
            role="button"
            aria-label={`Резервуар ${r.name}`}
            onClick={() => onSelect(r)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') onSelect(r)
            }}
          >
            <b>{r.name}</b>
          </li>
        ))}
      </ul>
    </div>
  )
}