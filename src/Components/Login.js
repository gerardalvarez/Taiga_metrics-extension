import React from 'react';
import { useState, useEffect } from 'react';
import './Login.css';
import Qrapids from '../assets/img/qrapids.png';
import ReactLoading from 'react-loading';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [proyecto, setProyecto] = useState();
  const [loading, setLoading] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

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
    setLoading(true);
    // Aquí llamarías a tu backend para autenticar al usuario
    // Si el usuario es autenticado con éxito, establecerías isLoggedIn a true
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        //if (username === 'pes11a' && password === 'a') {
        setIsLoggedIn(true);
        setProyecto(username);
        setLoading(false);
        setErrorMessage('');

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
        const data = await response.json();
        setErrorMessage(data.error);
        console.log('aaaaa');
        setLoading(false);
      }
      clearForm();
    } catch (error) {
      console.error(error);
      setErrorMessage('server error');
      setLoading(false);
      //setErrorMessage('Ha ocurrido un error');
    }
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

  const handleAboutClick = () => {
    setShowAbout(true);
  };

  const handleBackClick = () => {
    setShowAbout(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="centered-container">
          {showAbout ? (
            <div className="about-container">
              <div className="back">
                <button onClick={handleBackClick}>{'<'}</button>
              </div>
              <div className="back">
                <p>Hola</p>
              </div>
            </div>
          ) : (
            <div className="logged-container">
              <img alt="img" src={Qrapids} className="img" />
              <div className="pp">
                <p>Showing project : {proyecto}</p>
              </div>
              <div className="pp">
                <p>If nothing is showed in the /timeline, reload the page</p>
              </div>
              <div className="but2">
                <button onClick={handleLogout}>Log Out</button>
              </div>
              <div>
                <p className="about" onClick={handleAboutClick}>
                  About
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="bar"></div>
          <div>
            <form onSubmit={handleLogin}>
              <div className="title">Log In | QRapids</div>
              <div className="user">
                <label htmlFor="username">Username </label>
                <input
                  className="user-input"
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="pswd">
                <label htmlFor="password">Password </label>
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
              {loading ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    margin: '5px',
                  }}
                >
                  <ReactLoading
                    type="bubbles"
                    color="#008aa8"
                    height={'20%'}
                    width={'20%'}
                  />
                </div>
              ) : (
                <button className="button" type="submit">
                  Log In
                </button>
              )}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
