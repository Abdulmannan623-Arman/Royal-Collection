const navbar = document.getElementById("navbar");

navbar.innerHTML = `

        <div class="nav-container">

            <!-- MOBILE MENU ICON (hidden on desktop) -->
            <div class="mobile-menu">
                <i class="fa-solid fa-bars"></i>
            </div>

            <!-- LEFT -->
            <div class="nav-left">
                <div class="logo">
                    <a href="index.html"><img src="images/logo.jpg" alt="logo"></a>
                </div>
            </div>

            <!-- CENTER (Desktop Search – future ready) -->
            <div class="nav-center">
                <div class="desktop-search">
                    <input type="text" id="desktopSearchInput" placeholder="Search products..." />
                    <button>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>

                    <!-- Suggestions -->
                    <div class="desktop-suggestions" id="desktopSuggestions"></div>
                </div>
            </div>


            <!-- RIGHT -->
            <div class="nav-right">
                <div class="profile" id="profileBtn" aria-label="User Profile">
                    <i class="fa-solid fa-user"></i>
                </div>

                <div class="cart" id="cart" aria-label="Shopping Cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span class="cart-count" id="cartCount">0</span>
                </div>
                
            </div>


        </div>
    
`

function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}


function lockScroll() {
    document.body.classList.add("no-scroll");
}

function unlockScroll() {
    document.body.classList.remove("no-scroll");
}


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountEl = document.getElementById("cartCount");

    if (!cartCountEl) return;

    const totalItems = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCountEl.textContent = totalItems;
    cartCountEl.style.display = totalItems ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});

// Open Cart Page 

const cartIcon = document.getElementById("cart");

cartIcon.addEventListener("click", () => {
    window.location.href = "cart.html";
});

