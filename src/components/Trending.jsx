import { useState, useEffect } from "react";
import { getAll } from "../helpers/get"

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
            <div>
                <h1>Trending</h1>
                {data.map((show) => {
                    const { id, title, thumbnail, trending, small, large, regular, year, category, rating, isBookmarked, isTrending } = show;

                    if (isTrending) {
                        return (
                            <div key={id}>
                                <img src={show.thumbnail} alt="#" />
                            </div>
                        )
                    }
                })}
            </div>
        </>
    );
};

export default Trending