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
      <div className="flex justify-between items-center flex-row desktop:flex-col desktop:fixed desktop:top-8 desktop:left-8 bg-semi-dark-blue tablet:m-6 tablet:rounded-[0.625rem] desktop:rounded-[1.25rem] desktop:m-0 desktop:h-screen desktop:min-w-24">
        <img
          className="m-4 w-5 h-auto tablet:w-8 tablet:m-6 desktop:w-2"
          src={logo}
          alt="logo"
        />
        <div className="flex flex-row desktop:flex-col">
          <Link to="/home">
            <img
              className="h-4 ml-3 mr-3 tablet:h-5 tablet:ml-4 tablet:m-4"
              src={home}
              alt="home"
            />
          </Link>
          <Link to="/movies">
            <img
              className="h-4 ml-3 mr-3 tablet:h-5 tablet:ml-4 tablet:m-4"
              src={movies}
              alt="movies"
            />
          </Link>
          <Link to="/tvseries">
            <img
              className="h-4 ml-3 mr-3 tablet:h-5 tablet:ml-4 tablet:m-4"
              src={tvSeries}
              alt="tv series"
            />
          </Link>
          <Link to="/bookmarks">
            <img
              className="h-4 ml-3 mr-3 tablet:h-5 tablet:ml-4 tablet:m-4"
              src={bookmark}
              alt="bookmarks"
            />
          </Link>
        </div>
        <img
          className="m-4 w-6 h-6 tablet:w-8 tablet:h-8 tablet:m-4"
          src={avatar}
          alt="user picture"
        />
      </div>
    </>
  );
}
