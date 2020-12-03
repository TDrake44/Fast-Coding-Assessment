const url = process.env.REACT_APP_MOVIE_API_URL;
const key = process.env.REACT_APP_MOVIE_API_KEY;

// Search movie data
const searchMovies = (search): Promise<*> =>
  fetch(`${url}/?apikey=${key}&s=${encodeURI(search)}`).then((resp) =>
    resp.json()
  );

export { searchMovies };
