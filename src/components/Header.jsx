import { useState, useEffect } from 'react'
import '../styles/Header.css'
import AdmPanelIcon from '../assets/adm_panel_icon.svg'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 599)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 599px)')
    const handleResize = () => setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleResize)
    handleResize()
    return () => mediaQuery.removeEventListener('change', handleResize)
  }, [])

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-flex">
          <img src={AdmPanelIcon} alt="Админ панель" width={28} height={28}/>
          <span className="logo-text">Панель администрирования резервуаров</span>
        </div>
        {!isMobile && (
          <a href="#" className="nav-btn">Добавить резервуар</a>
        )}
      </div>
      {!isMobile && (
        <nav>
          <a href="#" className="nav-btn">Экран резервуаров</a>
        </nav>
      )}
      {isMobile && (
        <>
          <button
            type="button"
            className="nav-toggle"
            onClick={() => setMenuOpen(open => !open)}
            aria-label="Открыть меню"
          >
            <i className="fas fa-bars"></i>
          </button>
          {menuOpen && (
            <ul className="nav-list active">
              <li><a href="#" className="nav-btn">Добавить резервуар</a></li>
              <li><a href="#" className="nav-btn">Экран резервуаров</a></li>
            </ul>
          )}
        </>
      )}
    </header>
  )
}