// Helper function to generate SVG placeholders
function generateProductImage(color, text, icon = '📚') {
    const svg = `<svg width="300" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="400" fill="${color}"/>
        <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="60" fill="white" text-anchor="middle" dominant-baseline="middle">${icon}</text>
        <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>`;
    // Properly encode SVG for data URI including Unicode characters
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

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
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1565118531796-763e5082d113?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1611532736573-418d3b494ab8?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1606383116154-46f15f1f9afc?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1572254287945-514a0b1e1b1a?w=400&h=600&fit=crop',
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
