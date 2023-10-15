import { useState, useEffect } from 'react';
import SearchPanel from '../SearchPanel/SearchPanel';
import MovieCardsList from '../MovieCardsList/MovieCardsList';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

function SavedMovies ({ movies, onDeleteMovie, onSearch, isInRequest, onToggle, savedMoviesExist, }) {
  const [shortFilmsToggle, setShortFilmsToggle] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const [value, setValue] = useState(
    localStorage.getItem('queryText') || ''
  );

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
      <MovieCardsList movies={movies} onDeleteMovie={onDeleteMovie} />
      <button type='button' className='saved-movies__load-btn'>Ещё</button>
    </main>
  );
};

export default SavedMovies;