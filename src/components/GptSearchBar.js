import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import lang from "../utils/languageConstants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);

    const searchMovieTMDB = async (movie) => {
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query=" + 
             movie + 
             "&include_adult=false&language=en-US&page=1",
             API_OPTIONS
        );
        const json = await data.json(); 
        return json.results;
    }

    const handleGptSearchClick = async () => {
         console.log(searchText.current.value);
         // make an API call to GPT API and get Movie Results

        const getQuery = 
        "Act as a Movie Recommendation system and suggest some movies for the query :" +
         searchText.current.value + 
         ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result:  Gadar, Sholay, Don, KGF, 3 iditos";

        const gptResults = await openai.chat.completions.create({
            messages: [{ role: "user", content: getQuery }],
            model:"gpt-3.5-turbo",
        });

        if(!gptResults.choices) {
            // TODO: Write Error Handling
        }
        console.log(gptResults.choices?.[0]?.message?.content);

        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

        const tmdbResults = await Promise.all(promiseArray);

        console.log(tmdbResults); 

        dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults:  tmdbResults }));
    };   

    return (
        <div className="pt-[10%] flex justify-center">
            <form 
              className="w-1/2 bg-black grid grid-cols-12"
              onSubmit={(e) => e.preventDefault()}
            >
                <input 
                    ref={searchText}
                    type="text" 
                    className="p-4 m-4 col-span-9" 
                    placeholder={lang[langKey].gptSearchPlaceholder}  
                />
                <button  
                    className="m-4 py-2 px-4 col-span-3 bg-red-700 text-white rounded-lg"
                    onClick={handleGptSearchClick}
                    >
                    {lang[langKey].search} 
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;

/*import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";
import debounce from 'lodash.debounce';
import { API_OPTIONS } from "../utils/constants";
 
const GptSearchBar = () => {
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);

    const [loading, setLoading] = useState(false);

    const currentLang = lang[langKey] || lang['en'];

    const searchMovieTMDB = async (movie) => {
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query=" + 
             movie + 
             "&include_adult=false&language=en-US&page=1",
             API_OPTIONS
        );
        const json = await data.json(); 
        return json.results;
    }

    const retryRequest = async (retries = 3, delay = 2000) => {
        const getQuery = "Act as a Movie Recommendation system and suggest some movies for the query :" +
            searchText.current.value + 
            "only give me names of 5 movies, comma separated like the example result given ahead. Example Result:  Gadar, Sholay, Don, KGF, 3 idiots";

        try {
            const getResults = await openai.chat.completions.create({
                messages: [{ role: "user", content: getQuery }],
                model: "gpt-3.5-turbo",
            });

            if(!getResults.choice) {
                // TODO: write Error Handling
            }
            console.log(getResults.choices?.[0]?.message.content);

            const getMovie = getResult.choices?[0]?.message?.content.split(",")
        }
         catch (error) {
            if (error.response?.status === 429 && retries > 0) {
                
                console.log(`Rate limit hit, retrying... ${retries} attempts left.`);
                await new Promise((resolve) => setTimeout(resolve, delay));
                return retryRequest(retries - 1, delay);
            }
            
            console.error("Error fetching results:", error);
            alert("Error occurred, please try again.");
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearch = debounce(() => {
        if (searchText.current?.value) {
            handleGptSearchClick();
        }
    }, 1000); 

    const handleGptSearchClick = async () => {
        setLoading(true);  
        await retryRequest();
    };

    return (
        <div className="pt-[10%] flex justify-center">
            <form className="w-1/2 bg-black grid grid-cols-12"
                onSubmit={(e) => e.preventDefault()}
            >
                <input 
                    ref={searchText}
                    type="text" 
                    className="p-4 m-4 col-span-9" 
                    placeholder={currentLang?.gptSearchPlaceholder || 'Search...'}  
                    onChange={debouncedSearch}  
                />
                <button  
                    className="m-4 py-2 px-4 col-span-3 bg-red-700 text-white rounded-lg"
                    onClick={handleGptSearchClick}
                    disabled={loading}  
                >
                    {currentLang?.search || 'Search'} 
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;
*/