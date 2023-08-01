import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__info'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__columns'>
        <p className='footer__column footer__column_content_copyright'>&#xa9; 2023</p>
        <nav className='footer__column footer__column_content_nav-links'>
          <ul className='footer__links'>
            <li className='footer__link-item'>
              <a className='footer__link' href='https://praktikum.yandex.ru/' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
            </li>
            <li className='footer__link-item'>
              <a className='footer__link' href='https://github.com/forestpk13' target='_blank' rel='noreferrer'>Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
};

export default Footer;
