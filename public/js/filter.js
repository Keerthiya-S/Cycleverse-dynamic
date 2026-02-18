const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
  button.addEventListener("click", function () {

    filterButtons.forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");

    const filterValue = this.getAttribute("data-filter");
    const bikes = document.querySelectorAll(".bike-item");

    bikes.forEach(bike => {
      const category = bike.getAttribute("data-category");

      if (filterValue === "all" || filterValue === category) {
        bike.style.display = "block";
      } else {
        bike.style.display = "none";
      }
    });
  });
});
