import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import Login from '../../Components/Login';

const Popup = () => {
  return (
    <div className="App">
      <Login />
    </div>
  );
};

export default Popup;
