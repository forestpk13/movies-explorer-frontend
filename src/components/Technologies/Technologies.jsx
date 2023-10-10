import SectionTitle from '../SectionTitle/SectionTitle';
import './Technologies.css';

function Technologies () {
  return (
    <section className='technologies'>
      <SectionTitle title='Технологии' />
      <div className='technologies__container'>
        <h3 className="technologies__title">7&nbsp;технологий</h3>
        <p className="technologies__description">
        На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className="technologies__list">
          <li className="technologies__list-item">HTML</li>
          <li className="technologies__list-item">CSS</li>
          <li className="technologies__list-item">JS</li>
          <li className="technologies__list-item">React</li>
          <li className="technologies__list-item">Git</li>
          <li className="technologies__list-item">Express.js</li>
          <li className="technologies__list-item">mongoDB</li>
        </ul>
      </div>
    </section>
  )
};

export default Technologies;
