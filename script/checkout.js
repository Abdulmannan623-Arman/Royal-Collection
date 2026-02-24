const summaryContainer = document.getElementById("productSummary");

const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

if (!productId) {
    summaryContainer.innerHTML = "<h2>Invalid Product</h2>";
} else {
    const product = getProductById(productId);

    if (!product) {
        summaryContainer.innerHTML = "<h2>Product Not Found</h2>";
    } else {
        renderSummary(product);
        updatePrice(product);
    }
}

function updatePrice(product) {

    const priceValue = document.getElementById("priceValue");
    const totalAmount = document.getElementById("totalAmount");

    priceValue.innerText = `₹${product.newPrice}`;
    totalAmount.innerText = `₹${product.newPrice}`;
}

function renderSummary(product) {
    summaryContainer.innerHTML = `
        <h2>Order Summary</h2>
        <p><strong>${product.name}</strong></p>
        <p>Price: ₹${product.newPrice}</p>
        <p>Delivery in 03:00 p.m. - 05:00 p.m.</p>
    `;
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

function createOrder() {

    const product = getProductById(productId);

    const order = {
        orderId: generateOrderId(),
        productId: product.id,
        productName: product.name,
        price: product.newPrice,
        address: JSON.parse(localStorage.getItem(STORAGE_KEY)),
        orderDate: new Date().toLocaleString(),
        status: "Confirmed"
    };

    saveOrder(order);

    alert(`🎉 Order Placed Successfully!\nOrder ID: ${order.orderId}`);

    window.location.href = "index.html";
}

function generateOrderId() {
    return "RC" + Math.floor(100000 + Math.random() * 900000);
}

function saveOrder(order) {

    const existingOrders = JSON.parse(localStorage.getItem("royalCollectionOrders")) || [];

    existingOrders.push(order);

    localStorage.setItem("royalCollectionOrders", JSON.stringify(existingOrders));
}

