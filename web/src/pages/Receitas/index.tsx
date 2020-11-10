import React from 'react'

import './styles.css'
import PageHeader from '../../Components/PageHeader';


function Receitas() {
  return (
    <div id="page-recipe" className="container">
      <PageHeader/>

      <div className="batata">
        <div className="cenoura">
          <h2> Minhas Receitas </h2>  
          <input type="search" placeholder="Search"/>
          <button> Categorias </button>
        </div>
      </div>
    </div>  
  )
}

export default Receitas;
