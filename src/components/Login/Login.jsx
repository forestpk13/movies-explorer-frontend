import UserPage from '../UserPage/UserPage';
import Form from '../Form/Form';

function Login ({ onSubmit }) {
  const texts = {
    heading: 'Рады видеть!',
    caption: 'Еще не зарегистрированы?',
    buttonText: 'Регистрация'
  }

  return (
    <main className='login'>
      <UserPage texts={texts} page='login' route='/signup'>
        <Form onSubmit={onSubmit} page='login' />
      </UserPage>
    </main>
  );
}

export default Login;