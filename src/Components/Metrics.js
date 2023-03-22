import React from 'react';
import { useState, useEffect } from 'react';
import './Metrics.css';
import Qrapids from '../assets/img/qrapids.png';

const Metrics = () => {
  const [errorMessage, setErrorMessage] = useState('');
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

  return <div>HOLA</div>;
};

export default Metrics;
