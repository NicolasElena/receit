import React, { createContext, useContext, useEffect, useState } from 'react';
import history from '../history';
import api from '../services/api';

interface AuthContextData {
  signed: boolean;
  user: object | null;
  Login(email: String, password: String): Promise<void>;
  Logout(): void;
  CreateUser(newUser: newUser): Promise<void>;
}

interface newUser {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  image?: File;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  //'estados globais(contexto)'
  const [user, setUser] = useState<object | null>(null);

  //useEfect para buscar se existe um usuário E um token no local storage
  useEffect(() => {
    const storagedUser = localStorage.getItem('@Web:user');
    const storagedToken = localStorage.getItem('@Web:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  //função para logar e autenticar
  async function Login(email: String, password: String) {
    const response = await api.post('/login', {
      email: email,
      password: password,
    });

    console.log(response.data);

    //setar contextos (e token)
    setUser(response.data.user);
    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    // armazenar as infos no locaStorage do user e token
    localStorage.setItem('@Web:user', JSON.stringify(response.data.user));
    localStorage.setItem('@Web:token', response.data.token);

    //após logar mudar para a home
    history.push('/');
  }

  async function Logout() {
    setUser(null);

    localStorage.removeItem('@Web:user');
    localStorage.removeItem('@Web:token');

    history.push('/');
  }

  async function CreateUser(newUser: newUser) {
    console.log(newUser);
    const response = await api.post('/user', {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password,
      image: newUser.image,
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout, CreateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
