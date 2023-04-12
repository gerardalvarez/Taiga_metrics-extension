import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Index.module.css';
import Metrics from '../../Components/Metrics';

function injectReactComponent() {
  if (
    window.location.href.match(
      /^https:\/\/tree.taiga.io\/project\/.*\/timeline$/
    )
  ) {
    // Check if the React container already exists in the DOM
    // Check if the React container already exists in the DOM
    if (document.querySelector('#my-react-container') != null) {
      return;
    }
  }

  const singleProjectIntro = document.querySelector('.single-project-intro');
  if (singleProjectIntro != null) {
    const elementoX = singleProjectIntro.parentNode;
    const reactContainer = document.createElement('div');
    reactContainer.setAttribute('id', 'my-react-container');
    ReactDOM.render(React.createElement(App), reactContainer);
    elementoX.insertAdjacentElement('afterend', reactContainer);
  }
}

const singleProjectIntro = document.querySelector('.single-project-intro');
if (singleProjectIntro != null) {
  injectReactComponent();
}

const observer = new MutationObserver(function (mutationsList, observer) {
  console.log('www');
  if (document.querySelector('.single-project-intro') != null) {
    injectReactComponent();
    return;
  }
});

observer.observe(document.body, { childList: true, subtree: true });

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
