import { useMemo } from 'react';
import './MovieCard.css';

function MovieCard ({
  title,
  duration,
  imageSource,
  trailerLink,
  onSaveMovie,
  onRemoveMovie,
  type = 'default',
}) {
  const normalizedDuration = useMemo(() => {
    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;
    return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }, [duration]);

  const onButtonClick = () => {
    switch (type) {
      case 'liked':
      case 'remove':
        break;
      case 'default':
        break;
      default:
        throw new Error('Тип кнопки не задан')
    }
  }

  return (
    <li className='movie-card'>
      <a className='movie-card__poster-container' href={trailerLink} target='_blank' rel='noreferrer'>
        <img className='movie-card__poster' src={imageSource} alt={title} />
      </a>
      <h3 className='movie-card__title'>{title}</h3>
      <button
        type='button'
        onClick={onButtonClick}
        className={`movie-card__action-btn movie-card__action-btn_type_${type}`}
      />
      <span className='movie-card__duration'>{normalizedDuration}</span>
    </li>
  );
};

export default MovieCard;