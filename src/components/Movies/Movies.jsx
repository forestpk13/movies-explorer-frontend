import { useState, useEffect } from 'react';
import SearchPanel from '../SearchPanel/SearchPanel';
import MovieCardsList from '../MovieCardsList/MovieCardsList';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

function Movies ({ movies, onSearch, isInRequest, onShowMore, moreMoviesExist }) {
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

  const moviesExist = movies.length > 0 ? true : false;

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
      {isInRequest && <Preloader />}
      {!isInRequest && moviesExist &&
        <MovieCardsList
          movies={movies}
        />}
      {(!isInRequest && moviesExist && !moreMoviesExist) &&
        <button type='button' onClick={onShowMore} className='movies__load-btn'>Ещё</button>}
    </main>
  );
};

export default Movies;