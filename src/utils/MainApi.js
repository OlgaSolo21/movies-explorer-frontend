export const BASE_URL = 'https://api.movies-diploma77.nomoredomainswork.ru';

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}
export const register = (name, email, password) => { // регистрация
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password,
        })
    })
        .then((res) => handleResponse(res))
}

export const login = (email, password) => { // вход
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then((res) => handleResponse(res))
        .then((data) => {
            if (data.token) {
                localStorage.setItem("jwt", data.token);
                return data;
            }
        });

}

export const getContent = (token) => { //проверка токена
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((res) => handleResponse(res))
}

// export const getUserInfo = (token) => {
//     return fetch(`${BASE_URL}/users/me`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         }
//     })
// }

export const editProfilePatch = (data, token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email
        })
    })
        .then((res) => handleResponse(res))
}