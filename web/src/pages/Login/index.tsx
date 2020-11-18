import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/Images/logo-min.png';
import './styles.css';

interface LoginProps {}

const Login: React.FC = () => {
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

        <div className='input-block'>
          <input type='text' placeholder='E-mail' id='login' />
          <input type='password' placeholder='Password' id='password' />
        </div>

        <div className='submit-container'>
          <Link to='/' className='submit-button'>
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
