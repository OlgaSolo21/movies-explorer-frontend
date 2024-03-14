import {useLocation} from "react-router-dom";
import {useState} from "react";

export default function MoviesCard({movie}) { // РЕНДЕР ОДНОЙ КАРТОЧКИ С ФИЛЬМОМ
    const location = useLocation() // если на странице с сохраненками - кнопка удалить фильм
    const path = location.pathname
    const imageURL = movie.image.url

    // стейт кнопки сохранить
    const [buttonSave, setButtonSave] = useState(false)
    const buttonToggleClassName = `movie__button ${buttonSave ? "movie__button_saved" : ''}`

    //переводим длительность фильма в формат
    const time = Math.floor(movie.duration / 60)
    const minutes = movie.duration % 60

    function toggleButton() { // переключение сохранить-картинка
        setButtonSave(!buttonSave)
    }
    
    return (
        <li className="movie__item" key={movie}>
            <img className="movie__image"
                 alt="постер к фильму"
                 src={`https://api.nomoreparties.co${imageURL}`}
            />
            {path === "/saved-movies" ? (
                <button className="movie__button movie__button_delete"/>
            ) : (
                <button type="button" className={ buttonToggleClassName } onClick={toggleButton}>
                    {!buttonSave ? "Сохранить" : ''}
                </button>
            )}
            <div className="movie__content">
                <h2 className="movie__title">{movie.nameRU || movie.nameEN}</h2>
                <p className="movie__duration">{`"${time}ч ${minutes}м"`}</p>
            </div>
        </li>
    )
}