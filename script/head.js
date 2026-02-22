
// Profile Button 

const profileBtn = document.getElementById("profileBtn");
const loginOverlay = document.getElementById("loginOverlay");
const closeLogin = document.getElementById("closeLogin");

if (profileBtn && loginOverlay && closeLogin) {
    profileBtn.addEventListener("click", () => {
        loginOverlay.classList.add("active");
        document.body.classList.add("no-scroll");
    });

    closeLogin.addEventListener("click", () => {
        loginOverlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
    });

}




/* ===============================
   DESKTOP SEARCH
================================ */

const desktopInput = document.getElementById("desktopSearchInput");
const desktopSuggestions = document.getElementById("desktopSuggestions");

if (desktopInput) {
    desktopInput.addEventListener("input", async () => {
        const value = desktopInput.value.trim().toLowerCase();
        desktopSuggestions.innerHTML = "";

        if (!value) {
            desktopSuggestions.classList.remove("active");
            return;
        }

        const results = await fetchProducts(value);

        if (results.length === 0) {
            desktopSuggestions.innerHTML = "<p>No result found</p>";
            desktopSuggestions.classList.add("active");
            return;
        }

        results.forEach(item => {
            const p = document.createElement("p");
            p.textContent = item.name;

            p.addEventListener("click", () => {
                window.location.href = `product.html?id=${item.id}`;
            });

            desktopSuggestions.appendChild(p);
        });

        desktopSuggestions.classList.add("active");
    });

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
            document.body.classList.add("no-scroll");
        }
    });
}

/* Close mobile search */
if (closeSearchBtn) {
    closeSearchBtn.addEventListener("click", () => {
        searchOverlay.classList.remove("active");
        searchInput.value = "";
        suggestionsBox.innerHTML = "";
        document.body.classList.remove("no-scroll");
    });
}

/* Mobile live search */
if (searchInput) {
    searchInput.addEventListener("input", async () => {
        const value = searchInput.value.trim().toLowerCase();

        suggestionsBox.innerHTML = "";

        if (!value) return;

        const results = await fetchProducts(value);

        if (results.length === 0) {
            suggestionsBox.innerHTML = "<p>No result found</p>";
            return;
        }

        results.forEach(item => {
            const p = document.createElement("p");
            p.textContent = item.name;

            p.addEventListener("click", () => {
                window.location.href = `product.html?id=${item.id}`;
            });

            suggestionsBox.appendChild(p);
        });
    });

}

/* ===============================
KEYBOARD NAVIGATION (SHARED)
================================ */
function enableKeyboardNavigation(inputEl, suggestionsEl) {
    let activeIndex = -1;

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
            items[activeIndex].scrollIntoView({
                block: "nearest"
            });
        }
    });
}

if (desktopInput && desktopSuggestions) {
    enableKeyboardNavigation(desktopInput, desktopSuggestions);
}

if (searchInput && suggestionsBox) {
    enableKeyboardNavigation(searchInput, suggestionsBox);
}



// Menu Overlay 

const menuOverlay = document.getElementById("menuOverlay");
const menuBtn = document.querySelector(".mobile-menu");

const menuAuth = document.getElementById("menuAuth");
const menuUsername = document.getElementById("menuUsername");
const avatarImg = document.querySelector(".menu-avatar img");
const avatarIcon = document.querySelector(".menu-avatar i");

/* Open menu */
if (menuBtn && menuOverlay) {
    menuBtn.addEventListener("click", () => {
        menuOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    });
}

/* Close on outside click */
document.addEventListener("click", (e) => {
    if (!menuOverlay || !menuBtn) return;

    if (
        menuOverlay.classList.contains("active") &&
        !menuOverlay.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        menuOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }
});

/* ===== LOGIN STATE (temporary) ===== */
const isLoggedIn = localStorage.getItem("user") !== null;
const username = "Mannan";

if (isLoggedIn && menuAuth && menuUsername && avatarImg && avatarIcon) {
    menuAuth.style.display = "none";
    menuUsername.textContent = username;
    avatarImg.style.display = "block";
    avatarIcon.style.display = "none";
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
    document.body.classList.add("no-scroll");
}

function openSignup() {
    signupOverlay.classList.add("active");
    loginOverlayEl.classList.remove("active");
    document.body.classList.add("no-scroll");
}

function closeSignupOverlay() {
    signupOverlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
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
if (menuLoginBtn) {
    menuLoginBtn.addEventListener("click", () => {
        menuOverlay.classList.remove("active");
        openLogin();
    });
}

if (menuSignupBtn) {
    menuSignupBtn.addEventListener("click", () => {
        menuOverlay.classList.remove("active");
        openSignup();
    });
}

/* ===== ESC KEY ===== */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (loginOverlay) loginOverlay.classList.remove("active");
        if (signupOverlay) signupOverlay.classList.remove("active");
        if (menuOverlay) menuOverlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
    }
});

