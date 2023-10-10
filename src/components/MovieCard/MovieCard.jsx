import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  let location = useLocation();
  const [isSaved, setIsSaved] = useState(false)

  const normalizedDuration = useMemo(() => {
    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;
    return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }, [duration]);

  if (location.pathname === '/saved-movies') {
    type='remove'
  } else {
    type='liked'
  }

  const cardLikeButtonClassName = (
    `movie-card__action-btn${isSaved ? ` movie-card__action-btn_type_${type}`: ''}`
  );

  const onButtonClick = () => {
    setIsSaved(v => !v)
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
        className={cardLikeButtonClassName}
      />
      <span className='movie-card__duration'>{normalizedDuration}</span>
    </li>
  );
};

export default MovieCard;