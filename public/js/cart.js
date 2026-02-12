function loadCart() {

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartItems");
  const totalBox = document.getElementById("cartTotal");
  const summary = document.getElementById("cartSummary");

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center mt-5">
        <h4>Your cart is empty 😔</h4>
        <button class="btn btn-outline-light mt-3" onclick="continueShopping()">
          Continue Shopping
        </button>
      </div>
    `;
    summary.classList.add("d-none");
    return;
  }

  summary.classList.remove("d-none");

  cart.forEach((item, index) => {

    const priceNumber = parseInt(item.price.replace(/[₹,]/g, ""));
    const itemTotal = priceNumber * item.quantity;
    total += itemTotal;

    container.innerHTML += `
      <div class="card bg-secondary text-white mb-3 p-3">
        <div class="row align-items-center text-center">

          <div class="col-md-3">
            <h5>${item.name}</h5>
          </div>

          <div class="col-md-2">
            ₹${priceNumber}
          </div>

          <div class="col-md-3">
            <button class="btn btn-sm btn-light me-2"
              onclick="decreaseQty(${index})">-</button>

            ${item.quantity}

            <button class="btn btn-sm btn-light ms-2"
              onclick="increaseQty(${index})">+</button>
          </div>

          <div class="col-md-2">
            ₹${itemTotal}
          </div>

          <div class="col-md-2">
            <button class="btn btn-danger btn-sm"
              onclick="removeItem(${index})">
              Remove
            </button>
          </div>

        </div>
      </div>
    `;
  });

  totalBox.textContent = total;
}

function increaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function decreaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function continueShopping() {
  window.location.href = "index.html";
}

document.getElementById("checkoutBtn").onclick = function () {
  window.location.href = "checkout/checkout.html";
};

loadCart();
