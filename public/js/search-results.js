const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q");

async function loadResults() {
  try {
    const res = await fetch("http://localhost:5000/api/cycles");
    const cycles = await res.json();

    const filtered = cycles.filter(cycle =>
      cycle.name.toLowerCase().includes(query.toLowerCase()) ||
      cycle.brand.toLowerCase().includes(query.toLowerCase()) ||
      cycle.category.toLowerCase().includes(query.toLowerCase())
    );

    const container = document.getElementById("resultsContainer");
    container.innerHTML = "";

    if (filtered.length === 0) {
      container.innerHTML = "<p>No products found ❌</p>";
      return;
    }

    filtered.forEach(product => {
      container.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card">
            <img src="http://localhost:5000/uploads/${product.image}" class="card-img-top">
            <div class="card-body">
              <h5>${product.name}</h5>
              <p>${product.price}</p>
              <a href="product-view.html?id=${product._id}" class="btn btn-dark">
                View Details
              </a>
            </div>
          </div>
        </div>
      `;
    });

  } catch (err) {
    console.error("Search error:", err);
  }
}

loadResults();
