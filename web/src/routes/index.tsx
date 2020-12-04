import React from 'react';
import { useAuth } from '../Context/auth';

import AuthRoutes from './AuthRoutes';
import NoAuthRoutes from './NoAuthRoutes';

const Routes: React.FC = () => {
  const { signed } = useAuth();

  return signed ? <AuthRoutes /> : <NoAuthRoutes />;
};

export default Routes;
