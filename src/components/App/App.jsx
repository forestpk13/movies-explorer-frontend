import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import {
  pagesWithHeader,
  pagesWithFooter
} from '../../utils/constants'

import './App.css';

function App() {
  const location = useLocation().pathname;

  const isPageWithHeader = pagesWithHeader.includes(location);
  const isPageWithFooter = pagesWithFooter.includes(location);

  return (
      <div className="page">
          <>
            {isPageWithHeader && <Header />}
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/signup' element={<Register />} />
              <Route path='/signin' element={<Login />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
            {isPageWithFooter && <Footer />}
          </>
      </div>
  );
}

export default App;
