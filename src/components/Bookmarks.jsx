import Navigation from "./Navigation";
import { getAll } from "../helpers/get";
import { useEffect, useState } from "react";
import bookmarkIconFull from "@assets/icon-bookmark-full.svg";
import bookmarkIconEmpty from "@assets/icon-bookmark-empty.svg";
import moviesIcon from "@assets/icon-category-movie.svg";
import tvSeriesIcon from "@assets/icon-category-tv.svg";
import { patchData } from "../helpers/update";

export default function Bookmarks() {
  const [bookmarkedMovies, setbookmarkedMovies] = useState([]);
  const [bookmarkedTVSeries, setbookmarkedTVSeries] = useState([]);
  const [update, setUpdate] = useState(0);

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
                className="absolute right-2 top-2 bg-dark-blue/50 w-8 h-8 rounded-full"
                onClick={() => unbookmarShow(show.id)}
              >
                {show.isBookmarked ? (
                  <img className="m-auto" src={bookmarkIconFull} />
                ) : (
                  <img className="m-auto" src={bookmarkIconEmpty} />
                )}
              </button>
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
                  className="rounded-lg"
                  src={show.thumbnail.regular.small}
                  alt={show.title}
                />
              </picture>
              <div className="text-ms text-white font-medium opacity-75 flex flex-row justify-start items-center h-[0.825rem] mt-2 tablet:h-4 tablet:text-bs">
                <p>{show.year}</p> <span className="p-2">&#8226;</span>
                {show.category.toLowerCase() == "movie" && (
                  <img className="mr-1 desktop:mr-2" src={moviesIcon} alt="" />
                )}
                {show.category.toLowerCase() == "tv series" && (
                  <img className="mr-1 desktop:mr-2" src={tvSeriesIcon} alt="" />
                )}
                <p>{show.category}</p> <span className="p-2">&#8226;</span>
                <p>{show.rating}</p>
              </div>
              <div className="text-mm text-white font-medium tablet:text-hs">{show.title}</div>
            </div>
          ))}
        </div>
      </>
    );
  };
//text-ms text-white font-medium opacity-75 flex flex-row justify-start items-center h-[0.825rem] mt-2
  return (
    <>
      <div className="mb-8">
        <Navigation />
        <div>
          <h1 className="heading-xs ml-4 mt-4 mb-4 tablet:heading-l tablet:ml-6 tablet:mt-6 tablet:mb-6 desktop:ml-8 desktop:mt-8 desktop:mb-8">Bookmarked Movies</h1>
          {showShowsCard(bookmarkedMovies)}
        </div>
        <div>
          <h1 className="heading-xs ml-4 mt-4 mb-4 tablet:heading-l tablet:ml-6 tablet:mt-6 tablet:mb-6 desktop:ml-8 desktop:mt-8 desktop:mb-8">Bookmarked TV Series</h1>
          {showShowsCard(bookmarkedTVSeries)}
        </div>
      </div>
    </>
  );
}
