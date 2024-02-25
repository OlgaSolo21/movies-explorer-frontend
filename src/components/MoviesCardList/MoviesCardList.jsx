import ButtonMore from "../ButtonMore/ButtonMore";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({moviesList}) { //РЕНДЕР ВСЕХ КАРТОЧЕК НА СТРАНИЦУ
    function loadMore() {//загрузка фильмов на кнопку "еще"

    }

    return (
        <section>
            <ul>
                {moviesList.map((movie) => (
                    <MoviesCard
                        movie={movie}
                        key={movie.id}/>
                ))}
            </ul>
            <ButtonMore handleMoreLoad={loadMore}/>
        </section>
    )
}