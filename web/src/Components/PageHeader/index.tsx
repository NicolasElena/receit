import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

import logoImg from '../../assets/Images/logo-min.png'

function PageHeader() {
  return (
    <header className="page-header">
      <div className="nav">
        
        <Link className="back" to="/">
        <img src={logoImg} alt="Recit"/>
        </Link>

        <Link to="/receitas">
            Receitas
         </Link>

         <Link to="/categorias">
             Categorias
         </Link>

        <input 
          type="text" 
          placeholder="Procure aqui sua receita"
        />

         <Link to="/sign">
          <button>
            Registrar
          </button>
         </Link>

         <Link to="/login">
             Login
         </Link>
      </div>
    </header>
  )
}

export default PageHeader;
