import UserPage from '../UserPage/UserPage';
import Form from '../Form/Form';

function Login () {
  const texts = {
    heading: 'Рады видеть!',
    caption: 'Еще не зарегистрированы?',
    buttonText: 'Регистрация'
  }

  return (
    <main className='login'>
      <UserPage texts={texts}>
        <Form page='login' />
      </UserPage>
    </main>
  );
}

export default Login;