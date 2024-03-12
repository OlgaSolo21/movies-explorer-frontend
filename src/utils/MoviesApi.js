import {MOVIES_URL} from "./constans";

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

export const getMovies = () => { // получение фильмов в строке поиска
    return fetch(`${MOVIES_URL}/beatfilm-movies`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((res) => handleResponse(res))
}