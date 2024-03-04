import profileImg from "../../../images/myFoto.jpg"
import Portfolio from "../Portfolio/Portfolio";
function AboutMe() {
    return (
        <section className="aboutMe" id="aboutMe">
            <div className="text-head">Студент</div>
            <div className="aboutMe__info">
                <div className="aboutMe__profile">
                    <h2 className="aboutMe__title">Ольга</h2>
                    <p className="aboutMe__subtitle">Фронтенд-разработчик, 30 лет</p>
                    <p className="aboutMe__caption">
                        Обо мне:
                        Я прошла путь от менеджера по работе с премиум-клиентами до бизнес-тренера.
                        Однако еще со школы любила кодить и создавать интересные проекты.
                        Информатика в целом была моим вторым хобби.
                        На данный момент я достигла определенных высот в сфере тренерства и приняла решение
                        сменить деятельность и посвятить свое время разработке.
                        Живу в солнечном Сочи и обожаю котов.
                    </p>
                    <a className="aboutMe__link link"
                       href="https://github.com/OlgaSolo21"
                       rel="noreferrer"
                       target="_blank">GitHub</a>
                </div>
                <img className="aboutMe__pic" src={profileImg} alt="фото профиля"/>
            </div>
            <Portfolio/>
        </section>
    )
}

export default AboutMe