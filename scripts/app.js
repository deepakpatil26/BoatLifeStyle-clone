// Main application script for dynamic content rendering
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load data from db.json
        const response = await fetch('./db.json');
        if (!response.ok) throw new Error('Failed to load data');
        const data = await response.json();

        // Initialize components with data
        initNavigation(data.navigation, data.dropdownCategories);
        initSlideshow(data.slideshow);
        renderProducts('best_seller', data.bestSellers);
        renderProducts('featured_products', data.featuredProducts);
        
        // Initialize other components
        initBackToTop();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
});

// Navigation and Dropdown
function initNavigation(navData, categories) {
    // Set announcement bar
    const announcement = document.querySelector('.announcement-bar p');
    if (announcement) announcement.textContent = navData.announcement;

    // Set logo
    const logo = document.querySelector('.logo img');
    if (logo) {
        logo.src = navData.logo.src;
        logo.alt = navData.logo.alt;
    }

    // Render menu items
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navData.menuItems.forEach(item => {
            const link = document.createElement('a');
            link.href = item.link;
            link.className = 'nav-btn';
            link.textContent = item.text;
            if (item.text === 'More') link.classList.add('more-btn');
            navLinks.appendChild(link);
        });
    }

    // Render dropdown categories
    const dropdownContent = document.querySelector('.dropdown-content .dropdown-grid');
    if (dropdownContent) {
        categories.forEach(category => {
            const categoryLink = document.createElement('a');
            categoryLink.href = category.link;
            categoryLink.className = 'dropdown-item';
            categoryLink.innerHTML = `
                <img src="${category.image}" alt="${category.title}" loading="lazy">
                <span>${category.title}</span>
            `;
            const column = document.createElement('div');
            column.className = 'dropdown-column';
            column.appendChild(categoryLink);
            dropdownContent.appendChild(column);
        });
    }

    // Render action icons
    const actionIcons = document.querySelector('.action-buttons');
    if (actionIcons) {
        navData.actionIcons.forEach(icon => {
            const iconLink = document.createElement('a');
            iconLink.href = icon.link;
            iconLink.className = `action-btn ${icon.type === 'cart' ? 'cart-btn' : ''}`;
            iconLink.setAttribute('aria-label', icon.alt);
            
            const iconSvg = getIconSvg(icon.type);
            iconLink.innerHTML = iconSvg;
            
            if (icon.type === 'cart') {
                const count = document.createElement('span');
                count.className = 'cart-count';
                count.textContent = icon.count || '0';
                iconLink.appendChild(count);
            }
            
            actionIcons.appendChild(iconLink);
        });
    }
}

// Slideshow
function initSlideshow(slides) {
    const slideshow = document.querySelector('.slideshow-container');
    if (!slideshow) return;

    // Clear any existing slides
    slideshow.innerHTML = '';

    // Add slides
    slides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide';
        slideDiv.innerHTML = `
            <img src="${slide.src}" alt="${slide.alt}" loading="${index === 0 ? 'eager' : 'lazy'}">
        `;
        slideshow.appendChild(slideDiv);
    });

    // Add navigation arrows
    slideshow.innerHTML += `
        <button class="slide-nav prev" aria-label="Previous slide">❮</button>
        <button class="slide-nav next" aria-label="Next slide">❯</button>
    `;

    // Add dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slide-dots';
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    slideshow.after(dotsContainer);

    // Initialize slideshow
    let currentSlide = 0;
    const slideElements = document.querySelectorAll('.slide');
    const dotElements = document.querySelectorAll('.dot');

    function showSlide(index) {
        slideElements.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
        dotElements.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event listeners
    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    // Auto-advance slides
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    slideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slideshow.addEventListener('mouseleave', () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Show first slide
    showSlide(0);
}

// Product rendering
function renderProducts(containerId, products) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    // Create product grid
    const grid = document.createElement('div');
    grid.className = 'product-grid';

    // Add products to grid
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <a href="${product.link}" class="product-link">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.discount ? `<span class="discount-badge">${product.discount}</span>` : ''}
                </div>
                <div class="product-details">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="price-container">
                        <span class="current-price">${product.price}</span>
                        ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                    </div>
                    <div class="rating">
                        <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                        <span class="review-count">${product.reviews} reviews</span>
                    </div>
                </div>
            </a>
        `;
        grid.appendChild(productCard);
    });

    container.appendChild(grid);
}

// Back to top button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Helper function to get SVG icons
function getIconSvg(type) {
    const icons = {
        account: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>`,
        gift: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="8" width="18" height="4" rx="1"></rect>
            <path d="M12 15a3 3 0 0 1 3-3h5a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5a3 3 0 0 1-3-3z"></path>
            <path d="M8 12a4 4 0 0 1-4 4H3v-4a4 4 0 0 1 4-4h1"></path>
        </svg>`,
        cart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>`
    };
    return icons[type] || '';
}
