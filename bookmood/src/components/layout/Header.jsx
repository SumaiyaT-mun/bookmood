import { NavLink } from 'react-router-dom'

function Header() {
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/find-my-book', label: 'Find My Book' },
    { to: '/saved-books', label: 'Saved Books' },
  ]

  return (
    <header className="app-header">
      <nav className="main-nav" aria-label="Main navigation">
        <ul className="main-nav__list">
          {navItems.map((item) => (
            <li key={item.to} className="main-nav__item">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `main-nav__link${isActive ? ' is-active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
