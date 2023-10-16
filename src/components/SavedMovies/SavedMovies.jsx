import { useState, useEffect } from 'react';
import SearchPanel from '../SearchPanel/SearchPanel';
import MovieCardsList from '../MovieCardsList/MovieCardsList';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

function SavedMovies ({ movies, onDeleteMovie, onSearch, isInRequest, onToggle, savedMoviesExist, }) {
  const [shortFilmsToggle, setShortFilmsToggle] = useState(
    JSON.parse(localStorage.getItem('savedShortFilmsToggle')) || false
  );
  const [validationMessage, setValidationMessage] = useState('');

  const [value, setValue] = useState('');

  const handleToggle = () => {
    setShortFilmsToggle(v => !v);
  }

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onSubmit = () => {
    if (!value) {
      setValidationMessage('Введите название фильма');
    } else {
      onSearch(value, shortFilmsToggle);
    }
  }

  const moviesExist = movies.length > 0 ? true : false;

  useEffect(() => {
    localStorage.setItem('savedShortFilmsToggle', shortFilmsToggle);
    onToggle(value, shortFilmsToggle);
  }, [shortFilmsToggle])

  return (
    <main className='saved-movies'>
      <SearchPanel
       value={value}
       validationMessage={validationMessage}
       onChange={onChange}
       onToggle={handleToggle}
       isToggle={shortFilmsToggle}
       onSubmit={onSubmit}
       required
      />
      {isInRequest && <Preloader />}
      {!isInRequest && moviesExist &&
        <MovieCardsList movies={movies} onDeleteMovie={onDeleteMovie} />}
      {!isInRequest && !savedMoviesExist &&
        <p className='saved-movies__search-message'>{'Нет сохраненных фильмов'}</p>
      }
    </main>
  );
};

export default SavedMovies;