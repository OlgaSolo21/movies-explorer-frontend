export default function MoviesCard({movie}) { // РЕНДЕР ОДНОЙ КАРТОЧКИ С ФИЛЬМОМ
    return (
        <section>
                <li className="cards__item">
                    <img className="cards__image cursor" alt="постер к фильму" src={movie.image}/>
                        <button className="cards__trash cursor"></button>
                        <div className="cards__content">
                            <h2 className="cards__title"></h2>
                            <button type="button" aria-label="Check" className="cards__like"></button>
                        </div>
                </li>
        </section>
    )
}