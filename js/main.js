// Main JavaScript file for Azbuk Stationery

// Initialize wishlist from localStorage
function getWishlist() {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
}

function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

function addToWishlist(productId) {
    let wishlist = getWishlist();
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        saveWishlist(wishlist);
        showNotification('Added to wishlist!', 'success');
    } else {
        showNotification('Already in wishlist', 'info');
    }
}

function removeFromWishlist(productId) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(id => id !== productId);
    saveWishlist(wishlist);
    showNotification('Removed from wishlist', 'success');
}

function isInWishlist(productId) {
    return getWishlist().includes(productId);
}

function updateWishlistCount() {
    const count = getWishlist().length;
    const countElements = document.querySelectorAll('#wishlistCount');
    countElements.forEach(el => {
        el.textContent = count;
    });
}

// Display featured products on home page
function displayFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const products = getAllProducts().slice(0, 6); // Show first 6 products
    
    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

// Create product card HTML
function createProductCard(product) {
    const isWishlisted = isInWishlist(product.id);
    const wishlistIcon = isWishlisted ? 'fas fa-heart' : 'far fa-heart';
    const wishlistColor = isWishlisted ? 'text-danger' : '';
    
    return `
        <div class="col-md-6 col-lg-4">
            <div class="card product-card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    ${product.author ? `<p class="product-author">by ${product.author}</p>` : ''}
                    <div class="rating mb-2">
                        ${generateStars(product.rating)}
                        <span class="text-muted">(${product.rating})</span>
                    </div>
                    <p class="product-price">₦${product.price.toFixed(2)}</p>
                    <div class="btn-group w-100" role="group">
                        <button class="btn btn-primary" onclick="showProductDetails(${product.id})">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="btn btn-outline-danger wishlist-btn ${wishlistColor}" onclick="toggleWishlist(${product.id})">
                            <i class="${wishlistIcon}"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = Math.ceil(rating); i < 5; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Show product details modal
function showProductDetails(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    const isWishlisted = isInWishlist(product.id);
    
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalImage').alt = product.name;
    document.getElementById('modalPrice').textContent = `₦${product.price.toFixed(2)}`;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalRating').innerHTML = generateStars(product.rating) + ` <span class="text-muted">(${product.rating})</span>`;
    
    // Show author and ISBN for books
    if (product.author) {
        document.getElementById('modalAuthor').innerHTML = `<strong>Author:</strong> ${product.author}`;
    } else {
        document.getElementById('modalAuthor').innerHTML = '';
    }
    
    if (product.isbn) {
        document.getElementById('modalISBN').innerHTML = `<strong>ISBN:</strong> ${product.isbn}`;
    } else {
        document.getElementById('modalISBN').innerHTML = '';
    }
    
    // Show preview for books
    if (product.preview) {
        document.getElementById('modalPreview').innerHTML = `
            <div class="alert alert-info">
                <strong><i class="fas fa-book-open"></i> Preview:</strong><br>
                ${product.preview}
            </div>
        `;
    } else {
        document.getElementById('modalPreview').innerHTML = '';
    }
    
    // Update wishlist button
    const wishlistBtn = document.getElementById('modalWishlistBtn');
    wishlistBtn.innerHTML = isWishlisted 
        ? '<i class="fas fa-heart"></i> Remove from Wishlist'
        : '<i class="far fa-heart"></i> Add to Wishlist';
    wishlistBtn.onclick = () => {
        toggleWishlist(product.id);
        modal.hide();
    };
    
    modal.show();
}

// Toggle wishlist
function toggleWishlist(productId) {
    if (isInWishlist(productId)) {
        removeFromWishlist(productId);
    } else {
        addToWishlist(productId);
    }
    
    // Reload current page if on products or wishlist page
    if (window.location.pathname.includes('products.html')) {
        filterProducts();
    } else if (window.location.pathname.includes('account.html')) {
        displayWishlist();
    } else {
        displayFeaturedProducts();
    }
}

// Add to cart (placeholder function)
function addToCart() {
    showNotification('Item added to cart! (Cart feature coming soon)', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 80px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// User Authentication Functions
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function saveUser(userData) {
    // Save to users list
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
}

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        const userSession = { ...user };
        delete userSession.password; // Don't store password in session
        localStorage.setItem('currentUser', JSON.stringify(userSession));
        return true;
    }
    return false;
}

function logoutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = 'account.html';
}

// Order Management
function getOrders() {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
}

function addOrder(order) {
    let orders = getOrders();
    orders.push({
        id: Date.now(),
        ...order,
        date: new Date().toISOString()
    });
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Sample orders for demo
function initializeSampleOrders() {
    const user = getCurrentUser();
    if (!user) return;
    
    const orders = getOrders();
    if (orders.length === 0) {
        // Add sample orders
        addOrder({
            userId: user.email,
            items: [
                { productId: 1, quantity: 1, price: 45.99 }
            ],
            total: 45.99,
            status: 'completed',
            deliveryOption: 'Standard Delivery'
        });
        
        addOrder({
            userId: user.email,
            items: [
                { productId: 4, quantity: 2, price: 15.99 }
            ],
            total: 31.98,
            status: 'pending',
            deliveryOption: 'Express Delivery'
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateWishlistCount();
    
    // Add wishlist link functionality
    const wishlistLinks = document.querySelectorAll('#wishlistLink');
    wishlistLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const user = getCurrentUser();
            if (user) {
                window.location.href = 'account.html';
                setTimeout(() => {
                    if (typeof showSection === 'function') {
                        showSection('wishlist');
                    }
                }, 100);
            } else {
                showNotification('Please login to view your wishlist', 'warning');
                window.location.href = 'account.html';
            }
        });
    });
});
