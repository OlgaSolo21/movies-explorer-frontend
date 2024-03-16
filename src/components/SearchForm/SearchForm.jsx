import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import AlertSearch from "../AlertSearch/AlertSearch";

export default function SearchForm({findMovies, toggleCheckBox, isCheckbox}) {
    const [ isSearch, setIsSearch ] = useState(''); //старт поиска фильмов
    const path = useLocation()
    const [searchAllert, setSearchAllert] = useState(false)

    function handleChangeInput(e) {
        setIsSearch(e.target.value)
    }
    function handleFindSubmit(e) { // подумать про очистку инпута/формы после сабмита
        e.preventDefault()
        if (isSearch.length === 0) {
            setSearchAllert(true)
        } else {
            findMovies(isSearch)
            setSearchAllert(false)
        }
    }

    useEffect(() => {
        if (path.pathname === "/movies" && localStorage.getItem("searchMovies")) {
            const findMovies = localStorage.getItem("searchMovies")
            setIsSearch(findMovies)
        }
    }, [path]);

    return (
        <section className="search">
            <form className="search__form" onSubmit={handleFindSubmit}>
                <input
                    type="text"
                    name="search"
                    className="search__input"
                    placeholder="Фильм"
                    // required
                    value={isSearch || ''}
                    onChange={handleChangeInput}
                />
                <button className="search__btn-find link" type="submit"/>
            </form>
            <FilterCheckbox toggleCheckBox={toggleCheckBox} isCheckbox={isCheckbox}/>
            {path.pathname === "/movies" && searchAllert && <AlertSearch text={"Для отображения фильмов введите ключевое слово в форму поиска"}/>}
            {path.pathname === "/saved-movies" && searchAllert && <AlertSearch text={"Сохраненных фильмов нет"}/>}
        </section>
    )
}