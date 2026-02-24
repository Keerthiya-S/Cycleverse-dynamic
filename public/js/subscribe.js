document.addEventListener("DOMContentLoaded", function () {

  const button = document.getElementById("subscribeBtn");

  button.addEventListener("click", async function () {

    const emailInput = document.getElementById("subscribeEmail");
    const email = emailInput.value.trim();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        emailInput.value = "";
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

  });

});