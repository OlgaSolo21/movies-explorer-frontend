import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function SavedMovies() { // РОУТ saved-movies - "Сохраненные фильмы"
    return (
        <section>
            <p>сохраненки</p>
            <SearchForm/>
            <MoviesCardList/>
        </section>
    )
}