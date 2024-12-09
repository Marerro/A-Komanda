import { useEffect } from "react";
import { getAll } from "../helpers/get";
import { useState } from "react";
import category_TV from "@assets/icon-category-tv.svg";
import category_movie from "@assets/icon-category-movie.svg";

function SearchBar() {
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const movie = await getAll();
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

  useEffect(() => {
    setIsVisible(input.length > 0);
  }, [input]);

  return (
    <>
      <div>
        <input
          className="w-[257px] h-[24px]"
          type="text"
          placeholder="Search for Movies or TV series"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div>
        <ul>
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
                  <div key={id} className="m-auto relative">
                    <div className="grid grid-cols-2 gap-[0.94rem] w-[23.4375rem] h-[8.75rem] justify-center">
                      <img
                        className="rounded-[0.5rem]"
                        src={thumbnail.regular.small}
                        alt="#"
                      />
                    </div>
                  </div>
                  <div className="flex card_content text-[#FFF]/[0.75] gap-[0.5rem;] text-[0.6875rem]">
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
                </>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default SearchBar;
