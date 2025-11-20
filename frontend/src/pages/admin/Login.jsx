import React, { useState } from 'react';
import './Login.css'; // Dodamy style w następnym kroku

export default function Login({ onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Tutaj umieściłbyś prawdziwą logikę logowania (np. zapytanie do API)
    // Na potrzeby tego przykładu, zakładamy, że logowanie zawsze się udaje
    console.log('Logowanie udane dla:', username);
    
    // Wywołaj funkcję przekazaną z rodzica
    onLoginSuccess();
  };

  // Zapobiega zamknięciu modala po kliknięciu na formularz
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Tło modala (Overlay) - kliknięcie tutaj zamyka modal
    <div className="modal-overlay" onClick={onClose}>
      {/* Zawartość modala */}
      <div className="modal-content" onClick={handleModalContentClick}>
        <h2>Logowanie</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Użytkownik:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Hasło:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            {/* Przycisk "Anuluj" wywołuje funkcję onClose */}
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Anuluj
            </button>
            <button type="submit" className="btn btn--primary">
              Zaloguj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}