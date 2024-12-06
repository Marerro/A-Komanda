import Navigation from "./Navigation";
import { getAll } from "../helpers/get";
import { useEffect, useState } from "react";
import bookmarkIconEmpty from "/src/assets/icon-bookmark-empty.svg";

export default function Bookmarks() {
  const [bookmarkedMovies, setbookmarkedMovies] = useState([]);
  const [bookmarkedTVSeries, setbookmarkedTVSeries] = useState([]);

  const getShows = async () => {
    try {
      let shows = await getAll();
      setbookmarkedMovies(
        shows.filter(
          (show) =>
            show.isBookmarked == true && show.category.toLowerCase() == "movie"
        )
      );
      setbookmarkedTVSeries(
        shows.filter(
          (show) =>
            show.isBookmarked == true &&
            show.category.toLowerCase() == "tv series"
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getShows();
  }, []);

  return (
    <>
      <div className="bg-dark-blue">
        <Navigation />
        <div className="text-white">
          <h1>Bookmarked Movies</h1>
          {showShowsCard(bookmarkedMovies)}
        </div>
        <div className="text-white">
          <h1>Bookmarked TV Series</h1>
          {showShowsCard(bookmarkedTVSeries)}
        </div>
      </div>
    </>
  );
}

const showShowsCard = (shows) => {
  return (
    <>
      <div className="flex wrap">
        {shows.map((show) => (
          <div key={show.title + show.year}>
            <button className="relative left-32 top-8 bg-slate-500/50">
              <img src={bookmarkIconEmpty} />
            </button>
            <img className="w-40" src={show.thumbnail.regular.small} alt={show.title} />
            <div>
              {show.year} <span>&#8226;</span>
              {show.category} <span>&#8226;</span>
              {show.rating}
            </div>
            <div>{show.title}</div>
          </div>
        ))}
      </div>
    </>
  );
};
