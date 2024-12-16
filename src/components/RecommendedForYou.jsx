import { useState, useEffect } from "react";
import { patchData } from "../helpers/update";
import category_movie from "@assets/icon-category-movie.svg";
import category_TV from "@assets/icon-category-tv.svg";
import bookmarkIconEmpty from "@assets/icon-bookmark-empty.svg";
import bookmarkIconFull from "@assets/icon-bookmark-full.svg";

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
    <div className="bg-[#10141E] m-auto gap-3 grid desktop:grid-cols-4 desktop:w-[90rem] desktop:h-[131.5625rem] mobile:grid-cols-2 mobile:w-[23.4375rem] tablet:grid-cols-3 tablet:w-[48rem]">
      {movies.map((movie) => {
        const { id, title, thumbnail, year, category, rating, isBookmarked } =
          movie;

        return (
          <div key={id} className="relative">
            <div className="mobile:m-[0.5rem] min-h-[0.5rem] tablet:ml-[1.53rem]">
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
                  className="w-[3rem] h-[1rem] max-w-[29.375rem] max-h-[14.375rem] mobile:w-[10.25rem] mobile:h-[6.875rem] tablet:w-[13.75rem] tablet:h-[8.75rem] rounded-[0.5rem] desktop:w-[17.5rem] desktop:h-[10.875rem] hover-elements"
                  src={thumbnail.regular.small}
                  alt={title}
                />
              </picture>
            </div>

            <button
              className="absolute mobile:top-[0.9rem] mobile:left-[8.60rem] tablet:top-[1rem] tablet:left-[13rem] desktop:left-[16.5rem] desktop:top-[1rem] bg-dark-blue/50 w-8 h-8 rounded-full hover:fill-white hover:duration-500 hover-elements"
              onClick={() => toggleBookmark(id, isBookmarked)}
            >
              <img
                src={isBookmarked ? bookmarkIconFull : bookmarkIconEmpty}
                alt="Bookmark Icon"
                className="m-auto"
              />
            </button>

            <div className="flex place-items-center card_content text-[#FFF]/[0.75] ml-[0.5rem] gap-[0.5rem;] text-[0.6875rem] tablet:ml-[1.56rem] tablet:gap-[0.5rem]">
              <p>{year}</p>
              <span>&#8226;</span>
              {category === "Movie" && (
                <img
                  className="w-[0.625rem] shrink h-[0.625rem]"
                  src={category_movie}
                  alt="Movie Icon"
                />
              )}
              {category === "TV Series" && (
                <img
                  className="w-[0.625rem] shrink h-[0.625rem]"
                  src={category_TV}
                  alt="TV Icon"
                />
              )}
              <p>{category}</p>
              <span>&#8226;</span>
              <p>{rating}</p>
            </div>

            <p className="text-[#FFF] text-[0.875rem] mobile:ml-[0.5rem] tablet:ml-[1.56rem]">
              {title}
            </p>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <div className="mobile:heading-xs tablet:heading-l text-[1.25rem] mobile:pl-[1rem] mobile:pb-[1rem] tablet:pl-[2.5rem] tablet:pt-[2.5rem] recommended_container">
        <h3 className="mobile:heading-xs tablet:heading-l text-[1.25rem] mobile:pl-[1rem] mobile:pb-[1rem] tablet:pl-[2.5rem] tablet:pt-[2.5rem] desktop:pr-[60.25rem] font-outfit">
          Recommended for you
        </h3>
      </div>
      {renderMovieCards(recommendMovies)}
    </>
  );
}
