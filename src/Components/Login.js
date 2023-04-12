import React from 'react';
import { useState, useEffect } from 'react';
import './Login.css';
import Qrapids from '../assets/img/qrapids.png';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [proyecto, setProyecto] = useState();

  useEffect(() => {
    chrome.storage.local.get('logged_in', (data) => {
      setIsLoggedIn(data.logged_in);
    });

    chrome.storage.local.get('proyecto_actual', (data) => {
      setProyecto(data.proyecto_actual);
    });
  }, []);

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
    if (username === 'pes11a' && password === 'a') {
      setIsLoggedIn(true);
      setProyecto(username);
      // Guarda la clave "logged_in" en el almacenamiento local
      chrome.storage.local.set(
        { logged_in: true, proyecto_actual: username },
        () => {
          chrome.runtime.sendMessage({
            type: 'updateLocalStorage',
            logged_in: true,
            proyecto_actual: username,
          });
        }
      );

      chrome.tabs.query(
        { url: 'https://tree.taiga.io/project/*/timeline' },
        function (tabs) {
          if (tabs.length > 0) {
            // Se encontró la pestaña
            chrome.tabs.reload(tabs[0].id);
          } else {
            // La pestaña no está abierta
            // Puedes abrir la pestaña usando chrome.tabs.create
          }
        }
      );
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
    setProyecto('');
    // Elimina la clave "logged_in" del almacenamiento local
    chrome.storage.local.set(
      { logged_in: false, proyecto_actual: username },
      () => {
        chrome.runtime.sendMessage({
          type: 'updateLocalStorage',
          logged_in: false,
          proyecto_actual: null,
        });
      }
    );
    chrome.runtime.sendMessage({
      type: 'logout',
    });
  };

  const clearForm = () => {
    setUsername('');
    setPassword('');
  };
  return (
    <div>
      {isLoggedIn ? (
        <div className="centered-container">
          <img alt="img" src={Qrapids} className="img" />
          <div className="pp">
            <p>Visualizando el proyecto : {proyecto}</p>
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
