import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import { useAuth } from '../../Context/auth';

import backImg from '../../assets/Images/Back.png';
import logo from '../../assets/Images/logo-light.png';
import Input from '../../Components/Input';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [image, setImage] = useState<File[]>([]);

  const context = useAuth();

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();

    //verificar senha!!

    if (password === repassword) {
      const data = new FormData();

      data.append('firstName', firstName);
      data.append('lastName', lastName);
      data.append('email', email);
      data.append('password', password);
      image.forEach((image) => {
        data.append('image', image);
      });
      console.log({
        firstName,
        lastName,
        email,
        password,
        image,
      });

      context.CreateUser(data);
    } else {
      alert('As senhas precisam ser iguais');
    }
  }

  function handleSelectImage(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const selectedImage = Array.from(e.target.files);

    setImage(selectedImage);
  }

  return (
    <div id='page-register' className='container'>
      <header className='txt-header-cadastro'>
        <div className='top-bar-container'>
          <Link to='/'>
            <img src={backImg} alt='Voltar-' />
          </Link>

          <img src={logo} alt='Recit' />
        </div>
        <div className='txt-cadastro'>
          <strong>Estamos empolgados para compartilhar suas receitas!</strong>
          <p> O primeiro passo é prrencher este formulario de inscrição </p>
        </div>
      </header>
      <main>
        <form onSubmit={handleCreateUser}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name='name'
              type='text'
              label='Nome'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <Input
              name='name'
              type='text'
              label='Sobrenome'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <Input
              name='email'
              type='text'
              label='Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              name='password'
              type='text'
              label='Senha'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Input
              name='repassword'
              type='text'
              label='Confirmar Senha'
              value={repassword}
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
            />
            <div className='file-upload'>
              <Input
                className='btn-img'
                type='file'
                label='Avatar'
                name='image'
                onChange={handleSelectImage}
              />
            </div>
          </fieldset>
          <footer>
            <button type='submit'> Salvar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default Register;
