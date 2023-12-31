class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._credentials = options.credentials;
    this._unauthorizedCode = options.unauthorizedCode;
  }

  async _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const err = await res.json();
    if (res.status === this._unauthorizedCode) {
      err.status = this._unauthorizedCode;
    }
    return Promise.reject(err);
  }

  async _request(
    path = '',
    method = 'GET',
    body = null,
    headers = this._headers,
    credentials = this._credentials,
  ) {
    const res = await fetch(this._baseUrl + path, { method, body, headers, credentials } )
    return this._handleResponse(res);
  }

  async register(userData) {
    return this._request('/signup', 'POST', userData); // исправить
  }

  async login(userData) {
    return this._request('/signin', 'POST', userData);
  }

  async logout() {
    return this._request('/signout');
  }

  async getOwnProfile() {
    return this._request('/users/me');
  }

  async updateOwnProfile(userInfo) {
    console.log(userInfo)
    return this._request('/users/me', 'PATCH', userInfo);
  }

  async getSavedMovies() {
    return this._request('/movies');
  }

  async saveMovie(movie) {
    return this._request('/movies', 'POST', JSON.stringify(movie));
  }

  async removeMovie(movieId) {
    return this._request(`/movies/${movieId}`, 'DELETE');
  }

}

 const api = new MainApi({
  baseUrl: 'https://api.forestpk13.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  unauthorizedCode: 401,
});

export default api;