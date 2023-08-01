import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <div className='portfolio__inner'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__projects'>
          <li className='portfolio__project'>
            <a
              className='portfolio__project-link'
              href='https://github.com/forestpk13/how-to-learn'
              target='_blank'
              rel='noreferrer'
            >Статичный сайт</a>
          </li>
          <li className='portfolio__project'>
            <a
              className='portfolio__project-link'
              href='https://github.com/forestpk13/russian-travel'
              target='_blank'
              rel='noreferrer'
            >Адаптивный сайт</a>
          </li>
          <li className='portfolio__project'>
            <a
              className='portfolio__project-link'
              href='https://github.com/forestpk13/react-mesto-api-full-gha'
              target='_blank'
              rel='noreferrer'
            >Одностраничное приложение</a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Portfolio;
