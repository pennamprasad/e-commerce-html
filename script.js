/* ===============================
   LOAD CART FROM localStorage
================================ */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ===============================
   DOM ELEMENTS (SAFE)
================================ */
const cartBtn = document.getElementById("cartBtn");
const cartSection = document.getElementById("cartSection");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

/* ===============================
   TOGGLE CART
================================ */
if (cartBtn && cartSection) {
    cartBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        cartSection.classList.toggle("show");
    });
}

/* Close cart when clicking outside */
document.addEventListener("click", (e) => {
    if (
        cartSection &&
        cartSection.classList.contains("show") &&
        !cartSection.contains(e.target) &&
        !cartBtn.contains(e.target)
    ) {
        cartSection.classList.remove("show");
    }
});

/* ===============================
   ADD TO CART (ONLY IF EXISTS)
================================ */
const addToCartButtons = document.querySelectorAll(".add-to-cart");

if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const name = btn.dataset.name;
            const price = parseInt(btn.dataset.price);

            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            saveCart();
            renderCart();
        });
    });
}

/* ===============================
   SAVE CART
================================ */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* ===============================
   REMOVE SINGLE ITEM
================================ */
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

/* ===============================
   REMOVE ALL ITEMS
================================ */
function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
}

/* ===============================
   RENDER CART
================================ */
function renderCart() {
    if (!cartItems || !cartTotal || !cartCount) return;

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty</p>";
        cartTotal.innerText = "Total: ₹0";
        cartCount.innerText = 0;
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>
                    ${item.name} × ${item.quantity}
                    <strong>₹${item.price * item.quantity}</strong>
                </span>
                <button class="remove-btn" onclick="removeItem(${index})">❌</button>
            </div>
        `;
    });

    cartTotal.innerText = `Total: ₹${total}`;
    cartCount.innerText = cart.length;
}

/* ===============================
   LOAD CART ON PAGE LOAD
================================ */
renderCart();
