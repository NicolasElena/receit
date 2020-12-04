import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/Images/logo-min.png';
import { useAuth } from '../../Context/auth';
import history from '../../history';

function PageHeader() {
  const { signed, Logout, user } = useAuth();

  function handleLogout() {
    Logout();
  }
  function handleChef() {
    history.push(`/user/${user?.id}`);
  }

  if (signed && user) {
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
            <Link to={`/receitas/user/${user.id}`}>Minhas Receitas</Link>
            <Link to='/newRecipe'>Nova Receita</Link>
          </div>

          <div className='logout-block'>
            <button onClick={handleChef}>Chef</button>
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
        </div>

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
