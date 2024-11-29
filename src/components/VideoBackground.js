/*import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const VideoBackground = () => {
    // fetch trailer video

    const getMovieVideo = async () =>{
        const data = fetch(
        "https://api.themoviedb.org/3/movie/912649/videos?language=en-US",
         API_OPTIONS );
        const json = (await data).json();
        console.log(json);

        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData[0];
        console.log(trailer); 
    };
    useEffect(() => {
        getMovieVideo();
    }, []);
    return (
        <div>
            video VideoBackground
        </div>
    )
}

export default VideoBackground;*/

import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
    const trailerVideo = useSelector(store => store.movies?.trailerVideo);

    useMovieTrailer(movieId);
    
    return (
        <div className="w-screen">
             <iframe 
              className="w-screen aspect-video" 
              src={"https://www.youtube.com/embed/" +
                 trailerVideo?.key +
                  "?&autoplay=1&mute=1"
                } 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
             ></iframe>
        </div>
    );
};

export default VideoBackground;
  