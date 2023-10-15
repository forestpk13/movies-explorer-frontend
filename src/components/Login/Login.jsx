import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import UserPage from '../UserPage/UserPage';
import Form from '../Form/Form';

function Login ({ onSubmit, currentUser }) {
  const texts = {
    heading: 'Рады видеть!',
    caption: 'Еще не зарегистрированы?',
    buttonText: 'Регистрация'
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser !== null) {
      navigate('/');
    }
  }, [currentUser])

  return (
    <main className='login'>
      <UserPage texts={texts} page='login' route='/signup'>
        <Form onSubmit={onSubmit} page='login' />
      </UserPage>
    </main>
  );
}

export default Login;