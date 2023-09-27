import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  let location = useLocation();
  const [isMainPageHeader, setIsMainPageHeader] = useState(false);

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

  //При смене url, на какой странице находится пользователь, и выставляем нужный цвет фона
  useEffect(() => {
    checkCurrentPage();
  }, [location.pathname]);


  return (
    <header className={`header' ${isMainPageHeader ? 'header_page_main' : ''}`}>
      <Link
        className='header__logo'
        to='/'
        title='На главную'
        />
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
    </header>
  )
};

export default Header;