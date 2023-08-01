class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _normalizeResponseData(movies) {
    return movies.map(movie => ({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: this._baseUrl + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: this._baseUrl + movie.image.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }))
  }

  async _handleResponse(res) {
    if (res.ok) {
      const movies = await res.json();
      return this._normalizeResponseData(movies);
    }
    const err = await res.json();
    return Promise.reject(err);
  }

  async getFilms() {
    const res = await fetch(`${this._baseUrl}/beatfilm-movies`);
    return this._handleResponse(res);
  }
}

const moviesApi = new MoviesApi({ baseUrl: 'https://api.nomoreparties.co' })

export default moviesApi;
