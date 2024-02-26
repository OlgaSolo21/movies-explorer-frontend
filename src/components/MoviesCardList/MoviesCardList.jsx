import ButtonMore from "../ButtonMore/ButtonMore";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useState} from "react";
import {useLocation} from "react-router-dom";

export default function MoviesCardList({moviesList, savedMovesList}) { //РЕНДЕР ВСЕХ КАРТОЧЕК НА СТРАНИЦУ
    const location = useLocation() // если на странице с сохраненками - кнопка удалить фильм
    const path = location.pathname

    const [countMovies, setCountMovies] = useState(6)

    function loadMore() {//загрузка фильмов на кнопку "еще"
        setCountMovies(count => count + 6);
    }

    return (
        <section className="movies">
            <ul className="movies__list">
                {moviesList.slice(0, countMovies).map((movie) => (
                    <MoviesCard
                        movie={movie}
                        key={movie.id}/>
                ))}
            </ul>
            {countMovies < moviesList.length ? (
                <ButtonMore handleMoreLoad={loadMore}/>
            ) : null}
        </section>
    )
}