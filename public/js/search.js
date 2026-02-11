const bikeSearchData = [
    // Trek
    { name: "Trek Domane", url: "view/trek-view.html?id=domane" },
    { name: "Trek Marlin", url: "view/trek-view.html?id=marlin7" },

    // Giant
    { name: "Giant Escape 3", url: "view/giant-view.html?id=escape3" },
    { name: "Giant Talon", url: "view/giant-view.html?id=talon" },

    // Cannondale
    { name: "Cannondale Quick", url: "view/cannondale-view.html?id=quick-4" },
    { name: "Cannondale Trail", url: "view/cannondale-view.html?id=trail-5" },

    // Specialized
    { name: "Specialized Roubaix", url: "view/specialized-view.html?id=roubaix" },
    { name: "Specialized Rockhopper", url: "view/specialized-view.html?id=rockhopper" }
  ];

  function handleSearch(e) {
    e.preventDefault();

    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!query) return;

    const result = bikeSearchData.find(bike =>
      bike.name.toLowerCase().includes(query)
    );

    if (result) {
      window.location.href = result.url;
    } else {
      alert("No bike found ");
    }
  }
