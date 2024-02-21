import {Link, NavLink} from "react-router-dom";


export default function Header({auth}) {
    return(
            <header>
                {!auth ? (//если не авторизован
                    <header className="header">
                        <Link className="header__link-logo link" to="/"></Link>
                        <div className="header__links">
                            <Link to="/signup" className="header__signin text__link link">Регистрация</Link>
                            <Link to="/signin" className="header__signup text__link link">Войти</Link>
                        </div>
                    </header>
                ) : (//иначе, если авторизован
                    <header className="header">
                        <Link className="header__link-logo link" to="/"></Link>
                        <nav className="header__menu">
                            <NavLink //проверить оба варианта
                                to="/movies"
                                className={({isActive}) =>
                                    `${isActive ? "nav__link_active" : ""} header__title text__link link`}>Фильмы</NavLink>
                            <NavLink
                                to="/saved-movies"
                                className="header__title text__link link"
                                activeClassName="nav__link_active">Сохранённые фильмы</NavLink>
                        </nav>
                        <Link to="/profile" className="header__infoProfile text__link link">Аккаунт</Link>
                    </header>
                )}
            </header>
    )
}