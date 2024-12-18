import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import RecommendedForYou from "./RecommendedForYou";
import Trending from "./Trending";
import Searchbar from "./Searchbar";
import { getAll } from "../helpers/get";
import { patchData } from "../helpers/update";
import playIcon from "@assets/icon-play.svg";
import category_movie from "@assets/icon-category-movie.svg";
import bookmarkIconFull from "@assets/icon-bookmark-full.svg";
import bookmarkIconHover from "@assets/icon-bookmark-hover.svg";
import bookmarkIconEmpty from "@assets/icon-bookmark-empty.svg";

export default function Home() {
  const [showComponent, setShowComponent] = useState(false);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(0);
  const [query, setQuery] = useState("");

  const getMovies = async () => {
    try {
      const data = await getAll();
      setData(data);
    } catch (error) {
      console.error("Duomenys nebuvo gauti iš endpoint", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, [update]);

  const userInput = (query) => {
    setQuery(query);
  };

  const filteredData = query
    ? data.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      )
    : data.filter(
        (item) =>
          item.category.toLowerCase() === "movie" ||
          item.category.toLowerCase() === "tv series"
      );

  const renderCards = (movies) => {
    return (
      <div className="bg-[#10141E] grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 desktop:gap-[2.5rem] tablet:gap-[2.5rem] px-[0.97rem] mobile:px-[0.97rem] gap-x-[0.96rem] mobile:gap-x-[0.96rem] tablet:gap-x-[1.8rem] tablet:px-[1.55rem] desktop:px-[2.25rem]">
        {movies.map((movie) => {
          const { id, title, thumbnail, year, category, rating, isBookmarked } =
            movie;

          const handleBookmark = async (id) => {
            await patchData(id, { isBookmarked: !isBookmarked });
            setUpdate((prev) => prev + 1);
          };

          return (
            <div key={id} className="justify-self-center">
              <div className="m-auto relative z-0">
                <div className="group/play relative">
                  <div className="group-hover/play:visible invisible flex justify-around absolute bg-white/25 rounded-full w-[7.25rem] h-11 m-auto top-0 bottom-0 left-0 right-0">
                    <img className="m-2 w-7 h-7" src={playIcon} alt="Play" />
                    <p className="heading-xs mt-2 mb-2 ml-5 mr-5">Play</p>
                  </div>
                  <picture>
                    <source
                      media="(min-width: 1440px)"
                      srcSet={thumbnail.regular.large}
                    />
                      <source
                      media="(min-width: 768px)"
                      srcSet={thumbnail.regular.medium}
                    />
                    <img
                      className="rounded-lg group-hover/play:opacity-50"
                      src={thumbnail.regular.small}
                      alt={title}
                    />
                  </picture>
                </div>

                <div className="flex place-items-center card_content text-[#FFF]/[0.75] text-[0.8125rem] tablet:gap-[0.5rem] mt-[0.5rem]">
                  <p className="tv_series_text_above ml-[0.03rem] mobile:ml-[0.03rem] mr-[0.37rem] mobile:mr-[0.37rem] tablet:mr-[0rem] tablet:text-[0.8125rem]">{year}</p>
                  <span className="tv_series_text_above mr-[0.3rem] mobile:mr-[0.3rem] tablet:text-[0.8125rem]">&#8226;</span>
                  {category.toLowerCase() === "movie" && (
                    <img
                      className="w-[0.625rem] mobile:w-[0.625rem] h-[0.625rem] mobile:h-[0.625rem] tablet:w-[0.75rem] tablet:h-[0.75rem] mr-[0.28rem] mobile:mr-[0.28rem] tablet:ml-[-0.35rem] tablet:mr-[-0.15rem]"
                      src={category_movie}
                      alt="Category Icon"
                    />
                  )}
                  <p className="tv_series_text_above mr-[0.37rem] mobile:mr-[0.37rem] tablet:text-[0.8125rem]">{category}</p>
                  <span className="tv_series_text_above mr-[0.33rem] mobile:mr-[0.33rem] tablet:text-[0.8125rem] tablet:mr-[-0.05rem] tablet:ml-[-0.35rem]">&#8226;</span>
                  <p className="tv_series_text_above tablet:text-[0.8125rem]">{rating}</p>
                </div>
                <p className="text-white tv_series_title mt-[0.25rem] ml-[0.03rem] mobile:mt-[0.25rem] tablet:mt-[0.3rem] mobile:ml-[0.03rem] mobile:mb-[1rem] tablet:text-[1.125rem]">
                  {title}
                </p>

                <button
                  className="group/book absolute right-[0.5rem] top-[0.5rem] mobile:right-[0.5rem] mobile:top-[0.5rem] tablet:top-[1rem] tablet:right-[1rem] bg-slate-900/50 w-8 h-8 rounded-full hover:bg-white"
                  onClick={() => handleBookmark(id)}
                >
                  <img
                    src={isBookmarked ? bookmarkIconFull : bookmarkIconEmpty}
                    alt="Bookmark"
                    className="m-auto group-hover/book:invisible"
                  />
                  <img
                    src={bookmarkIconHover}
                    className="group-hover/book:visible absolute top-0 invisible"
                    alt="Hover Bookmark"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Navigation />
      <div className="desktop:ml-32">
        <Searchbar
          showComponent={showComponent}
          setShowComponent={setShowComponent}
          onSearch={userInput}
        />
        {showComponent ? (
          <div className="mt-[1.4rem] mobile:mt-[1.4rem] tablet:mt-[0.9rem] desktop:mt-[1rem]">
            <h1 className="heading-xs mobile:heading-xs- tablet:heading-l tablet:tracking-[0.00215rem] mb-[1.3rem] mobile:mb-[1.3rem] tablet:mb-[1.21rem] desktop:mb-[1.76rem] ml-[1.01rem] mobile:ml-[1.01rem] tablet:ml-[1.55rem] desktop:ml-[2.25rem] found-text mobile:tracking-[-0.0195rem] tablet:tracking-[-0.03125rem] tracking-[-0.0195rem] text-[1.25rem] mobile:text-[1.25rem] tablet:text-[2rem]">
              Found {filteredData.length} results for '{query}'
            </h1>
            {renderCards(filteredData)}
          </div>
        ) : (
          <div>{!renderCards(data)}</div>
        )}
        {!showComponent && <Trending />}
        {!showComponent && <RecommendedForYou />}
      </div>
    </>
  );
}
