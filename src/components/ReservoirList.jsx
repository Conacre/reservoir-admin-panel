import { useState, useRef, useEffect } from 'react'
import '../styles/ReservoirList.css'

const MOCK_RESERVOIRS = [
  { id: 1, name: 'Резервуар 501' },
  { id: 2, name: 'Резервуар 505' },
  { id: 3, name: 'Резервуар 506' },
  { id: 4, name: 'Резервуар 511' },
  { id: 5, name: 'Резервуар 512' },
  { id: 6, name: 'Резервуар 515' },
  { id: 7, name: 'Резервуар 516' },
]

export function ReservoirList({ onListRef }) {
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    if (onListRef) onListRef(listRef)
  }, [onListRef])

  const filtered = MOCK_RESERVOIRS.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(query)
  }

  return (
    <div className="reservoir-list-container">
      <form className="reservoir-search-form" onSubmit={handleSearch}>
        <input
          className="reservoir-search"
          type="text"
          placeholder="Список резервуаров"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="reservoir-search-btn" type="submit" aria-label="Поиск">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <circle cx="9" cy="9" r="7" stroke="#fff" strokeWidth="2"/>
            <line x1="14.2" y1="14.2" x2="18" y2="18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </form>
      <ul className="reservoir-list" ref={listRef}>
        {filtered.length === 0 && <li className="empty">Ничего не найдено</li>}
        {filtered.map(r => (
          <li key={r.id} className="reservoir-item">{r.name}</li>
        ))}
      </ul>
    </div>
  )
}