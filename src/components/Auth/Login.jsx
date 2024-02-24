import {Link} from "react-router-dom";
import {useState} from "react";

export default function Login({onRegister}) {
    const [inputValue, setInputValue] = useState({
        email: '',
        password: ''
    })
    const [inputError, setInputError] = useState({});

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(inputValue);
    }

    function handleChangeInput(e) {
        const{name , value, validationMessage} = e.target;
        setInputValue({...inputValue, [name]: value});
        setInputError({...inputError, [name]: validationMessage});
    }
    return(
        <section className='register'>
            <div className="auth">
                <Link className="header__link-logo link" to="/"></Link>
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
                        onChange={handleChangeInput}
                        value={inputValue.email}
                    />
                    <span className="auth__span-error">{inputError.email}</span>
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
                        onChange={handleChangeInput}
                        value={inputValue.password}
                    />
                    <span className="auth__span-error">{inputError.password}</span>
                </label>
                <button type="submit"
                        className="auth__button link">Войти</button>
            </form>
            <p className='auth__subtitle'>Еще не зарегистрированы?&ensp;
                <Link to='/signup' className='link__nav link'>Регистрация</Link></p>
        </section>
    )
}