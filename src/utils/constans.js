const isEmail = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
}
const regName = (email) => {
    return /^[а-яА-ЯёЁa-zA-Z\s-]+$/img.test(email);
}

const BASE_URL = 'https://api.movies-diploma77.nomoredomainswork.ru';

const MOVIES_URL = 'https://api.nomoreparties.co';

module.exports = {
    regName,
    isEmail,
    BASE_URL,
    MOVIES_URL
};
