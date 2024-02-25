import {useState} from "react";

export default function FilterCheckbox() {
    const [checkBox, setCheckBox] = useState(true)

    const toggleCheck = `link ${checkBox ? "checkbox__label" : "checkbox__label-active"}`
    function toggleCheckBox(e) {
        e.preventDefault()
        setCheckBox(!checkBox)
    }

    return (
        <div className="checkbox__form">
            <button type="checkbox" className={toggleCheck} onClick={toggleCheckBox}/>
            <p className="checkbox__title">Короткометражки</p>
        </div>
    )
}