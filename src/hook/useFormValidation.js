import {useCallback, useState} from "react";
import {regName, isEmail, NAME_REGEX, EMAIL_REGEX} from "../utils/constans";

export default function useFormValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    // стейт для подчеркивания неверного input, то есть для валидности конкретно инпут
    const [isInputValid, setIsInputValid] = useState({});


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setValues({...values, [name]: value});
        //setErrors({...errors, [name]: event.target.validationMessage });
        //setIsValid(event.target.closest("#form").checkValidity());

        if (name === "name") { // реализация через паттерны в инпуты
            if (!NAME_REGEX(value)) {
                event.target.setCustomValidity('Проверьте поле, цифры недопустимы');
            } else {
                event.target.setCustomValidity("");
            }
        } else if (name === "email") {
            if (!EMAIL_REGEX(value)) {
                event.target.setCustomValidity('Поле "Email" не соответствует формату');
            } else {
                event.target.setCustomValidity("");
            }
        }

        // setTimeout для очистки текста ошибки
        setTimeout(() => {
            setErrors({...errors, [name]: event.target.validationMessage });
            setIsInputValid({...isInputValid, [name]: event.target.validity.valid})
            setIsValid(event.target.closest("#form").checkValidity());
        }, 100);

        // setIsInputValid((previousIsInputValid) => {
        //     return { ...previousIsInputValid, [name]: event.target.validity.valid };
        // })

        // setIsInputValid({...isInputValid, [name]: event.target.validity.valid})
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );
    return { values, handleChange, errors, isValid, resetForm, isInputValid};
}
