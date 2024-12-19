import { useState, useEffect } from "react";
import { patchData } from "../helpers/update";
import category_movie from "@assets/icon-category-movie.svg";
import category_TV from "@assets/icon-category-tv.svg";
import bookmarkIconEmpty from "@assets/icon-bookmark-empty.svg";
import bookmarkIconFull from "@assets/icon-bookmark-full.svg";
import playButton from "@assets/icon-play.svg";
import bookmarkIconHover from "@assets/bookmark_onHover.svg";

export default function RecommendedForYou({update, setUpdate}) {
  const [recommendMovies, setRecommendMovies] = useState([]);

  const url = "http://localhost:5000/data";

  const getRecommendedMovies = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRecommendMovies(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getRecommendedMovies();
  }, [update]);

  const toggleBookmark = async (id, isBookmarked) => {
    try {
      await patchData(id, { isBookmarked: !isBookmarked });
      setUpdate((prev) => prev + 1);
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  // Card rendering
  const renderMovieCards = (movies) => (
    <div className="bg-[#10141E] grid desktop:grid-cols-4 desktop:gap-x-[2.45rem] desktop:px-[2.35rem] tablet:gap-x-[1.69rem] tablet:px-[1.5rem] mobile:grid-cols-2 tablet:grid-cols-3  desktop:pl-[1.74rem] tablet:pl-[1.04rem] tablet:mt-[1.0rem] mobile:ml-[0.5rem] mobile:mt-[0.4rem] mobile:gap-y-[0.39rem] tablet:gap-y-[1.3rem] desktop:gap-y-[1.65rem] desktop:space-y-[-1.rem] m-0 ">
      {movies.map((movie) => {
        const { id, title, thumbnail, year, category, rating, isBookmarked } =
          movie;

        return (
          <div key={id} className="relative group/play">
            <div className="mobile:m-[0.5rem] min-h-[0.5rem] tablet:m-[0] z-20">
              <picture>
                <source
                  className="rounded-lg group-hover/play:opacity-50 hover:duration-500"
                  media="(min-width: 1440px)"
                  src={thumbnail.regular.large}
                  alt="Shows"
                />
                <div className="group-hover/play:opacity-100 flex items-center absolute top-0 mobile:bottom-8 mobile:left-4 tablet:bottom-12 tablet:right-6 left-0 right-6 m-auto mobile:w-[5.2rem] mobile:h-[2.1rem] tablet:w-[7.3125rem] tablet:h-[3rem] desktop:bottom-14 desktop:right-9 bg-white bg-opacity-25 rounded-full opacity-0 hover:opacity-100 hover:duration-500 cursor-pointer z-40">
                  <button>
                    <img
                      src={playButton}
                      alt="playButton"
                      className="mobile:w-[1.4rem] mobile:h-[1.4rem] tablet:w-[1.875rem] tablet:h-[1.875rem] ml-[0.56rem] mobile:mr-[0.6rem] tablet:mr-[1.19rem] z-70"
                    />
                  </button>
                  <p className="mobile:heading-xs tablet:heading-s">Play</p>
                </div>
                <source
                  media="(min-width: 768px)"
                  srcSet={thumbnail.regular.medium}
                />
                <img
                  className="rounded-lg group-hover/play:opacity-50 hover:duration-500 m-0 w-full"
                  src={thumbnail.regular.small}
                  alt={title}
                />
              </picture>
            </div>

            <button
              className="group/book absolute right-[0.5rem] tablet:right-[1.1rem] top-2 tablet:top-[1rem] bg-slate-900/50 w-8 h-8 rounded-full hover:bg-white"
              onClick={() => toggleBookmark(id, isBookmarked)}
            >
              <img
                src={isBookmarked ? bookmarkIconFull : bookmarkIconEmpty}
                alt="Bookmark Icon"
                className="m-auto group-hover/book:invisible"
              />
              <img
                className="group-hover/book:visible absolute top-0 invisible"
                src={bookmarkIconHover}
              />
            </button>

            <div className="flex place-items-center card_content text-[#FFF]/[0.75] ml-[0.5rem] gap-[0.5rem;] mobile:gap-[0.8rem] text-[0.6875rem] tablet:text-[0.8125rem] tablet:gap-[0.8rem] tablet:">
              <p className="mobile:mt-[-0.20rem] mobile:size-[0.6875rem] mobile:translate-y-[-0.13rem] tablet:translate-y-[0.1rem] tablet:translate-x-[-0.48rem]">
                {year}
              </p>
              <span className="mobile:translate-x-[0.3rem] mobile:translate-y-[-0.1rem] tablet:translate-y-[0.3rem] tablet:translate-x-[0.18rem]">
                &#8226;
              </span>
              {category === "Movie" && (
                <img
                  className="w-[0.625rem] shrink h-[0.625rem] mobile:translate-y-[-0.1rem] mobile:translate-x-[-0.15rem] tablet:translate-y-[0.3rem] tablet:translate-x-[-0.2rem] tablet:w-[0.75rem] tablet:h-[0.75rem]"
                  src={category_movie}
                  alt="Movie Icon"
                />
              )}
              {category === "TV Series" && (
                <img
                  className="w-[0.625rem] shrink h-[0.625rem] mobile:translate-y-[-0.08rem] mobile:translate-x-[-0.15rem] tablet:translate-y-[0.4rem] tablet:translate-x-[-0.3rem] tablet:w-[0.75rem] tablet:h-[0.75rem]"
                  src={category_TV}
                  alt="TV Icon"
                />
              )}
              <p className="mobile:mr-[-4px] mobile:mt-[-0.20rem] mobile:translate-x-[-0.68rem] mobile:translate-y-[0.01rem] tablet:translate-x-[-0.68rem] tablet:translate-y-[0.4rem]">
                {category}
              </p>
              <span className="mobile:translate-y-[-0.1rem] mobile:translate-x-[-0.93rem] tablet:translate-y-[0.3rem] tablet:translate-x-[-0.8rem]">
                &#8226;
              </span>
              <p className="mobile:mt-[-0.20rem] mobile:translate-x-[-1.45rem] mobile:translate-y-[-0.15rem] mobile:size-[0.6875rem] tablet:translate-x-[-1.21rem] tablet:translate-y-[0.15rem]">
                {rating}
              </p>
            </div>

            <p className="text-[#FFF] text-[0.875rem] mobile:ml-[0.5rem] tablet:text-[1.125rem] leading-normal tablet:mt-[0.4rem] tablet:ml-0 font-outfit">
              {title}
            </p>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <div className="mobile:heading-xs tablet:heading-l text-[1.25rem] mobile:pl-[1rem] mobile:pb-[1rem] tablet:pl-[1.05rem] tablet:pb-0 recommended_container tablet:mt-[2rem] tablet:mb-[2.5rem] desktop:mt-[2.5rem]">
        <h3 className="mobile:heading-xs tablet:heading-l text-[1.25rem] mobile:mt-[1.4rem] mobile:pb-[1rem] tablet:pl-[0.5rem] tablet:pb-0 tablet:size-[2rem] tablet:w-[25rem] desktop:w-[25rem] tablet:tracking-[-0.03125rem;] tablet:mt-[0rem] font-outfit mobile:size-[1.25rem] desktop:pl-[1.25rem] mobile:w-[25rem] mobile:font-[400] mobile:leading-normal mobile:tracking-[0.0453rem]">
          Recommended for you
        </h3>
      </div>
      {renderMovieCards(recommendMovies)}
    </>
  );
}
