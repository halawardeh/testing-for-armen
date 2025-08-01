// Import Factories Page JavaScript

// Global variable to track initialization
let factoriesPageInitialized = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded - starting initialization');
    
    // Prevent double initialization
    if (factoriesPageInitialized) {
        console.log('Already initialized');
        return;
    }
    
    factoriesPageInitialized = true;
    
    // Small delay to ensure all elements are ready
    setTimeout(() => {
        initializePage();
        initializeEventListeners();
        initializeAOS();
        
        // Test modal availability
        testModalAvailability();
    }, 100);
});

// Test modal availability
function testModalAvailability() {
    const addBtn = document.getElementById('addFactoryBtn');
    const modal = document.getElementById('factoryModal');
    
    console.log('🔍 Testing components:');
    console.log('  Add button:', addBtn ? '✅ Found' : '❌ Missing');
    console.log('  Modal:', modal ? '✅ Found' : '❌ Missing');
    
    if (addBtn && modal) {
        console.log('✅ All components ready for factory management');
    } else {
        console.error('❌ Missing components for factory management');
    }
}

// Initialize the page
function initializePage() {
    console.log('📝 Import Factories page initialized');
    
    // Initialize search and filter functionality
    initializeFilters();
    
    // Initialize table interactions
    initializeTableActions();
    
    // Initialize modals
    initializeModals();
    
    // Initialize rating system
    initializeRatingSystem();
}

// Initialize event listeners
function initializeEventListeners() {
    console.log('🔗 Setting up event listeners');
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterFactories);
        console.log('  ✅ Search input listener added');
    }
    
    // Filter dropdowns
    const industryFilter = document.getElementById('industryFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    
    if (industryFilter) {
        industryFilter.addEventListener('change', filterFactories);
        console.log('  ✅ Industry filter listener added');
    }
    
    if (ratingFilter) {
        ratingFilter.addEventListener('change', filterFactories);
        console.log('  ✅ Rating filter listener added');
    }
    
    // Export button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportFactoriesData);
        console.log('  ✅ Export button listener added');
    }
    
    // Add factory button - CRITICAL
    const addFactoryBtn = document.getElementById('addFactoryBtn');
    if (addFactoryBtn) {
        // Remove any existing listeners
        addFactoryBtn.replaceWith(addFactoryBtn.cloneNode(true));
        const newAddFactoryBtn = document.getElementById('addFactoryBtn');
        
        newAddFactoryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🎯 Add factory button clicked');
            openAddFactoryModal();
        });
        console.log('  ✅ Add factory button listener added');
    } else {
        console.error('  ❌ Add factory button not found');
    }
    
    // Factory form submission
    const factoryForm = document.getElementById('factoryForm');
    if (factoryForm) {
        factoryForm.addEventListener('submit', submitFactoryForm);
        console.log('  ✅ Factory form listener added');
    }
    
    // Rating form submission
    const ratingForm = document.getElementById('ratingForm');
    if (ratingForm) {
        ratingForm.addEventListener('submit', submitRating);
        console.log('  ✅ Rating form listener added');
    }
    
    // Modal close buttons
    const closeFactoryModal = document.getElementById('closeFactoryModal');
    if (closeFactoryModal) {
        closeFactoryModal.addEventListener('click', function() {
            console.log('🔒 Closing factory modal via close button');
            closeModal('factoryModal');
        });
        console.log('  ✅ Close factory modal listener added');
    }
    
    const closeRatingModal = document.getElementById('closeRatingModal');
    if (closeRatingModal) {
        closeRatingModal.addEventListener('click', function() {
            console.log('🔒 Closing rating modal via close button');
            closeModal('ratingModal');
        });
        console.log('  ✅ Close rating modal listener added');
    }
    
    // Cancel buttons
    const cancelFactoryModal = document.getElementById('cancelFactoryModal');
    if (cancelFactoryModal) {
        cancelFactoryModal.addEventListener('click', function() {
            console.log('🔒 Closing factory modal via cancel button');
            closeModal('factoryModal');
        });
        console.log('  ✅ Cancel factory modal listener added');
    }
    
    const cancelRatingModal = document.getElementById('cancelRatingModal');
    if (cancelRatingModal) {
        cancelRatingModal.addEventListener('click', function() {
            console.log('🔒 Closing rating modal via cancel button');
            closeModal('ratingModal');
        });
        console.log('  ✅ Cancel rating modal listener added');
    }
}

