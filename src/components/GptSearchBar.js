/*import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
    const langKey = useSelector((store) => store.config.lang);
    return (
        <div className="pt-[10%] flex justify-center ">
            <form className="w-1/2 bg-black gird grid-cols-12">
                <input 
                 type="text" 
                 className="p-4 m-4 col-span-9" 
                 placeholder ={lang[langKey].gptSearchPlaceholder}/>
                <button  
                 className="m-4 py-2 px-4 col-span-3 bg-red-700 text-white rounded-lg">
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    )
};
export default GptSearchBar;*/

import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
    const langKey = useSelector((store) => store.config.lang);

    // Ensure that langKey exists and fallback to 'en' (or another default language) if not
    const currentLang = lang[langKey] || lang['en']; // Fallback to 'en' if langKey is invalid

    return (
        <div className="pt-[10%] flex justify-center">
            <form className="w-1/2 bg-black grid grid-cols-12">
                <input 
                    type="text" 
                    className="p-4 m-4 col-span-9" 
                    placeholder={currentLang?.gptSearchPlaceholder || 'Search...'}  // Use optional chaining and fallback
                />
                <button  
                    className="m-4 py-2 px-4 col-span-3 bg-red-700 text-white rounded-lg">
                    {currentLang?.search || 'Search'}  {/* Optional chaining and fallback */}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;
