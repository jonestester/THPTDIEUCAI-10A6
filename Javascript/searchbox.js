document.addEventListener("DOMContentLoaded", () => {

  const searchbar = document.querySelector(".searchbar");
  if (!searchbar) return;

  const iconBtn = searchbar.querySelector(".search-toggle");
  const box = searchbar.querySelector(".search-box");
  const input = searchbar.querySelector("#search-input");
  const btn = searchbar.querySelector("#search-button");

  if (!iconBtn || !box || !input || !btn) return;

  /* ===== mở / đóng box ===== */
  iconBtn.addEventListener("click", e => {
    e.stopPropagation();
    box.classList.toggle("open");
    if (box.classList.contains("open")) {
      setTimeout(() => input.focus(), 60);
    }
  });

  /* ===== click ngoài → đóng ===== */
  document.addEventListener("click", e => {
    if (!searchbar.contains(e.target)) {
      box.classList.remove("open");
    }
  });

  /* ===== ESC → đóng ===== */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      box.classList.remove("open");
    }
  });

  /* ===== tính prefix theo cấp thư mục ===== */
  function getPrefix() {
    const path = location.pathname;

    // ví dụ:
    // /index.html → depth 0
    // /gioithieu/lichsu.html → depth 1
    const parts = path.split("/").filter(Boolean);
    const depth = parts.length - 1;

    if (depth <= 0) return "";
    return "../".repeat(depth);
  }

  /* ===== chạy search ===== */
  function runSearch() {
    const q = input.value.trim();
    if (!q) return;

    const prefix = getPrefix();
    window.location.href =
      prefix + "search.html?q=" + encodeURIComponent(q);
  }

  btn.addEventListener("click", runSearch);

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") runSearch();
  });

});

