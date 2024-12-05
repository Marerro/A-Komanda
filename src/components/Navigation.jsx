import logo from "../assets/logo.svg";
import home from "../assets/icon-nav-home.svg";
import movies from "../assets/icon-nav-movies.svg";
import tvSeries from "../assets/icon-nav-tv-series.svg";
import bookmark from "../assets/icon-nav-bookmark.svg";
import avatar from "../assets/image-avatar.png";
import { Link } from "react-router";

export default function Navigation() {
  return (
    <>
      <div>
        <Link to="/"><img src={logo} alt="logo" /></Link>
        <div>
            <Link to="/home"><img src={home} alt="home" /></Link>
            <Link to="/movies"><img src={movies} alt="movies" /></Link>
            <Link to="/tvseries"><img src={tvSeries} alt="tv series" /></Link>
            <Link to="/bookmarks"><img src={bookmark} alt="bookmarks" /></Link>
        </div>
        <img src={avatar} alt="user picture" />
      </div>
    </>
  );
}
