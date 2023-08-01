import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';
import { EMPTY_SEARCH_TEXT, FIND_NOTHING_TEXT, FIRST_SEARCH_TEXT } from '../../utills/constants';

const Movies = ({
  movies,
  onSaveMovie,
  onRemoveMovie,
  onSearch,
  inRequest,
  onLoadMore,
  hasLoadMore,
  onToggle,
  isFirstSearch,
}) => {
  const [value, setValue] = useState(
    localStorage.getItem('queryText') || ''
  );
  const [shortFilmsToggle, setShortFilmsToggle] = useState(
    JSON.parse(localStorage.getItem('shortFilmsToggle')) || false
  );
  const [validationMessage, setvalidationMessage] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const handleToggle = () => {
    setShortFilmsToggle(v => !v);
  }

  const onSubmit = () => {
    if (!value) {
      setvalidationMessage(EMPTY_SEARCH_TEXT);
    } else {
      onSearch(value, shortFilmsToggle);
    }
  }

  useEffect(() => {
    if (value && validationMessage) {
      setvalidationMessage('');
    }
  }, [value, validationMessage])

  useEffect(() => {
    localStorage.setItem('shortFilmsToggle', shortFilmsToggle)
    onToggle(value, shortFilmsToggle);
  }, [shortFilmsToggle])

  const hasMovies = movies.length;
  const preloader = inRequest ? <Preloader /> : null;
  const moviesList = !inRequest && hasMovies ? (
    <MoviesCardList
      movies={movies}
      onSaveMovie={onSaveMovie}
      onRemoveMovie={onRemoveMovie}
    />
  ) : null;
  const loadMoreBtn = !inRequest && hasMovies && !hasLoadMore ? (
    <button type='button' onClick={onLoadMore} className='movies__load-btn'>Ещё</button>
  ) : null;
  const message = isFirstSearch ? FIRST_SEARCH_TEXT : FIND_NOTHING_TEXT;
  const infoMessage = !inRequest && !hasMovies ? (
    <p className='movies__info-message'>{message}</p>
  ) : null;

  return (
    <main className='movies'>
      <SearchForm
        value={value}
        validationMessage={validationMessage}
        onChange={onChange}
        onToggle={handleToggle}
        isToggle={shortFilmsToggle}
        onSubmit={onSubmit}
        required
      />
      {preloader}
      {moviesList}
      {loadMoreBtn}
      {infoMessage}
    </main>
  );
};

export default Movies;
