import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from '../pages/Main';
import NewRecipe from '../pages/NewRecipe';
import Receitas from '../pages/Receitas';
import FullRecipe from '../pages/Recipe';
import User from '../pages/User';

const AuthRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path='/' exact component={Main} />
      <Route path='/receitas' exact component={Receitas} />
      <Route path='/receitas/user/:id' component={Receitas} />
      <Route path='/recipes/:id' component={FullRecipe} />
      <Route path='/newRecipe' component={NewRecipe} />
      <Route path='/user/:id' component={User} />
    </Switch>
  );
};

export default AuthRoutes;
