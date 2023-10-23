import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import UserPage from '../UserPage/UserPage';
import Form from '../Form/Form';

function Register({ onSubmit, currentUser }) {
  const texts = {
    heading: 'Добро пожаловать!',
    caption: 'Уже зарегистрированы?',
    buttonText: 'Войти'
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser !== null) {
      navigate('/');
    }
  }, [currentUser])

  return (
    <main className='register'>
      <UserPage texts={texts} page='register' route='/signin'>
        <Form onSubmit={onSubmit} page='register' />
      </UserPage>
    </main>
  );
}

export default Register;