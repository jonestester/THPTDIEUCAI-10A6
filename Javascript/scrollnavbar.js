
document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector(".nav-menu");
// navbar ảnh cuộn theo
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });
});