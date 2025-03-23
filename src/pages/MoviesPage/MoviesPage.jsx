import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

const API_KEY = "bb170006beee513cdab4b64f9c5a22c1";
const BASE_URL = "https://api.themoviedb.org/3";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newQuery = form.elements.query.value.trim();
    if (!newQuery) return;
    setSearchParams({ query: newQuery });
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input type="text" name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </>
  );
}
