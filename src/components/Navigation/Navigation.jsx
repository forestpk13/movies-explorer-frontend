import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ visible, onClose }) => {

  const setLinkClass = (navData) => navData.isActive
    ? 'navigation__link navigation__link_active'
    : 'navigation__link';

  function handleCloseByOverlay (e) {
    if (e.target.classList.contains('navigation_visible')) {
      onClose();
    }
  };

  return (
    <div className={`navigation ${visible && 'navigation_visible'}`} onClick={handleCloseByOverlay} >
      <nav className={`navigation__inner ${visible && 'navigation__inner_visible'}`}>
        <ul className='navigation__links'>
          <li className='navigation__links-item navigation__links-item_type_only-mobile'>
            <NavLink className={setLinkClass} to='/' onClick={onClose}>
              Главная
            </NavLink>
          </li>
          <li className='navigation__links-item'>
            <NavLink className={setLinkClass} to='/movies' onClick={onClose}>
              Фильмы
            </NavLink>
          </li>
          <li className='navigation__links-item'>
            <NavLink className={setLinkClass} to='/saved-movies' onClick={onClose}>
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
        <Link className='navigation__link navigation__link_type_only-desktop' to='/profile' onClick={onClose}>
          Аккаунт
        </Link>
      </nav>
    </div>
  )
};

export default Navigation;
