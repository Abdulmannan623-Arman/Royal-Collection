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

// Profile Button 

const profileBtn = document.getElementById("profileBtn");
const loginOverlay = document.getElementById("loginOverlay");
const closeLogin = document.getElementById("closeLogin");

if (profileBtn && loginOverlay && closeLogin) {
    profileBtn.addEventListener("click", () => {
        const user = JSON.parse(localStorage.getItem("royalCollectionUser"));

        if (user) {
            if (confirm("Logout?")) {
                localStorage.removeItem("royalCollectionUser");
                location.reload();
            }
        } else {
            loginOverlay?.classList.add("active");
            lockScroll()
        }
    });

    closeLogin.addEventListener("click", () => {
        loginOverlay.classList.remove("active");
        unlockScroll()
    });

}




/* ===============================
   DESKTOP SEARCH
================================ */

const desktopInput = document.getElementById("desktopSearchInput");
const desktopSuggestions = document.getElementById("desktopSuggestions");

if (desktopInput) {
    desktopInput?.addEventListener("input",
        debounce(async () => {
            const value = desktopInput.value.trim().toLowerCase();
            desktopSuggestions.innerHTML = "";

            if (!value) {
                desktopSuggestions.classList.remove("active");
                return;
            }

            const results = await fetchProducts(value);

            if (!results.length) {
                desktopSuggestions.innerHTML = "<p>No result found</p>";
                desktopSuggestions.classList.add("active");
                return;
            }

            results.forEach(item => {
                const p = document.createElement("p");
                p.textContent = item.name;
                p.onclick = () => location.href = `product.html?id=${item.id}`;
                desktopSuggestions.appendChild(p);
            });

            desktopSuggestions.classList.add("active");
        }, 300)
    );

    /* Click outside → close */
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".desktop-search")) {
            desktopSuggestions.classList.remove("active");
        }
    });
}

/* ===============================
   MOBILE SEARCH OVERLAY
================================ */

const searchOverlay = document.getElementById("searchOverlay");
const openSearchBtn = document.querySelector(".nav-center button");
const closeSearchBtn = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");

/* Open mobile search */
if (openSearchBtn) {
    openSearchBtn.addEventListener("click", () => {
        if (window.innerWidth <= 768 && searchOverlay) {
            searchOverlay.classList.add("active");
            searchInput.focus();
            lockScroll()
        }
    });
}

/* Close mobile search */
if (closeSearchBtn) {
    closeSearchBtn.addEventListener("click", () => {
        searchOverlay.classList.remove("active");
        searchInput.value = "";
        suggestionsBox.innerHTML = "";
        unlockScroll()
    });
}

/* Mobile live search */
if (searchInput) {
    searchInput?.addEventListener("input",
        debounce(async () => {
            const value = searchInput.value.trim().toLowerCase();
            suggestionsBox.innerHTML = "";

            if (!value) return;

            const results = await fetchProducts(value);

            if (!results.length) {
                suggestionsBox.innerHTML = "<p>No result found</p>";
                return;
            }

            results.forEach(item => {
                const p = document.createElement("p");
                p.textContent = item.name;
                p.onclick = () => location.href = `product.html?id=${item.id}`;
                suggestionsBox.appendChild(p);
            });
        }, 300)
    );

}

/* ===============================
KEYBOARD NAVIGATION (SHARED)
================================ */
function enableKeyboardNavigation(inputEl, suggestionsEl) {
    let activeIndex = -1;

    // Reset index when typing
    inputEl.addEventListener("input", () => {
        activeIndex = -1;
    });

    inputEl.addEventListener("keydown", (e) => {
        const items = suggestionsEl.querySelectorAll("p");
        if (!items.length) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            activeIndex = (activeIndex + 1) % items.length;
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            activeIndex = (activeIndex - 1 + items.length) % items.length;
        }

        if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex > -1) {
                items[activeIndex].click();
            }
            return;
        }

        items.forEach(item => item.classList.remove("active"));

        if (activeIndex > -1) {
            items[activeIndex].classList.add("active");
            items[activeIndex].scrollIntoView({ block: "nearest" });
        }
    });
}

if (desktopInput && desktopSuggestions) {
    enableKeyboardNavigation(desktopInput, desktopSuggestions);
}

