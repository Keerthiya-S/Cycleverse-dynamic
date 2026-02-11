
const bike = JSON.parse(localStorage.getItem("selectedBike"));

if (!bike) {
  alert("No bike selected");
  window.location.href = "../index.html";
}

document.getElementById("bikeName").innerText = bike.name;
document.getElementById("bikePrice").innerText = bike.price;
document.getElementById("bikeImage").src = "../" + bike.image;
