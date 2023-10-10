import { useState, useEffect } from 'react';
import SearchPanel from '../SearchPanel/SearchPanel';
import MovieCardsList from '../MovieCardsList/MovieCardsList';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

function Movies () {
  const [shortFilmsToggle, setShortFilmsToggle] = useState(false);

  const handleToggle = () => {
    setShortFilmsToggle(v => !v);
  }

  return (
    <main className='movies'>
      <SearchPanel
       onToggle={handleToggle}
       isToggle={shortFilmsToggle}
      />
      <MovieCardsList />
      <button type='button' className='movies__load-btn'>Ещё</button>
    </main>
  );
};

export default Movies;