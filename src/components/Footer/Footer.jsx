import './Footer.css';

function Footer () {
  return (
    <footer className='footer'>
      <p className='footer__description'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__credits'>
        <p className='footer__credit footer__credit_content_copyright'>&#xa9; 2023</p>
        <nav className='footer__credit footer__credit_content_links'>
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