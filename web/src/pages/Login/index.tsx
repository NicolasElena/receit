import React from 'react';

import logoImg from '../../assets/Images/logo-min.png';
import './styles.css';

interface LoginProps {}

const Login: React.FC = () => {
  return (
    <div className='bg'>
      <div className='login'>
        <div className='logo-container'>
          <img src={logoImg} alt='Receit' />
        </div>
        <div className='loginTxt'>
          <h1>Login</h1>
        </div>

        <div className='input-block'>
          <div>
            <input type='text' placeholder='E-mail' id='login' />
          </div>
          <div>
            <input type='password' placeholder='Password' id='password' />
          </div>
        </div>

        <div className='submit-button'>
          <button type='submit'>Entrar</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
