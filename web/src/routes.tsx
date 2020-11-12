import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login';
import Main from './pages/Main';
import Receitas from './pages/Receitas'
import Categorias from './pages/Categorias'
import NewRecipe from './pages/NewRecipe'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login"  component={Login} />
        <Route path="/receitas" component={Receitas} />
        <Route path="/categorias" component={Categorias}/>
        <Route path="/newRecipe" component={NewRecipe} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
