import ButtonMore from "../ButtonMore/ButtonMore";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useState} from "react";
import Preloader from "../Preloader/Preloader";

export default function MoviesCardList({moviesList, isLoading}) { //РЕНДЕР ВСЕХ КАРТОЧЕК НА СТРАНИЦУ

    const [countMovies, setCountMovies] = useState(6)

    function loadMore() {//загрузка фильмов на кнопку "еще"
        setCountMovies(count => count + 6);
    }

    return (
        <section className="movies">
            {isLoading ? <Preloader/> : (
                <>
                    <ul className="movies__list">
                        {moviesList.slice(0, countMovies).map((movie) => (
                            <MoviesCard
                                movie={movie}
                                key={movie.id}/>
                        ))}
                    </ul>
                    {countMovies < moviesList.length ? (
                        <ButtonMore handleMoreLoad={loadMore}/>) : null}
                </>
            )}
        </section>
    )
}