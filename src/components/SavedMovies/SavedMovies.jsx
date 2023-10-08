import { useState, useEffect } from 'react';
import SearchPanel from '../SearchPanel/SearchPanel';
import MovieCardsList from '../MovieCardsList/MovieCardsList';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

function SavedMovies () {
  const [shortFilmsToggle, setShortFilmsToggle] = useState(false);

  const handleToggle = () => {
    setShortFilmsToggle(v => !v);
  }

  return (
    <main className='saved-movies'>
      <SearchPanel
       onToggle={handleToggle}
       isToggle={shortFilmsToggle}
      />
      <MovieCardsList />
      <button type='button' className='saved-movies__load-btn'>Ещё</button>
    </main>
  );
};

export default SavedMovies;