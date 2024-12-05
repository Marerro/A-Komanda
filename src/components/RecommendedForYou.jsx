import { useState, useEffect } from "react";
import { getAll } from "../helpers/get";
import category_icon from "@assets/icon-category-movie.svg";

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
      <div className="m-1 grid grid-cols-2">
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
            <div key={id} className="">
              <div className="grid grid-cols-2 gap-3 w-[23.4375rem] h-[8.75rem] justify-center">
                <img
                  className="rounded"
                  src={itemData.thumbnail.regular.small}
                  alt="#"
                />
              </div>
              <div className="flex card_content">
                <p>{year}</p>
                <span>&#8226;</span>
                <img src={category_icon} alt="#" />
                <p>{category}</p>
                <span>&#8226;</span>
                <p>{rating}</p>
              </div>
              <p>{title}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default RecommendedForYou;
