document.addEventListener("DOMContentLoaded", () => {

  const targets = document.querySelectorAll(".reveal");

  targets.forEach((el, i) => {
    el.style.transitionDelay = (i * 0.1) + "s";
  });
// ẩn 10% màn hình dưới
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("show");
        observer.unobserve(e.target);
      }
    });
  },{
    rootMargin: "0px 0px -10% 0px"
  });

  targets.forEach(el => observer.observe(el));

  const style = document.createElement("style");
  style.innerHTML = `
  .reveal{
    opacity:0;
    transform:translateY(24px);
    transition:opacity .4s ease, transform .4s ease;
  }
  .reveal.show{
    opacity:1;
    transform:translateY(0);
  }`;
  document.head.appendChild(style);

});