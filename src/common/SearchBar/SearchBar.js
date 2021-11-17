import { useState, useCallback } from "react";
import { Link } from 'react-router-dom';
import InputBase from "@mui/material/InputBase";
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce';
import CircularProgress from '@mui/material/CircularProgress';

import { searchMovie } from "./SearchAPI";
import { getImagePath } from "../../utility";

const SearchBar = props =>{

    const [inputFocus, setInputFocus] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const onChangeHandler = async event =>{
        setIsLoading(true);
        const value = event.target.value;

        if(!value){ 
            setSuggestions([]);
            setInputFocus(false);
            return
        };

        const params = { query: value };
        const results = await searchMovie(params);
        const splicedResults = results.slice(0, 4);
        setSuggestions([ ...splicedResults ]);
        setInputFocus(true);
        setIsLoading(false);
    }

    const debouncedChangeHandler = useCallback(
        debounce(onChangeHandler, 300)
    , []);

    const onFocusHandler = event =>{
        const value = event.target.value;
        if(value) setInputFocus(true)
    }

    const onBlurHandler = event =>{
        setInputFocus(false)
    } 
    
    return (
        <div className="search-bar">
            <InputBase 
                className="search-input"
                placeholder="Search for Movies......"
                endAdornment={
                    <div className="d-flex">
                        {inputFocus && isLoading ? 
                            <CircularProgress size={20} color="inherit"/> :
                            <SearchIcon/>
                        }
                    </div>}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                onChange={debouncedChangeHandler}
            />
            <div className={`results ${inputFocus ? 'active' : ''}`}>
                {suggestions.map(suggestionItem =>(
                    <ul key={`suggestion_${suggestionItem.id}`}>
                        <li>
                            <Link to={`/movie/${suggestionItem.id}`} className="search-option">
                                <img 
                                    src={getImagePath(suggestionItem.poster_path, 'w500')}
                                    alt={suggestionItem.title}
                                />
                                <span>{suggestionItem.title}</span>
                            </Link>
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default SearchBar;