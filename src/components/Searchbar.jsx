import { useEffect } from "react";
import { getAll } from "../helpers/get";
import { useState } from "react";
import category_TV from "@assets/icon-category-tv.svg";
import category_movie from "@assets/icon-category-movie.svg";
import icon_search from "@assets/icon-search.svg";
import { useLocation } from "react-router";

// page says what page is search on, if page = null, then search works on all shows
function SearchBar({ showComponent, setShowComponent, page, onSearch }) {
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const location = useLocation();

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        let movie = await getAll();
        if (page == "bookmarks")
          movie = movie.filter((show) => show.isBookmarked); //only bookmarked shows in search on bookmarks page
        setMovies(movie);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllMovies();
  }, []);

  const checkInput = (e) => {
    const query = e.target.value;
    setInput(query); // Atnaujiname vartotojo įvestį
    setShowComponent(query.length > 0);

    if (onSearch) {
      onSearch(query); // Filtravimo logika perduodama į `Movies.jsx`
    }
  };

  const placeholderBasedOnLocation = () => {
    if (location.pathname === "/home") {
      return "Search for movies or TV series";
    } else if (location.pathname === "/movies") {
      return "Search for movies";
    } else if (location.pathname === "/tvseries") {
      return "Search for TV series";
    } else if (location.pathname === "/bookmarks") {
      return "Search for bookmarked shows";
    }
  };

  useEffect(() => {}, [input]);

  return (
    <>
      <div className="flex mobile:my-[1.5rem] tablet:my-[2.06rem] desktop:mt-[4rem] tablet:items-center">
        <div>
          <img
            className="mobile:w-[1.5rem] mobile:h-[1.5rem] tablet:w-[2rem] tablet:h-[2rem] mobile:ml-[1rem] mobile:mr-[1rem] tablet:ml-[1.56rem] tablet:mr-[1.5rem] desktop:ml-[2.25rem] tablet:mb-[0.87rem]"
            src={icon_search}
            alt="#"
          />
        </div>
        <input
          className="mobile:w-[16.0625rem] mobile:h-[1.5rem] tablet:w-[30.25rem] tablet:h-[2rem] desktop:w-[74rem] desktop:h-[2.9375rem] border-none bg-[#10141E] body-m placeholder-white mobile:text-[1rem] tablet:text-[1.5rem] placeholder-opacity-50 p-0 search-input tablet:pb-[0.88rem] desktop:pb-[0.88rem]"
          type="text"
          placeholder={placeholderBasedOnLocation()}
          value={input}
          onChange={checkInput}
        />
      </div>
    </>
  );
}

export default SearchBar;
