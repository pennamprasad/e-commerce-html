// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = JSON.parse(localStorage.getItem("total")) || 0;

const cartBtn = document.getElementById("cartBtn");
const cartSection = document.getElementById("cartSection");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Toggle cart
if (cartBtn) {
    cartBtn.addEventListener("click", () => {
        cartSection.style.display =
            cartSection.style.display === "block" ? "none" : "block";
    });
}

// Add to cart
document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price);

        cart.push({ name, price });
        total += price;

        saveCart();
        renderCart();
    });
});

// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", JSON.stringify(total));
}

// Show cart items
function renderCart() {
    if (!cartItems) return;

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        cartItems.innerHTML += `
            <p>${index + 1}. ${item.name} - ₹${item.price}</p>
        `;
    });

    cartTotal.innerText = `Total: ₹${total}`;
}

// Load cart when page opens
renderCart();
