import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useFormValidation from "../../hook/useFormValidation";
import {useState} from "react";
export default function SearchForm({findMovies}) {
    const {values, handleChange, resetForm} = useFormValidation()
    function handleFindSubmit(e) {
        e.preventDefault()
        findMovies(e.target.value)
    }

    return (
        <section className="search">
            <form className="search__form" onSubmit={handleFindSubmit}>
                <input
                    type="text"
                    name="search"
                    className="search__input"
                    placeholder="Фильм"
                    required
                    value={values.search || ''}
                    onChange={handleChange}
                />
                <button className="search__btn-find link" type="submit"/>
            </form>
            <FilterCheckbox/>
        </section>
    )
}