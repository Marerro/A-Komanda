import { useEffect } from "react";
import { useState } from "react";


export default function Movies() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/data");
                const data = await response.json();

                setData(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    });
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="bg-[#10141E] ">
            <h1 className="text-[1.25rem] text-white">Movies</h1>
            <div >
                <div className="flex flex-wrap gap-[0.94rem]">
                   
                    {data.map((movie) => {
                        return (

                            <div key={movie.id}>
                                 <img className="w-[2rem] h-[2rem] relative left-[11rem] top-[3rem]" src="src/assets/icon-bookmark-empty.svg" alt="" />
                                <img className="w-[15rem]"

                                    src={movie.thumbnail.regular.small} 
                                    alt="movie-image"
                                />
                                <div className="text-white">
                                    <span>{movie.year}</span> <span>{movie.category}</span> <span>{movie.rating}</span>
                                </div>
                                <h3 className="text-white">{movie.title}</h3>

                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}



