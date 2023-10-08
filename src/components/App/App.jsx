import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Landing from '../Landing/Landing';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import {
  pagesWithHeader,
  pagesWithFooter
} from '../../utils/constants'

import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const location = useLocation().pathname;
  const navigate = useNavigate();

  const isPageWithHeader = pagesWithHeader.includes(location);
  const isPageWithFooter = pagesWithFooter.includes(location);

  const handleRegister = (user) => {
    navigate('/movies');
    setCurrentUser(user);
    console.log(user);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
            {isPageWithHeader && <Header />}
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/signup' element={<Register onSubmit={handleRegister} />} />
              <Route path='/signin' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/movies' element={<Movies />} />
              <Route path='/saved-movies' element={<SavedMovies />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
            {isPageWithFooter && <Footer />}
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
