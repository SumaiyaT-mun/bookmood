import { NavLink } from 'react-router-dom'

function Header() {
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/preferences', label: 'Find My Book' },
    { to: '/saved-books', label: 'Saved Books' },
  ]

  return (
    <header className="app-header" style={{ width: '100%', padding: '20px 0' }}>
      <div
        style={{
          maxWidth: '1100px',
          width: '100%',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px 20px',
          boxSizing: 'border-box',
        }}
      >
        <NavLink
          to="/"
          aria-label="Booklyn home"
          style={{
            color: '#d1d5db',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 700,
            }}
          >
            B
          </span>
          <span>Booklyn</span>
        </NavLink>

        <nav className="main-nav" aria-label="Main navigation">
          <ul
            className="main-nav__list"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
              gap: '8px 16px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {navItems.map((item) => (
              <li key={item.to} className="main-nav__item" style={{ margin: 0 }}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `main-nav__link${isActive ? ' is-active' : ''}`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? '#e5e7eb' : '#d1d5db',
                    textDecoration: 'none',
                    fontWeight: isActive ? 700 : 600,
                    fontSize: '0.96rem',
                    lineHeight: 1.4,
                    padding: '0.5rem 0.7rem',
                    borderRadius: '10px',
                    border: isActive ? '1px solid #ddd6fe' : '1px solid transparent',
                    background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                    transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '36px',
                    outlineOffset: '2px',
                  })}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
