import {Link} from "react-router-dom";
import useFormValidation from "../../hook/useFormValidation";

export default function Login({onLogin}) {
    const {values, handleChange, errors, isValid} = useFormValidation()

    function handleSubmit(e) {
        e.preventDefault();
        onLogin({
            email: values.email,
            password: values.password
        });
    }

    return(
        <section className='auth'>
            <div className="auth__head">
                <Link className="auth__link-logo link" to="/"/>
                <h1 className="auth__title">Рады видеть!</h1>
            </div>
            <form className='auth__form'
                  onSubmit={handleSubmit}>
                <label className="auth__label">E-mail
                    <input
                        required
                        className='auth__input'
                        type="email"
                        name="email"
                        placeholder="Введите E-mail"
                        onChange={handleChange}
                        value={values.email || ""}
                    />
                    <span className="spanError">{errors.email}</span>
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
                    <span className="spanError">{errors.password}</span>
                </label>
                <button type="submit"
                        className="auth__button auth__button_login link"
                        disabled={!isValid}
                >Войти</button>
            </form>
            <p className='auth__subtitle'>Еще не зарегистрированы?&ensp;
                <Link to='/signup' className='link-nav link'>Регистрация</Link></p>
        </section>
    )
}