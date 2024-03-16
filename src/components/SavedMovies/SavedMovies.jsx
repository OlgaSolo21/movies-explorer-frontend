import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {useEffect, useState} from "react";
import {filterCheckbox, filterSearchMovie} from "../../utils/utils";

export default function SavedMovies({savedMovies, onDelete}) { // РОУТ saved-movies - "Сохраненные фильмы"
    const [startSearch, setStartSearch] = useState(false) // начало поиска на обеих страницах

    const [moviesFilterCheck, setMoviesFilterCheck] = useState(savedMovies) // массив найденных и отфильтрованных
    const [isCheckbox, setIsCheckbox] = useState(false) // чекбокс короткометражек (изначально отключен)
    const [searchSavedMovie, setSearchSavedMovie] = useState('')

    function toggleCheckBox() {
        setIsCheckbox(!isCheckbox)
    }

    function findSavedMovies(query) {
        setSearchSavedMovie(query)
    }
    
    useEffect(() => {
            const movieResult = filterSearchMovie(savedMovies, searchSavedMovie)
            setMoviesFilterCheck(isCheckbox ? filterCheckbox(movieResult) : movieResult)
    }, [savedMovies, searchSavedMovie, isCheckbox]);

    useEffect(() => {
        if (moviesFilterCheck.length === 0) {
            setStartSearch(true);
        } else {
            setStartSearch(false);
        }
    }, [moviesFilterCheck]);

    return (
        <section>
            <SearchForm toggleCheckBox={toggleCheckBox}
                        isCheckbox={isCheckbox}
                        findMovies={findSavedMovies}/>
            <MoviesCardList moviesAll={moviesFilterCheck}
                            savedMovies={savedMovies}
                            onDelete={onDelete}
                            startSearch={startSearch}
                            // savedRout={true}
            />
        </section>
    )
}