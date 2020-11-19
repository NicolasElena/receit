import React from 'react'
import { Link } from 'react-router-dom';

import './styles.css'

import backImg from '../../assets/Images/Back.png'
import logo from '../../assets/Images/logo-light.png'

function Register() {
  return (
    <div id="page-reg" className="container">
      <header className="charuto">
        <div className="top-bar-container">
          <Link to="/">
            <img src={backImg} alt="Voltar-"/>
          </Link>

          <img src={logo} alt="Recit"/>
        </div>
        <div className="abobora">
          <strong>
            Estamos empolgados para compartilhar suas receitas!
          </strong>
          <p> O primeiro passo é prrencher este formulario de inscrição </p>
        </div>
      </header>

      <main>

      </main>
    </div>
  )
}

export default Register;
