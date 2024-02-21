import {Link} from "react-router-dom";
import {useState} from "react";

export default function Register({onRegister}) {
    const [inputValue, setInputValue] = useState({
        name: '',
        email: '',
        password: ''
    })


    function handleSubmit(e) {
        e.preventDefault();
        onRegister(inputValue);
    }
    
    function handleChangeInput(e) {
        setInputValue(e.target.value)
    }

    return (
        <section className='register'>
            <Link className="header__link-logo link" to="/"></Link>
            <h1 className="register__title">Добро пожаловать!</h1>
            <form className='register__form'
                  onSubmit={handleSubmit}>
                <label className="register__label">Имя
                    <input
                        className='register__input'
                        name="EmailInput"
                        placeholder="Введите имя"
                        required
                        onChange={handleChangeInput}
                        // value={name}
                    />
                </label>
                <label className="register__label">E-mail
                    <input
                        className='register__input'
                        type="email"
                        name="EmailInput"
                        placeholder="Введите E-mail"
                        required
                        onChange={handleChangeInput}
                        // value={email}
                    />
                </label>
                <label className="register__label">Пароль
                    <input
                        className='register__input'
                        type="password"
                        name="PasswordInput"
                        placeholder="Придумайте пароль"
                        required
                        onChange={handleChangeInput}
                        // value={password}
                    />
                </label>
                <button className='register__button'>Зарегистрироваться</button>
            </form>
            <p className='auth__subtitle'>Уже зарегистрированы?&ensp;
                <Link to='/sign-in' className='auth__subtitle'>Войти</Link></p>
        </section>
    )
}