import React, { useState } from 'react';

import './assets/Styles/global.css';
import Routes from './routes';

import { AuthProvider } from './Context/auth';

function App() {
  return (
    <AuthProvider>
      <Routes />;
    </AuthProvider>
  );
}

export default App;
