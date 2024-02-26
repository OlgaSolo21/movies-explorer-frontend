import {Link, NavLink} from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Header({auth, openBurger}) {
    return(
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
                    <Navigation openBurger={openBurger}/>
                )}
            </header>
    )
}