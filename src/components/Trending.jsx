import { useState, useEffect, useRef } from "react";
import { getAll } from "../helpers/get"
import movieIcon from "@assets/icon-category-movie.svg"
import tvSeries from "@assets/icon-category-tv.svg"
import bookmarkIconEmpty from "@assets/icon-bookmark-empty.svg"
import bookmarkIconFull from "@assets/icon-bookmark-full.svg"
import bookmarkIconHover from "@assets/bookmark_onHover.svg"
import { useDraggable } from "react-use-draggable-scroll";
import { patchData } from "../helpers/update";
import playButton from "@assets/icon-play.svg"

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
        <h1 className="heading-xs mobile:heading-xs- tablet:heading-l pl-[1rem] mobile:pl-[1rem] tablet:pl-[1.56rem] desktop:pl-[2.25rem] tracking-[0.05rem] mobile:mt-[1.4rem] tablet:mt-[0.9rem] tablet:tracking-[0.00215rem] mb-[1rem] mobile:mb-[1rem] tablet:mb-[1.3rem] desktop:mb-[1.4rem]">
          Trending
        </h1>
      </div>
      <div
        className="bg-[#10141E] pl-[1rem] mobile:pl-[1rem] tablet:pl-[1.56rem] desktop:pl-[2.25rem] overflow-x-auto no-scrollbar"
        {...events}
        ref={ref}
      >
        <div className="flex gap-[1rem] mobile:gap-[1rem] tablet:gap-[2.5rem]">
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

            const bookMarking = isBookmarked ? <button onClick={() => unBookmark(id)} className="absolute top-[0.5rem] right-[0.5rem] mobile:top-[0.5rem] mobile:right-[0.5rem] tablet:top-[1rem] tablet:right-[1.5rem] bg-dark-blue/50 w-8 h-8 rounded-full group/bookmark z-50">
              <img className="m-auto group-hover/bookmark:invisible" src={bookmarkIconFull} />
              <img className="m-auto invisible group-hover/bookmark:visible absolute top-0 right-0" src={bookmarkIconHover} />
            </button> : <button onClick={() => bookMark(id)} className="absolute top-[0.5rem] right-[0.5rem]mobile:top-[0.5rem] mobile:right-[0.5rem] tablet:top-[1rem] tablet:right-[1.5rem] bg-dark-blue/50 w-8 h-8 rounded-full group/bookmark z-50">
              <img className="m-auto group-hover/button:invisible rotate-1" src={bookmarkIconEmpty} />
              <img className="m-auto invisible group-hover/bookmark:visible absolute top-0 right-0" src={bookmarkIconHover} />
            </button>
            if (isTrending) {
              return (
                <div key={show.id} className="relative group/play">
                  <div>{bookMarking}</div>
                  <picture>
                    <source
                      media="(min-width: 768px)"
                      srcSet={thumbnail.trending.large} />
                    <img
                      className="max-w-[29.375rem] max-h-[14.375rem]
                      w-[15rem] h-[8.75rem] mobile:w-[15rem] mobile:h-[8.75rem] tablet:w-[29.375rem] tablet:h-[14.375rem]
                       rounded-[0.5rem] group-hover/play:opacity-50 hover:duration-500"
                      src={thumbnail.trending.small}
                      alt="TV shows"/>
                       <div className="group-hover/play:opacity-100 flex items-center absolute top-0 bottom-2 mobile:bottom-2 tablet:bottom-0 left-0 right-0 m-auto w-[5.2rem] h-[2.1rem] mobile:w-[5.2rem] mobile:h-[2.1rem] tablet:w-[7.3125rem] tablet:h-[3rem] bg-white bg-opacity-25 rounded-full opacity-0 hover:opacity-100 hover:duration-500 cursor-pointer">
                    <button><img src={playButton} alt="playButton" className="w-[1.4rem] h-[1.4rem] mobile:w-[1.4rem] mobile:h-[1.4rem] tablet:w-[1.875rem] tablet:h-[1.875rem] ml-[0.56rem] mr-[0.56rem] mobile:mr-[0.6rem] tablet:mr-[1.19rem]" /></button>
                    <p className="heading-xs mobile:heading-xs tablet:heading-s">Play</p>
                  </div>
                  </picture>
                  <div className="absolute top-[5.37rem] left-[1rem] mobile:top-[5.37rem] mobile:left-[1rem] tablet:top-[9.62rem] tablet:left-[1.5rem] flex place-items-center">

                    <p className="text_above_title body-s mobile:body-s tablet:body-m mr-[0.4rem]">{year}</p>
                    <p className="text_above_title body-s mobile:body-s tablet:body-m">&#8226;</p>
                    <img src={movieIcon} alt="MovieIcon" className="text_above_title mr-[0.36rem] ml-[0.41rem] mobile:mr-[0.36rem] mobile:ml-[0.41rem] tablet:ml-[0.5rem]" />
                    <p className="text_above_title body-s mobile:body-s tablet:body-m">{category}</p>
                    <p className="text_above_title body-s mobile:body-s mx-[0.4rem] mobile:mx-[0.4rem] tablet:mx-[0.5rem] tablet:body-m">&#8226;</p>
                    <p className="text_above_title body-s mobile:body-s mr-[0.5rem] mobile:mr-[0.5rem] tablet:body-m tablet:mr-[5rem]">{rating}</p>
                    <div className="absolute top-[1.2rem] mobile:top-[1.2rem] tablet:top-[1.4rem]">
                      <p className="body-m mobile:body-m tablet:heading-m movie-title">{title}</p>
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