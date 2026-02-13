async function handleSearch(e) {
  e.preventDefault();

  const query = document
    .getElementById("searchInput")
    .value
    .trim()
    .toLowerCase();

  if (!query) return false;

  try {
    const res = await fetch("http://localhost:5000/api/cycles");
    const cycles = await res.json();

    const result = cycles.find(cycle =>
      cycle.name.toLowerCase().includes(query) ||
      cycle.brand.toLowerCase().includes(query) ||
      cycle.category.toLowerCase().includes(query)
    );

    if (result) {
      window.location.href = `/view/search-results.html?q=${query}`;

    } else {
      alert("No bike found ❌");
    }

  } catch (error) {
    console.error("Search failed:", error);
  }

  return false;
}
