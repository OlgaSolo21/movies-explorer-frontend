export default function FilterCheckbox({toggleCheckBox, isCheckbox}) {
    //const checkBoxToggleClassName = `checkbox__label ${!isCheckbox ? "checkbox__label_inactive" : "checkbox__label_active"}`
    return (
        <form className="checkbox">
            <input
                type="checkbox"
               className="checkbox__input"
                onChange={toggleCheckBox}
                checked={isCheckbox}
            />
            <span className="checkbox__title">Короткометражки</span>
        </form>
    )
}