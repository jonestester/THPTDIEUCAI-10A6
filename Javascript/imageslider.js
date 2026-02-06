document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".slide-image").forEach(track => {

    let slides = [...track.querySelectorAll("img")];
    if (slides.length < 2) return;

    let index = 1;
    let locked = false;
    let timer;

    // clone
    track.appendChild(slides[0].cloneNode(true));
    track.insertBefore(slides[slides.length-1].cloneNode(true), slides[0]);

    slides = [...track.querySelectorAll("img")];
    track.style.transform = `translateX(-100%)`;

    function go(i){
      if (locked) return;
      locked = true;
      index = i;

      track.style.transition = "transform .6s ease";
      track.style.transform = `translateX(-${index * 100}%)`;

      resetTimer();
    }

    track.addEventListener("transitionend", () => {

      if (index === slides.length - 1) {
        index = 1;
        track.style.transition = "none";
        track.style.transform = `translateX(-100%)`;
      }

      if (index === 0) {
        index = slides.length - 2;
        track.style.transition = "none";
        track.style.transform = `translateX(-${index * 100}%)`;
      }

      locked = false;
    });

    // tìm nút trong slider gần nhất
    const wrapper = track.parentElement;

    wrapper.querySelector(".next")?.addEventListener("click", () => go(index + 1));
    wrapper.querySelector(".prev")?.addEventListener("click", () => go(index - 1));

    function resetTimer(){
      clearInterval(timer);
      timer = setInterval(() => go(index + 1), 10000);
    }

    resetTimer();

  });

});
