import AboutProject from "./AboutProject/AboutProject";
import AboutTechs from "./AboutTechs/AboutTechs";
import AboutMe from "./AboutMe/AboutMe";
import PromoProject from "./PromoProject/PromoProject";
import ScrollToUp from "../ScrollToUp/ScrollToUp";


export default function Main() {
    return (
        <main>
            {/*<ScrollToUp /> ДОРАБОТАТЬ КОМПОНЕНТ
            TypeError: Cannot read properties of null (reading 'style')*/}
            <PromoProject/>
            <AboutProject />
            <AboutTechs />
            <AboutMe />
        </main>
    )
}
