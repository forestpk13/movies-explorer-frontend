import './Promo.css';

const Promo = () => {
  return (
    <section className='promo'>
      <div className='promo__inner'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <div className='promo__nav-bar'>
            <a className='promo__nav-tab' href='#about-project'>О проекте</a>
            <a className='promo__nav-tab' href='#about-project'>Технологии</a>
            <a className='promo__nav-tab' href='#about-project'>Студент</a>
          </div>
      </div>
    </section>
  )
};

export default Promo;
