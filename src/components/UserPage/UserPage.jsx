import { Link } from 'react-router-dom';
import './UserPage.css'

function UserPage({
  children,
  texts,
  page,
  route,
  onLogout
}) {
  let isProfilePage = page === 'profile' ? true : false;

  return (
    <div className={`user-page ${isProfilePage ? 'user-page_page_profile': ''}`}>
      {!isProfilePage && <Link className='user-page__logo' to='/' />}
      <h1 className={`user-page__heading ${isProfilePage && 'user-page__heading_page_profile'}`}>{texts.heading}</h1>
      {children}
      <div className='user-page__caption'>
          {!isProfilePage && <p className='user-page__caption-text '>{texts.caption}</p>}
          <Link className={`user-page__link ${isProfilePage ? 'user-page__link_page_profile' : ''}`} onClick={isProfilePage && onLogout} to={route}>{texts.buttonText}</Link>
      </div>
    </div>
  );
}

export default UserPage;