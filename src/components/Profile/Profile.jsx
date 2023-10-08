import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Form from '../Form/Form';
import UserPage from '../UserPage/UserPage';

function Profile({ onSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const texts = {
    heading: `Привет, !`,
    buttonText: 'Выйти из аккаунта'
  }

  return (
    <main className='profile'>
      <UserPage texts={texts} page='profile'>
        <Form page='profile' />
      </UserPage>
    </main>
  );
}

export default Profile;