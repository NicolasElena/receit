import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

import logoImg from '../../assets/Images/logo-min.png'

function PageHeader() {
  return (
    <header className="page-header">
      <div className="nav">
        <div className="logo">
          <Link className="back" to="/">
          <img src={logoImg} alt="Recit"/>
          </Link>
        </div>

        <div className="coisas">
          <Link to="/receitas">
            Receitas
          </Link>

           <Link to="/newRecipe">
              Nova Receita
           </Link>

           <Link to="/categorias">
              Categorias
           </Link>
        </div>

        <input 
          type="text" 
          placeholder="Procure aqui sua receita"
        />

        <div className="login">
          <Link to="/sign">
           <button>
             Registrar
           </button>
          </Link>
    
          <Link to="/login">
              Login
          </Link>
        </div>
      </div>
    </header>
  )
}

export default PageHeader;
