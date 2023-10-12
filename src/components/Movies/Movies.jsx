import { useState, useEffect } from 'react';
import SearchPanel from '../SearchPanel/SearchPanel';
import MovieCardsList from '../MovieCardsList/MovieCardsList';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

function Movies ({ movies, onSearch, isInRequest }) {
  const [value, setValue] = useState(
    localStorage.getItem('queryText') || ''
  );
  const [shortFilmsToggle, setShortFilmsToggle] = useState(
    JSON.parse(localStorage.getItem('shortFilmsToggle')) || false
  );
  const [validateMessage, setValidateMessage] = useState('');

  const handleToggle = () => {
    setShortFilmsToggle(v => !v);
  }

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onSubmit = () => {
    if (!value) {
      setValidateMessage('Отсутствует текст запроса');
    } else {
      onSearch(value, shortFilmsToggle);
    }
  }
  console.log(isInRequest);
  const moviesExist = movies.length;
  const preloader = isInRequest ? <Preloader /> : null;
  const moviesList = !isInRequest && moviesExist ? (
    <MovieCardsList
      movies={movies}
    />
  ) : null;

  return (
    <main className='movies'>
      <SearchPanel
       value={value}
       validateMessage={validateMessage}
       onChange={onChange}
       onToggle={handleToggle}
       isToggle={shortFilmsToggle}
       onSubmit={onSubmit}
       required
      />
      {preloader}
      {moviesList}
      <button type='button' className='movies__load-btn'>Ещё</button>
    </main>
  );
};

export default Movies;