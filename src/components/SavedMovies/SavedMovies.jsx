import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';
import { FIND_NOTHING_TEXT, NO_SAVED_FILMS_TEXT } from '../../utills/constants';

const SavedMovies = ({
  movies,
  onRemoveMovie,
  onSearch,
  inRequest,
  onToggle,
  hasSavedFilms,
}) => {
  const [value, setValue] = useState('');
  const [shortFilmsToggle, setShortFilmsToggle] = useState(
    JSON.parse(localStorage.getItem('savedShortFilmsToggle')) || false
  );

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onSubmit = () => {
    onSearch(value, shortFilmsToggle);
  }

  const handleToggle = () => {
    localStorage.setItem('savedShortFilmsToggle', shortFilmsToggle)
    setShortFilmsToggle(v => !v);
  }

  // фильтрация фильмов при изменении переключателя
  useEffect(() => {
    localStorage.setItem('savedShortFilmsToggle', shortFilmsToggle);
    onToggle(value, shortFilmsToggle);
  }, [shortFilmsToggle])


  const hasMovies = movies.length;
  const preloader = inRequest ? <Preloader /> : null;
  const moviesList = !inRequest && hasMovies ? (
    <MoviesCardList
      movies={movies}
      onRemoveMovie={onRemoveMovie}
    />
  ) : null;
  const message = hasSavedFilms ? FIND_NOTHING_TEXT : NO_SAVED_FILMS_TEXT;
  const infoMessage = !inRequest && !hasMovies ? (
    <p className='saved-movies__info-message'>{message}</p>
  ) : null;

  return (
    <main className='saved-movies'>
      <SearchForm
        onSubmit={onSubmit}
        value={value}
        onChange={onChange}
        onToggle={handleToggle}
        isToggle={shortFilmsToggle}
      />
      {preloader}
      {moviesList}
      {infoMessage}
    </main>
  );
};

export default SavedMovies;
