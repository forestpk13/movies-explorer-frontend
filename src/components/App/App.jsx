import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoutes from '../ProtectedRoutes/ProtectedRoutes';
import { useState, useEffect } from 'react';
import Landing from '../Landing/Landing';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import api from '../../utils/MainApi'
import {
  pagesWithHeader,
  pagesWithFooter
} from '../../utils/constants'

import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null);

  // Ниже - стейты для работы с запросами
  const [errorMessage, setErrorMessage] = useState('');
  const [resultMessage, setResultMessage] = useState('');

  const location = useLocation().pathname;
  const navigate = useNavigate();

  const isPageWithHeader = pagesWithHeader.includes(location);
  const isPageWithFooter = pagesWithFooter.includes(location);

  const handleRegister = async (user) => {
    try {
      const userData = await api.register(JSON.stringify(user))
      setIsLoggedIn(true);
      setCurrentUser(userData)
      navigate('/movies');
    } catch (err) {
      setErrorMessage(err.message)
      setTimeout(() => setErrorMessage(''), 3000)
    };
  }

  const handleLogin = async (user) => {
    try {
      await api.login(JSON.stringify(user))
      setIsLoggedIn(true);
      getUser();
      navigate('/movies');
    } catch (err) {
      setErrorMessage(err.message)
      setTimeout(() => setErrorMessage(''), 3000)
    }
  }

  // Логируем пользователя при загрузке приложения
  const getUser = async () => {
    try {
      const user = await api.getOwnProfile()
      if (user.email) {
        setIsLoggedIn(true);
        setCurrentUser(user);
      }
    } catch (err) {
      setErrorMessage(err.message);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  useEffect(() => {
    getUser();
  }, []);


  // Удаляем все данные, которые сгенерил пользователь за сессию
  const deleteAllSessionData = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);;
    navigate('/');
  }

  const changeUserInfo = async (userData) => {
    console.log(userData)
    try {
      const user = await api.updateOwnProfile(JSON.stringify(userData))
      setCurrentUser(user);
      setResultMessage('Профиль успешно обновлен');
      setTimeout(() => setResultMessage(''), 3000)
    } catch (err) {
      setErrorMessage(err.message);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  }

  const handleLogout = async () => {
    try {
      await api.logout();
      deleteAllSessionData();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
            {isPageWithHeader && <Header />}
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/signup' element={<Register onSubmit={handleRegister} />} />
              <Route path='/signin' element={<Login onSubmit={handleLogin} />} />
              <Route element={<ProtectedRoutes condition={isLoggedIn} redirectPath='/' />} >
                <Route path='/profile' element={<Profile onSubmit={changeUserInfo} onLogout={handleLogout} error={errorMessage} resultMessage={resultMessage}/>} />
                <Route path='/movies' element={<Movies />} />
                <Route path='/saved-movies' element={<SavedMovies />} />
                <Route path='*' element={<PageNotFound />} />
              </Route>
            </Routes>
            {isPageWithFooter && <Footer />}
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
