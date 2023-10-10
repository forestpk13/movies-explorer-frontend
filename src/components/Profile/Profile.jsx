import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Form from '../Form/Form';
import UserPage from '../UserPage/UserPage';

function Profile({ onSubmit, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const texts = {
    heading: `Привет, ${currentUser?.name}!`,
    buttonText: 'Выйти из аккаунта'
  }

  return (
    <main className='profile'>
      <UserPage texts={texts} page='profile' onLogout={onLogout} route='/'>
        <Form page='profile' onSubmit={onSubmit}/>
      </UserPage>
    </main>
  );
}

export default Profile;