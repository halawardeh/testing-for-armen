// Factory Details Page JavaScript - Simple Version
document.addEventListener('DOMContentLoaded', function() {
    initializeFactoryDetails();
});

// Initialize all factory details functionality
function initializeFactoryDetails() {
    initializeStarRating();
    initializeModals();
    animateElements();
}

// Star Rating Functionality
function initializeStarRating() {
    const stars = document.querySelectorAll('.rating-input .star');
    const selectedRatingInput = document.getElementById('selectedRating');
    
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', function() {
            highlightStars(index + 1);
        });
        
        star.addEventListener('mouseleave', function() {
            const currentRating = selectedRatingInput ? selectedRatingInput.value : 0;
            highlightStars(currentRating);
        });
        
        star.addEventListener('click', function() {
            const rating = index + 1;
            if (selectedRatingInput) {
                selectedRatingInput.value = rating;
            }
            highlightStars(rating);
            
            // Add feedback animation
            star.style.transform = 'scale(1.4)';
            setTimeout(() => {
                star.style.transform = 'scale(1.2)';
            }, 200);
        });
    });
}

// Highlight stars based on rating
function highlightStars(rating) {
    const stars = document.querySelectorAll('.rating-input .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Modal Management
function initializeModals() {
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Open rating modal
function openRatingModal() {
    const modal = document.getElementById('ratingModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Reset form
        const form = document.getElementById('ratingForm');
        if (form) {
            form.reset();
        }
        
        // Reset star rating
        const selectedRatingInput = document.getElementById('selectedRating');
        if (selectedRatingInput) {
            selectedRatingInput.value = '';
        }
        highlightStars(0);
    }
}

// Close rating modal
function closeRatingModal() {
    const modal = document.getElementById('ratingModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Close all modals
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.add('hidden');
    });
    document.body.style.overflow = '';
}

// Submit rating form
function submitRating(event) {
    event.preventDefault();
    
    const selectedRating = document.getElementById('selectedRating');
    if (!selectedRating || !selectedRating.value) {
        showToast('???? ?????? ????? ?????', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> ???? ???????...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        closeRatingModal();
        showToast('?? ????? ??????? ?????!', 'success');
    }, 1500);
}

// Navigation Functions
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/Import/Factories';
    }
}

// Quick Actions
function requestQuote() {
    showToast('?? ????? ??? ??? ?????', 'info');
    // Implement quote request logic here
}

function scheduleVisit() {
    showToast('?? ????? ??? ??????? ?????????', 'info');
    // Implement visit scheduling logic here
}

function contactFactory() {
    // Simple contact implementation
    const phone = '+8675523456789';
    const email = 'li.shin@shenzhentech.com';
    
    const message = `??????? ???????:\n??????: ${phone}\n?????? ??????????: ${email}`;
    
    if (confirm(message + '\n\n?? ???? ??? ??? ???????')) {
        navigator.clipboard.writeText(phone).then(() => {
            showToast('?? ??? ??? ??????', 'success');
        });
    }
}

function viewCatalog() {
    showToast('???? ??? ?????? ????????...', 'info');
    // Implement catalog viewing logic here
    setTimeout(() => {
        // Simulate opening catalog
        window.open('#', '_blank');
    }, 1000);
}

// Show all reviews
function showAllReviews() {
    const reviewsModal = createModal('???? ??????? ??????', generateAllReviewsHTML());
    document.body.appendChild(reviewsModal);
    document.body.style.overflow = 'hidden';
}

// Generate all reviews HTML
function generateAllReviewsHTML() {
    const reviews = [
        {
            name: '??????? ??????',
            date: '20 ????? 2025',
            rating: 5,
            comment: '???? ????? ????? ????? ????? ????. ???????? ????????? ?????????? ?????. ???? ????? ????? ???????.'
        },
        {
            name: '???? ???????',
            date: '18 ????? 2025',
            rating: 5,
            comment: '????? ???? ?????? ???????. ???????? ???? ????? ?????? ???????? ???????. ???? ???????? ????.'
        },
        {
            name: '???? ???????',
            date: '15 ????? 2025',
            rating: 4,
            comment: '???? ???? ???? ???? ???? ??????? ????? ???? ??? ???? ????? ???? ?? ???????. ??? ??? ?? ??? ?????.'
        },
        {
            name: '????? ????????',
            date: '12 ????? 2025',
            rating: 5,
            comment: '???? ???? ??????? ???. ?????? ?????? ??????? ????????? ?????. ???? ????? ???? ????? ????? ??????.'
        },
        {
            name: '???? ?????',
            date: '10 ????? 2025',
            rating: 5,
            comment: '???? ????? ??????? ????? ??????. ??????????? ????????? ?????? ????? ???? ??? ???????????.'
        }
    ];
    
    return `
        <div class="reviews-container max-h-96 overflow-y-auto">
            ${reviews.map(review => `
                <div class="review-item mb-4">
                    <div class="review-header">
                        <div class="reviewer-info">
                            <span class="reviewer-name">${review.name}</span>
                            <span class="review-date">${review.date}</span>
                        </div>
                        <div class="review-rating">
                            <span class="review-stars text-yellow-500">${'?'.repeat(review.rating)}${'?'.repeat(5-review.rating)}</span>
                            <span class="rating-number">${review.rating}</span>
                        </div>
                    </div>
                    <div class="review-text">${review.comment}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// Create modal dynamically
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 modal flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="modal-content max-w-4xl w-full mx-4 p-8">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-primary-color">${title}</h3>
                <button onclick="this.closest('.modal').remove(); document.body.style.overflow = ''" class="text-gray-500 hover:text-gray-700 text-2xl">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    // Close when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    });
    
    return modal;
}

// Toast Notifications
function showToast(message, type = 'success') {
    const toast = document.getElementById('successToast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        // Set message
        toastMessage.textContent = message;
        
        // Set type styling
        switch(type) {
            case 'success':
                toast.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 z-50';
                break;
            case 'error':
                toast.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 z-50';
                break;
            case 'info':
                toast.className = 'fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 z-50';
                break;
            case 'warning':
                toast.className = 'fixed top-4 right-4 bg-yellow-500 text-white p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 z-50';
                break;
        }
        
        // Show toast
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto hide after 4 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 300);
        }, 4000);
    }
}

// Simple animations
function animateElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Export/Print functions (if needed)
function exportFactoryData() {
    const factoryData = {
        name: 'Shenzhen Tech Manufacturing',
        contact: '?? ??? - ???? ???????',
        rating: 4.9,
        totalOrders: 234,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(factoryData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'factory_details.json';
    link.click();
    
    showToast('?? ????? ?????? ??????', 'success');
}

function printFactoryDetails() {
    window.print();
}

// Share functionality
function shareFactoryDetails() {
    if (navigator.share) {
        navigator.share({
            title: 'Shenzhen Tech Manufacturing - ?????? ??????',
            text: '???? ?? ?????? ??? ?????? ??????',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('?? ??? ?????? ??? ???????', 'info');
        });
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+R for rating
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        openRatingModal();
    }
    
    // Ctrl+P for print
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        printFactoryDetails();
    }
});

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    document.body.style.overflow = '';
});