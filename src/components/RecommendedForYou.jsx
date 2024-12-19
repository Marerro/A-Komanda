import { useState, useEffect } from "react";
import { patchData } from "../helpers/update";
import category_movie from "@assets/icon-category-movie.svg";
import category_TV from "@assets/icon-category-tv.svg";
import bookmarkIconEmpty from "@assets/icon-bookmark-empty.svg";
import bookmarkIconFull from "@assets/icon-bookmark-full.svg";
import playButton from "@assets/icon-play.svg";
import bookmarkIconHover from "@assets/bookmark_onHover.svg";
 
export default function RecommendedForYou() {
  const [recommendMovies, setRecommendMovies] = useState([]);
  const [update, setUpdate] = useState(0);
 
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
    <div className="bg-[#10141E] grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 desktop:gap-[2.5rem] tablet:gap-[1.81rem] mobile:gap-[0.94rem] gap-[0.94rem] mx-[1rem] tablet:mx-[1.56rem] desktop:mx-[2.25rem] mobile:gap-y-[0.87rem]">
      {movies.map((movie) => {
        const { id, title, thumbnail, year, category, rating, isBookmarked } =
          movie;
 
        return (
          <div key={id} className="relative group/play">
            <div className=" min-h-[0.5rem] tablet:m-[0] z-20">
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
              className="group/book absolute right-[0.5rem] tablet:right-[1rem] top-2 tablet:top-[1rem] bg-slate-900/50 w-8 h-8 rounded-full hover:bg-white"
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
 
            <div className="flex gap-[0.3rem] mobile:gap-[0.3rem] tablet:gap-[0.415rem] desktop:gap-[0.4rem] body-s tablet:body-s desktop:body-s mt-[0.4rem] mobile:mt-[0.5rem] tablet:mt-[0.5rem] desktop:mt-[0.28rem]  opacity-75 text-[0.6875rem] tablet:text-[0.8125rem] desktop:text-[0.8125rem]">
              <p className="tv_series_text_above tablet:text-[0.8125rem]">
                {year}
              </p>
              <span className="tv_series_text_above tablet:text-[0.8125rem] mobile:mr-[0.1rem]">
                &#8226;
              </span>
              {category === "Movie" && (
                <img
                  className="w-[0.625rem] h-[0.625rem] tablet:w-[0.75rem] tablet:h-[0.75rem] desktop:w-[0.75rem] desktop:h-[0.75rem] mobile:mr-[0.15rem] mobile:translate-y-[0.12rem] translate-y-[0.3rem]"
                  src={category_movie}
                  alt="Movie Icon"
                />
              )}
              {category === "TV Series" && (
                <img
                  className="w-[0.625rem] shrink h-[0.625rem] mobile:translate-y-[0.1rem] mobile:translate-x-[-0.15rem] tablet:translate-y-[0.4rem] tablet:translate-x-[rem] mobile:ml-[0.1rem] tablet:w-[0.75rem] tablet:h-[0.75rem] tablet:mr-[0.1rem]"
                  src={category_TV}
                  alt="TV Icon"
                />
              )}
              <p className="tv_series_text_above mobile:ml-[-0.2rem] tablet:text-[0.8125rem]">
                {category}
              </p>
              <span className="tv_series_text_above mobile:ml-[0.1rem] mobile:mr-[0.02rem] tablet:text-[0.8125rem]">
                &#8226;
              </span>
              <p className="tv_series_text_above tablet:text-[0.8125rem]">
                {rating}
              </p>
            </div>
 
            <p className="section-s mobile:section-s tablet:heading-xs desktop:heading-xs tablet:mb-[-0.27rem] mobile:mb-[0.11rem] mobile:mt-[0.27rem] mb-[0.05rem] desktop:mb-[-0.51rem] tv_series_title">
              {title}
            </p>
          </div>
        );
      })}
    </div>
  );
 
  return (
    <>
      <div className="mobile:heading-xs tablet:heading-l text-[1.25rem] mobile:pl-[1.05rem] mobile:mb-[1.9rem] tablet:pl-[1.05rem] tablet:pb-0 recommended_container tablet:mt-[2.1rem] tablet:mb-[2.35rem] desktop:mt-[2.25rem] desktop:mb-[2.77rem]">
        <h3 className="mobile:heading-xs tablet:heading-l text-[1.25rem] mobile:mt-[1.4rem] tablet:pl-[0.5rem] tablet:pb-0 tablet:size-[2rem] tablet:w-[25rem] desktop:w-[25rem] tablet:tracking-[-0.03125rem;] tablet:mt-[0rem] font-outfit mobile:size-[1.25rem] desktop:pl-[1.23rem] mobile:w-[25rem] mobile:font-[400] mobile:leading-normal mobile:tracking-[0.0453rem]">
          Recommended for you
        </h3>
      </div>
      {renderMovieCards(recommendMovies)}
    </>
  );
}