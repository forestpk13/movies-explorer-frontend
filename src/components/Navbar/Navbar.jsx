import { NavLink, Link } from 'react-router-dom';
import profileIcon from '../../images/profile_icon.svg'
import './Navbar.css';

function Navbar ({ isVisible, onClose }) {

  const setLinkClass = (navData) => navData.isActive
    ? 'navbar__link navbar__link_active'
    : 'navbar__link';

  function handleCloseByOverlay (e) {
    if (e.target.classList.contains('navbar_visible')) {
      onClose();
    }
  };

  return (
    <div className={`navbar ${isVisible ? 'navbar_visible' : ''}`} onClick={handleCloseByOverlay} >
      <nav className={`navbar__links-container ${isVisible && 'navbar__links-container_visible'}`}>
        <ul className='navbar__links'>
          <li className='navbar__links-item navbar__links-item_resolution_mobile'>
            <NavLink className={setLinkClass} to='/' onClick={onClose}>
              Главная
            </NavLink>
          </li>
          <li className='navbar__links-item'>
            <NavLink className={setLinkClass} to='/movies' onClick={onClose}>
              Фильмы
            </NavLink>
          </li>
          <li className='navbar__links-item'>
            <NavLink className={setLinkClass} to='/saved-movies' onClick={onClose}>
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
        <Link className='navbar__link navbar__link_type_profile' to='/profile' onClick={onClose}>
          Аккаунт
          <img src={profileIcon} className='navbar__profile-icon' alt='Иконка профиля'></img>
        </Link>
      </nav>
    </div>
  )
};

export default Navbar;
