import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieReviews.module.css";

const API_KEY = "bb170006beee513cdab4b64f9c5a22c1";
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className={css.container}>
      <h3 className={css.title}>Reviews</h3>
      {reviews.length === 0 ? (
        <p className={css.noReviews}>No reviews available.</p>
      ) : (
        <ul className={css.reviewList}>
          {reviews.map((review) => (
            <li key={review.id} className={css.reviewItem}>
              <p className={css.author}>{review.author}</p>
              <p className={css.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
