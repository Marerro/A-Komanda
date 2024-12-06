import { useEffect } from "react";
import { useState } from "react";
import bookmarkIconEmpty from "@assets/icon-bookmark-empty.svg"




export default function TvSeries() {
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
    const tvseries = data.filter(item => item.category === "TV Series");

    return (
        <div className="bg-[#10141E] ">
            <h1 className="text-[1.25rem] text-white">TV Series</h1>
            <div >
                <div className="flex flex-wrap gap-[0.94rem]">
                   
                    {tvseries.map((tvserie) => {
                        return (

                            <div key={tvserie.id}>
                                 <img className="w-[2rem] h-[2rem] relative left-[11rem] top-[3rem]" src={bookmarkIconEmpty} alt="" />
                                <img className="w-[15rem]"
                                
                                    src={tvserie.thumbnail.regular.small} 
                                    alt="movie-image"
                                />
                                <div className="text-white">
                                    <span>{tvserie.year}</span> <span>{tvserie.category}</span> <span>{tvserie.rating}</span>
                                </div>
                                <h3 className="text-white">{tvserie.title}</h3>

                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}




