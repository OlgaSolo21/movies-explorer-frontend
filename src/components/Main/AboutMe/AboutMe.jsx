import profileImg from "../../../images/photo-1444703686981-a3abbc4d4fe3.avif"
import Portfolio from "../Portfolio/Portfolio";
function AboutMe() {
    return (
        <section className="aboutMe" id="aboutMe">
            <div className="text__head">Студент</div>
            <div className="aboutMe__info">
                <div className="aboutMe__profile">
                    <h2 className="aboutMe__title">Olga</h2>
                    <p className="aboutMe__subtitle">Фронтенд-разработчик, 30 лет</p>
                    <p className="aboutMe__caption">
                        Тут будет инфа обо мне Тут будет инфа обо мне
                        'caption' cannot appear as a child of 'div'
                        'caption' cannot appear as a child of 'div'
                        'caption' cannot appear as a child of 'div'
                        'caption' cannot appear as a child of 'div'
                    </p>
                    <a className="aboutMe__link link" href="https://github.com/OlgaSolo21" target="_blank">GitHub</a>
                </div>
                <img className="aboutMe__pic" src={profileImg} alt="фото профиля"/>
            </div>
            <Portfolio/>
        </section>
    )
}

export default AboutMe