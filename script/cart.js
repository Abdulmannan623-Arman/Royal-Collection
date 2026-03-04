const cartItemsContainer = document.getElementById("cartItems");
const cartSummary = document.querySelector(".cart-summary");
const cartTotalEl = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");


checkoutBtn.addEventListener("click", () => {
    window.location.href = "checkout.html";
});


function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
        <div class="empty-cart">
            <div class="empty-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven’t added anything yet.</p>
            <a href="index.html" class="shop-btn">Continue Shopping</a>
        </div>
    `;
        cartTotalEl.textContent = "0";
        cartSummary.style.display = "none";
        return;
    }

    cartSummary.style.display = "flex";

    let totalPrice = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <div class="first-sec">
                <img src="${item.image}" alt="${item.name}">

                <div class="cart-info">
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
                </div>
            </div>

            <div class="quantity-box">
                <button class="decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase" data-id="${item.id}">+</button>
            </div>

            
            <button class="remove-btn" data-id="${item.id}">
                Remove
            </button>
           
        `;

        cartItemsContainer.appendChild(div);
    });

    cartTotalEl.textContent = totalPrice;
}

document.addEventListener("DOMContentLoaded", renderCart);


function updateQuantity(id, type) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const item = cart.find(product => product.id == id);

    if (!item) return;

    if (type === "increase") {
        item.quantity += 1;
    }

    if (type === "decrease") {
        item.quantity -= 1;

        if (item.quantity <= 0) {
            cart = cart.filter(product => product.id != id);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
    updateCartCount();
}

// Quantity Buttons Event
cartItemsContainer.addEventListener("click", (e) => {

    if (e.target.classList.contains("increase")) {
        const id = e.target.dataset.id;
        updateQuantity(id, "increase");
    }

    if (e.target.classList.contains("decrease")) {
        const id = e.target.dataset.id;
        updateQuantity(id, "decrease");
    }

    if (e.target.classList.contains("remove-btn")) {
        const id = e.target.dataset.id;
        removeItem(id);
    }

});

function removeItem(id) {

    const itemElement = document.querySelector(
        `.remove-btn[data-id="${id}"]`
    )?.closest(".cart-item");

    if (itemElement) {
        itemElement.classList.add("removing");

        setTimeout(() => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            cart = cart.filter(product => product.id != id);

            localStorage.setItem("cart", JSON.stringify(cart));

            renderCart();
            updateCartCount();
        }, 300);
    }
}

