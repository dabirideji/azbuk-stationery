// Sample Products Data
const productsData = [
    // Books - Educational
    {
        id: 1,
        name: "Introduction to Physics",
        type: "book",
        category: "educational",
        author: "Dr. James Wilson",
        isbn: "978-0-123456-78-9",
        price: 45.99,
        description: "Comprehensive guide to fundamental physics concepts for students.",
        image: "https://placehold.co/300x400/4a90e2/ffffff?text=Physics+Book",
        rating: 4.5,
        stock: 25,
        preview: "Chapter 1: Classical Mechanics - Understanding motion, forces, and energy..."
    },
    {
        id: 2,
        name: "Advanced Mathematics",
        type: "book",
        category: "educational",
        author: "Prof. Sarah Chen",
        isbn: "978-0-234567-89-0",
        price: 52.99,
        description: "Complete mathematics textbook covering calculus, algebra, and geometry.",
        image: "https://placehold.co/300x400/e74c3c/ffffff?text=Math+Book",
        rating: 4.7,
        stock: 18,
        preview: "Chapter 1: Calculus Fundamentals - Introduction to limits and derivatives..."
    },
    {
        id: 3,
        name: "Chemistry Essentials",
        type: "book",
        category: "educational",
        author: "Dr. Michael Brown",
        isbn: "978-0-345678-90-1",
        price: 48.50,
        description: "Explore the world of chemistry from basic concepts to advanced topics.",
        image: "https://placehold.co/300x400/27ae60/ffffff?text=Chemistry+Book",
        rating: 4.3,
        stock: 30,
        preview: "Introduction: The study of matter and its properties..."
    },

    // Books - Novels
    {
        id: 4,
        name: "The Great Adventure",
        type: "book",
        category: "novels",
        author: "Jane Austen",
        isbn: "978-0-456789-01-2",
        price: 15.99,
        description: "A thrilling tale of courage and discovery in uncharted lands.",
        image: "https://placehold.co/300x400/9b59b6/ffffff?text=Adventure+Novel",
        rating: 4.8,
        stock: 45,
        preview: "Chapter 1: The journey began on a misty morning when..."
    },
    {
        id: 5,
        name: "Mystery at Midnight",
        type: "book",
        category: "novels",
        author: "Arthur Mitchell",
        isbn: "978-0-567890-12-3",
        price: 18.99,
        description: "A gripping mystery that will keep you guessing until the last page.",
        image: "https://placehold.co/300x400/34495e/ffffff?text=Mystery+Novel",
        rating: 4.6,
        stock: 35,
        preview: "The old mansion stood silent as darkness fell..."
    },
    {
        id: 6,
        name: "Love in Paris",
        type: "book",
        category: "novels",
        author: "Emma Roberts",
        isbn: "978-0-678901-23-4",
        price: 14.99,
        description: "A romantic story set against the beautiful backdrop of Paris.",
        image: "https://placehold.co/300x400/e91e63/ffffff?text=Romance+Novel",
        rating: 4.4,
        stock: 40,
        preview: "She arrived in Paris on a warm spring day..."
    },

    // Books - Religious
    {
        id: 7,
        name: "Spiritual Journey",
        type: "book",
        category: "religious",
        author: "Rev. David Thompson",
        isbn: "978-0-789012-34-5",
        price: 22.99,
        description: "A guide to deepening your faith and spiritual understanding.",
        image: "https://placehold.co/300x400/795548/ffffff?text=Spiritual+Book",
        rating: 4.9,
        stock: 28,
        preview: "Finding peace in the journey of faith..."
    },
    {
        id: 8,
        name: "Sacred Texts Explained",
        type: "book",
        category: "religious",
        author: "Dr. Rachel Cohen",
        isbn: "978-0-890123-45-6",
        price: 28.99,
        description: "Comprehensive analysis and interpretation of sacred writings.",
        image: "https://placehold.co/300x400/607d8b/ffffff?text=Sacred+Texts",
        rating: 4.7,
        stock: 22,
        preview: "Understanding the wisdom of ancient teachings..."
    },

    // Stationery - Pens
    {
        id: 9,
        name: "Premium Gel Pen Set",
        type: "stationery",
        category: "pens",
        price: 12.99,
        description: "Set of 10 smooth-writing gel pens in assorted colors.",
        image: "https://placehold.co/300x400/00bcd4/ffffff?text=Gel+Pens",
        rating: 4.5,
        stock: 150
    },
    {
        id: 10,
        name: "Executive Fountain Pen",
        type: "stationery",
        category: "pens",
        price: 49.99,
        description: "Luxury fountain pen with gold-plated nib for professional writing.",
        image: "https://placehold.co/300x400/ffc107/000000?text=Fountain+Pen",
        rating: 4.8,
        stock: 35
    },
    {
        id: 11,
        name: "Ballpoint Pen Pack",
        type: "stationery",
        category: "pens",
        price: 8.99,
        description: "Pack of 20 reliable ballpoint pens in black and blue.",
        image: "https://placehold.co/300x400/2196f3/ffffff?text=Ballpoint+Pens",
        rating: 4.3,
        stock: 200
    },

    // Stationery - Office
    {
        id: 12,
        name: "Desk Organizer Set",
        type: "stationery",
        category: "office",
        price: 24.99,
        description: "Complete desk organization system with multiple compartments.",
        image: "https://placehold.co/300x400/8bc34a/ffffff?text=Desk+Organizer",
        rating: 4.6,
        stock: 65
    },
    {
        id: 13,
        name: "Premium Notebooks Bundle",
        type: "stationery",
        category: "office",
        price: 18.99,
        description: "Set of 5 high-quality notebooks with 200 pages each.",
        image: "https://placehold.co/300x400/ff9800/ffffff?text=Notebooks",
        rating: 4.7,
        stock: 85
    },
    {
        id: 14,
        name: "Sticky Notes Variety Pack",
        type: "stationery",
        category: "office",
        price: 9.99,
        description: "Assorted sizes and colors of sticky notes for all your needs.",
        image: "https://placehold.co/300x400/ffeb3b/000000?text=Sticky+Notes",
        rating: 4.4,
        stock: 120
    },
    {
        id: 15,
        name: "File Folders Set",
        type: "stationery",
        category: "office",
        price: 14.99,
        description: "Pack of 25 durable file folders for document organization.",
        image: "https://placehold.co/300x400/9e9e9e/ffffff?text=File+Folders",
        rating: 4.2,
        stock: 95
    },

    // Stationery - Art
    {
        id: 16,
        name: "Professional Colored Pencils",
        type: "stationery",
        category: "art",
        price: 34.99,
        description: "Set of 48 vibrant colored pencils for artists and designers.",
        image: "https://placehold.co/300x400/f44336/ffffff?text=Colored+Pencils",
        rating: 4.9,
        stock: 55
    },
    {
        id: 17,
        name: "Watercolor Paint Set",
        type: "stationery",
        category: "art",
        price: 29.99,
        description: "Complete watercolor set with 24 colors and brushes.",
        image: "https://placehold.co/300x400/3f51b5/ffffff?text=Watercolors",
        rating: 4.7,
        stock: 42
    },
    {
        id: 18,
        name: "Sketch Pad Bundle",
        type: "stationery",
        category: "art",
        price: 19.99,
        description: "Three premium sketch pads with different paper textures.",
        image: "https://placehold.co/300x400/009688/ffffff?text=Sketch+Pads",
        rating: 4.6,
        stock: 70
    },
    {
        id: 19,
        name: "Acrylic Paint Set",
        type: "stationery",
        category: "art",
        price: 39.99,
        description: "Professional acrylic paints in 36 colors with mixing palette.",
        image: "https://placehold.co/300x400/673ab7/ffffff?text=Acrylic+Paints",
        rating: 4.8,
        stock: 38
    },
    {
        id: 20,
        name: "Art Brush Collection",
        type: "stationery",
        category: "art",
        price: 24.99,
        description: "Complete set of 15 artist brushes for various techniques.",
        image: "https://placehold.co/300x400/ff5722/ffffff?text=Art+Brushes",
        rating: 4.5,
        stock: 60
    }
];

// Function to get all products
function getAllProducts() {
    return productsData;
}

// Function to get product by ID
function getProductById(id) {
    return productsData.find(product => product.id === parseInt(id));
}

// Function to get products by category
function getProductsByCategory(category) {
    if (category === 'all') return productsData;
    if (category === 'books') {
        return productsData.filter(p => p.type === 'book');
    }
    if (category === 'stationery') {
        return productsData.filter(p => p.type === 'stationery');
    }
    return productsData.filter(product => product.category === category);
}

// Function to search products
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return productsData.filter(product => {
        return product.name.toLowerCase().includes(searchTerm) ||
               (product.author && product.author.toLowerCase().includes(searchTerm)) ||
               (product.isbn && product.isbn.toLowerCase().includes(searchTerm)) ||
               product.description.toLowerCase().includes(searchTerm);
    });
}

// Function to filter products by price range
function filterByPrice(products, minPrice, maxPrice) {
    return products.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );
}

// Function to filter products by rating
function filterByRating(products, minRating) {
    return products.filter(product => product.rating >= minRating);
}

// Function to sort products
function sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch(sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        default:
            return sorted;
    }
}
