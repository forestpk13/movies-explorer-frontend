import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ConditionalRoutes from '../ConditionalRoutes/CoditionalRoutes';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Landing from '../Landing/Landing';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utills/MainApi';
import moviesApi from '../../utills/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { debounce } from '../../utills/utills';
import {
  headerPages,
  footerPages,
  DESKTOP_SCREEN_BREAKPOINT,
  TABLET_SCREEN_BREAKPOINT,
  DESKTOP_CARDS_QTY,
  TABLET_CARDS_QTY,
  MOBILE_CARDS_QTY,
  SUCCESS_EDIT_PROFILE_TEXT,
  UNAUTHORIZED_ERROR_CODE,
  TOKEN_MISSMATCH_TEXT,
} from '../../utills/constants';
import './App.css';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  // для системных сообщений в попапе
  const [popupErrorMessage, setPopupErrorMessage] = useState('');
  const [popupErrorOpen, setPopupErrorOpen] = useState(false);

  // для показа приветственного сообщения в Movies
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  // стейт для скрытия прелоадером процесса аутентификации
  const [appLoading, setAppLoading] = useState(true);
  // общий список фильмов от beatFilms
  const [moviesStore, setMoviesStore] = useState([]);
  // отфильтрованный список beatFilms
  const [findedMovies, setFindedMovies] = useState([]);
  // список с учетом положения тоггла
  const [findedMoviesFilteredByToggle, setFindedMoviesFilteredByToggle] = useState([]);
  // обрезанный отфильтрованный список beatFilms
  const [shownFindedMovies, setShownFindedMovies] = useState([]);

  // сохраненные фильмы с mainApi
  const [savedMovies, setSavedMovies] = useState([]);
  // отфильтрованные фильмы с mainApi
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  // блокирование кнопок в момент запроса
  const [inRequest, setInRequest] = useState(false);
  // текст ошибки, возвращенный сервером
  const [serverError, setServerError] = useState('');
  // текст сообщения при успешном выполнении операции сервером
  const [infoMessage, setInfoMessage] = useState('');

  const location = useLocation().pathname;
  const navigate = useNavigate();

  const isPageWithHeader = headerPages.includes(location);
  const isPageWithFooter = footerPages.includes(location);

  // кол-во отображаемых и догружаемых по кнопке карточек
  const [cardsQty, setCardsQty] = useState({});

  // расчет кол-ва отображаемых и подгружаемых карточек на основании ширины страницы
  const calculateCardsQty = () => {
    const pageWidth = document.documentElement.clientWidth;
    if (pageWidth > DESKTOP_SCREEN_BREAKPOINT) {
      setCardsQty(DESKTOP_CARDS_QTY);
      return
    }
    if (pageWidth > TABLET_SCREEN_BREAKPOINT) {
      setCardsQty(TABLET_CARDS_QTY);
      return
    }
    setCardsQty(MOBILE_CARDS_QTY);
  };

  // то же, с отложенным исполнением
  const debouncedCalculateQty = debounce(calculateCardsQty, 200);

  // расчет кол-ва карточек при монтировании и каждом resize
  useEffect(() => {
    calculateCardsQty();
    window.addEventListener('resize', debouncedCalculateQty);
    return () => window.removeEventListener('resize', debouncedCalculateQty);
  }, []);

  // изменение начального кол-ва карточек при новом поиске
  useEffect(() => {
    let shownMovies = findedMoviesFilteredByToggle.slice(0, cardsQty.initial);
    setShownFindedMovies(shownMovies);
  }, [findedMoviesFilteredByToggle])

  const loadMoreMovies = () => {
    const sliceStart = shownFindedMovies.length;
    const { initial, additional, row } = cardsQty;

    // догружаю больше карточек, если из-за ресайза образовались "пустоты"
    const incompleteRow = (Math.abs(sliceStart - initial)) % row;
    const additionalMoviesQty = incompleteRow && (row - incompleteRow)

    const sliceEnd = sliceStart + additional + additionalMoviesQty;
    const additionalMovies = findedMovies.slice(sliceStart, sliceEnd);
    setShownFindedMovies([...shownFindedMovies, ...additionalMovies]);
  }

  // получение фильмов с beatfilms
  const getBeatfilmMovies = async () => {
    setInRequest(true)
    try {
      const movies = await moviesApi.getFilms();
      setMoviesStore(movies)
      setInRequest(false);
      return movies;
    } catch (err) {
      console.log(err)
      setInRequest(false);
    }
  }

  // добавление в массив поля с типом фильма (лайкнут или нет)
  const showLikedMovies = (arr) => {
    return arr.map(movie => {
      const match = savedMovies.find(({ movieId }) => movieId === movie.movieId);
      return match ? { ...movie, type: 'liked' } : { ...movie, type: 'default' }
    });
  }

  // перерисовка карточек при лайке / дизлайке
  useEffect(() => {
    if (savedMovies.length > 0) {
      showLikedMovies(shownFindedMovies);
    }
  }, [savedMovies.length])

  // фильтрация фильмов по строке поиска и чекбоксу
  const filterMovies = (movies, queryText, isShortFilmToggle) => {
    return movies.filter(({ nameRU, nameEN, duration }) => {
      const textToMatch = (nameRU + nameEN).toLowerCase();
      const normalizedQuery = queryText.toLowerCase();

      const toggle = isShortFilmToggle ? duration <= 40 : true;
      return toggle && textToMatch.includes(normalizedQuery);
    })
  };

  // фильтрация фильмов при изменении переключателя в Movies
  const handleToggleMovies = (queryText, isShortFilmToggle) => {
    if (findedMovies.length === 0) return;
    const filteredMovies = filterMovies(findedMovies, queryText, isShortFilmToggle);
    setFindedMoviesFilteredByToggle(filteredMovies);
  };

  // фильтрация фильмов при изменении переключателя в SavedMovies
  const handleToggleSavedMovies = (queryText, isShortFilmToggle) => {
    if (savedMovies.length === 0) return;
    const filteredMovies = filterMovies(savedMovies, queryText, isShortFilmToggle);
    setFilteredSavedMovies(filteredMovies);
  };

  // поиск по сохраненным фильмам (предварительно загруженным с mainApi)
  const searchSavedMovies = (queryText, isShortFilmToggle) => {
    const filteredMovies = filterMovies(savedMovies, queryText, isShortFilmToggle);
    setFilteredSavedMovies(filteredMovies);
  }

  // поиск фильмов в данных beatfilms
  const searchMovies = async (queryText, isShortFilmToggle) => {
    setIsFirstSearch(false);
    localStorage.setItem('queryText', queryText);
    localStorage.setItem('shortFilmsToggle', isShortFilmToggle);
    let movies;
    if (moviesStore.length === 0) {
      movies = await getBeatfilmMovies();
      sessionStorage.setItem('moviesStorage', JSON.stringify(movies));
    } else {
      movies = moviesStore;
    }
    const filteredMovies = filterMovies(movies, queryText);
    setFindedMovies(filteredMovies);
    const filteredMoviesWithToggle = filterMovies(filteredMovies, queryText, isShortFilmToggle);
    setFindedMoviesFilteredByToggle(filteredMoviesWithToggle);
    localStorage.setItem('findedMovies', JSON.stringify(filteredMovies));
  }

  // восстановление данных последнего поиска и при монтировании

  useEffect(() => {
    const savedSearch = localStorage.getItem('findedMovies');
    if (savedSearch) {
      const parsedData = JSON.parse(savedSearch);
      setFindedMovies(parsedData);
    }
  }, []);

  // хранение фильмов в sessionStorage для восстановления хранилища при релоаде страницы

  useEffect(() => {
    const initialStorage = sessionStorage.getItem('moviesStorage');
    if (initialStorage) {
      const parsedData = JSON.parse(initialStorage);
      setMoviesStore(parsedData);
    }
  }, [])

  const handleRegister = async ({ name, email, password }) => {
    setInRequest(true);
    try {
      await mainApi.register(JSON.stringify({ name, email, password }))
      const user = await mainApi.login(JSON.stringify({ email, password }))
      setLoggedIn(true);
      setCurrentUser(user)
      navigate('/movies');
    } catch (err) {
      setServerError(err.message)
      setTimeout(() => setServerError(''), 3000)
    }
    setInRequest(false);
  }

  const handleLogin = async (userData) => {
    setInRequest(true);
    try {
      const user = await mainApi.login(JSON.stringify(userData))
      setLoggedIn(true);
      setCurrentUser(user);
      navigate('/movies');
    } catch (err) {
      setServerError(err.message)
      //показываю ошибку 3 секунды
      setTimeout(() => setServerError(''), 3000)
    }
    setInRequest(false);
  }


  // аутентификация при монтировании приложения
  const getUser = async () => {
    try {
      const user = await mainApi.getOwnProfile()
      if (user.email) {
        setLoggedIn(true);
        setCurrentUser(user);
      }
    } catch (err) {
      setServerError(err.message);
      setTimeout(() => setServerError(''), 3000);
    }
    setAppLoading(false);
  };

  // аутентификация при монтировании приложения
  useEffect(() => {
    getUser();
  }, []);

  // завершение сеанса пользователя
  const clearSession = () => {
    setLoggedIn(false);
    setCurrentUser(null);
    setIsFirstSearch(true);

    setMoviesStore([]);
    setFindedMovies([]);
    setShownFindedMovies([]);
    setFindedMoviesFilteredByToggle([]);

    setSavedMovies([]);
    setFilteredSavedMovies([])

    localStorage.removeItem('queryText');
    localStorage.removeItem('shortFilmsToggle');
    localStorage.removeItem('savedShortFilmsToggle');
    localStorage.removeItem('findedMovies');
    sessionStorage.removeItem('moviesStorage');

    navigate('/');
  }

  // выход из профиля, очистка стейтов и localStorage
  const handleLogout = async () => {
    try {
      await mainApi.logout();
      clearSession();
    } catch (err) {
      console.log(err.message);
    }
  };

  // универсальная обработка ошибкок для запросов
  const handleRequestError = (err) => {
    if (err.status === UNAUTHORIZED_ERROR_CODE) {
      clearSession();
      setPopupErrorOpen(true);
      setPopupErrorMessage(TOKEN_MISSMATCH_TEXT);
      console.log(TOKEN_MISSMATCH_TEXT);
      setTimeout(() => setPopupErrorOpen(false), 3000)
      // разное время таймаутов для анимации плавного закрытия
      setTimeout(() => setPopupErrorMessage(''), 4000)
    }
    setServerError(err.message);
    //показываю ошибку 3 секунды
    setTimeout(() => setServerError(''), 3000)
  };

  // обновление профиля
  const updateUserInfo = async (userData) => {
    setInRequest(true);
    try {
      const user = await mainApi.updateOwnProfile(JSON.stringify(userData))
      setCurrentUser(user);
      setInfoMessage(SUCCESS_EDIT_PROFILE_TEXT);
      //показываю ошибку 3 секунды
      setTimeout(() => setInfoMessage(''), 3000)
    } catch (err) {
      handleRequestError(err);
    }
    setInRequest(false);
  }

  // получение фильмов пользователя с mainApi
  const geSavedMovies = async () => {
    try {
      const savedMovies = await mainApi.getSavedMovies();
      setSavedMovies(savedMovies);
      setFilteredSavedMovies(savedMovies);
    } catch (err) {
      handleRequestError(err);
    }
  };

  // сохранение фильма на mainApi
  const saveMovie = async (id) => {
    try {
      const movie = findedMovies.find(item => item.movieId === id);
      const savedMovie = await mainApi.saveMovie(movie);
      setSavedMovies(movies => [...movies, savedMovie])
      setFilteredSavedMovies(movies => [...movies, savedMovie]);
    } catch (err) {
      handleRequestError(err);
    }
  };

  // удаление фильма с mainApi
  const removeMovie = async (id) => {
    try {
      const removedMovie = savedMovies.find(movie => movie.movieId === id)
      await mainApi.removeMovie(removedMovie._id);
      setSavedMovies(movies => [...movies.filter((mov) => mov.movieId !== id)]);
      setFilteredSavedMovies(movies => [...movies.filter((mov) => mov.movieId !== id)])
    } catch (err) {
      handleRequestError(err);
    }
  }

  // получение фильмов пользователя при монтировании
  useEffect(() => {
    if (loggedIn) {
      geSavedMovies();
    }
  }, [loggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {appLoading ? <Preloader /> : (
          <>
            {isPageWithHeader && <Header />}
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route element={<ConditionalRoutes condition={!loggedIn} redirectPath='/movies' />}>
                <Route
                  path='/signin'
                  element={
                    <Login
                      onSubmit={handleLogin}
                      error={serverError}
                      inLoading={inRequest}
                    />}
                />
                <Route
                  path='/signup'
                  element={
                    <Register
                      onSubmit={handleRegister}
                      error={serverError}
                      inLoading={inRequest}
                    />
                  }
                />
                </Route>
                <Route element={<ConditionalRoutes condition={loggedIn} redirectPath='/' />} >
                <Route
                  path='/profile'
                  element={
                    <Profile
                      onSubmit={updateUserInfo}
                      onLogout={handleLogout}
                      error={serverError}
                      inLoading={inRequest}
                      infoMessage={infoMessage}
                    />
                  }
                />
                <Route
                  path='/movies'
                  element={
                    <Movies
                      movies={showLikedMovies(shownFindedMovies)}
                      onSaveMovie={saveMovie}
                      onRemoveMovie={removeMovie}
                      onSearch={searchMovies}
                      inRequest={inRequest}
                      onLoadMore={loadMoreMovies}
                      hasLoadMore={shownFindedMovies.length === findedMoviesFilteredByToggle.length}
                      onToggle={handleToggleMovies}
                      isFirstSearch={isFirstSearch}
                    />
                  }
                />
                <Route
                  path='/saved-movies'
                  element={
                    <SavedMovies
                      movies={filteredSavedMovies.map(movie => ({ ...movie, type: 'remove' }))}
                      onRemoveMovie={removeMovie}
                      onSearch={searchSavedMovies}
                      inRequest={inRequest}
                      onToggle={handleToggleSavedMovies}
                      hasSavedFilms={savedMovies.length}
                    />
                  }
                />
                <Route path='*' element={<PageNotFound />} />
              </Route>
            </Routes>
            {isPageWithFooter && <Footer />}
            <div className={`error-popup ${popupErrorOpen && 'error-popup_visible'}`}>
              {popupErrorMessage}
            </div>
          </>
        )}
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
