import {Route, Routes} from "react-router-dom";
import AboutProject from "./AboutProject/AboutProject";
import AboutTechs from "./AboutTechs/AboutTechs";
import AboutMe from "./AboutMe/AboutMe";
import PromoProject from "./PromoProject/PromoProject";
import {useRef} from "react";
import Portfolio from "./Portfolio/Portfolio";

export default function Main() {
    let year = '2023';
    const currentYear = new Date().getFullYear();
    if (currentYear !== 2023) {
        year = `2023 - ${currentYear}`;
    }

    return(
        <footer className="footer">
            <p className="footer__copyright">© {year} Mesto Russia</p>
        </footer>
    )
}
        // <main>
        //     {/*<PromoProject/>*/}
        //     {/*<AboutProject/>*/}
        //     {/*<AboutTechs/>*/}
        //     {/*<AboutMe/>*/}
        //     {/*<Routes>*/}
        //     {/*    <Route path="/" element={<PromoProject/>}>*/}
        //     {/*        <Route path="aboutProject" element={<AboutProject/>} />*/}
        //     {/*        <Route path="aboutTechs" element={<AboutTechs/>} />*/}
        //     {/*        <Route path="aboutMe" element={<AboutMe/>} />*/}
        //     {/*    </Route>*/}
        //     {/*</Routes>*/}
        // </main>