const products = [
    { id: 1, name: "iPhone 16 Pro", price: 28990000, category: "phone", image: "https://placehold.co/300x200/png?text=iPhone+16", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 29990000, category: "phone", image: "https://placehold.co/300x200/png?text=Galaxy+S24", rating: 4.7, inStock: true },
    { id: 3, name: "Google Pixel 9 Pro", price: 24500000, category: "phone", image: "https://placehold.co/300x200/png?text=Pixel+9", rating: 4.6, inStock: false },
    { id: 4, name: "MacBook Pro M3", price: 39990000, category: "laptop", image: "https://placehold.co/300x200/png?text=MacBook+Pro", rating: 4.9, inStock: true },
    { id: 5, name: "Dell XPS 13", price: 32500000, category: "laptop", image: "https://placehold.co/300x200/png?text=Dell+XPS", rating: 4.4, inStock: true },
    { id: 6, name: "Asus ROG Zephyrus G14", price: 36990000, category: "laptop", image: "https://placehold.co/300x200/png?text=ROG+G14", rating: 4.5, inStock: true },
    { id: 7, name: "iPad Pro M4", price: 26490000, category: "tablet", image: "https://placehold.co/300x200/png?text=iPad+Pro", rating: 4.8, inStock: true },
    { id: 8, name: "Samsung Galaxy Tab S9", price: 18990000, category: "tablet", image: "https://placehold.co/300x200/png?text=Galaxy+Tab", rating: 4.3, inStock: true },
    { id: 9, name: "Xiaomi Pad 6 Pro", price: 9490000, category: "tablet", image: "https://placehold.co/300x200/png?text=Xiaomi+Pad", rating: 4.2, inStock: false },
    { id: 10, name: "AirPods Pro 2", price: 5990000, category: "accessory", image: "https://placehold.co/300x200/png?text=AirPods", rating: 4.7, inStock: true },
    { id: 11, name: "Sony WH-1000XM5", price: 7490000, category: "accessory", image: "https://placehold.co/300x200/png?text=Sony+XM5", rating: 4.6, inStock: true },
    { id: 12, name: "Keychron K2 V2", price: 1950000, category: "accessory", image: "https://placehold.co/300x200/png?text=Keychron", rating: 4.5, inStock: true }
];

let cartCount = 0;
let currentCategory = "all";
let searchQuery = "";
let currentSort = "default";

const app = document.getElementById("app");

const navbar = document.createElement("nav");
navbar.classList.add("navbar");

const brand = document.createElement("h2");
brand.textContent = "TechCatalog";
navbar.appendChild(brand);

const navRight = document.createElement("div");
navRight.classList.add("nav-right");

const themeToggle = document.createElement("button");
themeToggle.classList.add("theme-toggle");
themeToggle.textContent = "🌙 Dark Mode";
navRight.appendChild(themeToggle);

const cartIcon = document.createElement("div");
cartIcon.classList.add("cart-icon");
cartIcon.textContent = "🛒";
const cartBadge = document.createElement("span");
cartBadge.classList.add("cart-badge");
cartBadge.textContent = "0";
cartIcon.appendChild(cartBadge);
navRight.appendChild(cartIcon);

navbar.appendChild(navRight);
app.appendChild(navbar);

const controlsSection = document.createElement("section");
controlsSection.classList.add("controls-section");

const categoryFilters = document.createElement("div");
categoryFilters.classList.add("category-filters");
const categories = ["all", "phone", "laptop", "tablet", "accessory"];
categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.classList.add("filter-btn");
    if (cat === "all") btn.classList.add("active");
    btn.textContent = cat.toUpperCase();
    btn.dataset.category = cat;
    categoryFilters.appendChild(btn);
});
controlsSection.appendChild(categoryFilters);

const searchSort = document.createElement("div");
searchSort.classList.add("search-sort");

const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Tìm kiếm sản phẩm...";
searchInput.classList.add("search-input");
searchSort.appendChild(searchInput);

const sortSelect = document.createElement("select");
sortSelect.classList.add("sort-select");
const sortOptions = [
    { value: "default", text: "Sắp xếp" },
    { value: "price-asc", text: "Giá tăng dần" },
    { value: "price-desc", text: "Giá giảm dần" },
    { value: "name-asc", text: "Tên A-Z" },
    { value: "rating-desc", text: "Đánh giá cao" }
];
sortOptions.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.text;
    sortSelect.appendChild(option);
});
searchSort.appendChild(sortSelect);

controlsSection.appendChild(searchSort);
app.appendChild(controlsSection);

const catalogContainer = document.createElement("main");
catalogContainer.classList.add("catalog-container");
app.appendChild(catalogContainer);

