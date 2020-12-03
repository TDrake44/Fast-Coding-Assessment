import { useState } from "react";
import PropTypes from "prop-types";
import "./search.scss";

const Search = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="search">
      <input
        type="search"
        id="movie-search"
        name="movie-search"
        placeholder={placeholder}
        aria-label="Search through movie content"
        onKeyDown={handleKeyPress}
        value={query}
        data-testid="search-input"
        onChange={(evt) => setQuery(evt.target.value)}
      />
      <button onClick={() => onSearch(query)} data-testid="search-button">
        Search
      </button>
    </div>
  );
};

Search.defaultProps = {
  placeholder: "",
  onSearch: null,
};

Search.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
};

export default Search;
