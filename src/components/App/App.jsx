import PromoProject from "../Main/PromoProject/PromoProject";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import AboutProject from "../Main/AboutProject/AboutProject";
import AboutTechs from "../Main/AboutTechs/AboutTechs";
import AboutMe from "../Main/AboutMe/AboutMe";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Header from "../Header/Header";
import {useState} from "react";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false) //авторизация
    const navigate = useNavigate() // навигируем на другой роут

    const {pathname} = useLocation() // локация пользователя

    function handleRegister() {
        setIsLoggedIn(true)
        // navigate('/sign-in', {replace: true})
        navigate('/')
    }
    
    return (
      <>
          {pathname !== '/' &&
          pathname !== '/movies' &&
          pathname !== '/saved-movies' &&
          pathname !== '/profile' ? null : <Header auth={isLoggedIn}/> }

          {/*{pathname !== '*' && pathname !== '/signup' && pathname !== '/signin' ? <Header auth={isLoggedIn}/> : null}*/}
          <Routes>
              {/*<Route path="/" element={<Main/>} />*/}
              <Route path="/" element={<PromoProject/>}>
                  <Route path="aboutProject" element={<AboutProject/>} />
                  <Route path="aboutTechs" element={<AboutTechs/>} />
                  <Route path="aboutMe" element={<AboutMe/>} />
              </Route>
              <Route path="/signup" element={<Register onRegister={handleRegister}/>}/>
              <Route path="/movies" element={<AboutTechs/>}/>
              <Route path="*" element={<NotFound/>} />
          </Routes>

          {pathname === '/' ||
          pathname === '/movies' ||
          pathname === '/saved-movies' ? <Footer /> : null}
          {/*{pathname !== '*' && pathname !== '/signup' && pathname !== '/signin' && pathname !== '/profile' ? <Footer/> : null}*/}
      </>
  )
}

export default App;
