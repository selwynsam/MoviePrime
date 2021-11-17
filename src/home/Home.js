import { useEffect, useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Select from 'react-select';

import { getUpcomingMovies, getMoviesList, getGenres } from './HomeAPI';
import Carousel from '../common/Carousel';
import MovieCard from '../common/MovieCard';
import SearchBar from '../common/SearchBar';
import InfiniteScroll from '../common/InfiniteScroll';
import { getGenreList } from '../utility';
import { AppContext } from '../AppProvider';

const selectStyles = {
    control: (provided, state) => ({
        ...provided,
        background: '#020d18',
        borderColor: '#ffffff78',
        borderRadius: '20px'
    }),
    indicatorSeparator: (provided, state) => ({
        ...provided,
        display: 'none'
    }),
    input: (styles) => ({ ...styles,  color: '#fff', }),
    menu: (provided, state) => ({
        ...provided,
        background: '#ffffffc9',
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: '#fff',
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isFocused ? '#fff' : '#000',
        background: state.isFocused ? '#020d18' : '#ffffffc9',
        fontWeight: 600,
        border: '1px solid #020d1845'
    })
}

const SORT_BY = {
    rating: 'vote_average.desc',
    date: 'release_date.desc',
    title: 'original_title.desc',
    popularity: 'popularity.desc'
}

const OPTIONS = [
    { label: 'Sort by Rating', value: SORT_BY.rating},
    { label: 'Sort by Date', value: SORT_BY.date },
    { label: 'Sort by Title', value: SORT_BY.title },
];

const DEFAULT_LIST_PARAMS = {
    page: 1,
    sort_by: SORT_BY.popularity,
    include_adult: false,
    include_video: true
}

const Home = props =>{
    const { genres } = useContext(AppContext);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [moviesList, setMoviesList] = useState([]);
    const [movieListParams, setMovieListParams] = useState({ ...DEFAULT_LIST_PARAMS });
    const [totalPages, setTotalPages] = useState(500);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>{
        init()
    }, []);

    const fetchUpcomingMovies = async() =>{
        const data = await getUpcomingMovies();
        setUpcomingMovies(data);
    }

    const init = async() =>{
        fetchUpcomingMovies();
        const results = await fetchMoviesList(movieListParams);
        setMoviesList([ ...results]);
    }

    const fetchMoviesList = async(params) =>{
        if(isLoading) return;
        setIsLoading(true);
        const response = await getMoviesList(params);
        setMovieListParams({ ...movieListParams,  page: response.page });
        setTotalPages(response.total_pages);
        setIsLoading(false);
        return response.results;
    }

    const loadMoreHandler = async() =>{
        const nextPage = movieListParams.page + 1;
        if(nextPage <= totalPages){
            const params = { 
                ...movieListParams,
                page: nextPage
            }
            const results = await fetchMoviesList(params);
            if(results) setMoviesList([ ...moviesList, ...results]);
        }
    }

    const onChangeHandler = async data =>{
        const params = {
            ...movieListParams,
            sort_by: data.value,
            page: DEFAULT_LIST_PARAMS.page
        }
        const results = await fetchMoviesList(params);
        setMoviesList(results);
    }

    

    return (
        <main>

            <div className="slider-container">
                <Carousel list={upcomingMovies}/>
                <div className="search-container">
                    <SearchBar />
                </div>
                <div className="overlay"/>
            </div>
   
            <section className="movie-list">
                <div className="container">
                    <div className="sortby-container">
                        <Select 
                            placeholder="Sort by"
                            styles={selectStyles}
                            options={OPTIONS}
                            onChange={onChangeHandler}
                        />
                    </div>
                    
                    <InfiniteScroll scrollHandler={loadMoreHandler} isLoading={isLoading} movieListParams={movieListParams}>
                        <Grid container>
                            {moviesList.map(movieItem =>(
                                <Grid item xs={6} md={3} key={`movie_${movieItem.id}`}>
                                    <MovieCard
                                        movieId={movieItem.id}
                                        title={movieItem.title}
                                        genres={getGenreList(movieItem.genre_ids, genres)}
                                        imagePath={movieItem.poster_path}
                                        rating={movieItem.vote_average}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </InfiniteScroll>
                </div>
            </section>
   
        </main>
    )
}

export default Home;