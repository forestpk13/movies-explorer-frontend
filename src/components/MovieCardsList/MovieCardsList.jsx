import MovieCard from '../MovieCard/MovieCard';
import './MovieCardsList.css';

const MovieCardsList = ({ onSaveMovie, onDeleteMovie, movies }) => {
  const moviesComponents = movies.map(({
    movieId,
    nameRU,
    duration,
    trailerLink,
    image,
    type,
  }) => (
    <MovieCard
      title={nameRU}
      imageSource={image}
      duration={duration}
      trailerLink={trailerLink}
      onSaveMovie={onSaveMovie}
      onDeleteMovie={onDeleteMovie}
      movieId={movieId}
      key={movieId}
      type={type}
    />
  ));

  return (
    <ul className='movie-cards'>
      {moviesComponents}
    </ul>
  );
};

export default MovieCardsList;