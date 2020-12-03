import { render, fireEvent, waitFor } from "@testing-library/react";
import * as api from "../../utils/api";
import Home from "./index";

const movies = {
  Search: [
    {
      Title: "The Dark Knight",
      Year: "2008",
      imdbID: "tt0468569",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    },
    {
      Title: "The Dark Knight Rises",
      Year: "2012",
      imdbID: "tt1345836",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg",
    },
    {
      Title: "Thor: The Dark World",
      Year: "2013",
      imdbID: "tt1981115",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTQyNzAwOTUxOF5BMl5BanBnXkFtZTcwMTE0OTc5OQ@@._V1_SX300.jpg",
    },
    {
      Title: "Transformers: Dark of the Moon",
      Year: "2011",
      imdbID: "tt1399103",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTkwOTY0MTc1NV5BMl5BanBnXkFtZTcwMDQwNjA2NQ@@._V1_SX300.jpg",
    },
    {
      Title: "Zero Dark Thirty",
      Year: "2012",
      imdbID: "tt1790885",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTQ4OTUyNzcwN15BMl5BanBnXkFtZTcwMTQ1NDE3OA@@._V1_SX300.jpg",
    },
    {
      Title: "Dark",
      Year: "2017–2020",
      imdbID: "tt5753856",
      Type: "series",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZmY2YzU4NDktODIxYi00YWIyLWIzYTctODBkYzYzZjc0ODdlXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg",
    },
    {
      Title: "Dark Shadows",
      Year: "2012",
      imdbID: "tt1077368",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjc0NzAyMzI1MF5BMl5BanBnXkFtZTcwMTE0NDQ1Nw@@._V1_SX300.jpg",
    },
    {
      Title: "Dark City",
      Year: "1998",
      imdbID: "tt0118929",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMGExOGExM2UtNWM5ZS00OWEzLTllNzYtM2NlMTJlYjBlZTJkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    },
    {
      Title: "X-Men: Dark Phoenix",
      Year: "2019",
      imdbID: "tt6565702",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMmZmYTgwZGItNDIxMS00MmRkLWEzODQtYTllNzM0ZWE1NmQ5XkEyXkFqcGdeQXVyODQzNTE3ODc@._V1_SX300.jpg",
    },
    {
      Title: "Terminator: Dark Fate",
      Year: "2019",
      imdbID: "tt6450804",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BOWExYzVlZDgtY2E1ZS00NTFjLWFmZWItZjI2NWY5ZWJiNTE4XkEyXkFqcGdeQXVyMTA3MTA4Mzgw._V1_SX300.jpg",
    },
  ],
  totalResults: "3246",
  Response: "True",
};

const error = { Response: "False", Error: "Incorrect IMDb ID." };

describe("Home", () => {
  it("renders without crashing", async () => {
    render(<Home />);
  });

  it("renders search results and selects and removes a movie", async () => {
    jest
      .spyOn(api, "searchMovies")
      .mockImplementation(() => Promise.resolve(movies));

    const container = render(<Home />);
    await waitFor(() => {
      fireEvent.change(container.getByTestId("search-input"), {
        target: { value: "dark" },
      });
      fireEvent.keyDown(container.getByTestId("search-input"), {
        key: "Enter",
        code: "Enter",
      });
    });
    expect(container.getByText("The Dark Knight")).toBeTruthy();

    fireEvent.click(container.getByText("The Dark Knight"));
    expect(container.getByText("Movie Bag (1)")).toBeTruthy();

    fireEvent.click(container.getByText("Movie Bag (1)"));
    expect(container.getByText("remove")).toBeTruthy();

    fireEvent.click(container.getByText("The Dark Knight"));
    expect(container.getByText("Movie Bag (0)")).toBeTruthy();

    fireEvent.click(container.getByText("The Dark Knight"));
    expect(container.getByText("Movie Bag (1)")).toBeTruthy();

    fireEvent.click(container.getByText("Movie Bag (1)"));
    fireEvent.click(container.getByText("remove"));
    expect(container.getByText("Movie Bag (0)")).toBeTruthy();
  });

  it("renders error response", async () => {
    jest
      .spyOn(api, "searchMovies")
      .mockImplementation(() => Promise.resolve(error));

    const container = render(<Home />);
    await waitFor(() => {
      fireEvent.change(container.getByTestId("search-input"), {
        target: { value: "" },
      });
      fireEvent.keyDown(container.getByTestId("search-input"), {
        key: "Enter",
        code: "Enter",
      });
    });
    expect(container.getByText("Incorrect IMDb ID.")).toBeTruthy();
  });
});
