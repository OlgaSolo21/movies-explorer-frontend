import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi"
import {useEffect, useState} from "react";

export default function Movies({savedMovies, isLoading}) { // РОУТ movies - "Фильмы"

    const [moviesAll, setMoviesAll] = useState([]) // массив всех фильмов первоначальный
    const [moviesSearch, setMoviesSearch] = useState('')

    function findMovies(value) {
        setMoviesSearch(value);
    }

    function handleFindMovies() {//сабмит поиска формы
        moviesApi.getMovies()
                .then((data) => {
                    const searchDone = data.filter(
                        f => f.nameRU.toLowerCase().includes(moviesSearch.toLowerCase()) &&
                            f.nameEN.toLowerCase().includes(moviesSearch.toLowerCase())
                    )
                    setMoviesAll(searchDone)
                })
                .catch(console.error)
    }

    useEffect(() => {
        if(moviesSearch) {
            handleFindMovies()
        }
    }, [moviesSearch]);

    useEffect(() => {
        localStorage.setItem('movies', JSON.stringify(moviesAll));
    })
    
    return (
        <section>
            <SearchForm findMovies={findMovies}/>
            <MoviesCardList moviesAll={moviesAll}
                            isLoading={isLoading}
                            savedMovies={savedMovies}/>
        </section>
    )
}