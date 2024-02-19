import profileImg from "../../../images/photo-1444703686981-a3abbc4d4fe3.avif"
function AboutMe() {
    return (
        <section className="aboutMe">
            <div className="text__head lineBottom">Студент</div>
            <div className="aboutMe__info">
                <h2 className="aboutMe__title">Olga</h2>
                <p className="aboutMe__subtitle">Фронтенд-разработчик, 30 лет</p>
                <p className="aboutMe__caption">
                    Тут будет инфа обо мне Тут будет инфа обо мне
                    'caption' cannot appear as a child of 'div'
                    'caption' cannot appear as a child of 'div'
                    'caption' cannot appear as a child of 'div'
                    'caption' cannot appear as a child of 'div'
                </p>
                <img className="aboutMe__pic" src={profileImg} alt="фото профиля"/>
                <a className="aboutMe__link" href="https://github.com/OlgaSolo21">GitHub</a>
            </div>
            {/*<Portfolio/>*/}
        </section>
    )
}

export default AboutMe