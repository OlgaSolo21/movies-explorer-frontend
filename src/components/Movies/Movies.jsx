import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import AboutProject from "../Main/AboutProject/AboutProject";

export default function Movies({moviesList}) { // РОУТ movies - "Фильмы"
    return (
        <section>
            <SearchForm/>
            <MoviesCardList moviesList={moviesList}/>
        </section>
    )
}