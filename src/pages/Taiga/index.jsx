import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Metrics from '../../Components/Metrics';

// Espera a que la página termine de cargar
window.addEventListener('load', function () {
  setTimeout(function () {
    const elementoX = document.querySelector(
      '.single-project-intro'
    ).parentNode;
    const reactContainer = document.createElement('div');
    ReactDOM.render(React.createElement(App), reactContainer);
    elementoX.insertAdjacentElement('afterend', reactContainer);
  }, 3000);
});

//

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [proyecto, setProyecto] = useState('');

  useEffect(() => {
    chrome.storage.local.get('logged_in', (data) => {
      setIsLogged(data.logged_in);
    });

    chrome.storage.local.get('proyecto_actual', (data) => {
      setProyecto(data.proyecto_actual);
    });
  }, []);

  return (
    <div>
      {isLogged ? (
        //////////////////////////////////////////////////////////
        //LAS METRICAS
        //////////////////////////////////////////////////////////
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '600px',
            minWidth: '600px',
          }}
        >
          <Metrics />
        </div>
      ) : (
        //////////////////////////////////////////////////////////
        //AQUI EL AVISO DE INICIO DE SESSION PARA VER LAS METRICAS
        //////////////////////////////////////////////////////////

        <div
          style={{
            display: 'flex',
            maxWidth: '580px',
            minWidth: '580px',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <div
            style={{
              padding: '10px',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <h1>
              Please log in to the extension's pop-up to view the metrics of
              your project. Thank you!
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
