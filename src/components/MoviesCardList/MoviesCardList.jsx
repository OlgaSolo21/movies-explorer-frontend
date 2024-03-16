import ButtonMore from "../ButtonMore/ButtonMore";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useEffect, useState} from "react";
import Preloader from "../Preloader/Preloader";
import AlertSearch from "../AlertSearch/AlertSearch";

export default function MoviesCardList(
    {isLoading, moviesAll, savedMovies,
        addMovie, onDelete, errLoad, startSearch}) { //РЕНДЕР ВСЕХ КАРТОЧЕК НА СТРАНИЦУ
    // const {pathname} = useLocation()
    const [countMovies, setCountMovies] = useState(0)

    useEffect(() => {
        const visibleMovieList = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1279) {
                setCountMovies(12);
            } else if (screenWidth >= 767) {
                setCountMovies(8);
            } else if (screenWidth >= 320) {
                setCountMovies(5);
            }
        };

        visibleMovieList();
        // window.addEventListener("resize", visibleMovieList);

        return () => {
            window.removeEventListener("resize", visibleMovieList);
        };
    }, []);

    function loadMore() {//загрузка фильмов на кнопку "еще"
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1279) {
            setCountMovies(countMovies + 4);
        } else if (screenWidth >= 767) {
            setCountMovies(countMovies + 3);
        } else if (screenWidth >= 319) {
            setCountMovies(countMovies + 2);
        }
        // const loadMoreItem = countMovies + visibleList().step
        // setCountMovies(loadMoreItem);
    }

    return (
        <section className="movie">
            {isLoading && <Preloader/>}
            {startSearch && !isLoading && <AlertSearch text={"Ничего не найдено"}/>}
            {errLoad && !isLoading && <AlertSearch
                text={"Во время запроса произошла ошибка. " +
                    "Возможно, проблема с соединением или сервер недоступен. " +
                    "Подождите немного и попробуйте ещё раз"}/>}
            {!isLoading && !errLoad && !startSearch && (
                <ul className="movie__list">
                     {moviesAll.slice(0, countMovies).map((data) => (
                                <MoviesCard
                                    addMovie={addMovie}
                                    onDelete={onDelete}
                                    moviesAll={moviesAll}
                                    savedMovies={savedMovies}
                                    data={data}
                                    key={ data.id || data._id}
                                />
                            ))}
                        </ul>
            )}
            {countMovies < moviesAll.length && (
                <ButtonMore handleMoreLoad={loadMore}/>
            )}
        </section>
    )
}

                // <>
                //     {pathname === '/saved-movies'} ? (
                //     <>
                //         <ul className="movie__list">
                //             {moviesAll.map((data) => (
                //                 <MoviesCard
                //                     savedRout={savedRout}
                //                     addMovie={addMovie}
                //                     onDelete={onDelete}
                //                     moviesAll={moviesAll}
                //                     savedMovies={savedMovies}
                //                     data={data}
                //                     key={savedRout ? data._id : data.id}
                //                 />
                //             ))}
                //         </ul>
                //     </>
                //     ) : (
                //     <ul className="movie__list">
                //         {moviesAll.slice(0, countMovies).map((data) => (
                //             <MoviesCard
                //                 savedRout={savedRout}
                //                 addMovie={addMovie}
                //                 onDelete={onDelete}
                //                 moviesAll={moviesAll}
                //                 savedMovies={savedMovies}
                //                 data={data}
                //                 key={savedRout ? data._id : data.id}
                //             />
                //         ))}
                //     </ul>
                // </>
