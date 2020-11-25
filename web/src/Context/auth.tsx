import React, { createContext, useState } from 'react';
import api from '../services/api';

interface AuthContextData {
  signed: boolean;
  user: object | null;
  Login(): Promise<void>;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);

  async function Login() {
    const response = await api.post('/login', {
      email: 'henrikao@henrilinks.com',
      password: '0000',
    });

    console.log(response.data);

    setUser(response.data.user);
    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
  }

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, Login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
