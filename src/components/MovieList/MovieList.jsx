import React from "react";
import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.movieItem}>
          <Link to={`/movies/${movie.id}`} className={css.movieLink}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