// Initialize AOS animations
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
        console.log('✨ AOS animations initialized');
    }
}

// Initialize filters
function initializeFilters() {
    updateActiveFilters();
}

// Initialize table actions
function initializeTableActions() {
    const actionButtons = document.querySelectorAll('.factory-action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const row = this.closest('tr');
            const factoryId = getFactoryIdFromRow(row);
            
            console.log(`🎯 Action: ${action}, Factory ID: ${factoryId}`);
            
            switch(action) {
                case 'view':
                    viewFactory(factoryId);
                    break;
                case 'rate':
                    rateFactory(factoryId);
                    break;
                case 'contact':
                    contactFactory(factoryId);
                    break;
                case 'visit':
                    scheduleVisit(factoryId);
                    break;
            }
        });
    });
    console.log(`🎯 ${actionButtons.length} factory action buttons initialized`);
}

// Get factory ID from table row
function getFactoryIdFromRow(row) {
    const rows = Array.from(row.parentNode.children);
    return rows.indexOf(row) + 1;
}

// Initialize modals
function initializeModals() {
    // Click outside modal to close
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                console.log('🔒 Closing modal via outside click');
                closeModal(this.id);
            }
        });
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal:not(.hidden)');
            if (openModal) {
                console.log('🔒 Closing modal via Escape key');
                closeModal(openModal.id);
            }
        }
    });
    
    console.log('🔗 Modal event listeners initialized');
}

// Initialize rating system
function initializeRatingSystem() {
    const stars = document.querySelectorAll('.rating-input .star');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            const selectedRatingInput = document.getElementById('selectedRating');
            if (selectedRatingInput) {
                selectedRatingInput.value = rating;
            }
            
            // Update star display
            const allStars = this.parentNode.querySelectorAll('.star');
            allStars.forEach((s, index) => {
                if (index < rating) {
                    s.style.color = '#fbbf24';
                    s.classList.remove('text-gray-300');
                    s.classList.add('text-yellow-500');
                } else {
                    s.style.color = '#d1d5db';
                    s.classList.remove('text-yellow-500');
                    s.classList.add('text-gray-300');
                }
            });
        });
        
        star.addEventListener('mouseover', function() {
            const rating = this.getAttribute('data-rating');
            const allStars = this.parentNode.querySelectorAll('.star');
            allStars.forEach((s, index) => {
                if (index < rating) {
                    s.style.color = '#fbbf24';
                } else {
                    s.style.color = '#d1d5db';
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            const selectedRating = document.getElementById('selectedRating')?.value || 0;
            const allStars = this.parentNode.querySelectorAll('.star');
            allStars.forEach((s, index) => {
                if (index < selectedRating) {
                    s.style.color = '#fbbf24';
                } else {
                    s.style.color = '#d1d5db';
                }
            });
        });
    });
    console.log('⭐ Rating system initialized');
}

// Open add factory modal - MAIN FUNCTION
function openAddFactoryModal() {
    console.log('🎯 Opening add factory modal...');
    
    const modal = document.getElementById('factoryModal');
    if (!modal) {
        console.error('❌ Factory modal not found!');
        alert('خطأ: لم يتم العثور على نافذة إضافة المصنع');
        return;
    }
    
    try {
        // Reset form
        const form = document.getElementById('factoryForm');
        if (form) {
            form.reset();
            console.log('  ✅ Form reset');
        }
        
        // Update modal title
        const modalTitle = document.getElementById('modalTitle');
        if (modalTitle) {
            modalTitle.textContent = 'إضافة مصنع جديد';
            console.log('  ✅ Modal title updated');
        }
        
        // Update save button text
        const saveButtonText = document.getElementById('saveButtonText');
        if (saveButtonText) {
            saveButtonText.textContent = 'حفظ المصنع';
            console.log('  ✅ Save button text updated');
        }
        
        // Show modal
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        console.log('✅ Modal opened successfully');
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input[type="text"]');
            if (firstInput) {
                firstInput.focus();
                console.log('  ✅ First input focused');
            }
        }, 100);
        
    } catch (error) {
        console.error('❌ Error opening modal:', error);
        alert('خطأ في فتح النافذة: ' + error.message);
    }
}

