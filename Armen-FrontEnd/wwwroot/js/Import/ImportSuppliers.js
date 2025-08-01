// Suppliers Management JavaScript
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

    // Initialize counters
    initializeCounters();
    
    // Initialize rating inputs
    initializeRatingInputs();
    
    // Initialize filter functionality
    initializeFilters();
});

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Rating Input Functionality
function initializeRatingInputs() {
    const stars = document.querySelectorAll('.rating-input .star');
    
    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            document.getElementById('selectedRating').value = rating;
            
            // Update visual feedback
            updateStarDisplay(rating);
        });
        
        star.addEventListener('mouseenter', function() {
            const rating = this.getAttribute('data-rating');
            updateStarDisplay(rating, true);
        });
    });
    
    // Reset on mouse leave
    document.querySelector('.rating-input').addEventListener('mouseleave', function() {
        const selectedRating = document.getElementById('selectedRating').value;
        if (selectedRating) {
            updateStarDisplay(selectedRating);
        } else {
            updateStarDisplay(0);
        }
    });
}

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

// Filter Functionality
function initializeFilters() {
    // Initialize filter state
    window.activeFilters = {
        search: '',
        category: '',
        rating: ''
    };
}

function filterSuppliers() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const ratingFilter = document.getElementById('ratingFilter').value;
    
    // Update active filters
    window.activeFilters = {
        search: searchInput,
        category: categoryFilter,
        rating: ratingFilter
    };
    
    // Get all table rows
    const rows = document.querySelectorAll('#suppliersTableBody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        let visible = true;
        
        // Search filter
        if (searchInput) {
            const text = row.textContent.toLowerCase();
            if (!text.includes(searchInput)) {
                visible = false;
            }
        }
        
        // Category filter
        if (categoryFilter && visible) {
            const rowCategory = row.getAttribute('data-category');
            if (rowCategory !== categoryFilter) {
                visible = false;
            }
        }
        
        // Rating filter
        if (ratingFilter && visible) {
            const rowRating = parseFloat(row.getAttribute('data-rating'));
            const filterRating = parseFloat(ratingFilter);
            if (rowRating < filterRating) {
                visible = false;
            }
        }
        
        // Show/hide row
        if (visible) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update active filters display
    updateActiveFiltersDisplay();
    
    // Show no results message if needed
    showNoResultsMessage(visibleCount === 0);
}

function updateActiveFiltersDisplay() {
    const activeFiltersDiv = document.getElementById('activeFilters');
    const filterTagsDiv = document.getElementById('filterTags');
    
    // Clear existing tags
    filterTagsDiv.innerHTML = '';
    
    let hasActiveFilters = false;
    
    // Add filter tags
    Object.entries(window.activeFilters).forEach(([key, value]) => {
        if (value) {
            hasActiveFilters = true;
            const tag = createFilterTag(key, value);
            filterTagsDiv.appendChild(tag);
        }
    });
    
    // Show/hide active filters section
    if (hasActiveFilters) {
        activeFiltersDiv.classList.remove('hidden');
    } else {
        activeFiltersDiv.classList.add('hidden');
    }
}

function createFilterTag(type, value) {
    const tag = document.createElement('span');
    tag.className = 'filter-tag';
    
    let displayText = '';
    switch (type) {
        case 'search':
            displayText = `?????: ${value}`;
            break;
        case 'category':
            displayText = `?????: ${getCategoryDisplayName(value)}`;
            break;
        case 'rating':
            displayText = `???????: ${value}+ ????`;
            break;
    }
    
    tag.innerHTML = `
        ${displayText}
        <i class="fas fa-times remove-tag" onclick="removeFilter('${type}')"></i>
    `;
    
    return tag;
}

function getCategoryDisplayName(value) {
    const categories = {
        'electronics': '??????????',
        'textiles': '???????',
        'machinery': '???? ??????',
        'food': '???? ??????',
        'chemicals': '???? ????????',
        'automotive': '??? ??????'
    };
    return categories[value] || value;
}

function removeFilter(type) {
    // Clear the filter
    switch (type) {
        case 'search':
            document.getElementById('searchInput').value = '';
            break;
        case 'category':
            document.getElementById('categoryFilter').value = '';
            break;
        case 'rating':
            document.getElementById('ratingFilter').value = '';
            break;
    }
    
    // Re-filter
    filterSuppliers();
}

function showNoResultsMessage(show) {
    let noResultsRow = document.getElementById('noResultsRow');
    
    if (show && !noResultsRow) {
        // Create no results row
        noResultsRow = document.createElement('tr');
        noResultsRow.id = 'noResultsRow';
        noResultsRow.innerHTML = `
            <td colspan="7" class="text-center p-8">
                <div class="text-gray-500">
                    <i class="fas fa-search text-4xl mb-4 opacity-50"></i>
                    <p class="text-lg font-semibold">?? ???? ????? ??????</p>
                    <p class="text-sm">??? ????? ?????? ????? ?? ????????</p>
                </div>
            </td>
        `;
        document.getElementById('suppliersTableBody').appendChild(noResultsRow);
    } else if (!show && noResultsRow) {
        noResultsRow.remove();
    }
}

// Supplier Modal Functions
function openAddSupplierModal() {
    document.getElementById('modalTitle').textContent = '????? ???? ????';
    document.getElementById('saveButtonText').textContent = '??? ??????';
    document.getElementById('supplierForm').reset();
    document.getElementById('supplierModal').classList.remove('hidden');
}

function closeSupplierModal() {
    document.getElementById('supplierModal').classList.add('hidden');
}

