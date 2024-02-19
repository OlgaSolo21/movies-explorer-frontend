export  default function Footer() {
    return(
        <section className="footer">
            <article className="footer__info">
                <p className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="underline"></div>
                <div className="footer__navigation">
                    <p className="footer__copyright">&copy; 2024</p>
                    <div className="footer__links">
                        <a href="https://practicum.yandex.ru/"
                           className="footer__link footer__copyright link">Яндекс.Практикум</a>
                        <a href="https://github.com/"
                           className="footer__link footer__copyright link">Github</a>
                    </div>
                </div>
            </article>
        </section>
    )
}