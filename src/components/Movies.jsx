import { useState, useEffect } from "react";
import { patchData } from "../helpers/update";
import category_movie from "@assets/icon-category-movie.svg";
import bookmarkIconHover from "@assets/icon-bookmark-hover.svg";
import category_TV from "@assets/icon-category-tv.svg";
import bookmarkIconEmpty from "@assets/icon-bookmark-empty.svg";
import bookmarkIconFull from "@assets/icon-bookmark-full.svg";
import Navigation from "./Navigation";
import SearchBar from "./Searchbar";
import playIcon from "@assets/icon-play.svg";

export default function Movies() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(0);
  const [showComponent, setShowComponent] = useState(false);
  const [onlyMovies, setOnlyMovies] = useState([]);
  const [query, setQuery] = useState("");

  const url = "http://localhost:5000/data";

  const getMovies = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const moviesFilter = data.filter(
        (item) => item.category.toLowerCase() == "movie"
      );
      setData(data);
      setOnlyMovies(moviesFilter);
    } catch (error) {
      console.error("Duomenys nebuvo gauti iš endpoint", error);
    }
  };
  
  const filterMovies = (query) => {
    setQuery(query);
    if (!query) {
      setOnlyMovies(
        data.filter((item) => item.category.toLowerCase() === "movie")
      );
    } else {
      const lowerCaseQuery = query.toLowerCase();
 
      const filteredMovies = data.filter(
        (movie) =>
          movie.category.toLowerCase() === "movie" &&
          movie.title.toLowerCase().startsWith(lowerCaseQuery)
      );
 
      setOnlyMovies(filteredMovies);
    }
  };

  useEffect(() => {
    getMovies();
  }, [update]);

  const renderMovieCards = (movies) => {
    return (
      <div className="bg-[#10141E]  grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 desktop:gap-[2.5rem] tablet:gap-[1.81rem] mobile:gap-[0.94rem] gap-[0.94rem] mx-[1rem] tablet:mx-[1.56rem] desktop:mx-[2.25rem]">
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
                {/* Thumbnail and Play Icon */}
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

                {/* Info Section */}
                <div className="">
                <div className="flex gap-[0.25rem] mobile:gap-[0.25rem] tablet:gap-[0.5rem] desktop:gap-[0.4rem] body-s tablet:body-s desktop:body-s mt-[0.7rem] mobile:mt-[0.3rem] tablet:mt-[0.5rem] desktop:mt-[0.5rem]  opacity-75 text-[0.6875rem] tablet:text-[0.8125rem] desktop:text-[0.8125rem]">
                  <p className="">{year}</p>
                  <span className="">&#8226;</span>
                  {category.toLowerCase() === "movie" && (
                    <img
                      className="w-[0.625rem]  h-[0.625rem] tablet:w-[0.75rem] tablet:h-[0.75rem] desktop:w-[0.75rem] desktop:h-[0.75rem] mobile:translate-y-[0.20rem] translate-y-[0.3rem]"
                      src={category_movie}
                      alt="Category Icon"
                    />
                  )}
                  <p className="">{category}</p>
                  <span className="">&#8226;</span>
                  <p className="">{rating}</p>
                </div>
                <p className="mt-[0.1rem] tablet:mt-[-0.3rem]    desktop:mt-[-0.4rem]   section-s mobile:section-s tablet:heading-xs desktop:heading-xs">
                  {title}
                </p>
                </div>
                

                {/* Bookmark Button */}
                <button
                  className="group/book absolute right-[0.5rem] tablet:right-[1rem] top-2 tablet:top-[1rem] bg-slate-900/50 w-8 h-8 rounded-full hover:bg-white"
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
      <section className="desktop:ml-32">
        <SearchBar
          setShowComponent={setShowComponent}
          page={"movies"}
          onSearch={filterMovies}
        />

        {showComponent ? (
          // Jei showComponent yra true rodome filtruotus filmus
          <div>
            <h1 className="text-white">
              Found {onlyMovies.length} results for "{query}"
            </h1>
            {renderMovieCards(onlyMovies)}
          </div>
        ) : (
          // Jei showComponent yra false, rodome visus filmus
          <div className="">
            <h3 className="mx-[1rem] mobile:mx-[1rem] tablet:mx-[1.56rem] heading-xs tablet:heading-l desktop:heading-l  mb-[1.3rem] mt-[2.4rem] mobile:mt-[1.5rem]  mobile:mb-[1.5rem] tablet:mb-[1.4rem] tablet:mt-[1rem] desktop:mt-[0.8rem] desktop:mb-[2.2rem]">
              Movies
            </h3>
            {renderMovieCards(onlyMovies)}
          </div>
        )}
      </section>
    </>
  );
}
