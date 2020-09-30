import React from 'react';

import logoImg from './assets/Images/logo-min.png'
import dsktpBG from './assets/Images/Desktop_bg.svg'

import './assets/Styles/global.css'

function App() {
  return(
    <main id="login">
      <div id="login-container">
        <div className="logo-container">
          <img src={logoImg} alt="Receit"/>
        </div>
        <div className="loginTxt">
          <h1>Login</h1>
        </div>

        <div className="input-block" >
          <input type="text" placeholder="E-mail" id="login" />
          <input type="password" placeholder="Password" id="password" />
        </div>

        <div className="submit-button">
          <button type="submit"> 
            Entrar
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
