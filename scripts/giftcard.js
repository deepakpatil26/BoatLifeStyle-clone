/**
 * Gift Card Page JavaScript
 * Handles all interactive elements on the gift card page
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const mainImage = document.getElementById('mainGiftcardImage');
    const priceElement = document.getElementById('giftcardPrice');
    const quantityInput = document.getElementById('quantity');
    const addToCartBtn = document.querySelector('.btn-add-to-cart');
    const buyNowBtn = document.querySelector('.btn-buy-now');
    
    // Initialize the page
    function init() {
        setupThumbnails();
        setupDenominationOptions();
        setupQuantityControls();
        setupTabs();
        setupEventListeners();
    }
    
    // Set up thumbnail click handlers
    function setupThumbnails() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Update main image and price
                const amount = this.dataset.amount;
                updateGiftCard(amount);
            });
        });
    }
    
    // Set up denomination option click handlers
    function setupDenominationOptions() {
        const options = document.querySelectorAll('.denomination-option');
        
        options.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                options.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Update gift card with selected denomination
                const amount = this.dataset.amount;
                updateGiftCard(amount);
                
                // Also update the corresponding thumbnail
                const thumbnail = document.querySelector(`.thumbnail[data-amount="${amount}"]`);
                if (thumbnail) {
                    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                    thumbnail.classList.add('active');
                }
            });
        });
    }
    
    // Set up quantity control buttons
    function setupQuantityControls() {
        const decreaseBtn = document.getElementById('decreaseQty');
        const increaseBtn = document.getElementById('increaseQty');
        
        decreaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value < 10) {
                quantityInput.value = value + 1;
            }
        });
        
        // Validate manual input
        quantityInput.addEventListener('input', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            } else if (value > 10) {
                this.value = 10;
            }
        });
    }
    
    // Set up tab functionality
    function setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                
                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId) {
                        content.classList.add('active');
                    }
                });
                
                // Add animation class
                const activeContent = document.getElementById(tabId);
                activeContent.style.animation = 'fadeIn 0.3s ease';
                
                // Remove animation after it completes
                setTimeout(() => {
                    activeContent.style.animation = '';
                }, 300);
            });
        });
    }
    
    // Update gift card details
    function updateGiftCard(amount) {
        // Update price
        priceElement.textContent = `₹${amount}`;
        
        // Update main image with fade effect
        mainImage.style.opacity = '0';
        
        setTimeout(() => {
            mainImage.src = `https://cdn.shopify.com/s/files/1/0057/8938/4802/products/Gift-Card-${amount}_540x.png`;
            mainImage.alt = `₹${amount} Gift Card`;
            mainImage.style.opacity = '1';
        }, 200);
    }
    
    // Add to cart functionality
    function addToCart() {
        const amount = document.querySelector('.denomination-option.active').dataset.amount;
        const quantity = quantityInput.value;
        
        // Show loading state
        addToCartBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
        addToCartBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button state
            addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
            addToCartBtn.disabled = false;
            
            // Show success message
            showNotification('Gift card added to cart successfully!');
            
            // Reset button after delay
            setTimeout(() => {
                addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
            }, 2000);
        }, 1000);
    }
    
    // Buy now functionality
    function buyNow() {
        const amount = document.querySelector('.denomination-option.active').dataset.amount;
        const quantity = quantityInput.value;
        
        // Show loading state
        buyNowBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        buyNowBtn.disabled = true;
        
        // In a real app, this would redirect to checkout
        setTimeout(() => {
            // Reset button state
            buyNowBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Proceed to Checkout';
            buyNowBtn.disabled = false;
            
            // Show success message
            showNotification('Redirecting to checkout...');
            
            // In a real app, redirect to checkout
            // window.location.href = `/checkout?gift_card=${amount}&quantity=${quantity}`;
        }, 1000);
    }
    
    // Show notification
    function showNotification(message) {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        // Set message and show
        notification.textContent = message;
        notification.classList.add('show');
        
        // Hide after delay
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Add to cart button
        addToCartBtn.addEventListener('click', addToCart);
        
        // Buy now button
        buyNowBtn.addEventListener('click', buyNow);
        
        // Keyboard navigation for quantity input
        quantityInput.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                let value = parseInt(this.value);
                if (value < 10) this.value = value + 1;
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                let value = parseInt(this.value);
                if (value > 1) this.value = value - 1;
            }
        });
    }
    
    // Initialize the page
    init();
});