function formatPrice(price) {
    return price.toLocaleString("vi-VN") + "đ";
}

function renderProducts() {
    catalogContainer.innerHTML = "";
    
    let processed = filterByCategory(products, currentCategory);
    processed = searchProducts(processed, searchQuery);
    processed = sortProducts(processed, currentSort);

    if (processed.length === 0) {
        const noProduct = document.createElement("p");
        noProduct.textContent = "Không tìm thấy sản phẩm phù hợp.";
        noProduct.style.gridColumn = "1/-1";
        noProduct.style.textAlign = "center";
        catalogContainer.appendChild(noProduct);
        return;
    }

    processed.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.dataset.id = p.id;

        const img = document.createElement("img");
        img.src = p.image;
        img.alt = p.name;
        img.classList.add("product-img");

        const info = document.createElement("div");
        info.classList.add("product-info");

        const name = document.createElement("h3");
        name.classList.add("product-name");
        name.textContent = p.name;

        const price = document.createElement("span");
        price.classList.add("product-price");
        price.textContent = formatPrice(p.price);

        const meta = document.createElement("div");
        meta.classList.add("product-meta");
        
        const rating = document.createElement("span");
        rating.textContent = `⭐ ${p.rating}`;
        
        const stock = document.createElement("span");
        stock.textContent = p.inStock ? "Còn hàng" : "Hết hàng";
        stock.style.color = p.inStock ? "#198754" : "#dc3545";

        meta.appendChild(rating);
        meta.appendChild(stock);

        const btnAdd = document.createElement("button");
        btnAdd.classList.add("btn-primary");
        btnAdd.textContent = "Thêm vào giỏ";
        btnAdd.disabled = !p.inStock;

        info.appendChild(name);
        info.appendChild(price);
        info.appendChild(meta);
        info.appendChild(btnAdd);

        card.appendChild(img);
        card.appendChild(info);
        catalogContainer.appendChild(card);
    });
}

function filterByCategory(arr, category) {
    if (category === "all") return arr;
    return arr.filter(p => p.category === category);
}

function searchProducts(arr, query) {
    if (!query.trim()) return arr;
    const k = query.toLowerCase();
    return arr.filter(p => p.name.toLowerCase().includes(k));
}

function sortProducts(arr, sortType) {
    const sorted = [...arr];
    if (sortType === "price-asc") return sorted.sort((a, b) => a.price - b.price);
    if (sortType === "price-desc") return sorted.sort((a, b) => b.price - a.price);
    if (sortType === "name-asc") return sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sortType === "rating-desc") return sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
}

function showModal(product) {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const content = document.createElement("div");
    content.classList.add("modal-content");

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-modal");
    closeBtn.innerHTML = "&times;";

    const img = document.createElement("img");
    img.src = product.image;
    img.classList.add("modal-img");

    const name = document.createElement("h2");
    name.textContent = product.name;

    const cat = document.createElement("p");
    cat.textContent = `Danh mục: ${product.category.toUpperCase()}`;
    cat.style.color = "var(--text-muted)";

    const price = document.createElement("h3");
    price.textContent = formatPrice(product.price);
    price.style.color = "#198754";

    const rating = document.createElement("p");
    rating.textContent = `Đánh giá: ⭐ ${product.rating} / 5.0`;

    content.appendChild(closeBtn);
    content.appendChild(img);
    content.appendChild(name);
    content.appendChild(cat);
    content.appendChild(price);
    content.appendChild(rating);
    modal.appendChild(content);
    document.body.appendChild(modal);

    const closeModalFunc = () => modal.remove();
    closeBtn.addEventListener("click", closeModalFunc);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModalFunc(); });
}

categoryFilters.addEventListener("click", function(e) {
    if (e.target.classList.contains("filter-btn")) {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        currentCategory = e.target.dataset.category;
        renderProducts();
    }
});

searchInput.addEventListener("input", function(e) {
    searchQuery = e.target.value;
    renderProducts();
});

sortSelect.addEventListener("change", function(e) {
    currentSort = e.target.value;
    renderProducts();
});

catalogContainer.addEventListener("click", function(e) {
    const card = e.target.closest(".product-card");
    if (!card) return;
    
    const id = parseInt(card.dataset.id);
    const product = products.find(p => p.id === id);

    if (e.target.classList.contains("btn-primary")) {
        e.stopPropagation();
        cartCount++;
        cartBadge.textContent = cartCount;
    } else {
        showModal(product);
    }
});

themeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        themeToggle.textContent = "🌙 Dark Mode";
    }
});

renderProducts();