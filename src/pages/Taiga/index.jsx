import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

function MyComponent() {
  const [isLogged, setIsLogged] = useState(false);
  const [proyecto, setProyecto] = useState();

  useEffect(() => {
    chrome.storage.local.get('logged_in', (data) => {
      setIsLogged(data.logged_in);
    });

    chrome.storage.local.get('proyecto_actual', (data) => {
      setProyecto(data.proyecto_actual);
    });
  }, []);

  return (
    <div style={{ backgroundColor: 'black' }}>
      {isLogged === 'true' ? (
        <p style={{ color: 'white' }}>
          Estas logeado en el proyecto: {proyecto}{' '}
        </p>
      ) : (
        <p style={{ color: 'white' }}>
          Inicia sesión en tu proyecto para visualizxar las metricas.{' '}
        </p>
      )}
    </div>
  );
}

ReactDOM.render(<MyComponent />, document.body);
