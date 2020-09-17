import React from 'react';

import logoImg from './assets/Images/logo-min.png'

import './assets/Styles/global.css'

function App() {
  return(
    <main id="login">
        <div className="logo-container">
          <img src={logoImg} alt="Receit"/>
      </div>
      <div className="loginTxt">
        <h1>Login</h1>
      </div>

      <div className="input-block" >
        <input type="text" id="login" />
        <input type="text" id="password" />
      </div>

      <div className="submit-button">
        <button type="submit"> 
          Entrar
        </button>
      </div>
    </main>
  );
}

export default App;
