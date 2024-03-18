import ButtonMore from "../ButtonMore/ButtonMore";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useEffect, useState} from "react";
import Preloader from "../Preloader/Preloader";
import AlertSearch from "../AlertSearch/AlertSearch";
import {INIT_VISIBLE_MOVIES, STEP_VISIBLE_MOVIES, WIDTH_SCREEN_MOVIES} from "../../utils/constans";
import lodash from "lodash";
import {useLocation} from "react-router-dom";

export default function MoviesCardList(
    {isLoading, moviesAll, savedMovies,
        addMovie, onDelete, errLoad, startSearch}) { //РЕНДЕР ВСЕХ КАРТОЧЕК НА СТРАНИЦУ
    const [countMovies, setCountMovies] = useState(0)

    const {pathname} = useLocation()
    function stepLoadMovie() {

        let loadInRow = {init: INIT_VISIBLE_MOVIES.LAPTOP, step: STEP_VISIBLE_MOVIES.LAPTOP};
        if (window.innerWidth > WIDTH_SCREEN_MOVIES.LAPTOP) {
            loadInRow.init = INIT_VISIBLE_MOVIES.LAPTOP
            loadInRow.step = STEP_VISIBLE_MOVIES.LAPTOP
        } else if (window.innerWidth > WIDTH_SCREEN_MOVIES.TAB) {
            loadInRow.init = INIT_VISIBLE_MOVIES.TAB
            loadInRow.step = STEP_VISIBLE_MOVIES.TAB
        } else if (window.innerWidth > WIDTH_SCREEN_MOVIES.MOBILE) {
            loadInRow.init = INIT_VISIBLE_MOVIES.MOBILE
            loadInRow.step = STEP_VISIBLE_MOVIES.MOBILE
        }

        return loadInRow
    }

    useEffect(() => {
            const movieVisible = stepLoadMovie()
            setCountMovies(movieVisible.init)

            const movieResize = lodash.debounce(() => {
                const addMoreMovie = stepLoadMovie()
                setCountMovies(addMoreMovie.init)
            })

            window.addEventListener('resize', movieResize);
            return () => {
                window.removeEventListener('resize', movieResize);
            }
    }, [moviesAll])

    const handleShowMore = () => {
        let newCardCount = countMovies + stepLoadMovie().step;
        setCountMovies(newCardCount);
    };

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
            {pathname === "/movies" && countMovies < moviesAll.length && (
                <ButtonMore handleMoreLoad={handleShowMore}/>
            )}
        </section>
    )
}