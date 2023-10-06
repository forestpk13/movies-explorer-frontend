import UserPage from '../UserPage/UserPage';
import Form from '../Form/Form';

function Register({ onSubmit }) {
  const texts = {
    heading: 'Добро пожаловать!',
    caption: 'Уже зарегистрированы?',
    buttonText: 'Войти'
  }

  return (
    <main className='register'>
      <UserPage texts={texts} page='register'>
        <Form onSubmit={onSubmit} page='register' />
      </UserPage>
    </main>
  );
}

export default Register;