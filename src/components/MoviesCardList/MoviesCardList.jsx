import ButtonMore from "../ButtonMore/ButtonMore";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useState} from "react";
import Preloader from "../Preloader/Preloader";

export default function MoviesCardList({isLoading, moviesAll, savedMovies}) { //РЕНДЕР ВСЕХ КАРТОЧЕК НА СТРАНИЦУ

    const [countMovies, setCountMovies] = useState(6)

    function loadMore() {//загрузка фильмов на кнопку "еще"
        setCountMovies(count => count + 6);
    }

    return (
        <section className="movie">
            {isLoading ? <Preloader/> : (
                <>
                    <ul className="movie__list">
                        {moviesAll.slice(0, countMovies).map((m) => (
                            <MoviesCard
                                savedMovies={savedMovies}
                                movie={m}
                                key={m.id}
                            />
                        ))}
                    </ul>
                    {countMovies < moviesAll.length ? (
                        <ButtonMore handleMoreLoad={loadMore}/>) : null}
                </>
            )}
        </section>
    )
}