import { useState, useEffect } from 'react';
import SearchPanel from '../SearchPanel/SearchPanel';
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
    </main>
  );
};

export default Movies;