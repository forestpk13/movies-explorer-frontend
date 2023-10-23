/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import SearchPanel from '../SearchPanel/SearchPanel';
import MovieCardsList from '../MovieCardsList/MovieCardsList';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

function Movies ({ movies, onSearch, isInRequest, isFirstSearch, onShowMore, moreMoviesExist, onToggle, onSaveMovie, onDeleteMovie }) {
  const [value, setValue] = useState(
    localStorage.getItem('queryText') || ''
  );
  const [shortFilmsToggle, setShortFilmsToggle] = useState(
    JSON.parse(localStorage.getItem('shortFilmsToggle')) || false
  );
  const [validationMessage, setValidationMessage] = useState('');

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

  useEffect(() => {
    if (value && validationMessage) {
      setValidationMessage('');
    }
  }, [value, validationMessage])

  useEffect(() => {
    localStorage.setItem('shortFilmsToggle', shortFilmsToggle)
    onToggle(value, shortFilmsToggle);
  }, [shortFilmsToggle])

  const moviesExist = movies.length > 0 ? true : false;

  return (
    <main className='movies'>
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
        <MovieCardsList
          movies={movies}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
        />}
      {(!isInRequest && moviesExist && !moreMoviesExist) &&
        <button type='button' onClick={onShowMore} className='movies__load-btn'>Ещё</button>}
      {(!isInRequest && !moviesExist) &&
        <p className='movies__search-message'>{isFirstSearch ? 'Введите запрос, чтобы найти фильмы' : 'По вашему запросу фильмов не найдено'}</p>
      }
    </main>
  );
};

export default Movies;