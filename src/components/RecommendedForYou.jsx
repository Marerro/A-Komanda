import { useState, useEffect } from "react";
import { getAll } from "../helpers/get";

function RecommendedForYou() {
  const [recommendMovies, setRecommendMovies] = useState([]);

  const url = "http://localhost:5000/data";

  const getMovies = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Gauti duomenys sekmingai", data);
      setRecommendMovies(data);
    } catch (error) {
      console.error("Duomenys nebuvo išgauti iš endpoint", error);
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
          <div key={id}>
            <div className="grid grid-cols-2 gap-3">
              <img src={thumbnail.small} alt="#" />
            </div>
            <p>{title}</p>
          </div>
        );
      })}
    </>
  );
}

export default RecommendedForYou;
