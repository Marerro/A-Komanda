import { useState, useEffect } from "react";
import { getAll } from "../helpers/get"
// import img from "../assets/thumbnails/1998/regular/small.jpg"

const Trending = () => {

    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(0);
    const [error, setError] = useState("");

    // console.log(img);
    
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
                {data.map((show, index) => {
                    const { id, title, thumbnail, trending, regular, year, category, rating, isBookmarked, isTrending } = show;
                    
                    // console.log(thumbnail.regular.small);
                    if (isTrending) {
                        return (
                            
                            <div key={index}>
                                <img src={thumbnail.regular.small} alt="#" />
                            </div>
                        )
                    }
                })}
            </div>
        </>
    );
};

export default Trending