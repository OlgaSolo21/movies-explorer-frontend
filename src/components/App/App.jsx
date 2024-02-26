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
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import Profile from "../Profile/Profile";
import Preloader from "../Preloader/Preloader";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import constantFilm from "../../utils/constantFilm";
import BurgerMenuPopup from "../BurgerMenuPopup/BurgerMenuPopup";

function App() {
    const navigate = useNavigate() // навигируем на другой роут
    const location = useLocation() // локация пользователя для хэдера и футера
    const path = location.pathname

    const [isLoggedIn, setIsLoggedIn] = useState(false) //авторизация
    const [isBurgerMenu, setIsBurgerMenu] = useState(false)

    // временные переменные
    const [user, setUser] = useState({name: "Olga", email: 'olga@ya.ru'}) // временное решение для профиля (далее currentUser)
    const [movies, setMovies] = useState(constantFilm) // временное решение для карточек с фильмами
    const [savedMovies, setSavedMovies] = useState(constantFilm.slice(0, 3))

    function handleRegister() { //направляем после регистрации
        setIsLoggedIn(true)
        navigate('/signin', {replace: true})
    }
    function handleLogin() { // направляем после логина-входа
        setIsLoggedIn(true)
        navigate('/')
    }

    function handleUpdateProfile() { // изменение имени/почты в аккаунте(/profile)
        setUser(user)
        navigate('/profile')
    }

    function handleLogOut() {
        setIsLoggedIn(false)
        navigate('/')
    }

    function handleOpenBurger() {
        setIsBurgerMenu(true)
    }

    function handleCloseBurger() {
        setIsBurgerMenu(false)
    }

    return (
      <>
          {path !== '/' &&
          path !== '/movies' &&
          path !== '/saved-movies' &&
          path !== '/profile' ? null :
              <Header auth={isLoggedIn} openBurger={handleOpenBurger}/> }

          <Routes>
              {/*<Route path="/" element={<Main/>} />*/}
              <Route path="/" element={<PromoProject/>}>
                  <Route path="aboutProject" element={<AboutProject/>} />
                  <Route path="aboutTechs" element={<AboutTechs/>} />
                  <Route path="aboutMe" element={<AboutMe/>} />
              </Route>
              <Route path="/signup"
                     element={<Register onRegister={handleRegister}/>}/>
              <Route path="/signin"
                     element={<Login onRegister={handleLogin}/>}/>
              <Route path="/profile"
                     element={ <Profile user={user}
                  onUpdateUser={handleUpdateProfile}
                  logout={handleLogOut}/>}/>
              <Route path="/movies"
                     element={<Movies moviesList={movies} />}/>
              <Route path="/saved-movies"
                     element={<SavedMovies moviesList={savedMovies}/>}/>
              <Route path="*"
                     element={<NotFound/>} />
          </Routes>

          {path === '/' ||
          path === '/movies' ||
          path === '/saved-movies' ? <Footer /> : null}

          <BurgerMenuPopup
              isOpen={isBurgerMenu}
              onClose={handleCloseBurger}
          />
      </>
  )
}

export default App;
