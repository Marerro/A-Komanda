import { useState, useEffect, useRef } from "react";
import { getAll } from "../helpers/get";
import movieIcon from "@assets/icon-category-movie.svg";
import bookmarkIconEmpty from "@assets/icon-bookmark-empty.svg";
import bookmarkIconFull from "@assets/icon-bookmark-full.svg";
import { useDraggable } from "react-use-draggable-scroll";
import { patchData } from "../helpers/update";

const Trending = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(0);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const data = await getAll();
      setData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const ref = useRef();
  const { events } = useDraggable(ref);

  useEffect(() => {
    fetchData();
  }, [update]);

  return (
    <>
      <div>
        <h1 className="mobile:heading-xs tablet:heading-l text-[1.25rem] mobile:pl-[1rem] mobile:pb-[1rem] tablet:pl-[2.5rem] tablet:pt-[2.5rem]">
          Trending
        </h1>
      </div>
      <div
        className="min-w-[23.4375rem] min-h-[8.75rem] bg-[#10141E] mobile:pl-[1rem] tablet:pl-[2.5rem] overflow-x-auto no-scrollbar"
        {...events}
        ref={ref}
      >
        <div className="flex mobile:gap-[1rem] tablet:gap-[2.5rem]">
          {data.map((show) => {
            const {
              id,
              title,
              thumbnail,
              trending,
              regular,
              year,
              category,
              rating,
              isBookmarked,
              isTrending,
            } = show;

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
                onClick={() => unBookmark(id)}
                className="absolute mobile:top-[0.5rem] mobile:right-[0.5rem] tablet:top-[1rem] tablet:right-[1.5rem] bg-dark-blue/50 w-8 h-8 rounded-full hover:fill-white hover:duration-500 hover-elements"
              >
                <img
                  src={bookmarkIconFull}
                  alt="MovieIcon"
                  className="m-auto"
                />
              </button>
            ) : (
              <button
                onClick={() => bookMark(id)}
                className="absolute mobile:top-[0.5rem] mobile:right-[0.5rem] tablet:top-[1rem] tablet:right-[1.5rem] bg-dark-blue/50 w-8 h-8 rounded-full hover:fill-white hover:duration-500 hover-elements"
              >
                <img
                  src={bookmarkIconEmpty}
                  alt="MovieIcon"
                  className="m-auto rotate-1"
                />
              </button>
            );

            if (isTrending) {
              return (
                <div key={show.id} className="relative">
                  <div>{bookMarking}</div>
                  <picture>
                    <source
                      media="(min-width: 768px)"
                      srcSet={thumbnail.trending.large}
                    />
                    <img
                      className="min-w-[15rem] min-h-[8.75rem] max-w-[29.375rem] max-h-[14.375rem] mobile:w-[15rem] mobile:h-[8.75rem] tablet:w-[29.375rem] tablet:h-[14.375rem] rounded-[0.5rem] hover-elements"
                      src={thumbnail.trending.small}
                      alt="TV shows"
                    />
                  </picture>
                  <div className="absolute mobile:top-[5.37rem] mobile:left-[1rem] tablet:top-[9.62rem] tablet:left-[1.5rem] flex place-items-center">
                    <p className="text_above_title mobile:body-s tablet:body-m mr-[0.5rem]">
                      {year}
                    </p>
                    <p className="text_above_title mobile:body-s tablet:body-m">
                      &#8226;
                    </p>
                    <img
                      src={movieIcon}
                      alt="MovieIcon"
                      className="text_above_title w-[0.75rem] h-[0.75rem] mr-[0.38rem] ml-[0.5rem]"
                    />
                    <p className="text_above_title mobile:body-s tablet:body-m">
                      {category}
                    </p>
                    <p className="text_above_title mobile:body-s mx-[0.5rem] tablet:body-m">
                      &#8226;
                    </p>
                    <p className="text_above_title mobile:body-s mobile:mr-[0.5rem] tablet:body-m tablet:mr-[5rem]">
                      {rating}
                    </p>
                    <div className="absolute top-[1rem]">
                      <p className="mobile:body-m tablet:heading-m">{title}</p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Trending;
