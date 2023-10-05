import { Link } from 'react-router-dom';
import './UserPage.css'

function UserPage({
  children,
  texts
}) {
  return (
    <div className='user-page'>
      <Link className='user-page__logo' to='/' />
      <h1 className='user-page__heading'>{texts.heading}</h1>
      {children}
      <div className='user-page__caption'>
          <p className='user-page__caption-text'>{texts.caption}</p>
          <Link className='user-page__link' to={'/signin'}>{texts.buttonText}</Link>
      </div>
    </div>
  );
}

export default UserPage;