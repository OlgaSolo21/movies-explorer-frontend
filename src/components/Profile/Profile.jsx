import {useContext, useEffect, useState} from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import useFormValidation from "../../hook/useFormValidation"

export default function Profile({ onUpdateUser, logout}) {
    //подписываемся на контекст и подставляем данные имени и о себе в попап
    const currentUser = useContext(CurrentUserContext);

    const {values, handleChange, errors, isValid, resetForm} = useFormValidation()

    const [inputEdit, setInputEdit] = useState(false) // состояние disabled

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser);
        }
    }, [currentUser, resetForm]);

    function handleSaveEdit(e) {
        e.preventDefault()
        setInputEdit(false)
        onUpdateUser({
            name: values.name,
            email: values.email
        })
    }

    return(
        <section className="profile">
            <h2 className="profile__title">Привет, {currentUser.name}!</h2>
            <form className="profile__form">
                <label className="profile__label">Имя
                    <input
                        type="text"
                        className="profile__input"
                        name="name"
                        minLength={2}
                        maxLength={30}
                        required
                        value={values.name || ""}
                        onChange={handleChange}
                        disabled={!inputEdit}
                    />
                </label>
                <span className="spanError">{errors.name}</span>
                <label className="profile__label" >E-mail
                    <input
                        className='profile__input'
                        type="email"
                        name="email"
                        required
                        placeholder="Введите E-mail"
                        onChange={handleChange}
                        value={values.email || ""}
                        disabled={!inputEdit}
                    />
                </label>
                <span className="spanError">{errors.email}</span>
            </form>
            {!inputEdit ? (
                <div className="profile__btn">
                    <button type="submit"
                            className="profile__editButton link"
                            onClick={() => setInputEdit(true)}>Редактировать</button>
                    <button type="submit"
                            className="profile__logoutButton link"
                            onClick={logout}>Выйти из аккаунта</button>
                </div>
            ) : (
                <button type="submit"
                        className="profile__saveEditButton link"
                        onClick={handleSaveEdit}
                        disabled={!isValid}
                >Сохранить</button>
            )}
        </section>
    )
}