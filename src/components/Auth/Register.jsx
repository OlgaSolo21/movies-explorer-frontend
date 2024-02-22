import {Link} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";

export default function Register({onRegister}) {
    const [inputValue, setInputValue] = useState({
        name: '',
        email: '',
        password: ''
    })

    // const {register, formState: {errors, isValid}} = useForm()

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(inputValue);
    }
    
    function handleChangeInput(e) {
        setInputValue(e.target.value)
    }

    return (
        <section className='register'>
            <div className="auth">
                <Link className="header__link-logo link" to="/"></Link>
                <h1 className="auth__title">Добро пожаловать!</h1>
            </div>
            <form className='auth__form'
                  onSubmit={handleSubmit}>
                <label className="auth__label">Имя
                    <input
                        className='auth__input'
                        name="EmailInput"
                        placeholder="Введите имя"
                        required
                        onChange={handleChangeInput}
                        // value={name}
                    /></label>
                    <span
                        id="UserName-error"
                        className="auth__span-error"
                    />
                <label className="auth__label">E-mail
                    <input
                        required="Please Enter Your Email!"
                        className='auth__input'
                        type="email"
                        name="EmailInput"
                        placeholder="Введите E-mail"
                        onChange={handleChangeInput}
                        // value={email}
                    />
                    <span
                        id="UserName-error"
                        className="auth__span-error"
                    >{errors.message}</span>
                </label>
                <label className="auth__label">Пароль
                    <input
                        className='auth__input'
                        required="Please Enter Your Email!"
                        type="password"
                        name="PasswordInput"
                        placeholder="Придумайте пароль"
                        minLength={2}
                        maxLength={200}
                        onChange={handleChangeInput}
                        // value={password}
                    />
                    <span
                        id="UserName-error"
                        className="auth__span-error"
                    >{errors.message}</span>
                </label>
                <button className='auth__button' disabled={!isValid}>Зарегистрироваться</button>
            </form>
            <p className='auth__subtitle'>Уже зарегистрированы?&ensp;
                <Link to='/sign-in' className='link__nav text__link'>Войти</Link></p>
        </section>
    )
}