if (searchInput && suggestionsBox) {
    enableKeyboardNavigation(searchInput, suggestionsBox);
}



// ===== MENU OVERLAY SYSTEM =====
const menuBackdrop = document.getElementById("menuBackdrop");
const menuOverlay = document.getElementById("menuOverlay");
const menuBtn = document.querySelector(".mobile-menu");

/* Open Menu */
if (menuBtn && menuOverlay && menuBackdrop) {
    menuBtn.addEventListener("click", () => {
        menuOverlay.classList.add("active");
        menuBackdrop.classList.add("active");
        lockScroll();
    });
}

/* Close when backdrop clicked */
menuBackdrop?.addEventListener("click", closeMenu);


/* ===== REAL LOGIN STATE ===== */
const menuAuth = document.getElementById("menuAuth");
const menuUsername = document.getElementById("menuUsername");
const avatarImg = document.querySelector(".menu-avatar img");
const avatarIcon = document.querySelector(".menu-avatar i");

function checkLoginState() {
    const user = JSON.parse(localStorage.getItem("royalCollectionUser"));

    if (user && menuAuth && menuUsername && avatarImg && avatarIcon) {
        menuAuth.style.display = "none";
        menuUsername.textContent = user.name;
        avatarImg.style.display = "block";
        avatarIcon.style.display = "none";
    }
}


// Sign Up Overlay 

/* ===== ELEMENTS ===== */
const signupOverlay = document.getElementById("signupOverlay");
const loginOverlayEl = document.getElementById("loginOverlay");

const openSignupFromLogin = document.getElementById("openSignupFromLogin");
const openLoginFromSignup = document.getElementById("openLoginFromSignup");

const closeSignup = document.getElementById("closeSignup");

const menuLoginBtn = document.getElementById("menuLoginBtn");
const menuSignupBtn = document.getElementById("menuSignupBtn");

/* ===== HELPERS ===== */
function openLogin() {
    loginOverlayEl.classList.add("active");
    signupOverlay.classList.remove("active");
    lockScroll()
}

function openSignup() {
    signupOverlay.classList.add("active");
    loginOverlayEl.classList.remove("active");
    lockScroll()
}

function closeSignupOverlay() {
    signupOverlay.classList.remove("active");
    unlockScroll()
}

/* ===== LOGIN → SIGNUP ===== */
if (openSignupFromLogin) {
    openSignupFromLogin.addEventListener("click", (e) => {
        e.preventDefault();
        openSignup();
    });
}

/* ===== SIGNUP → LOGIN ===== */
if (openLoginFromSignup) {
    openLoginFromSignup.addEventListener("click", (e) => {
        e.preventDefault();
        openLogin();
    });
}

/* ===== SIGNUP BACK BUTTON ===== */
if (closeSignup) {
    closeSignup.addEventListener("click", () => {
        closeSignupOverlay();
    });
}

/* ===== MOBILE MENU ===== */
function closeMenu() {
    menuOverlay?.classList.remove("active");
    menuBackdrop?.classList.remove("active");
    unlockScroll();
}

if (menuSignupBtn) {
    menuSignupBtn.addEventListener("click", () => {
        menuOverlay.classList.remove("active");
        openSignup();
    });
}
/* ===== GLOBAL ESC KEY HANDLER ===== */
document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    // Close menu
    if (menuOverlay?.classList.contains("active")) {
        closeMenu();
    }

    // Close login
    if (loginOverlay?.classList.contains("active")) {
        loginOverlay.classList.remove("active");
        unlockScroll()
    }

    // Close signup
    if (signupOverlay?.classList.contains("active")) {
        signupOverlay.classList.remove("active");
        unlockScroll()
    }

    // Close mobile search
    if (searchOverlay?.classList.contains("active")) {
        searchOverlay.classList.remove("active");
        unlockScroll()
    }
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountEl = document.getElementById("cartCount");

    if (!cartCountEl) return;

    const totalItems = cart.reduce((total, item) => {
        return total + (item.quantity || item.qty || 0);
    }, 0);

    cartCountEl.textContent = totalItems;
    cartCountEl.style.display = totalItems ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
    checkLoginState();
    updateCartCount();
});

