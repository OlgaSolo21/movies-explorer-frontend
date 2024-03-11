import {Route, Routes, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import CurrentUserContext from "../../context/CurrentUserContext";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Header from "../Header/Header";
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
import {getUserInfo} from "../../utils/MainApi";

function App() {
// навигируем на другой роут
    const navigate = useNavigate()
//авторизация
    const [isLoggedIn, setIsLoggedIn] = useState(false)
// бургер меню на 768 и 320
    const [isBurgerMenu, setIsBurgerMenu] = useState(false)
// состояние загрузки
    const [isLoading, setIsLoading] = useState(false)
//успешной аутентификации (меняем текст и картинку в попапе InfoTooltip)
    const [isSuccess, setIsSuccess] = useState({
        message: "",
        success: false
    })
//переменная попапа уведомления InfoTooltip
    const [isInfoToolTip, setIsInfoToolTip] = useState(false)
// стейт currentUser в корневом компоненте чтобы данные о текущем пользователе были видны во всех местах
    const [currentUser, setCurrentUser] = useState({})

    // временные переменные
    const [movies, setMovies] = useState(constantFilm) // временное решение для карточек с фильмами
    const [savedMovies, setSavedMovies] = useState(constantFilm.slice(0, 3))

    //проверка токена
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            mainApi.getContent(jwt)
                .then(() => {
                    setIsLoggedIn(true)
                })
                .catch(console.error)
        }
    }, [])

    function handleRegister({name, email, password}) { //направляем после регистрации
        mainApi.register(name, email, password)
            .then(res => {
               if (res) {
                   setIsLoggedIn(true)
                   setIsInfoToolTip(true)
                   setIsSuccess({
                       message: "Успешная регистрация",
                       success: true
                   })
                   handleLogin({email, password})
               }
            })
            .catch(err => {
                setIsLoggedIn(false)
                setIsInfoToolTip(true)
                setIsSuccess({
                    message: "Ошибка регистрации",
                    success: false
                })
                console.log(err)
            })

    }

    function handleLogin({email, password}) { // направляем после логина-входа
        mainApi.login(email, password)
            .then((res) => {
                if (res) {
                    localStorage.setItem('jwt', res.token)
                    setIsLoggedIn(true)
                    setIsInfoToolTip(true)
                    setIsSuccess({
                        message: "Успешный вход",
                        success: true
                    })
                    navigate("/movies", {replace: true});
                }
            })
            .catch(err => {
                setIsLoggedIn(false)
                setIsInfoToolTip(true)
                setIsSuccess({
                    message: "Проверьте введенные данные",
                    success: false
                })
            })

    }

    function handleUpdateProfile(data) { // изменение имени/почты в аккаунте(/profile)
        const jwt = localStorage.getItem('jwt');
        mainApi.editProfilePatch(data, jwt)
            .then(() => {
                setIsInfoToolTip(true)
                setIsSuccess({
                    message: "Данные успешно изменены",
                    success: true
                })
                setCurrentUser({name: data.name, email: data.email})
                navigate('/profile')
            })
            .catch(err => {
                setIsLoggedIn(false)
                setIsInfoToolTip(true)
                setIsSuccess({
                    message: "При обновлении профиля произошла ошибка",
                    success: false
                })
            })
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

    // монтирование данных на странице
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt && isLoggedIn) {
            mainApi.getContent(jwt)
                .then((data) => {
                    setCurrentUser({name: data.name, email: data.email})
                })
                .catch(console.error)
        }
    }, [isLoggedIn])

    return (
      <CurrentUserContext.Provider value={ currentUser }>
          <Header auth={isLoggedIn} openBurger={handleOpenBurger} />

          <Routes>
              <Route path="/"
                     element={<Main/>} />
              <Route path="/signup"
                     element={<Register onRegister={handleRegister}/>}/>
              <Route path="/signin"
                     element={<Login onLogin={handleLogin}/>}/>
              <Route path="/profile"
                     element={ <Profile
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
              isSuccess={isSuccess.success}
              isOpen={ isInfoToolTip }
              onClose={ handleClosePopup }
              message={isSuccess.message}
          />
      </CurrentUserContext.Provider>
  )
}

export default App;
