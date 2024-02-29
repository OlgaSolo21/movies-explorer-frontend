export default function ScrollToUp() { // доработать еще начатьное состояние (при обновлении страницы кнопка видна)
    function scrollToUp() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.addEventListener('scroll', function() {
      const scrollUpBtn = document.getElementById('scrollUpBtn');
        if (window.scrollY > 20) {
            scrollUpBtn.style.display = "block";
        } else {
            scrollUpBtn.style.display = "none";
        }
    });

    return (
        <button id="scrollUpBtn" onClick={ scrollToUp } className="scrollUp">Наверх</button>
    )
}