// Supplier Details JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Initialize components
    initializeRatingInputs();
    animateRatingBars();
    
    // Set up event listeners
    setupEventListeners();
});

// Sample data for demonstration
const supplierData = {
    1: {
        name: '?? ???',
        title: '???? ????????',
        company: 'Shenzhen Electronics Co.',
        location: '????? ?????',
        image: 'https://i.pravatar.cc/150?img=11',
        rating: 5.0,
        reviewCount: 42,
        totalOrders: 87,
        email: 'li.wei@shenzhen-electronics.com',
        phone: '+86 755 1234 5678'
    },
    2: {
        name: '???? ?????',
        title: '???? ???????',
        company: 'Istanbul Textiles Ltd.',
        location: '???????? ?????',
        image: 'https://i.pravatar.cc/150?img=12',
        rating: 4.3,
        reviewCount: 28,
        totalOrders: 54,
        email: 'ahmed@istanbul-textiles.com',
        phone: '+90 212 555 0123'
    }
};

const reviewsData = [
    {
        id: 1,
        reviewerName: '???? ?????',
        rating: 5,
        date: '2025-01-20',
        comment: '???? ?????? ???? ???????? ????? ???????? ?? ????? ??????. ??????? ??? ????? ????.'
    },
    {
        id: 2,
        reviewerName: '???? ????',
        rating: 5,
        date: '2025-01-18',
        comment: '????? ???? ?????? ???????. ???????? ???? ????? ?????? ???????? ???????.'
    },
    {
        id: 3,
        reviewerName: '???? ???????',
        rating: 4,
        date: '2025-01-15',
        comment: '???? ???? ???? ???? ??? ??? ???? ????? ???? ?? ?????. ??? ??? ?? ??? ?????.'
    },
    {
        id: 4,
        reviewerName: '????? ????????',
        rating: 5,
        date: '2025-01-12',
        comment: '???? ???? ?????? ???. ?????? ?????? ???????? ??????. ???? ???????? ???? ????.'
    },
    {
        id: 5,
        reviewerName: '??????? ??????',
        rating: 5,
        date: '2025-01-10',
        comment: '???? ????? ??????? ????? ??????. ???? ??????? ?????? ????? ???? ??? ???????????.'
    }
];

// Setup Event Listeners
function setupEventListeners() {
    // Rating input event listeners
    const stars = document.querySelectorAll('.rating-input .star');
    
    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            document.getElementById('selectedRating').value = rating;
            updateStarDisplay(rating);
        });
        
        star.addEventListener('mouseenter', function() {
            const rating = this.getAttribute('data-rating');
            updateStarDisplay(rating, true);
        });
    });
    
    // Reset stars on mouse leave
    const ratingInput = document.querySelector('.rating-input');
    if (ratingInput) {
        ratingInput.addEventListener('mouseleave', function() {
            const selectedRating = document.getElementById('selectedRating').value;
            updateStarDisplay(selectedRating || 0);
        });
    }
}

// Initialize Rating Inputs
function initializeRatingInputs() {
    updateStarDisplay(0);
}

