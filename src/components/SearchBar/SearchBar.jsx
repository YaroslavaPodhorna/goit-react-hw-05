import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState("");
  const handleChange = (event) => {
    setQuery(event.currentTarget.value.toLowerCase());
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim() === "") {
      return toast.error("Enter search request!");
    }
    onSubmit(query.trim());
    setQuery("");
  };
  return (
    <>
      <header>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            name="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
          <button className={css.btn} type="submit">
            Search
          </button>
        </form>
      </header>
    </>
  );
}
