import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export default function MoviesCard({data, addMovie, savedMovies, onDelete}) { // РЕНДЕР ОДНОЙ КАРТОЧКИ С ФИЛЬМОМ
    const location = useLocation() // если на странице с сохраненками - кнопка удалить фильм
    const path = location.pathname
    const imageURL = data.image.url

    // стейт кнопки сохранить
    const [buttonSave, setButtonSave] = useState(false)

    const buttonToggleClassName = `movie__button ${buttonSave ? "movie__button_saved " : "movie__button_save"}`

    //переводим длительность фильма в формат
    const time = Math.floor(data.duration / 60)
    const minutes = data.duration % 60

    function toggleButton() { // переключение сохранить-картинка
        if (savedMovies.find(saved => saved.movieId === data.id)) {
            onDelete(savedMovies.find((m) => m.movieId === data.id))
            // setButtonSave(true)
            // addMovie(data)
        } else {
            setButtonSave(false)
            addMovie(data)
        }
    }

    function onDeleteHandle() {
        onDelete(data)
    }

    useEffect(() => {
        if (path === "/movies") {
           setButtonSave(savedMovies.some(saved => saved.movieId === data.id))
        }
    }, [path, savedMovies, data.id, setButtonSave]);
    
    return (
        <li className="movie__item" key={data}>
            <div className="movie__trailer">
                <Link to={data.trailerLink} target="_blank">
                    <img className="movie__image"
                         alt={ data.nameRU }
                         src={path === '/movies' ? `https://api.nomoreparties.co${imageURL}` : data.image}
                    /></Link>
                {path === "/saved-movies" ? (
                    <button className="movie__button movie__button_delete"
                            type="button"
                            onClick={onDeleteHandle}
                    />
                ) : (
                    <button type="button"
                            className={ buttonToggleClassName }
                            onClick={toggleButton}/>
                )}
            </div>
            <div className="movie__content">
                <h2 className="movie__title">{data.nameRU}</h2>
                <p className="movie__duration">{`"${time}ч ${minutes}м"`}</p>
            </div>
        </li>
    )
}