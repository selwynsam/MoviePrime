export function getImagePath(key, type="original") {
    const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BAST_URL;
    return `${IMAGE_BASE_URL}/${type}/${key}`;
}

export function formatGenres(genres) {
    return genres.map(item => item.name).join(', ');
}

export function formatCasts(casts) {
    let castList = casts.slice(0, 3);
    return castList.map(item => item.name).join(', ');
}

export function normalize(data, key) {
    const normalizedData = {};
    for(const item of data){
        normalizedData[item[key]] = { ...item }
    }
    return normalizedData
}

export function getGenreList(ids, genres) {
    return ids.map(id =>genres?.[id]?.name).join(', ');
}