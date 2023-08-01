import SectionHeading from '../SectionHeading/SectionHeading';
import './Techs.css';

const Techs = () => {
  return (
    <section className='techs'>
      <div className='techs__inner'>
        <SectionHeading title='Технологии' />
        <h3 className="techs__title">7&nbsp;технологий</h3>
        <p className="techs__description">
        На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.
        </p>
        <ul className="techs__techs-list">
          <li className="techs__techs-list-item">HTML</li>
          <li className="techs__techs-list-item">CSS</li>
          <li className="techs__techs-list-item">JS</li>
          <li className="techs__techs-list-item">React</li>
          <li className="techs__techs-list-item">Git</li>
          <li className="techs__techs-list-item">Express.js</li>
          <li className="techs__techs-list-item">mongoDB</li>
        </ul>
      </div>
    </section>
  )
};

export default Techs;
