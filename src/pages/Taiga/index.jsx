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
  }, 4000);
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
          style={{ display: 'flex', flexDirection: 'column', width: '550px' }}
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
            width: '300px',
            height: '300px',
            justifyContent: 'center',
            alignItems: 'center',
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
              Inicia sesión en tu proyecto para visualizar las metricas y
              recarga la página!{' '}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
