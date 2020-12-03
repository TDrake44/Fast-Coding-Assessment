import { useState } from "react";
import { searchMovies } from "../../utils/api";
import Bag from "../../components/bag";
import Card from "../../components/card";
import Search from "../../components/search";
import "./home.scss";

const Home = () => {
  const [movieData, setMovieData] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleSearch = async (query) => {
    const movieData = await searchMovies(query);
    setMovieData(movieData);
  };

  const movieExists = (id) => {
    if (selected.length > 0) {
      return selected.some((movie) => {
        return movie.imdbID === id;
      });
    }
    return false;
  };

  const selectMovie = (movie) => {
    if (!movieExists(movie.imdbID)) {
      setSelected([...selected, movie]);
    } else {
      let tempSelected = selected;
      tempSelected = tempSelected.filter((sel) => sel.imdbID !== movie.imdbID);
      setSelected(tempSelected);
    }
  };

  return (
    <>
      <p className="intro" data-testid="card">
        Welcome to the coding assessment of Tyler Drake for{" "}
        <a href="https://www.fast.co" target="_blank" rel="noreferrer">
          FAST
        </a>
        . Feel free to search for movies below by title and then select and
        remove those desired from the bag.
      </p>
      <Bag>
        {selected.length > 0 &&
          selected.map((movie) => (
            <span className="movie" key={movie.imdbID}>
              {`${movie.Title} `}(
              <button onClick={() => selectMovie(movie)}>remove</button>)
            </span>
          ))}
      </Bag>
      <Search placeholder="Search movies..." onSearch={handleSearch} />
      <div className="row">
        {movieData &&
          movieData.Search &&
          movieData.Search.map((movie) => (
            <div key={movie.imdbID} className="col-3 col-6-med">
              <Card
                heading={movie.Title}
                onClick={() => selectMovie(movie)}
                checked={movieExists(movie.imdbID)}
              >
                {movie.Poster !== "N/A" && (
                  <img
                    className="movie-poster"
                    alt={`${movie.Title} poster`}
                    src={movie.Poster}
                  />
                )}
              </Card>
            </div>
          ))}
        {movieData && !movieData.Error && !movieData.Search && (
          <span>Use the search field above to search for movies.</span>
        )}
        {movieData && movieData.Error && <span>{movieData.Error}</span>}
      </div>
    </>
  );
};

export default Home;
