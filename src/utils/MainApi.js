import {BASE_URL, MOVIES_URL} from "./constans";

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}
export const register = (data) => { // регистрация
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password
        })
    })
        .then((res) => handleResponse(res))
}

export const login = (data) => { // вход
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        })
    })
        .then((res) => handleResponse(res))
}

export const checkToken = (jwt) => { //проверка токена
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        }
    })
        .then((res) => handleResponse(res))
}

export const getUserInfo = () => { // монтирование данных юзера
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
        }
    })
        .then((res) => handleResponse(res))
}

export const editProfilePatch = (data) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email
        })
    })
        .then((res) => handleResponse(res))
}

export const getSavedMovies = () => { // монтирование найденных фильмов
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
        }
    })
        .then((res) => handleResponse(res))
}


export const addMovie = (data) => { // добавление фильма в свои локально
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            country: data.country,
            director: data.director,
            duration: data.duration,
            year: data.year,
            description: data.description,
            image: `${MOVIES_URL}${data.image.url}`,
            trailerLink: data.trailerLink,
            thumbnail: `${MOVIES_URL}${data.image.formats.thumbnail.url}`,
            movieId: data.id,
            nameRU: data.nameRU,
            nameEN: data.nameEN,
        }),
    })
        .then((res) => handleResponse(res))
};

export const deleteMovie = (cardId) => { // удаление фильма из свои локально
    return fetch(`${BASE_URL}/movies/${cardId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => handleResponse(res))
}


