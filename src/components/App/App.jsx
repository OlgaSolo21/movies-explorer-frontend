import {Route, Routes, useLocation, useNavigate} from "react-router-dom";

import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Header from "../Header/Header";
import {useEffect, useState} from "react";
import NotFound from "../NotFound/NotFound";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import constantFilm from "../../utils/constantFilm";
import BurgerMenuPopup from "../BurgerMenuPopup/BurgerMenuPopup";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import * as mainApi from "../../utils/MainApi"

function App() {
    const navigate = useNavigate() // навигируем на другой роут

    const [isLoggedIn, setIsLoggedIn] = useState(false) //авторизация
    const [isBurgerMenu, setIsBurgerMenu] = useState(false)
    const [isLoading, setIsLoading] = useState(false) // состояние загрузки
    const [isSuccess, setIsSuccess] = useState(false) //успешной аутентификации (меняем текст и картинку в попапе InfoTooltip)
    const [isInfoToolTip, setIsInfoToolTip] = useState(false) //переменная попапа уведомления InfoTooltip

    // временные переменные
    const [user, setUser] = useState({name: "Olga", email: 'olga@ya.ru'}) // временное решение для профиля (далее currentUser)
    const [movies, setMovies] = useState(constantFilm) // временное решение для карточек с фильмами
    const [savedMovies, setSavedMovies] = useState(constantFilm.slice(0, 3))

    //проверка токена
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            // setIsLoading(false);
            mainApi.getContent(jwt)
                .then((res) => {
                    setIsLoggedIn(true)
                })
                .catch(console.error)
        }
        // else {
        //     setIsLoading(true);
        // }
    }, [])

    function handleRegister({name, email, password}) { //направляем после регистрации
        mainApi.register(name, email, password)
            .then(res => {
               if (res) {
                   setIsLoggedIn(true)
                   setIsInfoToolTip(true)
                   setIsSuccess(true)
                   navigate('/signin', {replace: true})
                   // handleLogin({email, password})
               }
            })
            .catch(err => {
                setIsLoggedIn(false)
                setIsInfoToolTip(true)
                setIsSuccess(false)
                console.log(err)
            })

    }

    function handleLogin({email, password}) { // направляем после логина-входа
        mainApi.login(email, password)
            .then(res => {
                localStorage.setItem('jwt', res.token)
                setIsLoggedIn(true)
                setIsInfoToolTip(true)
                setIsSuccess(true)
                navigate("/movies", {replace: true});
            })
            .catch(err => {
                setIsLoggedIn(false)
                setIsInfoToolTip(true)
                setIsSuccess(false)
                console.log(err)
            })

    }

    function handleUpdateProfile() { // изменение имени/почты в аккаунте(/profile)
        setIsInfoToolTip(true)
        setIsSuccess(true)
        setUser(user)
        navigate('/profile')
    }

    function handleLogOut() {
        setIsLoggedIn(false)
        localStorage.removeItem('jwt')
        navigate('/')
    }

    function handleOpenBurger() {
        setIsBurgerMenu(true)
    }

    function handleClosePopup() {
        setIsBurgerMenu(false)
        setIsInfoToolTip(false)
    }

    return (
      <>
          <Header auth={isLoggedIn} openBurger={handleOpenBurger} />

          <Routes>
              <Route path="/"
                     element={<Main/>} />
              <Route path="/signup"
                     element={<Register onRegister={handleRegister}/>}/>
              <Route path="/signin"
                     element={<Login onLogin={handleLogin}/>}/>
              <Route path="/profile"
                     element={ <Profile user={user}
                  onUpdateUser={handleUpdateProfile}
                  logout={handleLogOut}/>}/>
              <Route path="/movies"
                     element={<Movies moviesList={movies} isLoading={isLoading}/>}/>
              <Route path="/saved-movies"
                     element={<SavedMovies moviesList={savedMovies}/>}/>
              <Route path="*"
                     element={<NotFound/>} />
          </Routes>

          <Footer/>

          <BurgerMenuPopup
              isOpen={isBurgerMenu}
              onClose={handleClosePopup}
          />

          <InfoTooltip
              isSuccess={ isSuccess }
              isOpen={ isInfoToolTip }
              onClose={ handleClosePopup }
          />
      </>
  )
}

export default App;
