export default function FilterCheckbox({toggleCheckBox, isCheckbox}) {
    const checkBoxToggleClassName = `checkbox__label ${!isCheckbox ? "checkbox__label_inactive" : "checkbox__label_active"}`
    return (
        <div className="checkbox">
            <button
                className={checkBoxToggleClassName}
                onClick={toggleCheckBox}
            />
            <p className="checkbox__title">Короткометражки</p>
        </div>
    )
}