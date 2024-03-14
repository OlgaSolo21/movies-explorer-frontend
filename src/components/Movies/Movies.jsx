import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi"
import {useEffect, useState} from "react";
import {filterSearchMovie} from "../../utils/utils";

export default function Movies({savedMovies, isLoading}) { // РОУТ movies - "Фильмы"

    const [moviesAll, setMoviesAll] = useState([]) // массив всех найденных фильмов
    // const [moviesSearch, setMoviesSearch] = useState('') // значение в форме поиска
    const [moviesFilterCheck, setMoviesFilterCheck] = useState([])

    // function findMoviesSearchForm(value) {
    //     setMoviesSearch(value);
    // }
    
    function filterMovieFind(data, isSearch) {
        const movieResult = filterSearchMovie(data, isSearch)
        setMoviesAll(movieResult)
        localStorage.setItem('findMovie', JSON.stringify(movieResult));
        localStorage.setItem('firstEnterMovies', JSON.stringify(data)); // нужен ли? выводит в сторадж все фильмы
    }

    function handleFindMovies(isSearch) {//сабмит поиска формы
        if (localStorage.getItem('firstEnterMovies')) {
            const storageFirstEnter = JSON.parse(localStorage.getItem('firstEnterMovies'))
            filterMovieFind(storageFirstEnter, isSearch)
        } else {
            moviesApi.getMovies()
                .then((movieData) => {
                    filterMovieFind(movieData, isSearch)
                })
                .catch(console.error)
        }
    }

    // useEffect(() => {
    //     if(moviesSearch) {
    //         handleFindMovies()
    //     }
    // }, [moviesSearch]);

    useEffect(() => {
        const storageFindMovie = JSON.parse(localStorage.getItem('findMovie'));
        setMoviesAll(storageFindMovie)
        handleFindMovies()
    }, [])
    
    return (
        <section>
            <SearchForm findMovies={handleFindMovies}/>
            <MoviesCardList moviesAll={moviesFilterCheck}
                            isLoading={isLoading}
                            savedMovies={savedMovies}/>
        </section>
    )
}