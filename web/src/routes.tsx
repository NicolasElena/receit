import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';
<<<<<<< HEAD
import Receitas from './pages/Receitas';
import Categorias from './pages/Categorias';
import NewRecipe from './pages/NewRecipe';
=======
import Receitas from './pages/Receitas'
import Categorias from './pages/Categorias'
import NewRecipe from './pages/NewRecipe'
import Register from './pages/Register'
>>>>>>> 59fa0fddcafcbd7ace80782775c35ab8ec52cd24

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
<<<<<<< HEAD
        <Route path='/' exact component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/receitas' component={Receitas} />
        <Route path='/categorias' component={Categorias} />
        <Route path='/newRecipe' component={NewRecipe} />
=======
        <Route path="/" exact component={Main} />
        <Route path="/login"  component={Login} />
        <Route path="/receitas" component={Receitas} />
        <Route path="/categorias" component={Categorias}/>
        <Route path="/newRecipe" component={NewRecipe} />
        <Route path="/register" component={Register} />
>>>>>>> 59fa0fddcafcbd7ace80782775c35ab8ec52cd24
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
