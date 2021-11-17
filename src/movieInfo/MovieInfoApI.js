import axios from '../axiosConfig';

export async function getMovieDetails(movieId, params) {
    try {
        const { data } = await axios.get(`/movie/${movieId}`, { params });
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getSimilarMovies(movieId){
    try {
        const { data } = await axios.get(`/movie/${movieId}/similar`);
        return data.results;
    } catch (error) {
        console.error(error);
    }
}