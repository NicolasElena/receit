import React, { createContext, useContext, useEffect, useState } from 'react';
import history from '../history';
import api from '../services/api';

interface AuthContextData {
  signed: boolean;
  user: User | null;
  Login(email: String, password: String): Promise<void>;
  Logout(): void;
  CreateUser(userData: FormData): Promise<void>;
  CreateRecipe(recipeData: FormData): Promise<void>;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  //'estados globais(contexto)'
  const [user, setUser] = useState<User | null>(null);

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

  async function CreateUser(userData: FormData) {
    console.log(userData);

    const response = await api.post('/user', userData);

    //data com password!
    console.log(response.data);

    alert('usuário cadastrado');

    history.push('/login');
  }

  async function CreateRecipe(recipeData: FormData) {
    console.log(recipeData);

    await api.post('/recipe', recipeData);

    alert('Receita Cadastrada');
    history.push('/');
  }

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        user,
        Login,
        Logout,
        CreateUser,
        CreateRecipe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
