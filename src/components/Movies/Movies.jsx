import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi"
import {useEffect, useState} from "react";
import {filterCheckbox, filterSearchMovie} from "../../utils/utils";

export default function Movies({savedMovies, addMovie}) { // РОУТ movies - "Фильмы"
    const [isLoading, setIsLoading] = useState(false)

    const [errLoad, setErrLoad] = useState(false) // текст ошибки 500 в MoviesCardList
    const [startSearch, setStartSearch] = useState(false) // не найдено на обеих страницах

    const [moviesAll, setMoviesAll] = useState([]) // массив всех найденных фильмов
    const [moviesFilterCheck, setMoviesFilterCheck] = useState([]) // массив найденных и отфильтрованных
    const [isCheckbox, setIsCheckbox] = useState(false) // чекбокс короткометражек (изначально отключен)
    
    function filterMovieFind(data, search, shorts) { // фильтрация фильмоы и короткометражек
        const movieResult = filterSearchMovie(data, search, shorts)
        setMoviesAll(movieResult)
        setMoviesFilterCheck(shorts ? filterCheckbox(movieResult) : movieResult)
        //localStorage.setItem('shortsCheckbox', JSON.stringify(isCheckbox))
        localStorage.setItem('findMovie', JSON.stringify(movieResult));
        localStorage.setItem('firstEnterMovies', JSON.stringify(data)); // нужен ли? выводит в сторадж все фильмы
    }

    function toggleCheckBox() {
        setIsCheckbox(!isCheckbox)
        if (!isCheckbox) {
            if (filterCheckbox(moviesAll).length === 0) {
                setMoviesFilterCheck(filterCheckbox(moviesAll))
            } else {
                setMoviesFilterCheck(filterCheckbox(moviesAll))
            }
        } else {
            setMoviesFilterCheck(moviesAll)
        }
        localStorage.setItem('shortsCheckbox', !isCheckbox)
    }

    function handleFindMovies(search) {//сабмит поиска формы
        localStorage.setItem("searchMovies", search)
        localStorage.setItem('shortsCheckbox', JSON.stringify(isCheckbox))
        // console.log(isCheckbox)
        // console.log(JSON.stringify(isCheckbox))
        if (localStorage.getItem('firstEnterMovies')) {
            const storageFirstEnter = JSON.parse(localStorage.getItem('firstEnterMovies'))
            filterMovieFind(storageFirstEnter, search, isCheckbox)
        } else {
            setIsLoading(true)
            moviesApi.getMovies()
                .then((movieData) => {
                    filterMovieFind(movieData, search, isCheckbox)
                    //toggleCheckBox(movieData)
                    setErrLoad(false)
                    setStartSearch(false)
                })
                .catch((err) => {
                    setErrLoad(true)
                    console.log(err)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    useEffect(() => {
        if (localStorage.getItem('shortsCheckbox') === 'true') {
            setIsCheckbox(true)
        } else {
            setIsCheckbox(false)
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('findMovie')) {
            const storageFindMovie = JSON.parse(localStorage.getItem('findMovie'));
            setMoviesAll(storageFindMovie)
            if (localStorage.getItem('shortsCheckbox') === 'true') {
                setMoviesFilterCheck(filterCheckbox(storageFindMovie))
            } else {
                setMoviesFilterCheck(storageFindMovie)
            }
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem('searchMovies')) {
            if (moviesFilterCheck.length === 0) {
                setStartSearch(true);
            } else {
                setStartSearch(false);
            }
        } else {
            setStartSearch(false);
        }
    }, [moviesFilterCheck]);
    
    return (
        <section>
            <SearchForm findMovies={handleFindMovies}
                        toggleCheckBox={toggleCheckBox}
                        isCheckbox={isCheckbox}/>
            <MoviesCardList moviesAll={moviesFilterCheck}
                            addMovie={addMovie}
                            isLoading={isLoading}
                            savedMovies={savedMovies}
                            errLoad={errLoad}
                            startSearch={startSearch}
            />
        </section>
    )
}