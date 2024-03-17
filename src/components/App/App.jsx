import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
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
import BurgerMenuPopup from "../BurgerMenuPopup/BurgerMenuPopup";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import * as mainApi from "../../utils/MainApi"
import ProtectedRoute from "../../context/ProtectedRoute";

function App() {
    const location = useLocation()
    const path = location.pathname

    const [isLoading, setIsLoading] = useState(false);

// навигируем на другой роут
    const navigate = useNavigate()
//авторизация
    const [isLoggedIn, setIsLoggedIn] = useState(false)
// бургер меню на 768 и 320
    const [isBurgerMenu, setIsBurgerMenu] = useState(false)

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
    // const [movies, setMovies] = useState(constantFilm) // временное решение для карточек с фильмами
    const [savedMovies, setSavedMovies] = useState([])

    function handleRegister(data) { //направляем после регистрации
        setIsLoading(true);
        mainApi.register(data)
            .then(res => {
               if (res) {
                   setIsInfoToolTip(true)
                   setIsSuccess({
                       message: "Успешная регистрация",
                       success: true
                   })
                   handleLogin(data)
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
            .finally(() => {
                setIsLoading(false);
            });

    }

    function handleLogin(data) { // направляем после логина-входа
        setIsLoading(true);
        mainApi.login(data)
            .then((res) => {
                if (res && res.token) {
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
            .catch(() => {
                setIsLoggedIn(false)
                setIsInfoToolTip(true)
                setIsSuccess({
                    message: "Проверьте введенные данные",
                    success: false
                })
            })
            .finally(() => {
                setIsLoading(false);
            });

    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            mainApi.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        localStorage.removeItem('firstEnterMovies')
                        setIsLoggedIn(true)
                        navigate(path);
                    }
                })
                .catch(console.error)
        }
    }, []);

    useEffect(() => { // монтирует данные юзера в профиль
        if (isLoggedIn) {
            mainApi.getUserInfo()
                .then((data) => {
                    setCurrentUser(data)
                })
                .catch(console.error)
            mainApi.getSavedMovies()
                .then((data) => {
                    setSavedMovies(data)
                })
                .catch(console.error)
        }
    }, [isLoggedIn]);

    function handleUpdateProfile(data) { // изменение имени/почты в аккаунте(/profile)
        setIsLoading(true);
        mainApi.editProfilePatch(data)
            .then((res) => {
                setIsInfoToolTip(true)
                setIsSuccess({
                    message: "Данные успешно изменены",
                    success: true
                })
                setCurrentUser(res)
            })
            .catch(err => {
                setIsInfoToolTip(true)
                setIsSuccess({
                    message: "Пользователь с таким email уже существует",
                    success: false
                })
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function addMovie (data) {
        mainApi.addMovie(data)
            .then((save) => {
                setSavedMovies([save, ...savedMovies])
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

    function deleteMovie (data) {
        mainApi.deleteMovie(data._id)
            .then(() => {
                setSavedMovies((arrayMovie) => arrayMovie.filter((movie) => movie._id !== data._id))
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
        localStorage.clear()
        setIsLoggedIn(false)
        localStorage.removeItem('jwt')
        localStorage.removeItem('firstEnterMovies')
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
      <CurrentUserContext.Provider value={ currentUser }>
          <Header auth={isLoggedIn} openBurger={handleOpenBurger} />

          <Routes>
              <Route path="/"
                     element={<Main/>} />
              <Route path="/signup"
                     element={ !isLoggedIn ? (
                         <>
                             <Register
                                 onRegister={handleRegister}
                                 isLoading={isLoading}
                             />
                         </>
                     ) : (
                         <Navigate to="/" />
                     )}
              />
              <Route path="/signin"
                     element={ !isLoggedIn ? (
                         <>
                             <Login
                                 onLogin={handleLogin}
                                 isLoading={isLoading}
                             />
                         </>
                     ) : (
                         <Navigate to="/" />
                     )}
              />
              <Route path="/profile"
                     element={
                  <ProtectedRoute loggedIn={isLoggedIn}>
                      <Profile
                          isLoading={isLoading}
                          onUpdateUser={handleUpdateProfile}
                          logout={handleLogOut}/>
                  </ProtectedRoute>}/>
              <Route path="/movies"
                     element={
                  <ProtectedRoute loggedIn={isLoggedIn}>
                      <Movies
                          savedMovies={savedMovies}
                          addMovie={addMovie}
                          onDelete={deleteMovie}
                      />
                  </ProtectedRoute>}/>
              <Route path="/saved-movies"
                     element={
                  <ProtectedRoute loggedIn={isLoggedIn}>
                      <SavedMovies
                          savedMovies={savedMovies}
                          onDelete={deleteMovie}
                      />
                  </ProtectedRoute>}/>
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
