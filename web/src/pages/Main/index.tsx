import React from 'react';

import './styles.css';
import logoImg from '../../assets/Images/logo.png';
import mainImg from '../../assets/Images/Group 7.png';

import PageHeader from '../../Components/PageHeader';

function Main() {
  return (
    <div id='page-content' className='container'>
      <PageHeader />

      <main>
        <div>
          <h1> Crie e busque novas receitas com </h1>
          <img src={logoImg} alt='Logo' />
        </div>
        <img src={mainImg} alt='Cook' />
      </main>
    </div>
  );
}

export default Main;
