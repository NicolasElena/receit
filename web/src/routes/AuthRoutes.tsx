import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Categorias from '../pages/Categorias';

import Main from '../pages/Main';
import NewRecipe from '../pages/NewRecipe';
import Receitas from '../pages/Receitas';
import FullRecipe from '../pages/Recipe';

const NoAuthRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path='/' exact component={Main} />
      <Route path='/receitas' component={Receitas} />
      <Route path='/recipes/:id' component={FullRecipe} />
      <Route path='/categorias' component={Categorias} />
      <Route path='/newRecipe' component={NewRecipe} />
    </Switch>
  );
};

export default NoAuthRoutes;
