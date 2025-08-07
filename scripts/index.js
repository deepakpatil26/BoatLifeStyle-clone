import main_navbar from "./components.js";
import { footer } from "./footer.js";

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeSlideshow();
    initializeCartFunctionality();
    initializeBackToTop();
    initializeSearch();
    loadFooter();
    updateCartCount();
});

// Slideshow functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.mySlides');
const dots = document.querySelectorAll('.dot');

function initializeSlideshow() {
    if (slides.length === 0) return;
    
    showSlide(slideIndex);
    
    // Auto-advance slides every 4 seconds
    setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }, 4000);
}

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
        slides[index].style.display = 'block';
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
}

// Navigation functions for manual control
window.changeSlide = function(direction) {
    slideIndex += direction;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    showSlide(slideIndex);
};

window.currentSlide = function(index) {
    slideIndex = index - 1;
    showSlide(slideIndex);
};

// Cart functionality
function initializeCartFunctionality() {
    const addToCartButtons = document.querySelectorAll('.add_to_cart_btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card') || this.closest('.video-product');
            if (!productCard) return;
            
            const productData = extractProductData(productCard);
            addToCart(productData);
            
            // Visual feedback
            this.textContent = 'Added!';
            this.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = '#f6c00b';
            }, 1500);
        });
    });
}

function extractProductData(productCard) {
    const name = productCard.querySelector('.name')?.textContent || 'Unknown Product';
    const price = productCard.querySelector('.price')?.textContent || '₹0';
    const image = productCard.querySelector('.products, video')?.src || '';
    const reviews = productCard.querySelector('.reviews')?.textContent || '';
    
    return {
        name,
        price,
        image,
        reviews,
        quantity: 1,
        id: Date.now() + Math.random() // Simple ID generation
    };
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart_items')) || [];
    
    // Check if product already exists
    const existingIndex = cart.findIndex(item => item.name === product.name);
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('cart_items', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart_items')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('num');
    
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Back to top functionality
function initializeBackToTop() {
    const backToTopButton = document.getElementById('myBtn');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('input');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const query = this.value.toLowerCase().trim();
            
            // Simple search routing
            const searchRoutes = {
                'airpods': './html/airpods.html',
                'earbuds': './html/airpods.html',
                'headphones': './html/rockerz.html',
                'rockerz': './html/rockerz.html',
                'smartwatch': './html/smartwatch.html',
                'watch': './html/smartwatch.html',
                'deals': './html/dailyDeals.html',
                'offers': './html/offerzone.html'
            };
            
            const route = searchRoutes[query];
            if (route) {
                window.location.href = route;
            } else {
                alert(`No results found for "${query}". Try searching for: airpods, headphones, smartwatch, deals, or offers.`);
            }
        }
    });
}

// Load footer
function loadFooter() {
    const footerElement = document.getElementById('footer_part');
    if (footerElement) {
        footerElement.innerHTML = footer();
    }
}

// Dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropbtn = document.querySelector('.dropbtn');
    
    if (!dropdown || !dropdownContent || !dropbtn) return;
    
    let isVisible = false;
    let hideTimeout;
    
    const showDropdown = () => {
        if (hideTimeout) clearTimeout(hideTimeout);
        if (isVisible) return;
        
        dropdownContent.style.display = 'block';
        requestAnimationFrame(() => {
            dropdownContent.style.opacity = '1';
            dropdownContent.style.visibility = 'visible';
        });
        isVisible = true;
        dropbtn.setAttribute('aria-expanded', 'true');
    };
    
    const hideDropdown = (delay = 0) => {
        if (hideTimeout) clearTimeout(hideTimeout);
        if (!isVisible) return;
        
        const hide = () => {
            dropdownContent.style.opacity = '0';
            dropdownContent.style.visibility = 'hidden';
            setTimeout(() => {
                if (dropdownContent.style.opacity === '0') {
                    dropdownContent.style.display = 'none';
                }
            }, 300);
            isVisible = false;
            dropbtn.setAttribute('aria-expanded', 'false');
        };
        
        hideTimeout = setTimeout(hide, delay);
    };
    
    // Event listeners
    dropbtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isVisible ? hideDropdown() : showDropdown();
    });
    
    dropdown.addEventListener('mouseenter', showDropdown);
    dropdown.addEventListener('mouseleave', () => hideDropdown(300));
    
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) hideDropdown();
    });
    
    dropdownContent.addEventListener('click', (e) => e.stopPropagation());
});

// Performance optimization: Lazy load videos
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.dataset.src) {
                    video.src = video.dataset.src;
                    video.load();
                    videoObserver.unobserve(video);
                }
            }
        });
    });
    
    videos.forEach(video => {
        videoObserver.observe(video);
    });
});