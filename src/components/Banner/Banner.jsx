import './Banner.css';
import poster from '../../images/banner_image.svg'

function Banner() {
  return (
    <section className='banner'>
      <div className="banner__inner">
        <div className='banner__description-container'>
          <h1 className='banner__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className='banner__description'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <img src={poster} alt='Планета из облака тегов' className='banner__image'></img>
      </div>

    </section>
  )
};

export default Banner;
