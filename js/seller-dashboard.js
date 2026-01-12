// Seller Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const user = getCurrentUser();
    
    if (!user || user.accountType !== 'seller') {
        // Show access denied
        document.getElementById('accessDenied').style.display = 'block';
        document.getElementById('sellerDashboard').style.display = 'none';
        return;
    }
    
    // User is a seller, show dashboard
    document.getElementById('accessDenied').style.display = 'none';
    document.getElementById('sellerDashboard').style.display = 'block';
    
    loadSellerInventory();
    updateStats();
    setupForms();
});

function setupForms() {
    // Add product form
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewProduct();
        });
    }
    
    // Edit product form
    const editProductForm = document.getElementById('editProductForm');
    if (editProductForm) {
        editProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateProduct();
        });
    }
}

function updateCategoryOptions() {
    const productType = document.getElementById('productType').value;
    const categorySelect = document.getElementById('productCategory');
    const bookFields = document.getElementById('bookFields');
    
    // Clear existing options
    categorySelect.innerHTML = '<option value="">Select Category</option>';
    
    if (productType === 'book') {
        categorySelect.innerHTML += `
            <option value="educational">Educational</option>
            <option value="novels">Novels</option>
            <option value="religious">Religious</option>
        `;
        bookFields.style.display = 'block';
    } else if (productType === 'stationery') {
        categorySelect.innerHTML += `
            <option value="pens">Pens</option>
            <option value="office">Office Supplies</option>
            <option value="art">Art Supplies</option>
        `;
        bookFields.style.display = 'none';
    }
}

function loadSellerInventory() {
    const products = getAllProducts();
    displayInventory(products);
}

function displayInventory(products) {
    const container = document.getElementById('inventoryTable');
    
    if (products.length === 0) {
        container.innerHTML = '<tr><td colspan="7" class="text-center">No products in inventory</td></tr>';
        return;
    }
    
    container.innerHTML = products.map(product => {
        let stockStatus, statusClass;
        if (product.stock === 0) {
            stockStatus = 'Out of Stock';
            statusClass = 'badge-out-of-stock';
        } else if (product.stock < 20) {
            stockStatus = 'Low Stock';
            statusClass = 'badge-low-stock';
        } else {
            stockStatus = 'In Stock';
            statusClass = 'badge-in-stock';
        }
        
        return `
            <tr>
                <td>${product.id}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${product.image}" alt="${product.name}" style="width: 40px; height: 40px; object-fit: cover; margin-right: 10px; border-radius: 4px;">
                        <div>
                            <strong>${product.name}</strong>
                            ${product.author ? `<br><small class="text-muted">${product.author}</small>` : ''}
                        </div>
                    </div>
                </td>
                <td>${product.category}</td>
                <td>₦${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td><span class="badge ${statusClass}">${stockStatus}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editProduct(${product.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function updateStats() {
    const products = getAllProducts();
    
    const totalProducts = products.length;
    const inStock = products.filter(p => p.stock >= 20).length;
    const lowStock = products.filter(p => p.stock > 0 && p.stock < 20).length;
    const outOfStock = products.filter(p => p.stock === 0).length;
    
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('inStock').textContent = inStock;
    document.getElementById('lowStock').textContent = lowStock;
    document.getElementById('outOfStock').textContent = outOfStock;
}

function addNewProduct() {
    const productType = document.getElementById('productType').value;
    const productData = {
        id: Date.now(), // Generate unique ID
        name: document.getElementById('productName').value,
        type: productType,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value),
        rating: parseFloat(document.getElementById('productRating').value),
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').value || 'https://via.placeholder.com/300x400/cccccc/ffffff?text=No+Image'
    };
    
    // Add book-specific fields
    if (productType === 'book') {
        productData.author = document.getElementById('productAuthor').value;
        productData.isbn = document.getElementById('productISBN').value;
    }
    
    // Add to products data (in a real app, this would be saved to a database)
    productsData.push(productData);
    
    showNotification('Product added successfully!', 'success');
    
    // Reset form
    document.getElementById('addProductForm').reset();
    
    // Reload inventory and stats
    loadSellerInventory();
    updateStats();
    
    // Switch to inventory tab
    document.getElementById('inventory-tab').click();
}

function editProduct(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    // Populate edit form
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductStock').value = product.stock;
    document.getElementById('editProductRating').value = product.rating;
    document.getElementById('editProductDescription').value = product.description;
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('editProductModal'));
    modal.show();
}

function updateProduct() {
    const productId = parseInt(document.getElementById('editProductId').value);
    const productIndex = productsData.findIndex(p => p.id === productId);
    
    if (productIndex === -1) return;
    
    // Update product data
    productsData[productIndex].name = document.getElementById('editProductName').value;
    productsData[productIndex].price = parseFloat(document.getElementById('editProductPrice').value);
    productsData[productIndex].stock = parseInt(document.getElementById('editProductStock').value);
    productsData[productIndex].rating = parseFloat(document.getElementById('editProductRating').value);
    productsData[productIndex].description = document.getElementById('editProductDescription').value;
    
    showNotification('Product updated successfully!', 'success');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
    modal.hide();
    
    // Reload inventory and stats
    loadSellerInventory();
    updateStats();
}

function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }
    
    const productIndex = productsData.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        productsData.splice(productIndex, 1);
        showNotification('Product deleted successfully!', 'success');
        
        // Reload inventory and stats
        loadSellerInventory();
        updateStats();
    }
}
