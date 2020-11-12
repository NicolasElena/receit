import React from 'react'

import PageHeader from '../../Components/PageHeader'

import './styles.css'

function NewRecipe() {
  return (
    <div id="page-newRecipe" className="container">
      <PageHeader />

      <div className="page-content">
        <header> <h2> Cadastrar Receita </h2> </header>
        <div className="add-items">
          <h3> Ingredientes </h3>
          <div className="items">
            <input type="text" className="ingrediente" placeholder="Ingrediente"/>
            <input type="text" className="qtd" placeholder="Qtd"/>
            <input type="text" className="g" placeholder="(g)"/>
          </div>
          <button className="add-new-item"> Novo Ingrediente </button>
        </div>
        <footer> <button> Finalizar! </button> </footer>
      </div>
    </div>
  )
}

export default NewRecipe;
