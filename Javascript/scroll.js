const btn = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 110) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
});
// bấm cuộn lên trên
btn.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};