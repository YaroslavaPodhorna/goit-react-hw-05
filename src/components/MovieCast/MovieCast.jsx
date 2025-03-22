import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieCast.module.css";

const API_KEY = "bb170006beee513cdab4b64f9c5a22c1";
const BASE_URL = "https://api.themoviedb.org/3";
const PLACEHOLDER_IMG =
  "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className={css.castContainer}>
      <h3>Cast</h3>
      {cast.length === 0 ? (
        <p>No cast information available.</p>
      ) : (
        <ul className={css.castList}>
          {cast.map((actor) => (
            <li key={actor.id} className={css.castItem}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : PLACEHOLDER_IMG
                }
                alt={actor.name}
                className={css.actorImage}
              />
              <p className={css.actorName}>{actor.name}</p>
              <p className={css.actorCharacter}>as {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
