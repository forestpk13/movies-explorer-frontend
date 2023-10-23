/* eslint-disable react-hooks/exhaustive-deps */
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
import Preloader from '../Preloader/Preloader';
import { debounce } from '../../utils/utils';
import {
  pagesWithHeader,
  pagesWithFooter
} from '../../utils/constants'

import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [appLoading, setAppLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null);

  // Ниже - стейты для работы с запросами
  const [errorMessage, setErrorMessage] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [isInRequest, setIsInRequest] = useState(false);
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  const [moviesList, setMoviesList] = useState([]); // Полный список, возвращаемый при запросе на api BeatFilms
  const [foundMovies, setFoundMovies] = useState([]); // Список фильмов, отфильтрованный по запросу в инпуте
  const [foundMoviesToggleFiltered, setFoundMoviesToggleFiltered] = useState([]); // Список фильмов, отфильтрованный по запросу в инпуте с учетам тоггла "Короткометражки"
  const [visibleFoundMovies, setVisibleFoundMovies] = useState([]); // Видимый список до прожатия кнопки "Еще"
  const [cardsAmount, setCardsAmount] = useState({}); // Количество видимых карточек и карточек, которые подгрузятся
  const [savedMovies, setSavedMovies] = useState([]); // Список сохраненных фильмов
  const [savedMoviesFiltered, setSavedMoviesFiltered] = useState([]); // Отфильтрованный список сохраненных фильмов

  const location = useLocation().pathname;
  const navigate = useNavigate();

  const isPageWithHeader = pagesWithHeader.includes(location);
  const isPageWithFooter = pagesWithFooter.includes(location);

  // Функция расчета количества карточек
  const calculateCardsAmount = () => {
    const pageWidth = document.documentElement.clientWidth;
    if (pageWidth > 1180) {
      setCardsAmount({ initial: 16, additional: 4, row: 4 });
      return
    }
    if (pageWidth > 900) {
      setCardsAmount({ initial: 12, additional: 3, row: 3 });
      return
    }
    if (pageWidth > 420) {
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

    // Изменяю количество карточек на начальное при каждом поиске
    useEffect(() => {
      let shownMovies = foundMoviesToggleFiltered.slice(0, cardsAmount.initial);
      setVisibleFoundMovies(shownMovies);
    }, [foundMoviesToggleFiltered])

    // Изменяю количество карточек на начальное при каждой смене cardsAmount.initial (триггерится ресайзом ширины экрана)
    useEffect(() => {
      let shownMovies = foundMoviesToggleFiltered.slice(0, cardsAmount.initial);
      setVisibleFoundMovies(shownMovies);
    }, [cardsAmount.initial])

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
    setAppLoading(true)
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
    setAppLoading(false)
  };

  useEffect(() => {
    getUser();
  }, []);

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

  // Удаляем все данные, которые сгенерил пользователь за сессию
  const deleteAllSessionData = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setIsFirstSearch(true);

    setMoviesList([]);
    setFoundMovies([]);
    setVisibleFoundMovies([]);
    setFoundMoviesToggleFiltered([]);

    setSavedMovies([]);
    setSavedMoviesFiltered([]);

    console.log(savedMoviesFiltered)
    localStorage.removeItem('queryText');
    localStorage.removeItem('shortFilmsToggle');
    localStorage.removeItem('savedShortFilmsToggle');
    localStorage.removeItem('foundMovies');
    sessionStorage.removeItem('moviesStorage');
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

  const showSavedMovies = (arr) => {
    return arr.map(movie => {
      const match = savedMovies.find(({ movieId }) => movieId === movie.movieId);
      return match ? { ...movie, type: 'liked' } : { ...movie, type: 'default' }
    });
  }

  useEffect(() => {
    if (savedMovies.length > 0) {
      showSavedMovies(visibleFoundMovies);
    }
  }, [savedMovies.length])

  // Cохраняем фильм
  const saveMovie = async (id) => {
    try {
      const movie = foundMovies.find(item => item.movieId === id);
      const savedMovie = await api.saveMovie(movie);
      setSavedMovies(movies => [...movies, savedMovie])
      setSavedMoviesFiltered(movies => [...movies, savedMovie]);
    } catch (err) {
      console.log(err);
    }
  };

  // Получаем список сохраненных фильмов
  const getSavedMovies = async () => {
    try {
      const savedMovies = await api.getSavedMovies();
      setSavedMovies(savedMovies);
      setSavedMoviesFiltered(savedMovies);
    } catch (err) {
      console.log(err);
    }
  };

  // Удаляем фильм из списка сохраненных
  const deleteMovie = async (id) => {
    try {
      const removedMovie = savedMovies.find(movie => movie.movieId === id)
      await api.removeMovie(removedMovie._id);
      setSavedMovies(movies => [...movies.filter((mov) => mov.movieId !== id)]);
      setSavedMoviesFiltered(movies => [...movies.filter((mov) => mov.movieId !== id)])
    } catch (err) {
      console.log(err);
    }
  }

  // Восстанавливаем данные поиска при загрузке приложения
  useEffect(() => {
    const savedSearch = localStorage.getItem('foundMovies');
    if (savedSearch) {
      const parsedData = JSON.parse(savedSearch);
      setFoundMovies(parsedData);
    }
  }, []);

  // Сохраняем фильмы в хранилище сессии для их восстановления при перезагрузке страницы
  useEffect(() => {
    const initialStorage = sessionStorage.getItem('moviesStorage');
    if (initialStorage) {
      const parsedData = JSON.parse(initialStorage);
      setMoviesList(parsedData);
    }
  }, [])

  // Получаем список сохраненных фильмов
  useEffect(() => {
    if (isLoggedIn) {
      getSavedMovies();
    }
  }, [isLoggedIn])

  // Фильтрация фильмов по запросу с приведением к нижнему регистру для сравнения независимо от регистра ввода
  const filterMovies = (movies, query, isShortToggle) => {
    return movies.filter(({ nameRU, nameEN, duration }) => {
      const queryLowerCased = query.toLowerCase();
      const nameLowerCased = (nameRU + nameEN).toLowerCase();
      const toggle = isShortToggle ? duration <= 40 : true;
      return toggle && nameLowerCased.includes(queryLowerCased);
    })
  };

  // По заданию требуется, чтобы фильтрация по тогглу была идентична алгоритму при сабмите, поэтому просто вызываю функциии, которые используются при сабмите
  const filterMoviesByToggle = (query, isShortToggle) => {
    searchMovies(query, isShortToggle);
  };

  const filterSavedMoviesByToggle = (query, isShortToggle) => {
    searchSavedMovies(query, isShortToggle);
  };

  // Поиск фильмов
  const searchMovies = async (query, isShortToggle) => {
    setIsFirstSearch(false);
    localStorage.setItem('queryText', query);
    localStorage.setItem('shortFilmsToggle', isShortToggle);
    let movies;
    if (moviesList.length === 0) {
      movies = await getMovies();
      sessionStorage.setItem('moviesStorage', JSON.stringify(movies));
    } else {
      movies = moviesList;
    }
    const filteredMovies = filterMovies(movies, query);
    setFoundMovies(filteredMovies);
    const filteredMoviesWithToggle = filterMovies(filteredMovies, query, isShortToggle);
    setFoundMoviesToggleFiltered(filteredMoviesWithToggle);
    localStorage.setItem('foundMovies', JSON.stringify(filteredMovies));
  }

  // Поиск cохраненных фильмов. Согласно заданию: Сохранять данные поиска на странице «Сохранённые фильмы» в localStorage не требуется. При переходе пользователя на страницу сохранённых фильмов ему должны быть отображены все его фильмы.
  const searchSavedMovies = (query, isShortToggle) => {
    localStorage.setItem('savedShortFilmsToggle', isShortToggle);
    const filteredMovies = filterMovies(savedMovies, query, isShortToggle);
    setSavedMoviesFiltered(filteredMovies);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {appLoading ? <Preloader/> : (
          <>
         {isPageWithHeader && <Header />}
         <Routes>
           <Route path='/' element={<Landing />} />
           <Route path='/signup' element={<Register onSubmit={handleRegister} currentUser={currentUser}/>} />
           <Route path='/signin' element={<Login onSubmit={handleLogin} currentUser={currentUser} />} />
           <Route element={<ProtectedRoutes condition={isLoggedIn}/>} >
             {console.log(isLoggedIn)}
             <Route path='/profile' element={<Profile onSubmit={changeUserInfo} onLogout={handleLogout} error={errorMessage} resultMessage={resultMessage} />} />
             <Route path='/movies'
               element={<Movies movies={showSavedMovies(visibleFoundMovies)}
                 onSearch={searchMovies}
                 isInRequest={isInRequest}
                 isFirstSearch={isFirstSearch}
                 onShowMore={showMoreMovies}
                 onToggle={filterMoviesByToggle}
                 onSaveMovie={saveMovie}
                 onDeleteMovie={deleteMovie}
                 moreMoviesExist={visibleFoundMovies.length === foundMoviesToggleFiltered.length}/>} />
             <Route path='/saved-movies'
               element={<SavedMovies
                 movies={savedMoviesFiltered.map(movie => ({ ...movie, type: 'remove' }))}
                 onDeleteMovie={deleteMovie}
                 onSearch={searchSavedMovies}
                 isInRequest={isInRequest}
                 onToggle={filterSavedMoviesByToggle}
                 savedMoviesExist={savedMovies.length} />} />
           </Route>
           <Route path='*' element={<PageNotFound />} />
         </Routes>
         {isPageWithFooter && <Footer />}
         </>
        )}
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
