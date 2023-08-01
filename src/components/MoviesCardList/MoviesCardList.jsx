import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({ movies, onSaveMovie, onRemoveMovie }) => {
  const moviesComponents = movies.map(({
    movieId,
    nameRU,
    duration,
    trailerLink,
    image,
    type,
    _id: id,
  }) => (
    <MoviesCard
      title={nameRU}
      imageSource={image}
      duration={duration}
      trailerLink={trailerLink}
      onSaveMovie={onSaveMovie}
      onRemoveMovie={onRemoveMovie}
      movieId={movieId}
      key={movieId}
      type={type}
      id={id}
    />
  ));

  return (
    <ul className='movies-cards'>
      {moviesComponents}
    </ul>
  );
};

export default MoviesCardList;
