import { useRef, useEffect, useState } from 'react'
import '../styles/Scrollbar.css'

export function Scrollbar({ listRef }) {
  const trackRef = useRef(null)
  const [thumbHeight, setThumbHeight] = useState(60)
  const [thumbTop, setThumbTop] = useState(0)
  const isDragging = useRef(false)
  const dragStartY = useRef(0)
  const dragStartScroll = useRef(0)

  const updateThumb = () => {
    const list = listRef?.current
    const track = trackRef.current
    if (!list || !track) return

    const visible = list.clientHeight
    const total = list.scrollHeight
    const scroll = list.scrollTop
    const trackHeight = track.clientHeight

    const thumbH = Math.max((visible / total) * trackHeight, 30)
    const thumbT = (scroll / (total - visible)) * (trackHeight - thumbH) || 0

    setThumbHeight(thumbH)
    setThumbTop(thumbT)
  }

  useEffect(() => {
    updateThumb()
    const list = listRef?.current
    if (!list) return
    list.addEventListener('scroll', updateThumb)
    window.addEventListener('resize', updateThumb)
    return () => {
      list.removeEventListener('scroll', updateThumb)
      window.removeEventListener('resize', updateThumb)
    }
  })

  const onThumbMouseDown = (e) => {
    isDragging.current = true
    dragStartY.current = e.clientY
    dragStartScroll.current = listRef.current.scrollTop
    document.addEventListener('mousemove', onThumbMouseMove)
    document.addEventListener('mouseup', onThumbMouseUp)
    e.preventDefault()
  }

  const onThumbMouseMove = (e) => {
    if (!isDragging.current) return
    const list = listRef.current
    const track = trackRef.current
    const deltaY = e.clientY - dragStartY.current
    const trackHeight = track.clientHeight
    const thumbMovable = trackHeight - thumbHeight
    const scrollable = list.scrollHeight - list.clientHeight
    let newThumbTop = Math.min(Math.max(thumbTop + deltaY, 0), thumbMovable)
    let newScroll = (newThumbTop / thumbMovable) * scrollable
    list.scrollTop = newScroll
  }

  const onThumbMouseUp = () => {
    isDragging.current = false
    document.removeEventListener('mousemove', onThumbMouseMove)
    document.removeEventListener('mouseup', onThumbMouseUp)
  }

  return (
    <div className="scrollbar-outer">
      <div className="scrollbar-track" ref={trackRef}>
        <div
          className="scrollbar-thumb"
          style={{ height: thumbHeight, top: thumbTop }}
          onMouseDown={onThumbMouseDown}
        />
      </div>
    </div>
  )
}