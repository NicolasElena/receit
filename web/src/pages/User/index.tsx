import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../../@types/recipes';
import PageHeader from '../../Components/PageHeader';
import { useAuth } from '../../Context/auth';
import history from '../../history';
import api from '../../services/api';

import './styles.css';

interface UserParams {
  id: string;
}

export default function UserPage() {
  const { user, UpdateUser } = useAuth();
  const params = useParams<UserParams>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [userObject, setUserObject] = useState<User>({
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    image: {
      id: 0,
      url: '',
    },
  });

  useEffect(() => {
    if (params.id) {
      api.get(`/user/${params.id}`).then((response) => {
        response.data.message
          ? history.push('/')
          : setUserObject(response.data);
      });
    } else {
      history.push('/');
    }
  }, [params, params.id]);

  async function handleUpdateUser(e: FormEvent) {
    e.preventDefault();

    UpdateUser(firstName, lastName, email);
  }

  if (user && params.id === user.id.toString()) {
    return (
      <div id='user-content' className='container'>
        <PageHeader />
        <main>
          <form onSubmit={handleUpdateUser}>
            <div className='user-image'>
              <img src={userObject?.image.url} alt='Foto do Chef' />
            </div>
            <label>Nome</label>
            <input
              name='user-first-name'
              type='text'
              className='user-first-name'
              placeholder={userObject?.firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <label>Sobrenome</label>
            <input
              name='user-last-name'
              type='text'
              className='user-last-name'
              placeholder={userObject?.lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <label>Email</label>
            <input
              name='user-email'
              type='text'
              placeholder={userObject?.email}
              className='user-email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {/* <label>Nova senha</label>
            <input
              name='user-password'
              type='password'
              className='user-password'
              onChange={(e) => {
                userObject.email = e.target.value;
              }}
            />
            <label>Confirmar nova senha</label>
            <input
              name='user-password'
              type='password'
              className='user-password'
              onChange={(e) => {
                userObject.email = e.target.value;
              }}
            /> */}
            <button type='submit'>Alterar Dados</button>
          </form>
        </main>
      </div>
    );
  } else {
    return (
      <div id='user-content' className='container'>
        <PageHeader />
        <main>
          <div className='user-image'>
            <img src={userObject?.image.url} alt='Foto do Chef' />
          </div>
          <label>Nome</label>
          <input
            name='user-first-name'
            type='text'
            className='user-first-name'
            value={userObject?.firstName}
          />
          <label>Sobrenome</label>
          <input
            name='user-last-name'
            type='text'
            className='user-last-name'
            value={userObject?.lastName}
          />
          <label>Email</label>
          <input
            name='user-email'
            type='text'
            className='user-email'
            value={userObject?.firstName}
          />
        </main>
      </div>
    );
  }
}
