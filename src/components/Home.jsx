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
  const [refresh, setRefresh] = useState(0);  

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
      <div className="bg-[#10141E] grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 desktop:gap-[2.5rem] tablet:gap-[2.5rem] mobile:gap-[0.94rem]">
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
                      media="(min-width: 768px)"
                      srcSet={thumbnail.regular.large}
                    />
                    <img
                      className="rounded-lg group-hover/play:opacity-50"
                      src={thumbnail.regular.small}
                      alt={title}
                    />
                  </picture>
                </div>

                <div className="flex place-items-center card_content text-[#FFF]/[0.75] gap-[0.5rem;] text-[0.8125rem] tablet:gap-[0.5rem] mt-1">
                  <p className="">{year}</p>
                  <span className="">&#8226;</span>
                  {category.toLowerCase() === "movie" && (
                    <img
                      className="w-[0.75rem] shrink h-[0.75rem]"
                      src={category_movie}
                      alt="Category Icon"
                    />
                  )}
                  <p className="">{category}</p>
                  <span className="">&#8226;</span>
                  <p className="">{rating}</p>
                </div>
                <p className="text-white mt-1 desktop:text-[1.125rem]">
                  {title}
                </p>

                <button
                  className="group/book absolute right-[0.5rem] top-[0.5rem] bg-slate-900/50 w-8 h-8 rounded-full hover:bg-white"
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
      <Navigation setRefresh={setRefresh}/>
      <div className="desktop:ml-32">
        <Searchbar
          showComponent={showComponent}
          setShowComponent={setShowComponent}
          onSearch={userInput}
          refresh={refresh}
        />
        {showComponent ? (
          <div>
            <h1 className="text-white">
              Found {filteredData.length} results for &quot;{query}&quot;
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