// Close modal function
function closeModal(modalId) {
    console.log(`🔒 Closing modal: ${modalId}`);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Reset form if exists
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
        
        // Reset rating stars
        const stars = modal.querySelectorAll('.rating-input .star');
        stars.forEach(star => {
            star.style.color = '#d1d5db';
            star.classList.remove('text-yellow-500');
            star.classList.add('text-gray-300');
        });
        
        // Clear selected rating
        const selectedRating = modal.querySelector('#selectedRating');
        if (selectedRating) {
            selectedRating.value = '';
        }
        
        console.log('✅ Modal closed successfully');
    } else {
        console.error(`❌ Modal not found: ${modalId}`);
    }
}

// Filter factories
function filterFactories() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const industryFilter = document.getElementById('industryFilter')?.value || '';
    const ratingFilter = document.getElementById('ratingFilter')?.value || '';
    
    const rows = document.querySelectorAll('#factoriesTableBody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const factoryName = row.querySelector('td:first-child')?.textContent.toLowerCase() || '';
        const companyName = row.querySelector('td:nth-child(2)')?.textContent.toLowerCase() || '';
        const industry = row.dataset.industry || '';
        const rating = row.dataset.rating || '';
        
        const matchesSearch = factoryName.includes(searchTerm) || companyName.includes(searchTerm);
        const matchesIndustry = !industryFilter || industry === industryFilter;
        const matchesRating = !ratingFilter || parseInt(rating) >= parseInt(ratingFilter);
        
        if (matchesSearch && matchesIndustry && matchesRating) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    updateActiveFilters();
    showNoResultsMessage(visibleCount === 0);
}

// Update active filters display
function updateActiveFilters() {
    const activeFiltersContainer = document.getElementById('activeFilters');
    const filterTagsContainer = document.getElementById('filterTags');
    
    if (!activeFiltersContainer || !filterTagsContainer) return;
    
    const searchTerm = document.getElementById('searchInput')?.value || '';
    const industryFilter = document.getElementById('industryFilter')?.value || '';
    const ratingFilter = document.getElementById('ratingFilter')?.value || '';
    
    const filters = [];
    
    if (searchTerm) {
        filters.push({ type: 'search', label: `البحث: ${searchTerm}`, value: searchTerm });
    }
    
    if (industryFilter) {
        const industryText = document.querySelector(`#industryFilter option[value="${industryFilter}"]`)?.textContent || industryFilter;
        filters.push({ type: 'industry', label: `الصناعة: ${industryText}`, value: industryFilter });
    }
    
    if (ratingFilter) {
        filters.push({ type: 'rating', label: `التقييم: ${ratingFilter}+ نجوم`, value: ratingFilter });
    }
    
    if (filters.length > 0) {
        activeFiltersContainer.classList.remove('hidden');
        filterTagsContainer.innerHTML = filters.map(filter => 
            `<span class="filter-tag bg-primary-color text-white px-3 py-1 rounded-full text-sm ml-2 mb-2 inline-flex items-center">
                ${filter.label}
                <button onclick="removeFilter('${filter.type}')" class="mr-2 hover:text-gray-300">
                    <i class="fas fa-times text-xs"></i>
                </button>
            </span>`
        ).join('');
    } else {
        activeFiltersContainer.classList.add('hidden');
    }
}

// Remove filter
function removeFilter(filterType) {
    switch (filterType) {
        case 'search':
            document.getElementById('searchInput').value = '';
            break;
        case 'industry':
            document.getElementById('industryFilter').value = '';
            break;
        case 'rating':
            document.getElementById('ratingFilter').value = '';
            break;
    }
    filterFactories();
}

// Show no results message
function showNoResultsMessage(show) {
    let noResultsRow = document.getElementById('noResultsRow');
    
    if (show) {
        if (!noResultsRow) {
            const tbody = document.getElementById('factoriesTableBody');
            noResultsRow = document.createElement('tr');
            noResultsRow.id = 'noResultsRow';
            noResultsRow.innerHTML = `
                <td colspan="7" class="text-center py-8">
                    <div class="text-gray-500">
                        <i class="fas fa-search text-4xl mb-4"></i>
                        <p class="text-lg font-semibold">لا توجد مصانع تطابق معايير البحث</p>
                        <p class="text-sm">جرب تعديل الفلاتر أو البحث بمصطلحات أخرى</p>
                    </div>
                </td>
            `;
            tbody.appendChild(noResultsRow);
        }
        noResultsRow.style.display = '';
    } else {
        if (noResultsRow) {
            noResultsRow.style.display = 'none';
        }
    }
}

// View factory details
function viewFactory(factoryId) {
    console.log('👁️ Viewing factory:', factoryId);
    showToast('جاري فتح تفاصيل المصنع...', 'info');
    setTimeout(() => {
        window.location.href = `/Import/FactoryDetails/${factoryId}`;
    }, 500);
}

