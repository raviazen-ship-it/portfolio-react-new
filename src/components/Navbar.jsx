import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' }
  ]

  const isActive = (path) => location.pathname === path

  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => !prev)
  }, [])

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        closeMobile()
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeMobile()
      }
    }

    const handleRouteChange = () => {
      closeMobile()
    }

    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
      window.addEventListener('popstate', handleRouteChange)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
      window.removeEventListener('popstate', handleRouteChange)
      document.body.style.overflow = ''
    }
  }, [mobileOpen, closeMobile])

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">PORTFOLIO WEBSITE</div>
        <ul className="nav-links desktop">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link 
                to={link.to} 
                className={isActive(link.to) ? 'active-nav' : ''}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button 
          className={`menu-toggle ${mobileOpen ? 'close' : 'hamburger'}`} 
          ref={buttonRef}
          onClick={toggleMobile}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
      {mobileOpen && (
        <>
          <div className="mobile-overlay show" onClick={closeMobile}></div>
          <ul className="nav-links mobile show" ref={menuRef}>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link 
                  to={link.to} 
                  className={isActive(link.to) ? 'active-nav' : ''}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </nav>
  )
}

export default Navbar

