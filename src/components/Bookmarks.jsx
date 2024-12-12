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
  const [showComponent, setShowComponent] = useState(false);

  /**
   * gets shows from database
   * filter show to movies and tv series arrays
   */
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
  }, [update]);

  const unbookmarShow = async (id) => {
    await patchData(id, { isBookmarked: false });
    setUpdate((prev) => prev + 1);
  };

  /**
   * return array of movie/tv series mapped onto a grid,
   * mobile 2 col
   */
  const showShowsCard = (shows) => {
    return (
      <>
        <div className="grid grid-cols-2 gap-4 ml-4 mr-4 tablet:ml-6 tablet:mr-6 tablet:grid-cols-3 tablet:gap-x-7 tablet:gap-y-6 desktop:grid-cols-4 desktop:gap-x-10 desktop:gap-y-8">
          {shows.map((show) => (
            <div
              className="relative justify-self-center"
              key={show.title + show.year}
            >
              <button
                className="group/book absolute right-2 top-2 bg-dark-blue/50 w-8 h-8 rounded-full hover:bg-white z-10"
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
              <div className="text-ms text-white font-medium opacity-75 flex flex-row justify-start items-center h-[0.825rem] mt-2 tablet:h-4 tablet:text-bs">
                <p>{show.year}</p> <span className="p-2">&#8226;</span>
                {show.category.toLowerCase() == "movie" && (
                  <img className="mr-1 desktop:mr-2" src={moviesIcon} alt="" />
                )}
                {show.category.toLowerCase() == "tv series" && (
                  <img
                    className="mr-1 desktop:mr-2"
                    src={tvSeriesIcon}
                    alt=""
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
      </>
    );
  };

  return (
    <div className="desktop:ml-32">
      <Navigation />
      <Searchbar setShowComponent={setShowComponent} page={"bookmarks"} />
      {!showComponent && (
        <div className="mb-8">
          <div>
            <h1 className="heading-xs ml-4 mt-4 mb-4 tablet:heading-l tablet:ml-6 tablet:mt-6 tablet:mb-6 desktop:ml-8 desktop:mt-8 desktop:mb-8">
              Bookmarked Movies
            </h1>
            {showShowsCard(bookmarkedMovies)}
          </div>
          <div>
            <h1 className="heading-xs ml-4 mt-4 mb-4 tablet:heading-l tablet:ml-6 tablet:mt-6 tablet:mb-6 desktop:ml-8 desktop:mt-8 desktop:mb-8">
              Bookmarked TV Series
            </h1>
            {showShowsCard(bookmarkedTVSeries)}
          </div>
        </div>
      )}
    </div>
  );
}
