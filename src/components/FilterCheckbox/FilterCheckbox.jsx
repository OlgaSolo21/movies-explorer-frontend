import {useState} from "react";

export default function FilterCheckbox() {
    const [checkBox, setCheckBox] = useState(true)

    const checkBoxToggleClassName = `checkbox__label ${checkBox ? "checkbox__label-inactive" : "checkbox__label-active"}`
    function toggleCheckBox(e) {
        e.preventDefault()
        setCheckBox(!checkBox)
    }

    return (
        <div className="checkbox__form">
            <button type="checkbox"
                    className={checkBoxToggleClassName}
                    onClick={toggleCheckBox}/>
            <p className="checkbox__title">Короткометражки</p>
        </div>
    )
}