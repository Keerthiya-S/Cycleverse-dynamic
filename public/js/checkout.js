function loadCheckout() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart.length) {
        alert("Cart is empty");
        window.location.href = "../cart.html";
        return;
    }

    const container = document.getElementById("checkoutProducts");
    const totalEl = document.getElementById("checkoutTotal");

    container.innerHTML = "";
    let total = 0;

    cart.forEach(item => {

        // Convert ₹20,000 → 20000
        const priceNumber = parseInt(
            item.price.replace("₹", "").replace(/,/g, "")
        );

        const qty = item.quantity || 1;
        const itemTotal = priceNumber * qty;
        total += itemTotal;

        container.innerHTML += `
            <div class="card bg-dark text-white mb-3 p-3">
                <div class="row align-items-center">

                    <div class="col-md-3">
                        <img 
                          src="http://localhost:5000/uploads/${item.image}" 
                          class="img-fluid rounded"
                          style="max-height:120px;object-fit:cover;"
                        >
                    </div>

                    <div class="col-md-6">
                        <h5>${item.name}</h5>
                        <p class="mb-1">Price: ${item.price}</p>
                        <p class="mb-0">Quantity: ${qty}</p>
                    </div>

                    <div class="col-md-3 text-end">
                        <h5>₹${itemTotal.toLocaleString()}</h5>
                    </div>

                </div>
            </div>
        `;
    });

    totalEl.textContent = total.toLocaleString();

    document.getElementById("placeOrderBtn").addEventListener("click", async function () {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const customerName = document.querySelector("input[placeholder='Full Name']").value;
    const phone = document.querySelector("input[placeholder='Phone Number']").value;
    const address = document.querySelector("input[placeholder='Address']").value;
    const city = document.querySelector("input[placeholder='City']").value;
    const zip = document.querySelector("input[placeholder='ZIP Code']").value;

    if (!customerName || !phone || !address || !city || !zip) {
        alert("Please fill all fields");
        return;
    }

    // Calculate total
    let total = 0;
    cart.forEach(item => {
        const priceNumber = parseInt(item.price.replace(/[^0-9]/g, ""));
        total += priceNumber * item.quantity;
    });

    try {

        const response = await fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                products: cart,
                totalAmount: total,
                customerName,
                phone,
                address,
                city,
                zip
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Order placed successfully ✅");

            localStorage.removeItem("cart");

            window.location.href = "../index.html";
        } else {
            alert(data.message || "Error placing order");
        }

    } catch (err) {
        console.error(err);
        alert("Server error");
    }

});

}

loadCheckout();