// Update Star Display
function updateStarDisplay(rating, isHover = false) {
    const stars = document.querySelectorAll('.rating-input .star');
    
    stars.forEach((star, index) => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        
        if (starRating <= rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Create Review Element
function createReviewElement(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review-item';
    
    const starsHtml = '?'.repeat(review.rating) + '?'.repeat(5 - review.rating);
    
    reviewDiv.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <span class="reviewer-name">${review.reviewerName}</span>
                <span class="review-date">${formatDate(review.date)}</span>
            </div>
            <div class="review-rating">
                <span class="review-stars">${starsHtml}</span>
                <span class="rating-number">${review.rating}</span>
            </div>
        </div>
        <div class="review-text">${review.comment}</div>
    `;
    
    return reviewDiv;
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Animate Rating Bars
function animateRatingBars() {
    const ratingBars = document.querySelectorAll('.rating-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
                
                observer.unobserve(bar);
            }
        });
    });
    
    ratingBars.forEach(bar => observer.observe(bar));
}

// Modal Functions
function openRatingModal() {
    document.getElementById('ratingModal').classList.remove('hidden');
    
    // Reset form
    document.getElementById('ratingForm').reset();
    document.getElementById('selectedRating').value = '';
    updateStarDisplay(0);
}

function closeRatingModal() {
    document.getElementById('ratingModal').classList.add('hidden');
}

function openAllReviewsModal() {
    loadAllReviews();
    document.getElementById('allReviewsModal').classList.remove('hidden');
}

function closeAllReviewsModal() {
    document.getElementById('allReviewsModal').classList.add('hidden');
}

// Submit Rating
function submitRating(event) {
    event.preventDefault();
    
    const selectedRating = document.getElementById('selectedRating').value;
    if (!selectedRating) {
        showToast('???? ?????? ????? ?? ??????', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> ???? ???????...';
    submitBtn.disabled = true;
    
    // Collect rating data
    const ratingData = {
        supplierId: getCurrentSupplierId(),
        rating: parseInt(selectedRating),
        productQuality: document.getElementById('productQuality').value,
        deliverySpeed: document.getElementById('deliverySpeed').value,
        communication: document.getElementById('communication').value,
        pricing: document.getElementById('pricing').value,
        comment: document.getElementById('ratingComment').value,
        reviewerName: '???????? ??????', // In real app, get from user session
        timestamp: new Date().toISOString()
    };
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        
        // Add the new review to the beginning of reviews data
        const newReview = {
            id: reviewsData.length + 1,
            reviewerName: ratingData.reviewerName,
            rating: ratingData.rating,
            date: new Date().toISOString().split('T')[0],
            comment: ratingData.comment
        };
        
        reviewsData.unshift(newReview);
        
        // Reload recent reviews
        loadRecentReviews();
        
        // Close modal
        closeRatingModal();
        
        // Show success message
        showToast('?? ????? ??????? ?????!', 'success');
        
        console.log('Rating submitted:', ratingData);
    }, 2000);
}

// Load All Reviews - ????? ????? ?? HTML ??????
function loadAllReviews() {
    // ????????? ?????? ?????? ?? HTML? ?? ????? ?????? ???
    document.getElementById('allReviewsModal').classList.remove('hidden');
}

function closeAllReviewsModal() {
    document.getElementById('allReviewsModal').classList.add('hidden');
}

// Quick Actions - ????? ?????? ????????
// ?? ??? ???? createNewOrder, viewOrderHistory, downloadCatalog, scheduleCall

function contactSupplier() {
    showToast('???? ??? ????? ???????...', 'info');
    
    // In real implementation, open contact modal or redirect to messaging
    setTimeout(() => {
        showToast('??? ?????? ??? ???????', 'warning');
    }, 1500);
}

// Navigation
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/Import/Suppliers';
    }
}

// Utility Functions
function getCurrentSupplierId() {
    // Extract supplier ID from URL or get from page data
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1] || '1';
}

// Toast Notification Function
function showToast(message, type = 'info') {
    const toast = document.getElementById('successToast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;
    
    // Set message
    toastMessage.textContent = message;
    
    // Reset classes
    toast.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 z-50`;
    
    // Set color based on type
    switch (type) {
        case 'success':
            toast.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            toast.classList.add('bg-red-500', 'text-white');
            break;
        case 'warning':
            toast.classList.add('bg-yellow-500', 'text-white');
            break;
        case 'info':
            toast.classList.add('bg-blue-500', 'text-white');
            break;
        default:
            toast.classList.add('bg-gray-500', 'text-white');
    }
    
    // Show toast
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
        toast.classList.add('translate-x-0');
    }, 100);
    
    // Hide toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove('translate-x-0');
        toast.classList.add('translate-x-full');
    }, 4000);
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(event) {
    // ESC key to close modals
    if (event.key === 'Escape') {
        const ratingModal = document.getElementById('ratingModal');
        const reviewsModal = document.getElementById('allReviewsModal');
        
        if (ratingModal && !ratingModal.classList.contains('hidden')) {
            closeRatingModal();
        }
        
        if (reviewsModal && !reviewsModal.classList.contains('hidden')) {
            closeAllReviewsModal();
        }
    }
    
    // Ctrl+R to add rating
    if (event.ctrlKey && event.key === 'r') {
        event.preventDefault();
        openRatingModal();
    }
    
    // Ctrl+B to go back
    if (event.ctrlKey && event.key === 'b') {
        event.preventDefault();
        goBack();
    }
});

// Click outside modal to close
document.addEventListener('click', function(event) {
    const modals = ['ratingModal', 'allReviewsModal'];
    
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        if (event.target === modal) {
            if (modalId === 'ratingModal') closeRatingModal();
            if (modalId === 'allReviewsModal') closeAllReviewsModal();
        }
    });
});

// Form Validation
function validateRatingForm() {
    const selectedRating = document.getElementById('selectedRating').value;
    
    if (!selectedRating) {
        showToast('???? ?????? ????? ?? ??????', 'error');
        return false;
    }
    
    const comment = document.getElementById('ratingComment').value.trim();
    if (!comment) {
        showToast('???? ????? ????? ???????', 'error');
        return false;
    }
    
    if (comment.length < 10) {
        showToast('??? ?? ???? ??????? 10 ???? ??? ?????', 'error');
        return false;
    }
    
    return true;
}

// Load Supplier Data (if different supplier)
function loadSupplierData(supplierId) {
    const supplier = supplierData[supplierId];
    if (!supplier) return;
    
    // Update supplier information
    document.getElementById('supplierName').textContent = supplier.name;
    document.getElementById('supplierTitle').textContent = supplier.title;
    document.getElementById('companyName').textContent = supplier.company;
    document.getElementById('supplierLocation').textContent = supplier.location;
    document.getElementById('supplierImage').src = supplier.image;
    document.getElementById('totalOrders').textContent = `${supplier.totalOrders} ???`;
    
    // Update rating information
    const ratingNumber = document.querySelector('.rating-number');
    const ratingCount = document.querySelector('.rating-count');
    
    if (ratingNumber) ratingNumber.textContent = supplier.rating.toFixed(1);
    if (ratingCount) ratingCount.textContent = `(${supplier.reviewCount} ?????)`;
}

// Initialize page with current supplier data
const currentSupplierId = getCurrentSupplierId();
if (supplierData[currentSupplierId]) {
    loadSupplierData(currentSupplierId);
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));