// Rate factory
function rateFactory(factoryId) {
    console.log('⭐ Rating factory:', factoryId);
    const modal = document.getElementById('ratingModal');
    if (modal) {
        updateRatingModal(factoryId);
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('✅ Rating modal opened');
    } else {
        console.error('❌ Rating modal not found!');
    }
}

// Update rating modal with factory information
function updateRatingModal(factoryId) {
    const rows = document.querySelectorAll('#factoriesTableBody tr');
    if (factoryId <= rows.length) {
        const row = rows[factoryId - 1];
        const factoryName = row.querySelector('td:nth-child(2) .font-semibold')?.textContent || '';
        const managerName = row.querySelector('td:first-child .font-semibold')?.textContent || '';
        const factoryImage = row.querySelector('td:first-child img')?.src || '';
        
        const modalFactoryName = document.getElementById('ratingFactoryName');
        const modalFactoryCompany = document.getElementById('ratingFactoryCompany');
        const modalFactoryImage = document.getElementById('ratingFactoryImage');
        
        if (modalFactoryName) modalFactoryName.textContent = factoryName;
        if (modalFactoryCompany) modalFactoryCompany.textContent = managerName;
        if (modalFactoryImage) modalFactoryImage.src = factoryImage;
    }
}

// Contact factory
function contactFactory(factoryId) {
    console.log('💬 Contacting factory:', factoryId);
    showToast('جاري فتح نافذة التواصل مع المصنع...', 'info');
}

// Schedule visit
function scheduleVisit(factoryId) {
    console.log('📅 Scheduling visit for factory:', factoryId);
    showToast('جاري فتح نموذج حجز الزيارة الميدانية...', 'info');
}

// Submit factory form
function submitFactoryForm(event) {
    event.preventDefault();
    console.log('📝 Submitting factory form');
    
    const factoryData = {
        factoryName: document.getElementById('factoryName')?.value || '',
        companyName: document.getElementById('companyName')?.value || '',
        email: document.getElementById('factoryEmail')?.value || '',
        phone: document.getElementById('factoryPhone')?.value || '',
        industryType: document.getElementById('industryType')?.value || '',
        location: document.getElementById('factoryLocation')?.value || '',
        establishedYear: document.getElementById('establishedYear')?.value || '',
        employeeCount: document.getElementById('employeeCount')?.value || '',
        productDescription: document.getElementById('productDescription')?.value || '',
        address: document.getElementById('factoryAddress')?.value || '',
        certifications: document.getElementById('certifications')?.value || '',
        productionCapacity: document.getElementById('productionCapacity')?.value || '',
        notes: document.getElementById('factoryNotes')?.value || ''
    };
    
    // Validate required fields
    const requiredFields = ['factoryName', 'companyName', 'email', 'phone', 'industryType'];
    const missingFields = requiredFields.filter(field => !factoryData[field]);
    
    if (missingFields.length > 0) {
        showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(factoryData.email)) {
        showToast('يرجى إدخال بريد إلكتروني صحيح', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري الحفظ...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        console.log('💾 Saving factory data:', factoryData);
        
        // Add factory to table (simulation)
        addFactoryToTable(factoryData);
        
        // Close modal and reset form
        closeModal('factoryModal');
        
        // Show success message
        showToast('تم إضافة المصنع بنجاح!');
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
    }, 2000);
}

