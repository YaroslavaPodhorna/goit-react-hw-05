import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
const getLinkStyle = ({ isActive }) => {
  return clsx(css.link, isActive && css.activeLink);
};
export default function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink className={getLinkStyle} to="/">
        Home
      </NavLink>
      <NavLink className={getLinkStyle} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
}
