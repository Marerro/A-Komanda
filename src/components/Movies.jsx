import { useState, useEffect } from "react";
import { patchData } from "../helpers/update";
import category_movie from "@assets/icon-category-movie.svg";
import bookmark from "@assets/icon-bookmark-empty.svg";
import category_TV from "@assets/icon-category-tv.svg";
import bookmarkIconEmpty from "@assets/icon-bookmark-empty.svg";
import bookmarkIconFull from "@assets/icon-bookmark-full.svg";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar"

export default function Movies() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(0);

  const url = "http://localhost:5000/data";

  const getMovies = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Duomenys nebuvo gauti iš endpoint", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, [update]);
    const movies = data.filter(itemData => itemData.category === "Movie");

    return (
        <>
        <Navigation/>
        <SearchBar />
          <div className="recommended_container">
            <h3 className="text-white">Movies</h3>
          </div>
          <div className="bg-[#10141E] m-auto gap-3 grid grid-cols-2">
            {movies.map((itemData) => {
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
              } = itemData;
    
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
                  className="absolute right-2 top-2 bg-slate-900/50 w-8 h-8 rounded-full"
                  onClick={() => unBookmark(id)}
                >
                  <img src={bookmarkIconFull} alt="MovieIcon" className="m-auto" />
                </button>
              ) : (
                <button
                  className="absolute right-2 top-2 bg-slate-900/50 w-8 h-8 rounded-full"
                  onClick={() => bookMark(id)}
                >
                  <img src={bookmarkIconEmpty} alt="MovieIcon" className="m-auto" />
                </button>
              );
    
              return (
                
                <div key={id} className="">
                  <div className="m-auto relative z-0">
                    <div className="grid grid-cols-2 gap-[0.94rem] w-[23.4375rem] h-[8.75rem] justify-center  ">
                      <img
                        className="rounded-[0.5rem]"
                        src={itemData.thumbnail.regular.small}
                        alt="#"
                      />
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
                      <div>{bookMarking}</div>
                      <p>{category}</p>
                      <span>&#8226;</span>
                      <p>{rating}</p>
                    </div>
                    <p className="text-[#FFF] text-[0.875rem]">{title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
}




