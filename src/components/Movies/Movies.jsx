import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi"
import {useState} from "react";
export default function Movies({moviesList, isLoading}) { // РОУТ movies - "Фильмы"
    const [movies, setMovies] = useState([]) // массив всех фильмов
    function handleFindMovies() {
        moviesApi.getMovies()
            .then((res) => {
                setMovies(res)
            })
            .catch(console.error)
    }
    
    return (
        <section>
            <SearchForm findMovies={handleFindMovies}/>
            <MoviesCardList moviesList={moviesList} isLoading={isLoading}/>
        </section>
    )
}