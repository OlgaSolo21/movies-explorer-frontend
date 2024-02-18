import {Link} from "react-router-dom";

function NavTab() {
    return(
        <nav className="navTab">
            <Link to="aboutProject" className="navTab__link">О проекте</Link>
            <Link to="aboutTechs" className="navTab__link">Технологии</Link>
            <Link to='aboutMe' className="navTab__link">Студент</Link>
        </nav>
    )
}

export default NavTab