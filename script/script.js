// Banner Script 

document.addEventListener("DOMContentLoaded", function () {

    const track = document.getElementById("bannerTrack");
    const dotsContainer = document.getElementById("bannerDots");

    if (!track || !dotsContainer) return;

    let slides = document.querySelectorAll(".banner-card");
    const total = slides.length;
    if (total === 0) return;

    // ===== CLONE =====
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[total - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.insertBefore(lastClone, track.firstChild);

    slides = document.querySelectorAll(".banner-card");

    let index = 1;
    let isMoving = false;
    let auto;

    track.style.transform = `translateX(-${index * 100}%)`;

    // ===== DOTS =====
    dotsContainer.innerHTML = "";
    for (let i = 0; i < total; i++) {
        const dot = document.createElement("span");
        if (i === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll("span");

    function updateDots() {
        dots.forEach(d => d.classList.remove("active"));
        if (index >= 1 && index <= total) {
            dots[index - 1].classList.add("active");
        }
    }

    function moveSlide() {
        isMoving = true;
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        if (isMoving) return;
        index++;
        moveSlide();
    }

    function prevSlide() {
        if (isMoving) return;
        index--;
        moveSlide();
    }

    function startAuto() {
        auto = setInterval(nextSlide, 3000);
    }

    function stopAuto() {
        clearInterval(auto);
    }

    startAuto();

    // ===== FIX CLONE JUMP =====
    track.addEventListener("transitionend", () => {
        isMoving = false;

        if (slides[index] === firstClone) {
            track.style.transition = "none";
            index = 1;
            track.style.transform = `translateX(-${index * 100}%)`;
        }

        if (slides[index] === lastClone) {
            track.style.transition = "none";
            index = total;
            track.style.transform = `translateX(-${index * 100}%)`;
        }

        updateDots();
    });

    // =========================
    // 🖱 PAUSE ON HOVER
    // =========================
    track.addEventListener("mouseenter", stopAuto);
    track.addEventListener("mouseleave", startAuto);

    // =========================
    // 🖱 MOUSE DRAG
    // =========================
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    track.addEventListener("mousedown", (e) => {
        stopAuto();
        isDragging = true;
        startX = e.clientX;
        track.style.transition = "none";
    });

    track.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const diff = e.clientX - startX;
        currentTranslate = -index * track.offsetWidth + diff;
        track.style.transform = `translateX(${currentTranslate}px)`;
    });

    track.addEventListener("mouseup", (e) => {
        if (!isDragging) return;
        isDragging = false;

        const diff = e.clientX - startX;

        if (diff < -50) index++;
        if (diff > 50) index--;

        moveSlide();
        startAuto();
    });

    track.addEventListener("mouseleave", () => {
        if (isDragging) {
            isDragging = false;
            moveSlide();
            startAuto();
        }
    });

    // =========================
    // 📱 TOUCH SWIPE
    // =========================
    track.addEventListener("touchstart", e => {
        stopAuto();
        startX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", e => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (diff > 50) nextSlide();
        if (diff < -50) prevSlide();

        startAuto();
    });

});


// Product Script 

const grid = document.getElementById("productsGrid");

function renderProducts(products) {

    grid.innerHTML = "";

    products.forEach(product => {

        const discount = Math.round(
            ((product.oldPrice - product.newPrice) / product.oldPrice) * 100
        );

        const card = document.createElement("div");
        card.className = "product-card";
        card.dataset.id = product.id;

        card.innerHTML = `
            <div class="product-img">
                <span class="discount-badge">${discount}% OFF</span>
                <img src="${product.image}" alt="${product.name}">
            </div>
            <p class="product-name">${product.name}</p>
            <p class="old-price">₹${product.oldPrice}</p>
            <p class="new-price">₹${product.newPrice}</p>
        `;

        card.addEventListener("click", () => {
            window.location.href = `product.html?id=${product.id}`;
        });

        grid.appendChild(card);
    });
}

/* Initial load */
renderProducts(PRODUCTS);
