import { useEffect } from "react";
import { getAll } from "../helpers/get";
import { useState } from "react";
import category_TV from "@assets/icon-category-tv.svg";
import category_movie from "@assets/icon-category-movie.svg";
import icon_search from "@assets/icon-search.svg";
import { useLocation } from "react-router";

// page says what page is search on, if page = null, then search works on all shows
function SearchBar({ showComponent, setShowComponent, page }) {
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        let movie = await getAll();
        if(page == "bookmarks") movie = movie.filter((show) => show.isBookmarked); //only bookmarked shows in search on bookmarks page
        setMovies(movie);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllMovies();
  }, []);

  const filteredMovies = movies.filter((item) =>
    item.title.toLowerCase().includes(input.toLowerCase())
  );

  const checkInput = (e) => {
    setInput(e.target.value);
    setShowComponent(e.target.value.length > 0);
  };

  const placeholderBasedOnLocation = () => {
    if (location.pathname === "/home") {
      return "adadasdasd"
     } else if (location.pathname === "/movies") {
          return "bbbbbb"
        }
      }

  useEffect(() => {
    setIsVisible(input.length > 0);
  }, [input]);

  return (
    <>
      <div className="flex my-[1.63rem]">
        <img
          className="w-[1.5rem] h-[1.5rem] ml-[1rem] mr-[1rem]"
          src={icon_search}
          alt="#"
        />
        <input
          className="w-[16.0625rem] h-[1.5rem] border-none bg-[#10141E] body-m placeholder-white text-[1rem] placeholder-opacity-50 text-white p-0 search-input"
          type="text"
          placeholder={placeholderBasedOnLocation()}
          value={input}
          onChange={(e) => checkInput(e)}
        />
      </div>

      <div>
        {isVisible && filteredMovies.length > 0 && (
          <div>
            <p className="text-[#FFF] mb-2">
              Found {filteredMovies.length} results for '{input}'
            </p>
          </div>
        )}
      </div>

      <div className="">
        <div className="grid grid-cols-2 gap-[0.94rem]">
          {isVisible &&
            filteredMovies.map((movie) => {
              const {
                id,
                title,
                thumbnail,
                trending,
                small,
                large,
                regular,
                year,
                category,
                rating,
                isBookmarked,
                isTrending,
              } = movie;
              return (
                <>
                  <div key={id} className="">
                    <div className="m-auto z-0 gap-[0.94rem]">
                      <div className="gap-[0.94rem] justify-center">
                        <img
                          className="rounded-[0.5rem] [23.4375rem] h-[8.75rem]"
                          src={thumbnail.regular.small}
                          alt="#"
                        />
                      </div>
                      <div className="flex place-items-center card_content text-[#FFF]/[0.75] gap-[0.5rem;] text-[0.6875rem]">
                        <p>{year}</p>
                        <span>&#8226;</span>
                        {category === "Movie" && (
                          <img
                            className="w-[0.625rem] shrink h-[0.625rem]"
                            src={category_movie}
                            alt="#"
                          />
                        )}
                        {category === "TV Series" && (
                          <img
                            className="w-[0.625rem] shrink h-[0.625rem]"
                            src={category_TV}
                            alt="#"
                          />
                        )}
                        <p>{category}</p>
                        <span>&#8226;</span>
                        <p>{rating}</p>
                      </div>
                      <div>
                        <p className="text-[#FFF] text-[0.875rem]">{title}</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default SearchBar;
