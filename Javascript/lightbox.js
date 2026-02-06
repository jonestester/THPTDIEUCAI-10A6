window.addEventListener("DOMContentLoaded", () => {

  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return; // tránh crash

  const lbImg = lightbox.querySelector(".lb-img");
  const btnClose = lightbox.querySelector(".lb-close");
  const zoomIn = lightbox.querySelector(".lb-zoom-in");
  const zoomOut = lightbox.querySelector(".lb-zoom-out");

  let scale = 1;

  function openLB(src){
    lbImg.src = src;
    scale = 1;
    lbImg.style.transform = "scale(1)";
    lightbox.classList.add("show");
  }

  function closeLB(){
    lightbox.classList.remove("show");
  }

  /*  ảnh có class lb-able */
  document.addEventListener("click", (e)=>{
    const img = e.target.closest("img.lb-able");
    if (!img) return;
    openLB(img.src);
  });

  /* đóng */
  btnClose?.addEventListener("click", closeLB);

  lightbox.addEventListener("click", (e)=>{
    if(e.target === lightbox) closeLB();
  });

  document.addEventListener("keydown", e=>{
    if(e.key === "Escape") closeLB();
  });

  /* zoom */
  zoomIn?.addEventListener("click", ()=>{
    scale += 0.2;
    lbImg.style.transform = `scale(${scale})`;
  });

  zoomOut?.addEventListener("click", ()=>{
    scale = Math.max(0.4, scale - 0.2);
    lbImg.style.transform = `scale(${scale})`;
  });

});
