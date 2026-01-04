/*
  Book Shop - E-Commerce Website
  Author: (Sadeel Nedal )
  Description:
  Frontend E-Commerce website using HTML, CSS, and JavaScript.
  Features:
  - Product listing
  - Shopping cart
  - Quantity handling
  - Total price calculation
  - LocalStorage persistence
*/

const books = [
    { id: 1, title: "The Great Gatsby", desc: "American classic novel.", price: 10.99, image: "https://via.placeholder.com/150x200?text=Book+1" },
    { id: 2, title: "1984", desc: "Dystopian future world.", price: 9.99, image: "https://via.placeholder.com/150x200?text=Book+2" },
    { id: 3, title: "Harry Potter", desc: "Fantasy magic adventure.", price: 14.99, image: "https://via.placeholder.com/150x200?text=Book+3" },
    { id: 4, title: "Dune", desc: "Sci-Fi masterpiece.", price: 15.99, image: "https://via.placeholder.com/150x200?text=Book+4" },
    { id: 5, title: "The Hobbit", desc: "Fantasy journey.", price: 13.99, image: "https://via.placeholder.com/150x200?text=Book+5" },
    { id: 6, title: "To Kill a Mockingbird", desc: "Justice and morality.", price: 12.99, image: "https://via.placeholder.com/150x200?text=Book+6" },
    { id: 7, title: "LOTR", desc: "Epic fantasy.", price: 19.99, image: "https://via.placeholder.com/150x200?text=Book+7" },
    { id: 8, title: "Fahrenheit 451", desc: "Censorship future.", price: 8.99, image: "https://via.placeholder.com/150x200?text=Book+8" },
    { id: 9, title: "Neuromancer", desc: "Cyberpunk world.", price: 11.49, image: "https://via.placeholder.com/150x200?text=Book+9" },
    { id: 10, title: "Pride and Prejudice", desc: "Romantic classic.", price: 11.99, image: "https://via.placeholder.com/150x200?text=Book+10" }
];

// Retrieve cart data from LocalStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart data to LocalStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Display toast message
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => toast.style.display = "none", 2500);
}

// Add book to cart
function addToCart(book) {
    const cart = getCart();
    const existing = cart.find(item => item.id === book.id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...book, qty: 1 });
    }

    saveCart(cart);
    showToast(`تمت إضافة (${book.title}) للسلة بنجاح ✅`);
}

// Render books list
function renderBooks() {
    const grid = document.getElementById("books-grid");
    if (!grid) return;

    books.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";

        const img = document.createElement("img");
        img.src = book.image;

        const title = document.createElement("h3");
        title.textContent = book.title;

        const desc = document.createElement("p");
        desc.textContent = book.desc;

        const price = document.createElement("p");
        price.className = "book-price";
        price.textContent = `$${book.price}`;

        const btn = document.createElement("button");
        btn.textContent = "Add to Cart";
        btn.addEventListener("click", () => addToCart(book));

        card.append(img, title, desc, price, btn);
        grid.appendChild(card);
    });
}

// Remove item from cart
function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    renderCart();
}

// Render cart items
function renderCart() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("total-price");
    if (!container || !totalEl) return;

    const cart = getCart();
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        totalEl.textContent = "Total Price: $0.00";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;

        const row = document.createElement("div");
        row.className = "cart-item";

        row.innerHTML = `
            <img src="${item.image}">
            <div>
                <h4>${item.title}</h4>
                <p>$${item.price} × ${item.qty}</p>
            </div>
        `;

        const btn = document.createElement("button");
        btn.textContent = "Remove";
        btn.addEventListener("click", () => removeFromCart(item.id));

        row.appendChild(btn);
        container.appendChild(row);
    });

    totalEl.textContent = `Total Price: $${total.toFixed(2)}`;
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
    renderBooks();
    renderCart();
});
