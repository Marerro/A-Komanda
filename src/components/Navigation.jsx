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
      <div className="flex flex-row m-2">
        <Link to="/"><img src={logo} alt="logo" /></Link>
        <div className="flex flex-row">
            <Link to="/home"><img className="m-2" src={home} alt="home" /></Link>
            <Link to="/movies"><img className="m-2" src={movies} alt="movies" /></Link>
            <Link to="/tvseries"><img className="m-2" src={tvSeries} alt="tv series" /></Link>
            <Link to="/bookmarks"><img className="m-2" src={bookmark} alt="bookmarks" /></Link>
        </div>
        <img src={avatar} alt="user picture" />
      </div>
    </>
  );
}
