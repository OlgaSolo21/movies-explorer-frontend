import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useFormValidation from "../../hook/useFormValidation";
import {useEffect, useState} from "react";

export default function SearchForm({findMovies, allMovies}) {
    // const {values, handleChange, resetForm} = useFormValidation()
    const [ isSearch, setIsSearch ] = useState(''); //старт поиска фильмов
    // const [isQueryAlert, setIsQueryAlert] = useState(false); // инфа к запросу

    function handleChangeInput(e) {
        setIsSearch(e.target.value)
    }

    function handleFindSubmit(e) { // подумать про очистку инпута/формы после сабмита
        e.preventDefault()
        findMovies(isSearch)
        if (isSearch) {//при сабмите устанавливаем значение данных
            localStorage.setItem("searchFindMovies", isSearch)
        }
    }

    useEffect(() => {
        const findMovies = localStorage.getItem("searchFindMovies")
        if (findMovies) {
            setIsSearch(findMovies)
        }
    }, []);

    return (
        <section className="search">
            <form className="search__form" onSubmit={handleFindSubmit}>
                <input
                    type="text"
                    name="search"
                    className="search__input"
                    placeholder="Фильм"
                    required
                    value={isSearch || ''}
                    onChange={handleChangeInput}
                />
                <button className="search__btn-find link" type="submit"/>
            </form>
            <FilterCheckbox/>
            {/*{!isQueryAlert && <span className="spanError">Для поиска введите ключевое слово</span> }*/}
        </section>
    )
}