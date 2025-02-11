document.addEventListener("DOMContentLoaded", () => {
    const slidesContainer = document.querySelector(".slides");
    const slides = document.querySelectorAll(".slide");
    const pagination = document.querySelector(".pagination");
    let currentIndex = 0;
    const totalSlides = slides.length;
    /*** Create Pagination Dots ***/
    slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(index));
        pagination.appendChild(dot);
    });
    /*** Function to Navigate to a Specific Slide ***/
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
        updatePagination();
    }
    /*** Update Pagination Dots ***/
    function updatePagination() {
        document.querySelectorAll(".dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }
    /*** Event Listener for Clicks & Taps ***/
    slidesContainer.addEventListener("click", (e) => {
        const clickedPosition = e.clientX;
        const containerWidth = slidesContainer.offsetWidth;
        if (clickedPosition < containerWidth / 2) {
            goToSlide(currentIndex - 1); // Navigate left
        } else {
            goToSlide(currentIndex + 1); // Navigate right
        }
    });
    /*** Keyboard Navigation ***/
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") goToSlide(currentIndex + 1);
        if (e.key === "ArrowLeft") goToSlide(currentIndex - 1);
    });
    /*** Auto-Slide Timer ***/
    setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 10000);
});