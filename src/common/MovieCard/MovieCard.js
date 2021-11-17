import { Link } from 'react-router-dom';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { getImagePath } from '../../utility';

const MovieCard = props =>{
    const { movieId, title, genres, imagePath, rating } = props;
    return(
        <div className="movie-card">
            <div className="rating">
                <StarRoundedIcon className="icon" /> {rating}
            </div>
            <Link to={`/movie/${movieId}`} className="link">
                <img
                    src={getImagePath(imagePath, 'w500')}
                    alt={title}
                />

                <div className="info">
                    <h4>{title}</h4>
                    <div>{genres}</div>
                </div>
            </Link>
        </div>
    )
}

export default MovieCard;