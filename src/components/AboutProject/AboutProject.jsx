import SectionHeading from '../SectionHeading/SectionHeading';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className='about-project' id='about-project'>
      <div className='about-project__inner'>
        <SectionHeading title='О проекте'/>
        <ul className='about-project__articles'>
          <li className="about-project__article">
            <h3 className="about-project__article-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__article-text">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.
            </p>
          </li>
          <li className="about-project__article">
            <h3 className="about-project__article-title">
            На&nbsp;выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__article-text">
              У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <ul className="about-project__steps">
          <li className="about-project__step about-project__step_order_first">
            <h4 className="about-project__step-title about-project__step-title_order_first">1 неделя</h4>
            <p className="about-project__step-description">Back-end</p>
          </li>
          <li className="about-project__step">
            <h4 className="about-project__step-title">4 недели</h4>
            <p className="about-project__step-description">Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  )
};

export default AboutProject;
