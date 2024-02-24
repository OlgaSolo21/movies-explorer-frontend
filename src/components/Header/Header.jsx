import {Link, NavLink} from "react-router-dom";


export default function Header({auth}) {
    return(
            <header>
                {!auth ? (//если не авторизован
                    <header className="header">
                        <Link className="header__link-logo link" to="/"></Link>
                        <div className="header__links">
                            <Link to="/signup" className="header__signin link">Регистрация</Link>
                            <Link to="/signin" className="header__signup link">Войти</Link>
                        </div>
                    </header>
                ) : (//иначе, если авторизован
                    <header className="header">
                        <Link className="header__link-logo link" to="/"></Link>
                        <nav className="header__menu">
                            <NavLink
                                to="/movies"
                                className={({isActive}) =>
                                    `${isActive ? "nav__link-active" : ""} header__title link`}>Фильмы</NavLink>
                            <NavLink
                                to="/saved-movies"
                                className={({isActive}) =>
                                    `${isActive ? "nav__link-active" : ""} header__title link`}>Сохранённые фильмы</NavLink>
                        </nav>
                        <Link to="/profile" className="header__infoProfile link">Аккаунт</Link>
                    </header>
                )}
            </header>
    )
}