
document.addEventListener("DOMContentLoaded", ()=>{

  const searchbar = document.querySelector(".searchbar");
  if (!searchbar) return;

  const iconBtn = searchbar.querySelector(".search-toggle");
  const box = searchbar.querySelector(".search-box");
  const input = searchbar.querySelector("#search-input");
  const btn = searchbar.querySelector("#search-button");

  /* ===== toggle mở ===== */
  iconBtn.addEventListener("click", e=>{
    e.stopPropagation();
    box.classList.toggle("open");

    if (box.classList.contains("open")) {
      setTimeout(()=> input.focus(), 60);
    }
  });

  /* ===== click ngoài → đóng ===== */
  document.addEventListener("click", e=>{
    if (!searchbar.contains(e.target)) {
      box.classList.remove("open");
    }
  });

  /* ===== ESC → đóng ===== */
  document.addEventListener("keydown", e=>{
    if (e.key === "Escape") {
      box.classList.remove("open");
    }
  });

  /* ===== chạy search ===== */
  function runSearch(){
    const q = input.value.trim();
    if (!q) return;

    // đổi link nếu bạn có trang search riêng
    window.location.href = "/search.html?q=" + encodeURIComponent(q);
  }

  /* click nút */
  btn.addEventListener("click", runSearch);

  /* Enter trong input */
  input.addEventListener("keydown", e=>{
    if (e.key === "Enter") runSearch();
  });

});
