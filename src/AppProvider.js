import { createContext, useEffect, useState } from 'react';
import { getGenres } from './home/HomeAPI';
import { normalize } from './utility';

export const AppContext = createContext();

export const AppProvider = ({ children }) =>{
    const [genres, setGenres] = useState({});

    useEffect(async() =>{
        const response = await getGenres();
        const normalizedGenres = normalize(response, 'id');
        setGenres({ ...normalizedGenres });
    }, []);

    return (
        <AppContext.Provider value={{ genres }}>
            {children}
        </AppContext.Provider>
    )
}