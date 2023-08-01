import { useState } from 'react';
import { useMemo } from 'react';
import './MoviesCard.css';

const MoviesCard = ({
  movieId,
  title,
  duration,
  imageSource,
  trailerLink,
  onSaveMovie,
  onRemoveMovie,
  type = 'default',
}) => {

  const normalizedDuration = useMemo(() => {
    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;
    return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }, [duration]);

  const handleSave = (id) => {
    onSaveMovie(id)
  }

  const handleRemove = (id) => {
    onRemoveMovie(id)
  }

  const onButtonClick = () => {
    switch (type) {
      case 'liked':
      case 'remove':
        handleRemove(movieId);
        break;
      case 'default':
        handleSave(movieId);
        break;
      default:
        throw new Error('Тип кнопки не задан')
    }
  }

  return (
    <li className='movies-card'>
      <h3 className='movies-card__title'>{title}</h3>
      <span className='movies-card__duration'>{normalizedDuration}</span>
      <button
        type='button'
        onClick={onButtonClick}
        className={`movie-card__action-btn movie-card__action-btn_type_${type}`}
      />
      <a className='movies-card__poster-wrapper' href={trailerLink} target='_blank' rel='noreferrer'>
        <img className='movies-card__poster' src={imageSource} alt={title} />
      </a>
    </li>
  );
};

export default MoviesCard;
