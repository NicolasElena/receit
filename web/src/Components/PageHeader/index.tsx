import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/Images/logo-min.png';
import { useAuth } from '../../Context/auth';

function PageHeader() {
  const { signed, Logout } = useAuth();

  function handleLogout() {
    Logout();
  }

  if (signed) {
    return (
      <header className='page-header'>
        <div className='nav'>
          <div className='logo'>
            <Link className='back' to='/'>
              <img src={logoImg} alt='Recit' />
            </Link>
          </div>

          <div className='coisas'>
            <Link to='/receitas'>Receitas</Link>
            <Link to='/receitas'>Minhas Receitas</Link>
            <Link to='/categorias'>Categorias</Link>
          </div>

          <input type='text' placeholder='Procure aqui sua receita' />

          <div className='login'>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className='page-header'>
      <div className='nav'>
        <div className='logo'>
          <Link className='back' to='/'>
            <img src={logoImg} alt='Recit' />
          </Link>
        </div>

        <div className='coisas'>
          <Link to='/receitas'>Receitas</Link>
          <Link to='/categorias'>Categorias</Link>
        </div>

        <input type='text' placeholder='Procure aqui sua receita' />

        <div className='login'>
          <Link to='/register'>
            <button>Registrar</button>
          </Link>
          <Link to='/login'>Login</Link>
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
