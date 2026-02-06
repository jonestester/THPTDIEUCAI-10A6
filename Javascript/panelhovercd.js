window.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".nav-item.has-panel").forEach(item => {

    const panel = item.querySelector(".nav-panel");
    if (!panel) return;

    let hideTimer;

    function showPanel(){
      clearTimeout(hideTimer);
      panel.classList.add("show");
    }

    function hidePanel(){
      hideTimer = setTimeout(() => {
        if (!item.matches(':hover') && !panel.matches(':hover')) {
          panel.classList.remove("show");
        }
      }, 200);
    }

    item.addEventListener("mouseenter", showPanel);
    item.addEventListener("mouseleave", hidePanel);

    panel.addEventListener("mouseenter", showPanel);
    panel.addEventListener("mouseleave", hidePanel);

  });

});