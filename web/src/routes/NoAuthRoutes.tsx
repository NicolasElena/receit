import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Receitas from '../pages/Receitas';
import FullRecipe from '../pages/Recipe';
import Register from '../pages/Register';
import User from '../pages/User';

const NoAuthRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path='/' exact component={Main} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/receitas' exact component={Receitas} />
      <Route path='/receitas/user/:id' component={Receitas} />
      <Route path='/recipes/:id' component={FullRecipe} />
      <Route path='/user/:id' component={User} />
    </Switch>
  );
};

export default NoAuthRoutes;
