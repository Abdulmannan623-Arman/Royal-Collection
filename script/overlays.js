const overlays = document.getElementById("overlays");

overlays.innerHTML = `

  <div class="search-overlay" id="searchOverlay">
    <div class="search-header">
      <button class="back-btn" id="closeSearch">
        <i class="fa-solid fa-arrow-left"></i>
      </button>

      <input type="text" id="searchInput" placeholder="Search products..." autocomplete="off" />
    </div>

    <div class="search-suggestions" id="suggestions"></div>
  </div>



  <div class="login-overlay" id="loginOverlay">
    <div class="login-box">

      <div class="login-header">
        <div class="login-logo">
          <img src="images/logo.jpg" alt="logo">
        </div>

        <span class="login-close" id="closeLogin">
          <i class="fa-solid fa-xmark"></i>
        </span>
      </div>

      <p class="welcome-text">
        <span class="welcome-highlight">Welcome Back!</span> Please login to your account.
      </p>

      <form class="login-form">
        <input type="text" placeholder="Email or Phone" required>
        <input type="password" placeholder="Password" required>

        <button type="submit" class="login-btn">Login</button>
      </form>

      <p class="signup-text">
        Don't have an account ?
        <a href="#" id="openSignupFromLogin"> Register Now</a>
      </p>

    </div>
  </div>


   
   <div class="menu-backdrop" id="menuBackdrop"></div>
  <div class="menu-overlay" id="menuOverlay">

    <div class="menu-user">

      <div class="menu-top">

        <div class="menu-avatar">
          <i class="fa-solid fa-user"></i>
        </div>
      </div>

      <p class="menu-welcome">
        Welcome <span id="menuUsername">Guest</span>!
      </p>

      <div class="menu-auth" id="menuAuth">
        <button class="menu-login" id="menuLoginBtn">Login</button>
        <button class="menu-signup" id="menuSignupBtn">Sign Up</button>
      </div>

    </div>

    <ul class="menu-list">
      <li><a href="#">Home</a></li>
      <li><a href="#">Categories</a></li>
      <li><a href="#">Offers</a></li>
      <li><a href="#">My Orders</a></li>
      <li><a href="#">Help & Support</a></li>
    </ul>

  </div>


  <div class="signup-overlay" id="signupOverlay">

    <div class="signup-header">
      <button class="back-btn" id="closeSignup">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <span class="header-text">Create an account</span>
    </div>

    <div class="signup-container">

      <h2 class="signup-title">Sign Up</h2>

      <form class="signup-form">

        <fieldset>
          <legend>Personal Details</legend>

          <div class="form-grid">

            <div class="field">
              <input type="text" id="firstName" name="first_name" required placeholder=" ">
              <label for="firstName">First Name</label>
            </div>

            <div class="field">
              <input type="text" id="lastName" name="last_name" required placeholder=" ">
              <label for="lastName">Last Name</label>
            </div>

            <div class="field">
              <select id="gender" name="gender" required>
                <option value="" hidden></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <label for="gender">Gender</label>
            </div>

            <div class="field">
              <input type="date" id="dob" name="dob" required placeholder=" ">
              <label for="dob">Date of Birth</label>
            </div>

          </div>
        </fieldset>

        <fieldset>
          <legend>Address Details</legend>

          <div class="form-grid">

            <div class="field">
              <input type="text" id="house" name="house" placeholder=" ">
              <label for="house">House No</label>
            </div>

            <div class="field">
              <input type="text" id="road" name="road" placeholder=" ">
              <label for="road">Road Name</label>
            </div>

            <div class="field">
              <input type="text" id="village" name="village" required placeholder=" ">
              <label for="village">Village</label>
            </div>

            <div class="field">
              <input type="text" id="post" name="post" required placeholder=" ">
              <label for="post">Post Office</label>
            </div>

            <div class="field">
              <input type="text" id="police" name="police" required placeholder=" ">
              <label for="police">Police Station</label>
            </div>

            <div class="field">
              <input type="text" id="district" name="district" required placeholder=" ">
              <label for="district">District</label>
            </div>

            <div class="field">
              <input type="text" id="state" name="state" required placeholder=" ">
              <label for="state">State</label>
            </div>

            <div class="field">
              <input type="number" id="pincode" name="pincode" required placeholder=" ">
              <label for="pincode">Pincode</label>
            </div>

          </div>
        </fieldset>

        <fieldset>
          <legend>Contact Details</legend>

          <div class="form-grid">

            <div class="field">
              <input type="tel" id="phone" name="phone" required placeholder=" ">
              <label for="phone">Mobile Number</label>
            </div>

            <div class="field">
              <input type="tel" id="secondary" name="secondary" placeholder=" ">
              <label for="secondary">Secondary Number</label>
            </div>

            <div class="field">
              <input type="email" id="email" name="email" required placeholder=" ">
              <label for="email">Email</label>
            </div>

            <div class="field">
              <input type="password" id="password" name="password" required placeholder=" ">
              <label for="password">New Password</label>
            </div>

            <div class="field">
              <input type="password" id="confirmPassword" name="confirm_password" required placeholder=" ">
              <label for="confirmPassword">Confirm Password</label>
            </div>

          </div>
        </fieldset>


        <fieldset>
          <legend>Upload Profile Image</legend>

          <div class="profile-upload">
            <input type="file" id="profileInput" accept="image/*" hidden>

            <div class="upload-box" id="uploadBox">
              <span>Click to upload</span>
            </div>
          </div>

        </fieldset>


        <button type="submit" class="signup-btn">
          Create Account
        </button>

        <p class="login-text">
          Already have an account ?
          <a href="#" id="openLoginFromSignup">Login Now</a>
        </p>

      </form>

    </div>

  </div>

  <!-- End Sign Up Overlay -->

`


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
        menuBackdrop.classList.remove("active");
        openSignup();
    });
}

if (menuLoginBtn) {
    menuLoginBtn.addEventListener("click", () => {
        menuOverlay.classList.remove("active");
        menuBackdrop.classList.remove("active");
        openLogin();
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
