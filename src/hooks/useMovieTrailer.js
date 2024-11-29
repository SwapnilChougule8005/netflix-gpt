/*import { useEffect } from "react";
import { addTrailerVideo } from "../utils/movieSlice";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
 
    const getMovieVideo = async () => {
        const data = await fetch(
            "https://api.themoviedb.org/3/movie/"
             + movieId + 
            "/videos?language=en-US",
                API_OPTIONS);

        const json = await data.json();

        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
    
        dispatch(addTrailerVideo(trailer));
    };
    useEffect(() => {
        getMovieVideo();
    }, []);
}

export default useMovieTrailer;*/

import { useEffect } from "react";
import { addTrailerVideo } from "../utils/movieSlice";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
 
    const getMovieVideo = async () => {
        try {
            const data = await fetch(
                "https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US",
                API_OPTIONS
            );

            const json = await data.json();

            // Check if json.results is defined and is an array
            if (Array.isArray(json.results)) {
                const filterData = json.results.filter((video) => video.type === "Trailer");
                const trailer = filterData.length ? filterData[0] : json.results[0];
                dispatch(addTrailerVideo(trailer));
            } else {
                console.error("Expected results to be an array, but got", json.results);
            }
        } catch (error) {
            console.error("Failed to fetch movie video:", error);
        }
    };

    useEffect(() => {
        getMovieVideo();
    }, [movieId]); 
};

export default useMovieTrailer;
