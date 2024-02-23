import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import isEmail from 'validator/lib/isEmail';

export default function Register({onRegister}) {
    const [inputValue, setInputValue] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [inputError, setInputError] = useState({});
    // const [buttonValid, setButtonValid] = useState(false)
    //
    // useEffect(() => {
    //     if (inputError) {
    //         setButtonValid(false)
    //     } else {
    //         setButtonValid(true)
    //     }
    // }, [inputError])
    //
    // useEffect(() => {
    //     if (Object.keys(inputError).length === 0) {
    //         setInputError({});
    //     }
    // }, []);

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(inputValue);
    }

    function handleChangeInput(e) {
        const{name , value, validationMessage} = e.target;
        setInputValue({...inputValue, [name]: value});
        setInputError({...inputError, [name]: validationMessage});
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
                        type="text"
                        className='auth__input'
                        name="name"
                        placeholder="Введите имя"
                        required
                        onChange={handleChangeInput}
                        value={inputValue.name}
                    />
                    <span className="auth__span-error">{inputError.name}</span>
                </label>
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
                <button type="submit" className='auth__button link'>Зарегистрироваться</button>
            </form>
            <p className='auth__subtitle'>Уже зарегистрированы?&ensp;
                <Link to='/sign-in' className='link__nav text__link'>Войти</Link></p>
        </section>
    )}
//         <section className='register'>
//             <div className="auth">
//                 <Link className="header__link-logo link" to="/"></Link>
//                 <h1 className="auth__title">Добро пожаловать!</h1>
//             </div>
//             <form className='auth__form'
//                   onSubmit={handleSubmit}
//                   noValidate>
//                 <label className="auth__label">Имя
//                     <input
//                         className='auth__input'
//                         name="EmailInput"
//                         placeholder="Введите имя"
//                         required
//                         onChange={handleChangeInput}
//                         // value={name}
//                     /></label>
//                     <span
//                         id="UserName-error"
//                         className="auth__span-error"
//                     />
//                 <label className="auth__label">E-mail
//                     <input
//                         required="Please Enter Your Email!"
//                         className='auth__input'
//                         type="email"
//                         name="EmailInput"
//                         placeholder="Введите E-mail"
//                         onChange={handleChangeInput}
//                         // value={email}
//                     />
//                     <span
//                         id="UserName-error"
//                         className="auth__span-error"/>
//                 </label>
//                 <label className="auth__label">Пароль
//                     <input
//                         className='auth__input'
//                         required="Please Enter Your Password"
//                         type="password"
//                         name="PasswordInput"
//                         placeholder="Придумайте пароль"
//                         minLength={8}
//                         onChange={handleChangeInput}
//                         // value={password}
//                     />
//                     <span
//                         id="UserName-error"
//                         className="auth__span-error"/>
//                 </label>
//                 <button className='auth__button'>Зарегистрироваться</button>
//             </form>
//             <p className='auth__subtitle'>Уже зарегистрированы?&ensp;
//                 <Link to='/sign-in' className='link__nav text__link'>Войти</Link></p>
//         </section>
//     )
// }