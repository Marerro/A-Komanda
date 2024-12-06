import { useState, useEffect } from "react";
import { getAll } from "../helpers/get";
import category_icon from "@assets/icon-category-movie.svg";
import bookmark from "@assets/icon-bookmark-empty.svg";

function RecommendedForYou() {
  const [recommendMovies, setRecommendMovies] = useState([]);

  console.log(category_icon);

  const url = "http://localhost:5000/data";

  const getMovies = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Gauti duomenys sekmingai", data);
      setRecommendMovies(data);
    } catch (error) {
      console.error("Duomenys nebuvo gauti iš endpoint", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <div className="recommended_container">
        <h3>Recommended for you</h3>
      </div>
      <div className="bg-[#10141E] m-auto gap-3 grid grid-cols-2">
        {recommendMovies.map((itemData) => {
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

          return (
            <>
              <div className="">
                <div key={id} className="m-auto relative z-0">
                  <div className="grid grid-cols-2 gap-[0.94rem] w-[23.4375rem] h-[8.75rem] justify-center ">
                    <img
                      className="absolute w-[0.72919rem] h-[0.875rem] top-[0.5rem] right-[0.5rem]"
                      src={bookmark}
                      alt="BookmarkIcon"
                    />
                    <img
                      className="rounded-[0.5rem]"
                      src={itemData.thumbnail.regular.small}
                      alt="#"
                    />
                  </div>
                  <div className="flex card_content text-[#FFF]/[0.75] gap-[0.5rem;] text-[0.6875rem]">
                    <p>{year}</p>
                    <span>&#8226;</span>
                    <img
                      className="w-[0.625rem] shrink h-[0.625rem]"
                      src={category_icon}
                      alt="#"
                    />
                    <p>{category}</p>
                    <span>&#8226;</span>
                    <p>{rating}</p>
                  </div>
                  <p className="text-[#FFF] text-[0.875rem]">{title}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default RecommendedForYou;
