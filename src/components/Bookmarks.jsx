import Navigation from "./Navigation";
import Searchbar from "./Searchbar";
import { getAll } from "../helpers/get";
import { useEffect, useState } from "react";
import bookmarkIconFull from "@assets/icon-bookmark-full.svg";
import bookmarkIconHover from "@assets/icon-bookmark-hover.svg";
import moviesIcon from "@assets/icon-category-movie.svg";
import tvSeriesIcon from "@assets/icon-category-tv.svg";
import playIcon from "@assets/icon-play.svg";
import { patchData } from "../helpers/update";

export default function Bookmarks() {
  const [bookmarkedMovies, setbookmarkedMovies] = useState([]);
  const [bookmarkedTVSeries, setbookmarkedTVSeries] = useState([]);
  const [update, setUpdate] = useState(0);
  const [query, setQuery] = useState("");
  const [showComponent, setShowComponent] = useState(false);

  const getShows = async () => {
    try {
      let shows = await getAll();
      setbookmarkedMovies(
        shows.filter(
          (show) => show.isBookmarked && show.category.toLowerCase() === "movie"
        )
      );
      setbookmarkedTVSeries(
        shows.filter(
          (show) =>
            show.isBookmarked && show.category.toLowerCase() === "tv series"
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const unbookmarShow = async (id) => {
    await patchData(id, { isBookmarked: false });
    setUpdate((prev) => prev + 1);
  };

  const userInput = (query) => {
    setQuery(query);
  };

  const filteredData = query
    ? [...bookmarkedMovies, ...bookmarkedTVSeries].filter((show) =>
        show.title.toLowerCase().includes(query.toLowerCase())
      )
    : [...bookmarkedMovies, ...bookmarkedTVSeries];

  useEffect(() => {
    getShows();
  }, [update]);

  const showShowsCard = (shows) => {
    return (
      <div className="grid grid-cols-2 gap-3 ml-4 mr-4 tablet:ml-6 tablet:mr-6 tablet:grid-cols-3 tablet:gap-x-7 tablet:gap-y-[1.3rem] desktop:ml-9 desktop:grid-cols-4 desktop:mr-8 desktop:gap-x-10 desktop:gap-y-7">
        {shows.map((show) => (
          <div
            key={show.title + show.year}
            className="relative justify-self-center"
          >
            <button
              className="group/book absolute right-2 top-2 bg-dark-blue/50 w-8 h-8 rounded-full hover:bg-white z-10 tablet:top-4 tablet:right-4"
              onClick={() => unbookmarShow(show.id)}
            >
              <img
                className="m-auto relative group-hover/book:invisible"
                src={bookmarkIconFull}
              />
              <img
                className="group-hover/book:visible absolute top-0 invisible"
                src={bookmarkIconHover}
              />
            </button>
            <div className="group/play relative">
              <div className="group-hover/play:visible invisible flex justify-around absolute bg-white/25 rounded-full w-[7.25rem] h-11 m-auto top-0 bottom-0 left-0 right-0">
                <img className="m-2 w-7 h-7" src={playIcon} />
                <p className="heading-xs mt-2 mb-2 ml-5 mr-5">Play</p>
              </div>
              <picture>
                <source
                  media="(min-width: 1440px)"
                  srcSet={show.thumbnail.regular.large}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={show.thumbnail.regular.medium}
                />
                <img
                  className="rounded-lg group-hover/play:opacity-50"
                  src={show.thumbnail.regular.small}
                  alt={show.title}
                />
              </picture>
            </div>
            <div className="text-ms text-white font-medium opacity-75 flex flex-row justify-start items-center h-[0.825rem] mb-1 mt-2 tablet:h-4 tablet:text-bs">
              <p>{show.year}</p> <span className="p-[0.4rem]">&#8226;</span>
              {show.category.toLowerCase() === "movie" && (
                <img
                  className="mr-1 desktop:mr-2 w-[0.3rem] tablet:w-3"
                  src={moviesIcon}
                  alt="movie"
                />
              )}
              {show.category.toLowerCase() === "tv series" && (
                <img
                  className="mr-1 desktop:mr-2 w-[0.3rem] tablet:w-3"
                  src={tvSeriesIcon}
                  alt="tv series"
                />
              )}
              <p>{show.category}</p> <span className="p-2">&#8226;</span>
              <p>{show.rating}</p>
            </div>
            <div className="text-mm text-white font-medium tablet:text-hs">
              {show.title}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="desktop:ml-32">
      <Navigation />
      <Searchbar
        setShowComponent={setShowComponent}
        page={"bookmarks"}
        onSearch={userInput}
      />
      <div className="mb-8">
        {showComponent ? (
          <div>
            <h1 className="text-white">
              Found {filteredData.length} results for &quot;{query}&quot;
            </h1>
            {showShowsCard(filteredData)}
          </div>
        ) : (
          <div>
            <h1 className="heading-xs ml-4 my-6 tablet:heading-l tablet:ml-6 tablet:mt-4 tablet:mb-5 desktop:ml-9 desktop:mb-[2.15rem]">
              Bookmarked Movies
            </h1>
            {showShowsCard(bookmarkedMovies)}

            <h1 className="heading-xs ml-4 mt-6 mb-4 tablet:heading-l tablet:ml-6 tablet:mt-9 tablet:mb-6 desktop:ml-9 desktop:mt-8 desktop:mb-[2.15rem]">
              Bookmarked TV Series
            </h1>
            {showShowsCard(bookmarkedTVSeries)}
          </div>
        )}
      </div>
    </div>
  );
}
