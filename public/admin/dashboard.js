/* =========================================
   ELEMENTS
========================================= */

const form = document.getElementById("cycleForm");
const cycleTable = document.getElementById("cycleTable");


/* =========================================
   ADD / UPDATE CYCLE
========================================= */

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    let url = "http://localhost:5000/api/cycles/add";
    let method = "POST";

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
}


/* =========================================
   LOAD ALL CYCLES
========================================= */

async function loadCycles() {
  try {
    const res = await fetch("http://localhost:5000/api/cycles");
    const cycles = await res.json();

    if (!cycleTable) return;

    cycleTable.innerHTML = "";

    cycles.forEach(cycle => {
      cycleTable.innerHTML += `
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


/* =========================================
   DELETE CYCLE
========================================= */

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


/* =========================================
   EDIT CYCLE
========================================= */

async function editCycle(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/cycles/${id}`);
    const cycle = await res.json();

    form.name.value = cycle.name;
    form.category.value = cycle.category;
    form.brand.value = cycle.brand;
    form.price.value = cycle.price;
    form.description.value = cycle.description;
    form.colors.value = cycle.colors ? cycle.colors.join(",") : "";
    form.specs.value = cycle.specs ? cycle.specs.join(",") : "";

    form.dataset.editId = id;

    window.scrollTo({ top: 0, behavior: "smooth" });

  } catch (error) {
    console.error("Edit Error:", error);
  }
}


/* =========================================
   LOAD ORDERS
========================================= */

async function loadOrders() {
  try {
    const res = await fetch("http://localhost:5000/api/orders");
    const orders = await res.json();

    const orderTable = document.getElementById("orderTable");
    if (!orderTable) return;

    orderTable.innerHTML = "";

    orders.forEach(order => {

      let productList = "";

      if (order.products && order.products.length > 0) {
        order.products.forEach(p => {
          productList += `${p.name} (x${p.quantity})<br>`;
        });
      }

      orderTable.innerHTML += `
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


/* =========================================
   LOAD CONTACT MESSAGES
========================================= */

async function loadContacts() {
  try {
    const res = await fetch("http://localhost:5000/api/contact");
    const contacts = await res.json();

    const contactTable = document.getElementById("contactTable");
    if (!contactTable) return;

    contactTable.innerHTML = "";

    contacts.forEach(contact => {
      contactTable.innerHTML += `
        <tr>
          <td>${contact.name}</td>
          <td>${contact.email}</td>
          <td>${contact.subject}</td>
          <td>${contact.message}</td>
          <td>${new Date(contact.createdAt).toLocaleDateString()}</td>
          <td>
            <button onclick="deleteContact('${contact._id}')">Delete</button>
          </td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error loading contacts:", error);
  }
}


/* =========================================
   DELETE CONTACT
========================================= */

async function deleteContact(id) {
  if (!confirm("Delete this message?")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/contact/delete/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();
    alert(data.message || "Deleted Successfully");

    loadContacts();

  } catch (error) {
    console.error("Delete contact error:", error);
  }
}


/* =========================================
   LOAD SUBSCRIBERS
========================================= */

async function loadSubscribers() {
  try {
    const res = await fetch("http://localhost:5000/api/subscribe");
    const subscribers = await res.json();

    const subscriberTable = document.getElementById("subscriberTable");
    if (!subscriberTable) return;

    subscriberTable.innerHTML = "";

    subscribers.forEach(sub => {
      subscriberTable.innerHTML += `
        <tr>
          <td>${sub.email}</td>
          <td>${new Date(sub.createdAt).toLocaleDateString()}</td>
          <td>
            <button onclick="deleteSubscriber('${sub._id}')">Delete</button>
          </td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error loading subscribers:", error);
  }
}


/* =========================================
   DELETE SUBSCRIBER
========================================= */

async function deleteSubscriber(id) {
  if (!confirm("Delete this subscriber?")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/subscribe/delete/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();
    alert(data.message || "Deleted Successfully");

    loadSubscribers();

  } catch (error) {
    console.error("Delete subscriber error:", error);
  }
}


/* =========================================
   AUTO LOAD DEFAULT SECTION
========================================= */

loadCycles();
loadOrders();