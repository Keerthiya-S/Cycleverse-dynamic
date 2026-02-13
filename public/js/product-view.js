const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

let currentProduct = null;

// 🚨 Safety check
if (!productId) {
    alert("Invalid Product ID ❌");
    window.location.href = "../index.html";
}

async function loadProduct() {
    try {

        const res = await fetch(`http://localhost:5000/api/cycles/${productId}`);
        console.log("Product ID from URL:", productId);

        if (!res.ok) {
            throw new Error("Product not found");
        }

        const product = await res.json();
        console.log(product);

        currentProduct = product;

        document.getElementById("cycleName").textContent = product.name;
        document.getElementById("cyclePrice").textContent = product.price;
        document.getElementById("cycleDescription").textContent = product.description;
        document.getElementById("cycleBrand").textContent = product.brand;
        document.getElementById("cycleCategory").textContent = product.category;

        // Image fix
        if (product.image && product.image.startsWith("uploads/")) {
            document.getElementById("cycleImage").src =
                `http://localhost:5000/${product.image}`;
        } else {
            document.getElementById("cycleImage").src =
                `http://localhost:5000/uploads/${product.image}`;
        }

const colorDiv = document.getElementById("cycleColors");
colorDiv.innerHTML = "";

product.colors?.forEach(color => {
    const span = document.createElement("span");
    span.className = "color-dot";
    span.style.background = color;
    colorDiv.appendChild(span);
});



        // Specs
        const specList = document.getElementById("cycleSpecs");
        specList.innerHTML = "";
        product.specs?.forEach(spec => {
            specList.innerHTML += `<li>${spec}</li>`;
        });

    } catch (error) {
        console.error("Error loading product:", error);
        alert("Product not found ❌");
    }
}

loadProduct();


// ==================
// ADD TO CART
// ==================
function addToCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === currentProduct._id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: currentProduct._id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();   // 🔥 ADD THIS LINE
    alert("Added to cart ✅");
}


// ==================
// BUY NOW
// ==================
function buyNow() {

    const singleProductCart = [{
        id: currentProduct._id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.image,
        quantity: 1
    }];

    localStorage.setItem("cart", JSON.stringify(singleProductCart));

    window.location.href = "../checkout/checkout.html";
}
