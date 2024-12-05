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
        <>
            <h1>Movies</h1>
            <div>
                <div>
                    {data.map((movie) => {
                        return (

                            <div key={movie.id}>
                                <img

                                    src={"src" + movie.thumbnail.regular.small.slice(1)} 
                                    alt="movie-image"
                                />
                                <div>
                                    <span>{movie.year}</span> <span>{movie.category}</span> <span>{movie.rating}</span>
                                </div>
                                <h3>{movie.title}</h3>

                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}




