import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi"
import {useEffect, useState} from "react";
import {filteredMovies} from "../../utils/utils";
export default function Movies({savedMovies, isLoading}) { // РОУТ movies - "Фильмы"
    const [movies, setMovies] = useState([]) // массив всех фильмов первоначальный
    const [moviesFilter, setMoviesFilter] = useState([]) // массив фильтрованных фильмов

    function handleFilterMovies(movies, search) { // фильтр фильмов при сабмите (берем из beatfilm-movies)
        const movieList = filteredMovies(movies, search)
        localStorage.setItem('movies', movieList)
        localStorage.setItem('allMovies', movies)
        setMoviesFilter(movies)
    }
    function handleFindMovies(search) {//сабмит поиска формы
        if (movies.length === 0) {
            moviesApi.getMovies()
                .then((res) => {
                    setMovies(res)
                    handleFilterMovies(res, search)
                })
                .catch(console.error)
        } else {
            handleFilterMovies(movies, search)
        }
    }

    useEffect(() => {
        const movies = JSON.parse(localStorage.getItem('allmovies'));
        const search = JSON.parse(localStorage.getItem('movie'));
        handleFilterMovies(movies, search)
        setMovies(movies)
    }, [moviesFilter]);
    
    return (
        <section>
            <SearchForm findMovies={handleFindMovies} allMovies={movies}/>
            <MoviesCardList savedMovies={savedMovies} isLoading={isLoading}/>
        </section>
    )
}