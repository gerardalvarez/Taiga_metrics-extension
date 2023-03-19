import React from 'react';
import { useState } from 'react';
import './Login.css';
import Qrapids from '../assets/img/qrapids.png';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('logged_in') === 'true'
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('aaaaa');
    // Aquí llamarías a tu backend para autenticar al usuario
    // Si el usuario es autenticado con éxito, establecerías isLoggedIn a true
    /*try {
      /* const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('aaaaa'); 
      if (response.ok) { */
    if (username === 'a' && password === 'a') {
      setIsLoggedIn(true);
      // Guarda la clave "logged_in" en el almacenamiento local
      localStorage.setItem('logged_in', 'true');
      localStorage.setItem('proyecto', username);
      console.log('qqq');
    } else {
      // mostrar error de autenticación
      //const data = await response.json();
      setErrorMessage('Usuario o contraseña incorrectos');
      console.log('aaaaa');
    }
    clearForm();
    /* } catch (error) {
      console.error(error);
      //setErrorMessage('Ha ocurrido un error');
    } */
  };

  const handleLogout = () => {
    // Establece isLoggedIn a false
    setIsLoggedIn(false);
    // Elimina la clave "logged_in" del almacenamiento local
    localStorage.removeItem('logged_in');
  };

  const clearForm = () => {
    setUsername('');
    setPassword('');
  };
  return (
    <div>
      {isLoggedIn ? (
        <div className="centered-container">
          <img src={Qrapids} className="img" />
          <div className="pp">
            <p>Visualizando el proyecto : {localStorage.getItem('proyecto')}</p>
          </div>
          <div className="but2">
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>
      ) : (
        <>
          <div className="bar"></div>
          <div>
            <form onSubmit={handleLogin}>
              <div className="title">Login | QRapids</div>
              <div className="user">
                <label htmlFor="username">Usuario </label>
                <input
                  className="user-input"
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="pswd">
                <label htmlFor="password">Contraseña </label>
                <input
                  className="pswd-input"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errorMessage && (
                <div style={{ color: 'red', marginTop: 20 }}>
                  {errorMessage}
                </div>
              )}
              <button className="button" type="submit">
                Iniciar sesión
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
