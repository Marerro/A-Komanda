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
  const [refresh, setRefresh] = useState(0);  

  const url = "http://localhost:5000/data";

  const getTvSeries = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      const tvseries = data.filter(
        (itemData) => itemData.category.toLowerCase() === "tv series"
      );
      setOnlyTVseries(tvseries);
    } catch (error) {
      console.error("Duomenys nebuvo gauti iš endpoint", error);
    }
  };

  useEffect(() => {
    getTvSeries();
  }, [update, refresh]);

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
          series.title.toLowerCase().includes(lowerCaseQuery)
      );
      setOnlyTVseries(filteredTVSeries);
    }
  };

  const renderTvSeries = (series) => {
    return (
      <div className="bg-[#10141E] grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 desktop:gap-y-[1.98rem] desktop:gap-x-[2.5rem] tablet:gap-y-[1.6rem] tablet:gap-x-[1.7rem] mobile:gap-[0.94rem] gap-[0.94rem] mx-[1rem] tablet:pl-[1.4rem] tablet:pr-[1.45rem] tablet:mx-[0.1rem] desktop:mt-[2.13rem] desktop:pl-[1.2rem] desktop:pr-[2rem] desktop:mx-[0.5rem] desktop:ml-[1.0rem] desktop:ml-[1.1rem]">
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
              className="group absolute right-[0.5rem] top-2 tablet:top-[1rem] tablet:right-[1rem] bg-slate-900/50 w-[2rem] h-[2rem] rounded-full hover:bg-white"
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
              className="group absolute right-[0.5rem] top-2 tablet:top-[1rem] tablet:right-[1rem] bg-slate-900/50 w-8 h-8 rounded-full hover:bg-white"
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
              <div className="m-auto relative z-0 ">
                <div className="group/play relative">
                  <div className="group-hover/play:visible invisible flex justify-around absolute bg-white/25 rounded-full w-[7.25rem] h-11 m-auto top-0 bottom-0 left-0 right-0 z-40">
                    <img
                      className="m-2 w-7 h-7 z-40"
                      src={playIcon}
                      alt="Play Icon"
                    />
                    <p className="heading-xs mt-2 mb-2 ml-5 mr-5 z-40">Play</p>
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
                      className="rounded-lg group-hover/play:opacity-50 hover:duration-500"
                      src={thumbnail.regular.small}
                      alt="TV shows"
                    />
                  </picture>
                </div>
                <div className="flex gap-[0.26rem] tablet:gap-[0.5rem] desktop:gap-[0.43rem] body-s tablet:body-s desktop:body-s mobile:mt-[0.5rem] tablet:mt-[0.4rem] desktop:mt-[0.6rem] opacity-75 text-[0.6875rem] tablet:text-[0.8125rem] desktop:text-[0.8125rem] tv_series_text_above">
                  <p className="mr-[-0.2rem] ">{year}</p>
                  <span className="ml-[0.32rem] mx-[0.2rem] tablet:mx-[0.19rem] tablet:ml-[0.3rem] desktop:ml-[0.27rem] desktop:mx-[0.14rem]">&#8226;</span>
                  {category === "TV Series" && (
                    
                    <img
                      className="w-[0.625rem] h-[0.625rem] tablet:w-[0.75rem] tablet:h-[0.79rem] desktop:w-[0.75rem] desktop:h-[0.75rem] mobile:translate-y-[0.20rem] translate-y-[0.3rem] mx-[-0.19rem] desktop:translate-y-[0.04rem] desktop:translate-x-[0.1rem]"
                      src={category_TV}
                      alt="Category Icon"
                    />
                   
                  )}
                  <div className="tablet:mr-[-0.5rem] desktop:mr-[-0.1rem]">{bookMarking}</div>
                  <p >{category}</p>
                  <span className="ml-[0.15rem] tablet:ml-[-0.05rem] desktop:ml-[0.05rem] desktop:mr-[0.05rem]">&#8226;</span>
                  <p>{rating}</p>
                </div>
                <p className="mobile:mt-[0.26rem] tablet:mt-[0.24rem] desktop:mt-[0.25rem] section-s  tablet:heading-xs desktop:heading-xs tv_series_title">
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
      <Navigation setRefresh={setRefresh}/>
      <section className="desktop:ml-32">
        <SearchBar
          setShowComponent={setShowComponent}
          onSearch={filterSearchBarSeries}
          page={"tvseries"}
          refresh={refresh}
        />
        {showComponent ? (
          // if component true show filtered tvseries
          <div className="mt-[1.4rem] mobile:mt-[1.4rem] tablet:mt-[0.9rem] desktop:mt-[1rem]">
            <h1 className="heading-xs mobile:heading-xs- tablet:heading-l tablet:tracking-[0.00215rem] mb-[1.3rem] mobile:mb-[1.3rem] tablet:mb-[1.21rem] desktop:mb-[-0.42rem] ml-[1.01rem] mobile:ml-[1.01rem] tablet:ml-[1.55rem] desktop:ml-[2.25rem] found-text mobile:tracking-[-0.0195rem] tablet:tracking-[-0.03125rem] tracking-[-0.0195rem] text-[1.25rem] mobile:text-[1.25rem] tablet:text-[2rem]">
              Found {onlyTVseries.length} results for '{query}'
            </h1>
            {renderTvSeries(onlyTVseries)}
          </div>
        ) : (
          <div>
            <h3 className="heading-xs tablet:heading-l desktop:heading-l my-[1.45rem] mx-[1.05rem] tracking-wider tablet:my-[0.8525rem] tablet:pl-[0.6rem] tablet:tracking-normal tablet:mb-[1.3rem] desktop:mb-[0.5rem] desktop:my-[-0.4rem] desktop:mt-[1rem] desktop:ml-[1.7rem]">
            TV Series
            </h3>
            
            {renderTvSeries(onlyTVseries)}
            
          </div>
        )}
      </section>
    </>
  );
}
