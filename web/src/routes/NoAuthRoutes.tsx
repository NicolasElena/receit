import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Categorias from '../pages/Categorias';

import Login from '../pages/Login';
import Main from '../pages/Main';
import Receitas from '../pages/Receitas';
import Register from '../pages/Register';

const NoAuthRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path='/' exact component={Main} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/receitas' component={Receitas} />
      <Route path='/categorias' component={Categorias} />
    </Switch>
  );
};

export default NoAuthRoutes;
