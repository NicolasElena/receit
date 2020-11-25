import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/Images/logo-min.png';
import './styles.css';

import { useAuth } from '../../Context/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //context hook useAuth
  const context = useAuth();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    context.Login(email, password);
  }

  return (
    <div className='page-login'>
      <div id='login-container'>
        <div className='logo-container'>
          <Link to='/'>
            <img src={logoImg} alt='Receit' />
          </Link>
        </div>
        <div className='loginTxt'>
          <h1>Login</h1>
        </div>
        <form onSubmit={handleLogin}>
          <div className='input-block'>
            <input
              type='text'
              placeholder='E-mail'
              id='login'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='submit-container'>
            <button className='submit-button' type='submit'>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
