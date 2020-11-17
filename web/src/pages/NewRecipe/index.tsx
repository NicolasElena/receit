import React from 'react'

import PageHeader from '../../Components/PageHeader'

import './styles.css'

function NewRecipe() {
  return (
    // Criar componente do input e fazer botão "add-new-item" adicionar sua função!
    //o botão deve criar um novo input -> item
    <div id="page-newRecipe" className="container">  
      <PageHeader />

      <div className="nr-page-content">
        <header> <h2> Cadastrar Receita </h2> </header>
        <div className="add-items">
          <h3> Ingredientes </h3>
          <div className="items" >
            <input type="text" className="ingrediente" placeholder="Ingrediente"/>
            <input type="text" className="qtd" placeholder="Qtd"/>
            <input type="text" className="g" placeholder="(g)"/>
            
          </div> 
          <button className="add-new-item"> Novo Ingrediente </button>
        </div>
        <footer> <button> Finalizar! </button> </footer>
        <div className="txt-div">
          <h2> Modo de Preparo </h2>
          <textarea name="M.D.P" id="mdp" placeholder="Tempere os filés com sal e pimenta do reino..."></textarea>
        </div>
      </div>
    </div>
  )
}

export default NewRecipe;
