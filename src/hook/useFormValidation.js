import {useCallback, useState} from "react";
import {regName, isEmail} from "../utils/constans";

export default function useFormValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        setValues({...values, [name]: value});
        setErrors({...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());

        if (name === "name") {
            if (!regName(value)) {
                target.setCustomValidity('Проверьте поле, цифры недопустимы');
            } else {
                event.target.setCustomValidity("");
            }
        } else if (name === "email") {
            if (!isEmail(value)) {
                target.setCustomValidity('Поле "Email" не соответствует формату');
            } else {
                event.target.setCustomValidity("");
            }
        }
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );
    return { values, handleChange, errors, isValid, resetForm, setValues};
}
