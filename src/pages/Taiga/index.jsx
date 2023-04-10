import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Index.module.css';
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
        <div className={styles.containerMetrics}>
          <Metrics proyecto={proyecto} />
        </div>
      ) : (
        <div className={styles.containerLogInMessage}>
          <div className={styles.logInMessage}>
            <h1>
              Please log in to the extension's pop-up to view the metrics of
              your project.
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
