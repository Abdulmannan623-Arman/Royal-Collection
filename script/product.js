const container = document.getElementById("productContainer");

const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

function renderProduct(product) {

    const discount = calculateDiscount(
        product.oldPrice,
        product.newPrice
    );

    container.innerHTML = `
        <div class="product-page">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="product-info">
                <h2 class="product-title">${product.name}</h2>
                
                <div class="discount">${discount}% OFF</div>

                <div class="price-box">
                    <span class="old-price">₹${product.oldPrice}</span>
                    <span class="new-price">₹${product.newPrice}</span>
                </div>
                
                <p class="product-description">
                    ${product.description}
                </p>
                
                <div class="btn-box">
                    <button id="addToCart">Add to Cart</button>
                    <button id="buy">Buy Now</button>
                </div>
            </div>
        </div>
    `;

    const buyBtn = document.getElementById("buy");
    const addToCartBtn = document.getElementById("addToCart");

    // ✅ Buy Now
    buyBtn.addEventListener("click", () => {
        window.location.href = `checkout.html?id=${product.id}`;
    });

    // ✅ Add To Cart
    addToCartBtn.addEventListener("click", () => {

        let cart = getCart();

        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.newPrice,
                quantity: 1
            });
        }

        saveCart(cart);
        updateCartCount();

        // UX Feedback
        addToCartBtn.textContent = "Added ✓";
        addToCartBtn.disabled = true;

        setTimeout(() => {
            addToCartBtn.textContent = "Add to Cart";
            addToCartBtn.disabled = false;
        }, 1500);
    });
}


// ===== INIT =====

if (!productId) {
    container.innerHTML = "<h2>Invalid Product</h2>";
} else {
    const product = getProductById(productId);

    if (!product) {
        container.innerHTML = "<h2>Product Not Found</h2>";
    } else {
        renderProduct(product);
    }
}

