export default function ButtonMore({handleMoreLoad}) {
    // handleMoreLoad загрузка фильмов на кнопку "еще"
    return(
        <section className="more">
            <button className="more__btn link" onClick={handleMoreLoad}>Еще</button>
        </section>
    )
}