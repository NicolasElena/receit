import React from 'react'

import './styles.css'

import recipeImg from '../../assets/Images/Media.png'
import forkImg from '../../assets/Images/Fork.png'
import likeImg from '../../assets/Images/Like.png'
import cookImg from '../../assets/Images/Cook.png'

function RecipeItem() {
  return (
    <article className="recipe-item">
      <header className="recipe">
        <img src={recipeImg} alt="Recipe"/>
      </header>
          <h3> Nome da receita </h3>
        <div className="recipe-things">
          <div  className="recipe-category">
            Categoria 1
            Categoria 2 
          </div>
          <div className="recipe-ingredients">
              Ingrediente 1
              Ingrediente 2
              Ingrediente 3
          </div>

        </div>
        <footer>
          <button className="cook">
            <img src={cookImg} alt="cook"/>
            Nico
          </button>
          <button>
            <img src={forkImg} alt="Fork"/>
          </button>
          <button>
            <img src={likeImg} alt="Like"/>
          </button>
        </footer>
    </article>
  )
}

export default RecipeItem;
