import {BASE_URL} from "./constans";

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
