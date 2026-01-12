// Account Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const user = getCurrentUser();
    
    if (user) {
        // User is logged in, show dashboard
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('dashboardSection').style.display = 'block';
        loadUserDashboard(user);
    } else {
        // User is not logged in, show login/register forms
        document.getElementById('authSection').style.display = 'block';
        document.getElementById('dashboardSection').style.display = 'none';
    }
    
    // Setup form handlers
    setupAuthForms();
});

function setupAuthForms() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (loginUser(email, password)) {
                showNotification('Login successful!', 'success');
                window.location.reload();
            } else {
                showNotification('Invalid email or password', 'danger');
            }
        });
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('registerFirstName').value;
            const lastName = document.getElementById('registerLastName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            const accountType = document.querySelector('input[name="accountType"]:checked').value;
            
            // Validation
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'danger');
                return;
            }
            
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters', 'danger');
                return;
            }
            
            // Check if email already exists
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.find(u => u.email === email)) {
                showNotification('Email already registered', 'danger');
                return;
            }
            
            // Create user
            const userData = {
                firstName,
                lastName,
                email,
                password,
                accountType,
                registeredDate: new Date().toISOString()
            };
            
            saveUser(userData);
            showNotification('Registration successful! Please login.', 'success');
            
            // Switch to login tab
            document.getElementById('login-tab').click();
            registerForm.reset();
        });
    }
}

function loadUserDashboard(user) {
    // Display user info
    document.getElementById('userName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('profileFirstName').textContent = user.firstName;
    document.getElementById('profileLastName').textContent = user.lastName;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileAccountType').textContent = user.accountType.charAt(0).toUpperCase() + user.accountType.slice(1);
    
    // Show seller dashboard link if user is a seller
    if (user.accountType === 'seller') {
        document.getElementById('sellerDashboardLink').style.display = 'block';
    }
    
    // Initialize sample orders
    initializeSampleOrders();
    
    // Show profile section by default
    showSection('profile');
}

function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.dashboard-content').forEach(el => {
        el.style.display = 'none';
    });
    
    // Show selected section
    switch(section) {
        case 'profile':
            document.getElementById('profileSection').style.display = 'block';
            break;
        case 'orders':
            document.getElementById('ordersSection').style.display = 'block';
            displayOrders();
            break;
        case 'wishlist':
            document.getElementById('wishlistSection').style.display = 'block';
            displayWishlist();
            break;
    }
}

function displayOrders() {
    const container = document.getElementById('ordersList');
    const user = getCurrentUser();
    const orders = getOrders().filter(order => order.userId === user.email);
    
    if (orders.length === 0) {
        container.innerHTML = '<p class="text-muted">No orders yet.</p>';
        return;
    }
    
    container.innerHTML = orders.map(order => {
        const statusClass = order.status === 'completed' ? 'success' : 
                           order.status === 'pending' ? 'warning' : 'danger';
        const date = new Date(order.date).toLocaleDateString();
        
        return `
            <div class="card order-card ${order.status} mb-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8">
                            <h6>Order #${order.id}</h6>
                            <p class="mb-1"><small class="text-muted">Date: ${date}</small></p>
                            <p class="mb-1"><small>Delivery: ${order.deliveryOption}</small></p>
                            <span class="badge bg-${statusClass}">${order.status.toUpperCase()}</span>
                        </div>
                        <div class="col-md-4 text-md-end">
                            <h5 class="text-primary">$${order.total.toFixed(2)}</h5>
                            <small class="text-muted">${order.items.length} item(s)</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function displayWishlist() {
    const container = document.getElementById('wishlistGrid');
    const wishlist = getWishlist();
    
    if (wishlist.length === 0) {
        container.innerHTML = '<div class="col-12"><p class="text-muted">Your wishlist is empty.</p></div>';
        return;
    }
    
    const products = wishlist.map(id => getProductById(id)).filter(p => p);
    
    container.innerHTML = products.map(product => `
        <div class="col-md-6 col-lg-4">
            <div class="card product-card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    ${product.author ? `<p class="product-author">by ${product.author}</p>` : ''}
                    <p class="product-price">₦${product.price.toFixed(2)}</p>
                    <div class="btn-group w-100" role="group">
                        <button class="btn btn-primary" onclick="showProductDetails(${product.id})">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="btn btn-danger" onclick="toggleWishlist(${product.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        logoutUser();
    }
}
