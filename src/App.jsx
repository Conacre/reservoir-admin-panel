import { useRef, useEffect, useState } from 'react'
import { Header } from './components/Header'
import { ReservoirList } from './components/ReservoirList'
import { Scrollbar } from './components/Scrollbar'
import { ReservoirCard } from './components/ReservoirCard'
import { getReservoirs } from './services/reservoirs.jsx'

function App() {
  const listRef = useRef(null)
  const [reservoirs, setReservoirs] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchReservoirs()
  }, [])

  const fetchReservoirs = async () => {
    setLoading(true)
    try {
      const data = await getReservoirs()
      setReservoirs(Array.isArray(data) ? data : [])
      setSelected(Array.isArray(data) && data.length > 0 ? data[0] : null)
      setError(null)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  // Пример обработчиков для карточки (реализуйте по необходимости)
  const handleSave = () => {}
  const handleCancel = () => {}
  const handleDelete = () => {}
  const handleToggleLock = () => {}

  return (
    <div>
      <Header />
      <ReservoirList
        listRef={listRef}
        reservoirs={reservoirs}
        loading={loading}
        error={error}
        selected={selected}
        onSelect={setSelected}
      />
      <Scrollbar listRef={listRef} />
      <ReservoirCard
        reservoir={selected}
        onSave={handleSave}
        onCancel={handleCancel}
        onDelete={handleDelete}
        onToggleLock={handleToggleLock}
      />
    </div>
  )
}

export default App