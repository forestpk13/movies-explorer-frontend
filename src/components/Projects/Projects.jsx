import './Projects.css';

function Projects () {
  return (
    <section className='projects'>
      <div className='projects__container'>
        <h2 className='projects__title'>Портфолио</h2>
        <ul className='projects__list'>
          <li className='projects__list-item'>
            <a
              className='projects__link'
              href='https://github.com/forestpk13/how-to-learn'
              target='_blank'
              rel='noreferrer'
            >Статичный сайт</a>
          </li>
          <li className='projects__list-item'>
            <a
              className='projects__link'
              href='https://github.com/forestpk13/russian-travel'
              target='_blank'
              rel='noreferrer'
            >Адаптивный сайт</a>
          </li>
          <li className='projects__list-item'>
            <a
              className='projects__link'
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

export default Projects;
