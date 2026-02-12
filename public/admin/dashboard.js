const form = document.getElementById("cycleForm");
const table = document.getElementById("cycleTable");

/* ===========================
   ADD / UPDATE CYCLE
=========================== */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  let url = "http://localhost:5000/api/cycles/add";
  let method = "POST";

  // If editing, change URL and method
  if (form.dataset.editId) {
    url = `http://localhost:5000/api/cycles/update/${form.dataset.editId}`;
    method = "PUT";
  }

  try {
    const response = await fetch(url, {
      method: method,
      body: formData
    });

    const data = await response.json();

    alert(data.message || "Saved Successfully");

    form.reset();
    form.dataset.editId = "";
    loadCycles();

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
  }
});


/* ===========================
   LOAD ALL CYCLES
=========================== */
async function loadCycles() {
  try {
    const res = await fetch("http://localhost:5000/api/cycles");
    const cycles = await res.json();

    table.innerHTML = "";

    cycles.forEach(cycle => {
      table.innerHTML += `
        <tr>
          <td>${cycle.name}</td>
          <td>${cycle.category}</td>
          <td>${cycle.brand}</td>
          <td>${cycle.price}</td>
          <td>
            <button onclick="editCycle('${cycle._id}')">Edit</button>
            <button onclick="deleteCycle('${cycle._id}')">Delete</button>
          </td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Load Error:", error);
  }
}

loadCycles();


/* ===========================
   DELETE CYCLE
=========================== */
async function deleteCycle(id) {
  if (!confirm("Delete this cycle?")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/cycles/delete/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();

    alert(data.message || "Deleted Successfully");
    loadCycles();

  } catch (error) {
    console.error("Delete Error:", error);
  }
}


/* ===========================
   EDIT CYCLE
=========================== */
async function editCycle(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/cycles/${id}`);
    const cycle = await res.json();

    form.name.value = cycle.name;
    form.category.value = cycle.category;
    form.brand.value = cycle.brand;
    form.price.value = cycle.price;
    form.description.value = cycle.description;
    form.colors.value = cycle.colors.join(",");
    form.specs.value = cycle.specs.join(",");

    form.dataset.editId = id;

    window.scrollTo({ top: 0, behavior: "smooth" });

  } catch (error) {
    console.error("Edit Error:", error);
  }
}
// ==============================
// LOAD ORDERS (UPDATED FOR MULTIPLE PRODUCTS)
// ==============================

async function loadOrders() {
  try {
    const res = await fetch("http://localhost:5000/api/orders");
    const orders = await res.json();

    const table = document.getElementById("orderTable");
    table.innerHTML = "";

    orders.forEach(order => {

      // Combine product names
      let productList = "";
      order.products.forEach(p => {
        productList += `${p.name} (x${p.quantity})<br>`;
      });

      table.innerHTML += `
        <tr>
          <td>${order.customerName}</td>
          <td>${order.phone}</td>
          <td>${productList}</td>
          <td>₹${order.totalAmount}</td>
          <td>${order.city}</td>
          <td>${new Date(order.createdAt).toLocaleDateString()}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error loading orders:", error);
  }
}

loadOrders();
