import {Link, NavLink, useLocation} from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import {useState} from "react";

export default function Header({auth, openBurger}) {
    const location = useLocation() // локация пользователя для хэдера и футера
    const path = location.pathname

    return(
        <header>
            {path !== '/' &&
            path !== '/movies' &&
            path !== '/saved-movies' &&
            path !== '/profile' ? null : (
                <header>
                    {!auth ? (//если не авторизован
                        <div className="header">
                            <Link className="header__link-logo link" to="/"></Link>
                            <div className="header__links">
                                <Link to="/signup" className="header__signin link">Регистрация</Link>
                                <Link to="/signin" className="header__signup link">Войти</Link>
                            </div>
                        </div>
                    ) : (//иначе, если авторизован
                        <Navigation openBurger={openBurger} />
                    )}
                </header>
            )}
        </header>
    )
}