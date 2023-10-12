import MovieCard from '../MovieCard/MovieCard';
import { moviesListTemp } from '../../utils/constants';
import './MovieCardsList.css';

const MovieCardsList = ({ onSaveMovie, onRemoveMovie, movies }) => {
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
      onRemoveMovie={onRemoveMovie}
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