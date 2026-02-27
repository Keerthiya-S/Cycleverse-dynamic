document.addEventListener("DOMContentLoaded", function () {

  const visibleCount = 3;   // 👈 show only 3 initially
  const container = document.getElementById("cycleContainer");
  const toggleBtn = document.querySelector(".view-toggle-btn");

  if (!container || !toggleBtn) return;

  function showInitial() {
    const cards = container.querySelectorAll(".bike-item");

    if (cards.length <= visibleCount) {
      toggleBtn.style.display = "none";
      return;
    }

    cards.forEach((card, index) => {
      card.style.display = index < visibleCount ? "block" : "none";
    });

    toggleBtn.innerText = "View More Bikes";
  }

  function showAll() {
    const cards = container.querySelectorAll(".bike-item");

    cards.forEach(card => {
      card.style.display = "block";
    });

    toggleBtn.innerText = "View Less";
  }

  toggleBtn.addEventListener("click", function () {

    if (toggleBtn.innerText === "View Less") {
      showInitial();
      container.scrollIntoView({ behavior: "smooth" });
    } else {
      showAll();
    }

  });

  // Wait for fetch cards to load
  setTimeout(showInitial, 500);

});