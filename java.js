const books = [
    {
        title: "The Great Gatsby",
        description: "A classic novel about the American dream.",
        price: 10.99,
        image: "https://via.placeholder.com/150x200?text=Book+1"
    },
    {
        title: "1984",
        description: "A dystopian novel about totalitarianism.",
        price: 9.99,
        image: "https://via.placeholder.com/150x200?text=Book+2"
    },
    {
        title: "To Kill a Mockingbird",
        description: "A story of justice and morality.",
        price: 12.99,
        image: "https://via.placeholder.com/150x200?text=Book+3"
    },
    {
        title: "Pride and Prejudice",
        description: "A romantic classic novel.",
        price: 11.99,
        image: "https://via.placeholder.com/150x200?text=Book+4"
    },
    {
        title: "The Hobbit",
        description: "A fantasy adventure story.",
        price: 13.99,
        image: "https://via.placeholder.com/150x200?text=Book+5"
    },
    {
        title: "Harry Potter",
        description: "A magical fantasy series.",
        price: 14.99,
        image: "https://via.placeholder.com/150x200?text=Book+6"
    },
    {
        title: "Dune",
        description: "A science fiction masterpiece.",
        price: 15.99,
        image: "https://via.placeholder.com/150x200?text=Book+7"
    },
    {
        title: "The Lord of the Rings",
        description: "An epic fantasy trilogy.",
        price: 19.99,
        image: "https://via.placeholder.com/150x200?text=Book+8"
    },
    {
        title: "Fahrenheit 451",
        description: "A novel about censorship.",
        price: 8.99,
        image: "https://via.placeholder.com/150x200?text=Book+9"
    },
    {
        title: "Neuromancer",
        description: "A cyberpunk science fiction novel.",
        price: 11.49,
        image: "https://via.placeholder.com/150x200?text=Book+10"
    }
];

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(book) {
    const cart = getCart();
    cart.push(book);
    saveCart(cart);
    alert(`تمت إضافة (${book.title}) للسلة بنجاح ✅`);
}

function renderBooks() {
    const grid = document.getElementById("books-grid");
    if (!grid) return;

    books.forEach(book => {
        const div = document.createElement("div");
        div.className = "book-card";
        div.innerHTML = `
            <img src="${book.image}">
            <h3>${book.title}</h3>
            <p>${book.description}</p>
            <p class="book-price">$${book.price}</p>
            <button>Add to Cart</button>
        `;
        div.querySelector("button").onclick = () => addToCart(book);
        grid.appendChild(div);
    });
}

function renderCart() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("total-price");
    if (!container) return;

    const cart = getCart();
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}">
                <div>
                    <h4>${item.title}</h4>
                    <p>$${item.price}</p>
                </div>
            </div>
        `;
    });

    totalEl.textContent = `Total Price: $${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    renderBooks();
    renderCart();
});
