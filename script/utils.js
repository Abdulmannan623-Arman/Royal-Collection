function calculateDiscount(oldPrice, newPrice) {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

function getProductById(id) {
    return PRODUCTS.find(product => product.id === id);
}


function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}