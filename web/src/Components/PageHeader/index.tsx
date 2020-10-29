import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

import logoImg from '../../assets/Images/logo-min.png'

function PageHeader() {
  return (
    <header className="page-header">
      <header className="logo">
        <Link to="/">
        <img src={logoImg} alt="Recit"/>
        </Link>
    
      </header>
    </header>
  )
}

export default PageHeader;
