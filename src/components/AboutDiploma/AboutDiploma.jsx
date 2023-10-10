import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutDiploma.css';

function AboutDiploma() {
  return (
    <section className='about-diploma' id='about-diploma'>
      <SectionTitle title='О проекте'/>
      <div className='about-diploma__inner'>
        <ul className='about-diploma__articles'>
          <li className="about-diploma__article">
            <h3 className="about-diploma__article-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-diploma__article-text">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.
            </p>
          </li>
          <li className="about-diploma__article">
            <h3 className="about-diploma__article-title">
            На&nbsp;выполнение диплома ушло 5 недель
            </h3>
            <p className="about-diploma__article-text">
              У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <ul className="about-diploma__milestones">
          <li className="about-diploma__milestone ">
            <h4 className="about-diploma__milestone-title">1 неделя</h4>
            <p className="about-diploma__milestone-description">Back-end</p>
          </li>
          <li className="about-diploma__milestone about-diploma__milestone_stage_last">
            <h4 className="about-diploma__milestone-title about-diploma__milestone-title_stage_last">4 недели</h4>
            <p className="about-diploma__milestone-description">Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  )
};

export default AboutDiploma;
