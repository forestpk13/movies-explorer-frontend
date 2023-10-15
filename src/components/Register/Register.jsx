import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import UserPage from '../UserPage/UserPage';
import Form from '../Form/Form';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Register({ onSubmit }) {
  const texts = {
    heading: 'Добро пожаловать!',
    caption: 'Уже зарегистрированы?',
    buttonText: 'Войти'
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (CurrentUserContext) {
      navigate('/')
    }
  }, [])

  return (
    <main className='register'>
      <UserPage texts={texts} page='register' route='/signin'>
        <Form onSubmit={onSubmit} page='register' />
      </UserPage>
    </main>
  );
}

export default Register;