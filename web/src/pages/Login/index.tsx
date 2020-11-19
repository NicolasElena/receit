import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/Images/logo-min.png';
import './styles.css';
import api from '../../services/api';

interface LoginProps {}

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // console.log(email, password);

    const dataLogin = {
      email: email,
      password: password,
    };

    console.log(dataLogin);

    await api.post('auth', dataLogin).then((resp) => {
      console.log(resp.data);
    });
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
        <form onSubmit={handleSubmit}>
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
}
