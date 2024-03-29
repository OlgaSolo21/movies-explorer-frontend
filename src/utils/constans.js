const EMAIL_REGEX = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);}
const NAME_REGEX = (email) => {
    return /^[а-яА-ЯёЁa-zA-Z\s-]+$/img.test(email);}

const BASE_URL = 'https://api.movies-diploma77.nomoredomainswork.ru';
const MOVIES_URL = 'https://api.nomoreparties.co';

const SHORTS_TIME = 40

const INIT_VISIBLE_MOVIES = { // инициализируем ряд карточек
    MOBILE: 5,
    TAB: 8,
    LAPTOP: 12,
    // MAX_LARGE: 6,
}

const STEP_VISIBLE_MOVIES = { // шаг - добавление карточек "еще"
    MOBILE: 2,
    TAB: 2,
    LAPTOP: 3,
    // MAX_LARGE: 4,
}

const WIDTH_SCREEN_MOVIES = { // px
    MOBILE: 320,
    TAB: 760,
    LAPTOP: 1200,
}

module.exports = {
    NAME_REGEX,
    EMAIL_REGEX,
    BASE_URL,
    MOVIES_URL,
    INIT_VISIBLE_MOVIES,
    STEP_VISIBLE_MOVIES,
    WIDTH_SCREEN_MOVIES,
    SHORTS_TIME
};
