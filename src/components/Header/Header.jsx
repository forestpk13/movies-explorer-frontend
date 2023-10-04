/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Navbar from '../Navbar/Navbar';
import './Header.css';

function Header() {
  const currentUser = useContext(CurrentUserContext);
  let location = useLocation();
  const [isMainPageHeader, setIsMainPageHeader] = useState(false);
  const [isBurgerOpened, setIsBurgerOpened] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);

  const switchHeaderBackToBlue = () => {
    setIsMainPageHeader(true);
  };

  const switchHeaderBackToDark = () => {
    setIsMainPageHeader(false);
  }

//Функция проверки страницы, на которой находится пользователь
  const checkCurrentPage = () => {
    if(location.pathname === '/') {
      switchHeaderBackToBlue();
    } else {
      switchHeaderBackToDark();
    }
  }

  //При смене url проверяем, на какой странице находится пользователь, и выставляем нужный цвет фона
  useEffect(() => {
    checkCurrentPage();
  }, [location.pathname]);

  const openBurger = () => {
    setIsBurgerOpened(state => !state);
  };

  const closeBurger = () => {
    setIsBurgerOpened(false);
  }

  return (
    <header className={`header ${isMainPageHeader ? 'header_page_main' : ''}`}>
      <Link
        className='header__logo'
        to='/'
        title='На главную'
        />
      {currentUser &&
        <button
            className={`header__burger ${isBurgerOpened ? 'header__burger_opened' : ''}`}
            type='button'
            onClick={openBurger}
        />
      }
      {
        currentUser
          ? <Navbar isVisible={isBurgerOpened} onClose={closeBurger}/>
          : (
            <nav className='header__auth'>
              <ul className='header__auth-links'>
                <li>
                  <Link
                    className='header__auth-link'
                    to='/signup'
                  >
                    Регистрация
                  </Link>
                </li>
                <li>
                  <Link
                    className='header__auth-link header__auth-link_marked'
                    to='/signin'
                  >
                    Войти
                  </Link>
                </li>
              </ul>
            </nav>
          )
      }
    </header>
  )
};

export default Header;
