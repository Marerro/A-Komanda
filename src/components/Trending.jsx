import { useState, useEffect } from "react";
import { getAll } from "../helpers/get"
import movieIcon from "@assets/icon-category-movie.svg"
import bookmarkIconEmpty from "@assets/icon-bookmark-empty.svg"

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

    useEffect(() => {
        fetchData();
    }, [update]);

    return (
        <>
            <div className="min-w-[23.4375rem] min-h-[8.75rem] bg-[#10141E] pl-[1rem] overflow-x-auto">
                <h1 className="pb-[1rem] text-white text-[1.25rem]">Trending</h1>
                <div className="flex gap-[1rem]">
                    {data.map((show, index) => {
                        const { id, title, thumbnail, trending, regular, year, category, rating, isBookmarked, isTrending } = show;

                        if (isTrending) {
                            return (
                                <div key={index} className="relative text-white ">
                                    <img src={bookmarkIconEmpty} alt="MovieIcon" className="absolute w-[2rem] h-[2rem] top-[0.5rem] right-[0.5rem]" />
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