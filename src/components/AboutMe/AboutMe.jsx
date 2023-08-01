import SectionHeading from '../SectionHeading/SectionHeading';
import './AboutMe.css';
import avatar from '../../images/photo.jpg'

const AboutMe = () => {
  return (
    <section className='about-me'>
      <div className='about-me__inner'>
        <SectionHeading title='Студент' />
        <article className='about-me__bio'>
          <div className='about-me__bio-text-wrapper'>
            <h3 className='about-me__name'>Антон</h3>
            <p className='about-me__profession'>Менеджер проектов, 31 год</p>
            <p className='about-me__text'>
              Родился и&nbsp;живу в&nbsp;г.Бердске, работаю менеджером проектов в&nbsp;сфере информационных технологий, до этого большую часть времени работал в геймдеве. У&nbsp;меня есть прекрасная жена и&nbsp;2&nbsp;собаки. Люблю посычевать дома и&nbsp;провести время с женой, но&nbsp;иногда она все-таки вытаскивает меня из&nbsp;дома, и&nbsp;я&nbsp;знакомлюсь с&nbsp;окружающим миром.
            </p>
          </div>
            <a className='about-me__link' href='https://github.com/forestpk13' target='_blank' rel='noreferrer'>
              Github
            </a>
          <img src={avatar} alt='мой портрет' className='about-me__photo' />
        </article>
      </div>
    </section>
  )
};

export default AboutMe;
