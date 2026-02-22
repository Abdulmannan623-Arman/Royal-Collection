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

                <div class="price-box">
                    <span class="discount">${discount}% OFF</span>
                    <span class="old-price">₹${product.oldPrice}</span>
                    <span class="new-price">₹${product.newPrice}</span>
                </div>

                <p class="product-description">
                    ${product.description}
                </p>

                <button id="addToCart">Add to Cart</button>
            </div>
        </div>
    `;
}

if (productId) {

    const product = getProductById(productId);

    if (product) {
        renderProduct(product);
    } else {
        container.innerHTML = "<h2>Product Not Found</h2>";
    }

} else {
    container.innerHTML = "<h2>Invalid Product</h2>";
}