// Products Page JavaScript

let currentProducts = [];

// Initialize products page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    
    // Setup filter change listeners
    const categoryFilters = document.querySelectorAll('input[name="categoryFilter"]');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', filterProducts);
    });
    
    const priceFilters = document.querySelectorAll('input[name="priceFilter"]');
    priceFilters.forEach(filter => {
        filter.addEventListener('change', filterProducts);
    });
    
    const ratingFilters = document.querySelectorAll('input[name="ratingFilter"]');
    ratingFilters.forEach(filter => {
        filter.addEventListener('change', filterProducts);
    });
    
    // Setup search
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterProducts();
        }
    });
    
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');
    
    if (category) {
        const categoryRadio = document.getElementById(`${category}Category`);
        if (categoryRadio) {
            categoryRadio.checked = true;
        }
    }
    
    if (search) {
        document.getElementById('searchInput').value = search;
    }
    
    filterProducts();
});

function loadProducts() {
    currentProducts = getAllProducts();
}

function filterProducts() {
    let products = getAllProducts();
    
    // Get selected filters
    const categoryFilter = document.querySelector('input[name="categoryFilter"]:checked').value;
    const priceFilter = document.querySelector('input[name="priceFilter"]:checked').value;
    const ratingFilter = parseFloat(document.querySelector('input[name="ratingFilter"]:checked').value);
    const searchQuery = document.getElementById('searchInput').value.trim();
    const sortBy = document.getElementById('sortSelect').value;
    
    // Apply category filter
    if (categoryFilter !== 'all') {
        products = getProductsByCategory(categoryFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
        const searchTerm = searchQuery.toLowerCase();
        products = products.filter(product => {
            return product.name.toLowerCase().includes(searchTerm) ||
                   (product.author && product.author.toLowerCase().includes(searchTerm)) ||
                   (product.isbn && product.isbn.toLowerCase().includes(searchTerm)) ||
                   product.description.toLowerCase().includes(searchTerm);
        });
    }
    
    // Apply price filter
    if (priceFilter !== 'all') {
        const [min, max] = priceFilter.split('-').map(Number);
        products = filterByPrice(products, min, max);
    }
    
    // Apply rating filter
    if (ratingFilter > 0) {
        products = filterByRating(products, ratingFilter);
    }
    
    // Apply sorting
    products = sortProducts(products, sortBy);
    
    // Display products
    displayProducts(products);
}

function displayProducts(products) {
    const container = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    const productCount = document.getElementById('productCount');
    
    productCount.textContent = products.length;
    
    if (products.length === 0) {
        container.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

function clearFilters() {
    // Reset all filters
    document.getElementById('allCategories').checked = true;
    document.getElementById('allPrices').checked = true;
    document.getElementById('allRatings').checked = true;
    document.getElementById('searchInput').value = '';
    document.getElementById('sortSelect').value = 'default';
    
    // Clear URL parameters
    window.history.replaceState({}, document.title, window.location.pathname);
    
    filterProducts();
}
