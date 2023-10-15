import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MovieCard.css';

function MovieCard ({
  movieId,
  title,
  duration,
  imageSource,
  trailerLink,
  onSaveMovie,
  onDeleteMovie,
  type = 'default',
}) {

  const normalizedDuration = useMemo(() => {
    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;
    return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }, [duration]);

  const handleSave = (id) => {
    onSaveMovie(id)
  }

  const handleDelete = (id) => {
    onDeleteMovie(id)
  }

 let cardState = type;
 let cardClassName = `movie-card__action-btn movie-card__action-btn_type_${cardState}`

  const onButtonClick = () => {
    if (cardState === 'liked' || cardState === 'remove') {
      handleDelete(movieId);
      cardState = 'default';
    } else {
      handleSave(movieId);
      cardState = 'liked';
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
        className={cardClassName}
      />
      <span className='movie-card__duration'>{normalizedDuration}</span>
    </li>
  );
};

export default MovieCard;