function saveSupplier(event) {
    event.preventDefault();
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> ???? ?????...';
    submitBtn.disabled = true;
    
    // Simulate save process
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        
        // Close modal
        closeSupplierModal();
        
        // Show success message
        showToast('?? ??? ?????? ?????!', 'success');
        
        // In real implementation, refresh the table or add the new row
    }, 2000);
}

// Supplier Actions
function viewSupplier(id) {
    // Redirect to supplier details page
    window.location.href = `/Import/SupplierDetails/${id}`;
}

function rateSupplier(id) {
    // Get supplier data (in real implementation, fetch from server)
    const suppliers = {
        1: {
            name: '?? ???',
            company: 'Shenzhen Electronics Co.',
            image: 'https://i.pravatar.cc/100?img=11'
        },
        2: {
            name: '???? ?????',
            company: 'Istanbul Textiles Ltd.',
            image: 'https://i.pravatar.cc/100?img=12'
        },
        3: {
            name: '???? ????',
            company: 'German Machinery GmbH',
            image: 'https://i.pravatar.cc/100?img=13'
        },
        4: {
            name: '????? ????',
            company: 'Mediterranean Foods S.p.A',
            image: 'https://i.pravatar.cc/100?img=14'
        },
        5: {
            name: '??? ?????',
            company: 'Auto Parts India Ltd.',
            image: 'https://i.pravatar.cc/100?img=15'
        }
    };
    
    const supplier = suppliers[id];
    if (supplier) {
        document.getElementById('ratingSupplierName').textContent = supplier.name;
        document.getElementById('ratingSupplierCompany').textContent = supplier.company;
        document.getElementById('ratingSupplierImage').src = supplier.image;
        
        // Reset form
        document.getElementById('ratingForm').reset();
        document.getElementById('selectedRating').value = '';
        updateStarDisplay(0);
        
        // Show modal
        document.getElementById('ratingModal').classList.remove('hidden');
    }
}

function closeRatingModal() {
    document.getElementById('ratingModal').classList.add('hidden');
}

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
        rating: selectedRating,
        productQuality: document.getElementById('productQuality').value,
        deliverySpeed: document.getElementById('deliverySpeed').value,
        communication: document.getElementById('communication').value,
        pricing: document.getElementById('pricing').value,
        comment: document.getElementById('ratingComment').value,
        timestamp: new Date().toISOString()
    };
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        
        // Close modal
        closeRatingModal();
        
        // Show success message
        showToast('?? ????? ??????? ?????!', 'success');
        
        console.log('Rating submitted:', ratingData);
    }, 2000);
}

function contactSupplier(id) {
    // Implement contact functionality
    showToast('???? ????? ????? ??????? ??????', 'info');
}

// Export Functions
function exportSuppliers() {
    showToast('???? ????? ????????...', 'info');
    
    // Simulate export process
    setTimeout(() => {
        showToast('?? ????? ???????? ?????!', 'success');
    }, 2000);
}

// Pagination
function changePage(direction) {
    const currentPageBtn = document.querySelector('.pagination button.active');
    const currentPage = parseInt(currentPageBtn.textContent);
    let newPage = currentPage;
    
    if (direction === 1) {
        newPage = Math.min(currentPage + 1, 3); // Assuming 3 pages max
    } else if (direction === -1) {
        newPage = Math.max(currentPage - 1, 1);
    }
    
    if (newPage !== currentPage) {
        // Update active button
        currentPageBtn.classList.remove('active');
        const newPageBtn = document.querySelector(`.pagination button:nth-child(${newPage + 1})`);
        if (newPageBtn) {
            newPageBtn.classList.add('active');
        }
        
        // In real implementation, load new page data
        showToast(`?? ???????? ??? ?????? ${newPage}`, 'info');
    }
}

// Toast Notification Function
function showToast(message, type = 'info') {
    const toast = document.getElementById('successToast');
    const toastMessage = document.getElementById('toastMessage');
    
    // Set message
    toastMessage.textContent = message;
    
    // Set color based on type
    toast.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 z-50`;
    
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

// Loading Modal Functions
function showLoadingModal() {
    document.getElementById('loadingModal').classList.remove('hidden');
}

function hideLoadingModal() {
    document.getElementById('loadingModal').classList.add('hidden');
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(event) {
    // ESC key to close modals
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal:not(.hidden)');
        modals.forEach(modal => {
            if (modal.id === 'supplierModal') closeSupplierModal();
            if (modal.id === 'ratingModal') closeRatingModal();
        });
    }
    
    // Ctrl+N to add new supplier
    if (event.ctrlKey && event.key === 'n') {
        event.preventDefault();
        openAddSupplierModal();
    }
});

// Click outside modal to close
document.addEventListener('click', function(event) {
    const modals = ['supplierModal', 'ratingModal'];
    
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        const modalContent = modal.querySelector('.modal-content');
        
        if (event.target === modal && !modalContent.contains(event.target)) {
            if (modalId === 'supplierModal') closeSupplierModal();
            if (modalId === 'ratingModal') closeRatingModal();
        }
    });
});

// Form validation
function validateSupplierForm() {
    const requiredFields = [
        'supplierName',
        'companyName',
        'supplierEmail',
        'supplierPhone',
        'productCategory'
    ];
    
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Initialize tooltips (if using Bootstrap or similar)
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[title]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Implement tooltip functionality
        });
    });
}

// Search optimization with debounce
let searchTimeout;
const originalFilterSuppliers = filterSuppliers;

filterSuppliers = function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(originalFilterSuppliers, 300);
};