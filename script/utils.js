function calculateDiscount(oldPrice, newPrice) {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

function getProductById(id) {
    return PRODUCTS.find(product => product.id === id);
}