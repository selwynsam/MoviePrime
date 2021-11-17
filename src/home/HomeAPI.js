import axios from '../axiosConfig';

export async function getGenres() {
    try {
        const { data } = await axios.get(`/genre/movie/list`);
        return data.genres;
    } catch (error) {
        console.log('error==', error);
    }
}

export async function getUpcomingMovies() {
    try {
        const { data } = await axios.get(`/movie/now_playing`);
        return data.results;
    } catch (error) {
        console.error(error);
    }
}

export async function getMoviesList(params = {}) {
    try {
        const { data } = await axios.get(`/discover/movie`, { params });
        return data;
    } catch (error) {
        console.error(error);
    }
}

