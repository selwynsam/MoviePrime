import axios from '../../axiosConfig';

export async function searchMovie(params) {
    try {
        const { data } = await axios.get(`/search/movie`, { params });
        return data.results;
    } catch (error) {
        console.error(error);
    }
}