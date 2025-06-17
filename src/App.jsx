import { useRef } from 'react'
import { Header } from './components/Header'
import { ReservoirList } from './components/ReservoirList'
import { Scrollbar } from './components/Scrollbar'

function App() {
  const listRef = useRef(null)

  return (
    <div>
      <Header />
      <ReservoirList onListRef={ref => { if (ref) listRef.current = ref.current }} />
      <Scrollbar listRef={listRef} />
    </div>
  )
}

export default App