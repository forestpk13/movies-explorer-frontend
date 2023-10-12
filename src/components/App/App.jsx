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
import moviesApi from '../../utils/MoviesApi';
import { debounce } from '../../utils/utils';
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
  const [isInRequest, setIsInRequest] = useState(false);
  const [moviesList, setMoviesList] = useState([]); // Полный список, возвращаемый при запросе на api BeatFilms
  const [foundMovies, setFoundMovies] = useState([]); // Список фильмов, отфильтрованный по запросу в инпуте
  const [foundMoviesToggleFiltered, setFoundMoviesToggleFiltered] = useState([]); // Список фильмов, отфильтрованный по запросу в инпуте с учетам тоггла "Короткометражки"
  const [visibleFoundMovies, setVisibleFoundMovies] = useState([]); // Видимый список до прожатия кнопки "Еще"
  const [cardsAmount, setCardsAmount] = useState({}); // Количество видимых карточек и карточек, которые подгрузятся

  const location = useLocation().pathname;
  const navigate = useNavigate();

  const isPageWithHeader = pagesWithHeader.includes(location);
  const isPageWithFooter = pagesWithFooter.includes(location);

  // Функция расчета количества карточек
  const calculateCardsAmount = () => {
    const pageWidth = document.documentElement.clientWidth;
    if (pageWidth > 1180) {
      setCardsAmount({ initial: 12, additional: 3, row: 3 });
      return
    }
    if (pageWidth > 720) {
      setCardsAmount({ initial: 8, additional: 2, row: 2 });
      return
    }
    setCardsAmount({ initial: 5, additional: 2, row: 1 });
  };

  const debouncedCalculateAmount = debounce(calculateCardsAmount, 200);

    useEffect(() => {
      calculateCardsAmount();
      window.addEventListener('resize', debouncedCalculateAmount);
      return () => window.removeEventListener('resize', debouncedCalculateAmount);
    }, []);

    useEffect(() => {
      let shownMovies = foundMoviesToggleFiltered.slice(0, cardsAmount.initial);
      setVisibleFoundMovies(shownMovies);
    }, [foundMoviesToggleFiltered])

    const showMoreMovies = () => {
      const sliceStart = visibleFoundMovies.length;
      const { initial, additional, row } = cardsAmount;

      const incompleteRow = (Math.abs(sliceStart - initial)) % row;
      const additionalMoviesQty = incompleteRow && (row - incompleteRow)

      const sliceEnd = sliceStart + additional + additionalMoviesQty;
      const additionalMovies = foundMovies.slice(sliceStart, sliceEnd);
      setVisibleFoundMovies([...visibleFoundMovies, ...additionalMovies]);
    }

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

  // Получение полного списка фильмов при запросе на api BeatFilms
  const getMovies = async () => {
    setIsInRequest(true);
    try {
      const movies = await moviesApi.getMovies();
      setMoviesList(movies);
      setIsInRequest(false);
      return movies
    } catch (err) {
      console.log(err);
      setIsInRequest(false);
    }
  }
  // Фильтрация фильмов по запросу с приведением к нижнему регистру для сравнения независимо от регистра ввода
  const filterMovies = (movies, query, isShortToggle) => {
    return movies.filter(({ nameRU, nameEN, duration }) => {
      const queryLowerCased = query.toLowerCase();
      const nameLowerCased = (nameRU + nameEN).toLowerCase();
      const toggle = isShortToggle ? duration <= 40 : true;
      return toggle && nameLowerCased.includes(queryLowerCased);
    })
  };

  // Поиск фильмов
  const searchMovies = async (queryText, isShortToggle) => {
    localStorage.setItem('queryText', queryText);
    localStorage.setItem('shortFilmsToggle', isShortToggle);
    let movies;
    if (moviesList.length === 0) {
      movies = await getMovies();
      sessionStorage.setItem('moviesStorage', JSON.stringify(movies));
    } else {
      movies = moviesList;
    }
    const filteredMovies = filterMovies(movies, queryText);
    setFoundMovies(filteredMovies);
    const filteredMoviesWithToggle = filterMovies(filteredMovies, queryText, isShortToggle);
    setFoundMoviesToggleFiltered(filteredMoviesWithToggle);
    localStorage.setItem('foundMovies', JSON.stringify(filteredMovies));
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
            {isPageWithHeader && <Header />}
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/signup' element={<Register onSubmit={handleRegister} />} />
              <Route path='/signin' element={<Login onSubmit={handleLogin} />} />
              <Route element={<ProtectedRoutes condition={isLoggedIn} redirectPath='/' />} >
                <Route path='/profile' element={<Profile onSubmit={changeUserInfo} onLogout={handleLogout} error={errorMessage} resultMessage={resultMessage} />} />
                <Route path='/movies'
                  element={<Movies movies={visibleFoundMovies}
                  onSearch={searchMovies}
                  isInRequest={isInRequest}
                  onShowMore={showMoreMovies}
                  moreMoviesExist={visibleFoundMovies.length === foundMoviesToggleFiltered.length}/>} />
                <Route path='/saved-movies' element={<SavedMovies />} />
              </Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
            {isPageWithFooter && <Footer />}
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