// Submit rating form
function submitRating(event) {
    event.preventDefault();
    console.log('⭐ Submitting rating');
    
    const selectedRating = document.getElementById('selectedRating')?.value;
    const productQuality = document.getElementById('productQuality')?.value;
    const deliveryCommitment = document.getElementById('deliveryCommitment')?.value;
    const communication = document.getElementById('communication')?.value;
    const pricing = document.getElementById('pricing')?.value;
    const comment = document.getElementById('ratingComment')?.value;
    
    if (!selectedRating) {
        showToast('يرجى اختيار التقييم العام', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري الإرسال...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        console.log('⭐ Rating submitted:', {
            selectedRating,
            productQuality,
            deliveryCommitment,
            communication,
            pricing,
            comment
        });
        
        // Close modal
        closeModal('ratingModal');
        
        // Show success message
        showToast('تم إرسال التقييم بنجاح!');
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 1500);
}

// Export factories data
function exportFactoriesData() {
    console.log('📊 Exporting factories data');
    showToast('جاري تصدير البيانات...', 'info');
    setTimeout(() => {
        showToast('تم تصدير البيانات بنجاح!');
    }, 2000);
}

// Add factory to table (simulation)
function addFactoryToTable(factoryData) {
    const tbody = document.getElementById('factoriesTableBody');
    if (!tbody) return;
    
    const industryClass = getIndustryClass(factoryData.industryType);
    const industryText = getIndustryText(factoryData.industryType);
    
    const newRow = document.createElement('tr');
    newRow.dataset.industry = factoryData.industryType;
    newRow.dataset.rating = '5';
    
    newRow.innerHTML = `
        <td class="p-4">
            <div class="flex items-center">
                <img class="w-12 h-12 rounded-full ml-3" src="https://via.placeholder.com/50x50/2563eb/ffffff?text=${factoryData.factoryName.charAt(0)}" alt="شعار المصنع">
                <div>
                    <span class="font-semibold block">${factoryData.factoryName}</span>
                    <span class="text-sm text-gray-600">مدير عام</span>
                </div>
            </div>
        </td>
        <td class="p-4">
            <div>
                <span class="font-semibold block">${factoryData.companyName}</span>
                <span class="text-sm text-gray-600">${factoryData.productDescription.substring(0, 50)}...</span>
            </div>
        </td>
        <td class="p-4">
            <span class="category-badge ${industryClass}">${industryText}</span>
        </td>
        <td class="p-4">
            <div class="flex items-center">
                <div class="rating-stars">
                    <span class="text-yellow-500">★★★★★</span>
                </div>
                <span class="ml-2 font-semibold">جديد</span>
            </div>
        </td>
        <td class="p-4">
            <span class="font-semibold">0 طلب</span>
        </td>
        <td class="p-4">-</td>
        <td class="p-4">
            <div class="flex space-x-2">
                <button class="factory-action-btn text-blue-500 hover:text-blue-700 p-1" data-action="view" title="عرض التفاصيل">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="factory-action-btn text-green-500 hover:text-green-700 p-1" data-action="rate" title="تقييم المصنع">
                    <i class="fas fa-star"></i>
                </button>
                <button class="factory-action-btn text-purple-500 hover:text-purple-700 p-1" data-action="contact" title="تواصل">
                    <i class="fas fa-comment"></i>
                </button>
                <button class="factory-action-btn text-orange-500 hover:text-orange-700 p-1" data-action="visit" title="زيارة ميدانية">
                    <i class="fas fa-map-marked-alt"></i>
                </button>
            </div>
        </td>
    `;
    
    tbody.insertBefore(newRow, tbody.firstChild);
    
    // Re-initialize table actions for the new row
    initializeTableActions();
}

// Helper functions
function getIndustryClass(industryType) {
    const industryClasses = {
        'electronics': 'category-electronics',
        'textiles': 'category-textiles',
        'machinery': 'category-machinery',
        'food': 'category-food',
        'chemicals': 'category-chemicals',
        'automotive': 'category-automotive',
        'furniture': 'category-furniture',
        'plastics': 'category-plastics'
    };
    return industryClasses[industryType] || 'category-electronics';
}

function getIndustryText(industryType) {
    const industryTexts = {
        'electronics': 'إلكترونيات ومعدات',
        'textiles': 'المنسوجات والألبسة',
        'machinery': 'الآلات والمعدات الثقيلة',
        'food': 'الصناعات الغذائية',
        'chemicals': 'الصناعات الكيميائية',
        'automotive': 'صناعة السيارات',
        'furniture': 'الأثاث والديكور',
        'plastics': 'البلاستيك والمطاط'
    };
    return industryTexts[industryType] || 'صناعات أخرى';
}

// Show toast message
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full`;
    
    // Set color based on type
    if (type === 'success') {
        toast.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        toast.classList.add('bg-red-500', 'text-white');
    } else {
        toast.classList.add('bg-blue-500', 'text-white');
    }
    
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} ml-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Export functions for global use
window.viewFactory = viewFactory;
window.rateFactory = rateFactory;
window.contactFactory = contactFactory;
window.scheduleVisit = scheduleVisit;
window.removeFilter = removeFilter;
window.openAddFactoryModal = openAddFactoryModal;
window.closeModal = closeModal;
window.exportFactoriesData = exportFactoriesData;

// Add a global test function
window.testFactoryModal = function() {
    console.log('🧪 Testing factory modal functionality...');
    openAddFactoryModal();
}