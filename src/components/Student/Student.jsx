import SectionTitle from '../SectionTitle/SectionTitle';
import './Student.css';
import avatar from '../../images/photo.jpg'

function Student () {
  return (
    <section className='student'>
      <SectionTitle title='Студент' />
        <article className='student__bio'>
          <div className='student__about-container'>
            <h3 className='student__name'>Антон</h3>
            <p className='student__occupation'>Менеджер проектов, 31 год</p>
            <p className='student__description'>
              Родился и&nbsp;живу в&nbsp;г.Бердске, работаю менеджером проектов в&nbsp;сфере информационных технологий, до этого большую часть времени работал в геймдеве. У&nbsp;меня есть прекрасная жена и&nbsp;2&nbsp;собаки. Люблю посычевать дома и&nbsp;провести время с женой, но&nbsp;иногда она все-таки вытаскивает меня из&nbsp;дома, и&nbsp;я&nbsp;знакомлюсь с&nbsp;окружающим миром.
            </p>
            <a className='student__repo-link' href='https://github.com/forestpk13' target='_blank' rel='noreferrer'>
              Github
            </a>
          </div>
          <img src={avatar} alt='мой портрет' className='student__photo' />
        </article>
    </section>
  )
};

export default Student;
