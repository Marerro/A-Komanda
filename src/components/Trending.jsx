import { useState, useEffect, useRef } from "react";
import { getAll } from "../helpers/get"
import movieIcon from "@assets/icon-category-movie.svg"
import bookmarkIconEmpty from "@assets/icon-bookmark-empty.svg"
import bookmarkIconFull from "@assets/icon-bookmark-full.svg"
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
            <div className="min-w-[23.4375rem] min-h-[8.75rem] bg-[#10141E] pl-[1rem] overflow-x-auto no-scrollbar" {...events} ref={ref}>
                <h1 className="pb-[1rem] text-white text-[1.25rem]">Trending</h1>
                <div className="flex gap-[1rem]">
                    {data.map((show) => {
                        const { id, title, thumbnail, trending, regular, year, category, rating, isBookmarked, isTrending } = show;



                        const bookMark = async (id) => {
                            await patchData(id, { isBookmarked: true });
                            setUpdate((prev) => prev + 1);
                        };

                        const unBookmark = async (id) => {
                            await patchData(id, { isBookmarked: false })
                            setUpdate((prev) => prev + 1);
                        };

                        const bookMarking = isBookmarked ? <button onClick={() => unBookmark(id)}><img src={bookmarkIconFull} alt="MovieIcon" className="absolute w-[2rem] h-[2rem] top-[2rem] right-[0.5rem]" /></button> : <button onClick={() => bookMark(id)}><img src={bookmarkIconEmpty} alt="MovieIcon" className="absolute w-[2rem] h-[2rem] top-[2rem] right-[0.5rem] rotate-2"/></button>

                        if (isTrending) {

                            return (
                                <div key={show.id} className="relative text-white ">
                                    <div>{bookMarking}</div>
                                    <img src={thumbnail.regular.small} alt="#" className="min-w-[15rem] min-h-[8.75rem] rounded-[0.5rem]" />
                                    <div className="absolute top-[5.37rem] left-[1rem] text-center flex ">
                                        <p>2019 &#8226; </p>
                                        <img src={movieIcon} alt="MovieIcon" className="w-[0.75rem] h-[0.75rem] mr-[0.38rem] ml-[0.5rem]" />
                                        <p>Movie &#8226; {rating}
                                        </p>
                                        <div className="absolute top-[1.25rem]">
                                            <p>{title}</p>
                                        </div>

                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </>
    );
};

export default Trending