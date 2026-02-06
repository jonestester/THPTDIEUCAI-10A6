document.addEventListener("DOMContentLoaded", () => {

  const track = document.querySelector("#banner");
  if (!track) return;

  const slider = track.closest(".sliderbanner");

  function runZoom(){
    const imgs = track.querySelectorAll("img");
    if (!imgs.length) return;

    // bỏ zoom tất cả
    imgs.forEach(img => img.classList.remove("banner-zooming"));

    // đọc transform hiện tại
    const style = getComputedStyle(track).transform;
    if (style === "none") {
      imgs[0].classList.add("banner-zooming");
      return;
    }

    const matrix = new DOMMatrix(style);
    const x = Math.abs(matrix.m41);

    const width = slider.clientWidth;
    const index = Math.round(x / width);

    const img = imgs[index];
    if (!img) return;

    // reset animation
    img.classList.remove("banner-zooming");
    void img.offsetWidth;
    img.classList.add("banner-zooming");
  }

  runZoom();
  track.addEventListener("transitionend", runZoom);

});