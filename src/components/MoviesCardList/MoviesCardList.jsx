import ButtonMore from "../ButtonMore/ButtonMore";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useEffect, useState} from "react";
import Preloader from "../Preloader/Preloader";
import AlertSearch from "../AlertSearch/AlertSearch";
import {INIT_VISIBLE_MOVIES, STEP_VISIBLE_MOVIES, WIDTH_SCREEN_MOVIES} from "../../utils/constans";
import lodash from "lodash";

export default function MoviesCardList(
    {isLoading, moviesAll, savedMovies,
        addMovie, onDelete, errLoad, startSearch}) { //РЕНДЕР ВСЕХ КАРТОЧЕК НА СТРАНИЦУ
    const [countMovies, setCountMovies] = useState(0)

    useEffect(() => {
        function visibleMovieList() {
            const screenWidth = window.innerWidth;
            let loadInRow;
            if (screenWidth <= WIDTH_SCREEN_MOVIES.MOBILE) {
                loadInRow = INIT_VISIBLE_MOVIES.MOBILE;
            } else if (screenWidth <= WIDTH_SCREEN_MOVIES.TAB) {
                loadInRow = INIT_VISIBLE_MOVIES.TAB;
            } else if (screenWidth <= WIDTH_SCREEN_MOVIES.LAPTOP) {
                loadInRow = INIT_VISIBLE_MOVIES.LAPTOP;
            }
            setCountMovies(loadInRow)
        }

        const visibleMovieListDebounced = lodash.debounce(visibleMovieList, 1000);
        visibleMovieListDebounced();
        window.addEventListener('resize', visibleMovieListDebounced);
        return () => {
            window.removeEventListener('resize', visibleMovieList);
        }
    }, [])

    function loadMore() {//загрузка фильмов на кнопку "еще"
        const screenWidth = window.innerWidth;
        if (screenWidth <= WIDTH_SCREEN_MOVIES.MOBILE) {
            setCountMovies(step => step + STEP_VISIBLE_MOVIES.MOBILE);
        } else if (screenWidth <= WIDTH_SCREEN_MOVIES.TAB) {
            setCountMovies(step => step + STEP_VISIBLE_MOVIES.TAB);
        } else if (screenWidth <= WIDTH_SCREEN_MOVIES.LAPTOP) {
            setCountMovies(step => step + STEP_VISIBLE_MOVIES.LAPTOP);
        }
    }

    return (
        <section className="movie">
            {isLoading && <Preloader/>}
            {startSearch && !isLoading && <AlertSearch text={"Ничего не найдено"}/>}
            {errLoad && !isLoading && <AlertSearch
                text={"Во время запроса произошла ошибка. " +
                    "Возможно, проблема с соединением или сервер недоступен. " +
                    "Подождите немного и попробуйте ещё раз"}/>}
            {!isLoading && !errLoad && !startSearch && (
                <ul className="movie__list">
                     {moviesAll.slice(0, countMovies).map((data) => (
                                <MoviesCard
                                    addMovie={addMovie}
                                    onDelete={onDelete}
                                    moviesAll={moviesAll}
                                    savedMovies={savedMovies}
                                    data={data}
                                    key={ data.id || data._id}
                                />
                            ))}
                        </ul>
            )}
            {countMovies < moviesAll.length && (
                <ButtonMore handleMoreLoad={loadMore}/>
            )}
        </section>
    )
}