import ButtonMore from "../ButtonMore/ButtonMore";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useState} from "react";
import Preloader from "../Preloader/Preloader";

export default function MoviesCardList({isLoading, savedMovies}) { //РЕНДЕР ВСЕХ КАРТОЧЕК НА СТРАНИЦУ

    const [countMovies, setCountMovies] = useState(6)

    function loadMore() {//загрузка фильмов на кнопку "еще"
        setCountMovies(count => count + 6);
    }

    return (
        <section className="movie">
            {isLoading ? <Preloader/> : (
                <>
                    <ul className="movie__list">
                        {savedMovies.slice(0, countMovies).map((movie) => (
                            <MoviesCard
                                savedMovies={savedMovies}
                                key={movie.id}/>
                        ))}
                    </ul>
                    {countMovies < savedMovies.length ? (
                        <ButtonMore handleMoreLoad={loadMore}/>) : null}
                </>
            )}
        </section>
    )
}