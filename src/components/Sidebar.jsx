import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

export default function Sidebar({ collapsed, setCollapsed, onLogout }) {
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/products', label: 'Products', icon: '🛍️' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/login', label: 'Login', icon: '🔑' },
  ];

  return (
    <div
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <nav>
        <ul>
          {navItems.map(({ path, label, icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <span role="img" aria-label={label}>{icon}</span>
                <span className="label">{label}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={onLogout}
              className="logout-button"
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                fontSize: '18px',
                padding: '15px 20px',
                width: '100%',
                textAlign: 'left',
                borderRadius: '6px',
              }}
              onMouseDown={e => e.preventDefault()} // Prevent focus on click
            >
              <span role="img" aria-label="Logout">🚪</span>
              {!collapsed && <span className="label">Logout</span>}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
