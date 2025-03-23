import { useEffect, useState, useRef } from "react";
import {
  useNavigate,
  useLocation,
  useParams,
  Link,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import css from "./MovieDetailsPage.module.css";

const API_KEY = "bb170006beee513cdab4b64f9c5a22c1";
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const backLinkRef = useRef(location.state?.from || "/movies");

  const handleGoBack = () => {
    navigate(backLinkRef.current);
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <>
      <button className={css.goBackButton} onClick={handleGoBack}>
        ← Go back
      </button>

      <div className={css.container}>
        <img
          className={css.poster}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={css.details}>
          <h1 className={css.title}>
            {movie.title} ({movie.release_date?.slice(0, 4)})
          </h1>
          <p className={css.userScore}>
            <strong>User Score:</strong> {Math.round(movie.vote_average * 10)}%
          </p>
          <h2 className={css.overview}>Overview</h2>
          <p className={css.text}>{movie.overview}</p>
          <h2 className={css.genresTitle}>Genres</h2>
          <p className={css.text}>
            {movie.genres?.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </div>

      <hr className={css.separator} />

      <h2 className={css.additionalInfoTitle}>Additional information</h2>
      <ul className={css.infoList}>
        <li className={css.infoItem}>
          <Link
            className={css.link}
            to="cast"
            state={{ from: backLinkRef.current }}
          >
            Cast
          </Link>
        </li>
        <li className={css.infoItem}>
          <Link
            className={css.link}
            to="reviews"
            state={{ from: backLinkRef.current }}
          >
            Reviews
          </Link>
        </li>
      </ul>

      <hr className={css.separator} />

      <Outlet />
    </>
  );
}
