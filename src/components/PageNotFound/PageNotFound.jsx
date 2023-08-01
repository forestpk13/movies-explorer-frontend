import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <main className='page-not-found'>
      <div className='page-not-found__banner'>
        <h1 className='page-not-found__title'>404</h1>
        <p className='page-not-found__title-message'>Страница не найдена</p>
      </div>
      <button
        type='button'
        className='page-not-found__back-link'
        onClick={() => navigate(-1)}
      >
        Назад
      </button>
    </main>
  );
}

export default PageNotFound;
