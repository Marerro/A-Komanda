import { useState, useEffect } from "react";
import { patchData } from "../helpers/update";
import category_TV from "@assets/icon-category-tv.svg";
import bookmarkIconEmpty from "@assets/icon-bookmark-empty.svg";
import bookmarkIconFull from "@assets/icon-bookmark-full.svg";
import Navigation from "./Navigation";
import SearchBar from "./Searchbar";
import bookmarkIconHover from "@assets/icon-bookmark-hover.svg";
import playIcon from "@assets/icon-play.svg";

export default function TvSeries() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(0);
  const [showComponent, setShowComponent] = useState(false);
  const [onlyTVseries, setOnlyTVseries] = useState([]);
  const [query, setQuery] = useState("");

  const url = "http://localhost:5000/data";

  const getTvSeries = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      const tvseries = data.filter(
        (itemData) => itemData.category === "tv series"
      );
      setOnlyTVseries(tvseries);
    } catch (error) {
      console.error("Duomenys nebuvo gauti iš endpoint", error);
    }
  };

  useEffect(() => {
    getTvSeries();
  }, [update]);

  const filterSearchBarSeries = (query) => {
    setQuery(query);
    if (!query) {
      setOnlyTVseries(
        data.filter((item) => item.category.toLowerCase() === "tv series")
      );
    } else {
      const lowerCaseQuery = query.toLowerCase();

      const filteredTVSeries = data.filter(
        (series) =>
          series.category.toLowerCase() === "tv series" &&
          series.title.toLowerCase().startsWith(lowerCaseQuery)
      );
      setOnlyTVseries(filteredTVSeries);
    }
  };

  useEffect(() => {
    if (data.length) {
      filterSearchBarSeries(query);
    }
  }, [query, data]);

  const renderTvSeries = (series) => {
    return (
      <div className="bg-[#10141E] grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 desktop:gap-[2.5rem] tablet:gap-[2.5rem] mobile:gap-[0.94rem] mx-[1rem]">
        {series.map((itemData) => {
          const { id, title, thumbnail, year, category, rating, isBookmarked } =
            itemData;

          const bookMark = async (id) => {
            await patchData(id, { isBookmarked: true });
            setUpdate((prev) => prev + 1);
          };

          const unBookmark = async (id) => {
            await patchData(id, { isBookmarked: false });
            setUpdate((prev) => prev + 1);
          };
          const bookMarking = isBookmarked ? (
            <button
              className="group absolute right-[0.5rem] top-2 bg-slate-900/50 w-[2rem] h-[2rem] rounded-full hover:bg-white"
              onClick={() => unBookmark(id)}
            >
              <img
                src={bookmarkIconFull}
                alt="MovieIcon"
                className="m-auto group-hover:invisible"
              />
              <img
                className="group-hover:visible absolute top-0 invisible"
                src={bookmarkIconHover}
                alt="Bookmark Hover Icon"
              />
            </button>
          ) : (
            <button
              className="group absolute right-[0.5rem] top-2 bg-slate-900/50 w-8 h-8 rounded-full hover:bg-white"
              onClick={() => bookMark(id)}
            >
              <img
                src={bookmarkIconEmpty}
                alt="MovieIcon"
                className="m-auto group-hover:invisible"
              />
              <img
                className="group-hover:visible absolute top-0 invisible"
                src={bookmarkIconHover}
                alt="Bookmark Hover Icon"
              />
            </button>
          );

          return (
            <div key={id} className="justify-self-center">
              <div className="m-auto relative z-0">
                <div className="group/play relative">
                  <div className="group-hover/play:visible invisible flex justify-around absolute bg-white/25 rounded-full w-[7.25rem] h-11 m-auto top-0 bottom-0 left-0 right-0">
                    <img
                      className="m-2 w-7 h-7"
                      src={playIcon}
                      alt="Play Icon"
                    />
                    <p className="heading-xs mt-2 mb-2 ml-5 mr-5">Play</p>
                  </div>
                  <picture>
                    <source
                      media="(min-width: 768px)"
                      srcSet={thumbnail.regular.large}
                    />
                    <img
                      className="rounded-lg"
                      src={thumbnail.regular.small}
                      alt="TV shows"
                    />
                  </picture>
                </div>
                <div className="flex gap-[0.25rem] tablet:gap-[0.5rem] desktop:gap-[0.5rem] body-s tablet:body-s desktop:body-s mobile:mt-[0.25rem] tablet:mt-[0.31rem] desktop:tablet:mt-[0.31rem] opacity-75 text-[0.6875rem] tablet:text-[0.8125rem] desktop:text-[0.8125rem]">
                  <p>{year}</p>
                  <span>&#8226;</span>
                  {category === "TV Series" && (
                    <img
                      className="w-[0.625rem] h-[0.625rem] tablet:w-[0.75rem] tablet:h-[0.75rem] desktop:w-[0.75rem] desktop:h-[0.75rem] mobile:translate-y-[0.20rem] translate-y-[0.3rem]"
                      src={category_TV}
                      alt="Category Icon"
                    />
                  )}
                  <div>{bookMarking}</div>
                  <p>{category}</p>
                  <span>&#8226;</span>
                  <p>{rating}</p>
                </div>
                <p className="mobile:mt-[0.25rem] tablet:mt-[0.31rem] desktop:tablet:mt-[0.31rem] section-s mobile:section-s tablet:heading-xs desktop:heading-xs">
                  {title}
                </p>
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
      <section className="desktop:ml-32">
        <SearchBar
          setShowComponent={setShowComponent}
          onSearch={filterSearchBarSeries}
          page={"tvseries"}
        />
        {showComponent ? (
          // if component true show filtered tvseries
          <div>
            <h1 className="text-white">
              Found {onlyTVseries.length} results for `{query}`
            </h1>
            {renderTvSeries(onlyTVseries)}
          </div>
        ) : (
          <div>
            <h3 className="heading-xs tablet:heading-m desktop:heading-m my-[2.375rem] mx-[1rem]">
              All TV Series
            </h3>
            {renderTvSeries(onlyTVseries)}
          </div>
        )}
      </section>
    </>
  );
}
