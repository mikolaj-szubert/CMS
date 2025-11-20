import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom'; // Importuj NavLink
import Login from './Login'; // Importuj komponent Login
import './AdminStyles.css'; // Importuj style admina

// Proste style dla nawigacji admina, aby była czytelna
const navStyle = {
  background: "#111",
  padding: "1rem",
  borderRight: "1px solid #333",
};

const linkStyle = ({ isActive }) => ({
  color: isActive ? 'white' : '#888',
  display: 'block',
  padding: '0.5rem 0'
});

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- 1. Stan dla modala
  const [isDirty, setIsDirty] = useState(false); // Stan dla zmian w formularzach
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {loggedIn && !isDirty && (<nav style={navStyle}>
        <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
          {/* 5. Użyj NavLink dla linków wewnętrznych */}
          <li><NavLink to="/admin/header" style={linkStyle}>Nagłówek strony</NavLink></li>
          <li><NavLink to="/admin/intro" style={linkStyle}>Wstęp</NavLink></li>
          <li><NavLink to="/admin/about" style={linkStyle}>O nas</NavLink></li>
          <li><NavLink to="/admin/gallery" style={linkStyle}>Galeria</NavLink></li>
          <li><NavLink to="/admin/testimonials" style={linkStyle}>Opinie klientów</NavLink></li>
          <li><NavLink to="/admin/footer" style={linkStyle}>Stopka</NavLink></li>
        </ul>
      </nav>)}

      <main style={{ padding: '2rem', flex: 1 }}>
        {loggedIn ? (
          <Outlet context={{ setIsDirty }} /> // Pokaż zawartość admina, jeśli zalogowany
        ) : (
          <div>
            <p>Musisz się zalogować, aby zobaczyć tę zawartość.</p>
            {/* 2. Przycisk otwiera modal */}
            <button className="btn btn--primary" onClick={() => setIsModalOpen(true)}>
              Zaloguj
            </button>
          </div>
        )}
      </main>

      {/* 3. Renderuj modal warunkowo */}
      {isModalOpen && (
        <Login
          // 4. Przekaż funkcje do modala
          onClose={() => setIsModalOpen(false)}
          onLoginSuccess={() => {
            setLoggedIn(true);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}