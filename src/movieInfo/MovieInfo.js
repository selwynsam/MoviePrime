import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import Grid from '@mui/material/Grid';
import moment from 'moment';

import MovieCard from '../common/MovieCard';
import VideoModal from '../common/VideoModal';
import { getMovieDetails, getSimilarMovies } from './MovieInfoApI';
import { formatGenres, formatCasts, getImagePath, getGenreList } from '../utility';
import { AppContext } from '../AppProvider';

const MOVIE_QUERY_PARAMS = { append_to_response: 'videos,credits' };

const MovieInfo = props =>{
    const { movieId } = useParams();
    const navigate = useNavigate();
    const { genres } = useContext(AppContext);
    const [movieDetails, setMovieDetails] = useState({});
    const [videoSrcKey, setVideoSrcKey] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const [similarMovies, setSimilarMovies] = useState([]);

    useEffect(() =>{

        if(!movieId){
            navigate('/');
            return;
        }
        
        fetchMovieDetails();
        fetchSimilarMovies();

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

    }, [movieId]);

    const fetchMovieDetails = async() =>{
        
        const { videos, ...results } = await getMovieDetails(movieId, MOVIE_QUERY_PARAMS);
        setMovieDetails({ 
            originalTitle: results.original_title,
            releaseDate: results.release_date,
            runtime: results.runtime,
            overview: results.overview,
            genres: formatGenres(results.genres),
            cast: formatCasts(results.credits.cast),
            backdropPath: results.backdrop_path
        });
        const videoDetails = videos.results.find(item => item.key && item.site == 'YouTube');
        if(videoDetails) setVideoSrcKey(videoDetails.key)
    }

    const fetchSimilarMovies = async() =>{
        const results = await getSimilarMovies(movieId);
        setSimilarMovies([...results]);
    }

    return (
        <main>
            <div className="movie-banner">
                <div className="image-container">
                    <img 
                        src={getImagePath(movieDetails.backdropPath)}
                        alt="Dune"
                    />
                </div>
                <div className="overlay">
                    <PlayCircleOutlineRoundedIcon 
                        className="play-icon" 
                        onClick={() =>setShowTrailer(true)}
                    />
                </div>
            </div>
            <section className="movie-info">
                <div className="container">
                    <h1>{movieDetails.originalTitle}</h1>
                    <div className="meta-info">
                        <span className="info-item">{moment(movieDetails.releaseDate).format('YYYY')}</span>
                        <span className="info-spacer">|</span>
                        <span className="info-item">{moment(movieDetails.runtime).format('h[h] m[m]')}</span>
                        <span className="info-spacer">|</span>
                        <span className="info-item">{movieDetails.genres}</span>
                    </div>
                    <div className="movie-synopsis">
                        {movieDetails.overview}
                    </div>
                    <div className="movie-cast-info">
                        <span className="label">Starring:</span>
                        <span className="star-cast">{movieDetails.cast}</span>
                    </div>
                </div>
            </section>

            <section className="similar-movies">
                <div className="container">
                    <h3 className="label">More like this</h3>
                    <Grid container>
                        {similarMovies.map(movieItem =>(
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
                </div>
            </section>

            {showTrailer && videoSrcKey && (
                <VideoModal 
                    srcKey={videoSrcKey} 
                    handleClose={() =>setShowTrailer(false)}
                />
            )}
        </main>
    )
}

export default MovieInfo;