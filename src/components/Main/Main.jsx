import {Route, Routes} from "react-router-dom";
import AboutProject from "./AboutProject/AboutProject";
import AboutTechs from "./AboutTechs/AboutTechs";
import AboutMe from "./AboutMe/AboutMe";
import PromoProject from "./PromoProject/PromoProject";
import {useRef} from "react";

export default function Main() {
    const ref = {
        aboutProject: useRef(),
        aboutTechs: useRef(),
        aboutMe: useRef()
    }
    return (
        <>
            <PromoProject/>
            <AboutProject ref={ref.aboutProject}/>
            <AboutTechs ref={ref.aboutTechs}/>
            <AboutMe ref={ref.aboutMe}/>
        </>
    )
}