import {Link} from "react-router-dom";
import useFormValidation from "../../hook/useFormValidation";
import {EMAIL_REGEX, NAME_REGEX} from "../../utils/constans";

export default function Register({onRegister}) {
    const {values, handleChange, errors, isValid, isInputValid} = useFormValidation()

    function handleSubmit(e) {
        e.preventDefault();
        onRegister({
            name: values.name,
            email: values.email,
            password: values.password
        });
    }

    return (
        <section className='auth'>
            <div className="auth__head">
                <Link className="auth__link-logo link" to="/"/>
                <h1 className="auth__title">Добро пожаловать!</h1>
            </div>
            <form className='auth__form'
                  onSubmit={handleSubmit}
                  id="form"
                  noValidate>
                <label className="auth__label">Имя
                    <input
                        type="text"
                        className='auth__input'
                        //className={`${!isInputValid ? "auth__input" : '' }`}
                        name="name"
                        placeholder="Введите имя"
                        minLength={2}
                        maxLength={30}
                        required
                        onChange={handleChange}
                        value={values.name || ""}
                        // pattern={NAME_REGEX}
                    />
                    <span className={`${isInputValid ? "spanError" : '' }`}>{errors.name}</span>
                </label>
                <label className="auth__label">E-mail
                    <input
                        required
                        className='auth__input'
                        type="email"
                        name="email"
                        placeholder="Введите E-mail"
                        onChange={handleChange}
                        value={values.email || ""}
                        // pattern={EMAIL_REGEX}
                    />
                    <span className={`${isInputValid ? "spanError" : '' }`}>{errors.email}</span>
                </label>
                <label className="auth__label">Пароль
                    <input
                        className='auth__input'
                        required
                        type="password"
                        name="password"
                        placeholder="Придумайте пароль"
                        minLength={4}
                        maxLength={16}
                        onChange={handleChange}
                        value={values.password || ""}
                    />
                    <span className={`${isInputValid ? "spanError" : '' }`}>{errors.password}</span>
                </label>
                <button type="submit"
                        className="auth__button auth__button_register link"
                        disabled={!isValid}
                >Зарегистрироваться</button>
            </form>
            <p className='auth__subtitle'>Уже зарегистрированы?&ensp;
                <Link to='/signin' className='link-nav link'>Войти</Link></p>
        </section>
    )}