import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Landing from '../Landing/Landing';
import Header from '../Header/Header';

import './App.css';

function App() {
  return (
      <div className="page">
          <>
            <Header/>
            <Routes>
              <Route path='/' element={<Landing />} />
            </Routes>
          </>
      </div>
  );
}

export default App;
