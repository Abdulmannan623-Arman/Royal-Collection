const WHATSAPP_NUMBER = "919083052120";

const summaryContainer = document.getElementById("productSummary");

const params = new URLSearchParams(window.location.search);
const buyNowId = params.get("id");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

let checkoutItems = [];


if (buyNowId) {

    const product = getProductById(parseInt(buyNowId));

    if (product) {
        checkoutItems.push({
            id: product.id,
            quantity: 1
        });
    }

} else {

    checkoutItems = cart;
}

if (checkoutItems.length === 0) {
    summaryContainer.innerHTML = "<h2>Your cart is empty</h2>";
} else {
    renderCheckoutSummary();
    updateCheckoutPrice();
}

function renderCheckoutSummary() {

    summaryContainer.innerHTML = "<h2>Order Summary</h2>";

    checkoutItems.forEach(item => {

        const product = getProductById(item.id);
        if (!product) return;

        summaryContainer.innerHTML += `
            <p><strong>${product.name}</strong></p>
            <p>Price: ₹${product.newPrice} Qty: ${item.quantity}</p>
            <hr>
        `;
    });
}

function updateCheckoutPrice() {

    const priceValue = document.getElementById("priceValue");
    const totalAmount = document.getElementById("totalAmount");

    let total = 0;

    checkoutItems.forEach(item => {
        const product = getProductById(item.id);
        if (product) {
            total += product.newPrice * item.quantity;
        }
    });

    priceValue.innerText = `₹${total}`;
    totalAmount.innerText = `₹${total}`;
}


const addressForm = document.getElementById("addressForm");
const savedAddressBox = document.getElementById("savedAddressBox");
const editAddressBtn = document.getElementById("editAddressBtn");

const STORAGE_KEY = "royalCollectionAddress";

addressForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const addressData = {
        fullName: document.getElementById("fullName").value,
        phone: document.getElementById("phone").value,
        pincode: document.getElementById("pincode").value,
        state: document.getElementById("state").value,
        district: document.getElementById("district").value,
        address: document.getElementById("address").value
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(addressData));

    showSavedAddress(addressData);
});

function showSavedAddress(data) {

    savedAddressBox.innerHTML = `
        <p><strong>${data.fullName}</strong> (${data.phone})</p>
        <p>${data.address}</p>
        <p>${data.district}, ${data.state} - ${data.pincode}</p>
    `;

    savedAddressBox.style.display = "block";
    editAddressBtn.style.display = "inline-block";
    addressForm.style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {

    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
        const parsedData = JSON.parse(savedData);
        showSavedAddress(parsedData);
    }
});

editAddressBtn.addEventListener("click", () => {

    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (savedData) {
        document.getElementById("fullName").value = savedData.fullName;
        document.getElementById("phone").value = savedData.phone;
        document.getElementById("pincode").value = savedData.pincode;
        document.getElementById("state").value = savedData.state;
        document.getElementById("district").value = savedData.district;
        document.getElementById("address").value = savedData.address;
    }

    savedAddressBox.style.display = "none";
    editAddressBtn.style.display = "none";
    addressForm.style.display = "flex";
});

const placeOrderBtn = document.getElementById("placeOrderBtn");

placeOrderBtn.addEventListener("click", () => {

    const savedAddress = localStorage.getItem(STORAGE_KEY);

    if (!savedAddress) {
        alert("⚠ Please add delivery address first!");
        return;
    }

    createOrder();
});

function generateOrderId() {
    return "RC" + Math.floor(100000 + Math.random() * 900000);
}

function createOrder() {

    if (checkoutItems.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const savedAddress = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const orderId = generateOrderId();

    let total = 0;
    let productDetails = "";

    checkoutItems.forEach(item => {

        const product = getProductById(item.id);
        if (!product) return;

        const itemTotal = product.newPrice * item.quantity;
        total += itemTotal;

        productDetails += `
Name: ${product.name}
Price: ₹${product.newPrice}
Quantity: ${item.quantity}
Subtotal: ₹${itemTotal}

`;
    });

    const message = `
🛍 *New Order - Royal Collection*

🆔 Order ID: ${orderId}

📦 Product Details:
${productDetails}

💰 Total Amount: ₹${total}

👤 Customer Details:
Name: ${savedAddress.fullName}
Phone: ${savedAddress.phone}
Address: ${savedAddress.address}
${savedAddress.district}, ${savedAddress.state} - ${savedAddress.pincode}

Please confirm this order.
`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    saveOrder({
        orderId,
        items: checkoutItems,
        total,
        address: savedAddress,
        status: "Pending on WhatsApp",
        orderDate: new Date().toLocaleString()
    });

    localStorage.removeItem("cart"); // clear cart

    window.location.href = whatsappURL;
}

function saveOrder(order) {

    const existingOrders = JSON.parse(localStorage.getItem("royalCollectionOrders")) || [];

    existingOrders.push(order);

    localStorage.setItem("royalCollectionOrders", JSON.stringify(existingOrders));
}

