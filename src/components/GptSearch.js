import { BG_URL } from "../utils/constants";
import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
    return (
        <div>
            <div className="fixed -z-10">
                <img 
                className="h-screen object-cover"
                alt="bg-img" 
                src={BG_URL}
                />
            </div>
            <GptSearchBar/>
            <GptMovieSuggestion/>
        </div>
    )
}
export default GptSearch;  