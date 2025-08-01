// Initialize AOS
AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
});

// Global variables
let currentEditingId = null;
let currentDeleteId = null;
let currentViewId = null;

// Sample customer data (in real app, this would come from API)
const customersData = {
    1: { name: 'أحمد العلي', company: 'شركة النخبة للتجارة', email: 'ahmed@elite-trade.com', phone: '+962 79 123 4567', city: 'عمان', status: 'active', date: '2024-03-15', address: 'شارع الملكة رانيا، عمان', notes: 'عميل مميز' },
    2: { name: 'فاطمة خالد', company: 'حلول مبتكرة', email: 'fatima@innovative.com', phone: '+962 77 987 6543', city: 'إربد', status: 'active', date: '2024-02-20', address: 'وسط البلد، إربد', notes: 'عميل جديد' },
    3: { name: 'يوسف مراد', company: 'صناعات الغد', email: 'youssef@future-ind.com', phone: '+962 78 555 1234', city: 'الزرقاء', status: 'pending', date: '2025-01-18', address: 'المنطقة الصناعية، الزرقاء', notes: 'في انتظار التفعيل' },
    4: { name: 'سارة أحمد', company: 'مؤسسة الرائد', email: 'sara@leader.com', phone: '+962 76 444 5678', city: 'عمان', status: 'inactive', date: '2024-01-10', address: 'الجبيهة، عمان', notes: 'عميل غير نشط' },
    5: { name: 'محمد الزعبي', company: 'شركة البحر الأحمر', email: 'mohammed@redsea.com', phone: '+962 75 333 9876', city: 'العقبة', status: 'active', date: '2024-06-12', address: 'المنطقة التجارية، العقبة', notes: 'عميل ممتاز' }
};

// Animated Counters
const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / 50;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    observer.observe(counter);
});

// Filter functions
function filterCustomers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const cityFilter = document.getElementById('cityFilter').value;
    const rows = document.querySelectorAll('#customersTableBody tr');

    let activeFilters = [];

    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        const company = row.cells[1].textContent.toLowerCase();
        const email = row.cells[2].textContent.toLowerCase();
        const status = row.dataset.status;
        const city = row.dataset.city;

        const matchesSearch = !searchTerm ||
            name.includes(searchTerm) ||
            company.includes(searchTerm) ||
            email.includes(searchTerm);

        const matchesStatus = !statusFilter || status === statusFilter;
        const matchesCity = !cityFilter || city === cityFilter;

        if (matchesSearch && matchesStatus && matchesCity) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    // Update active filters display
    if (searchTerm) activeFilters.push(`البحث: ${searchTerm}`);
    if (statusFilter) activeFilters.push(`الحالة: ${getStatusText(statusFilter)}`);
    if (cityFilter) activeFilters.push(`المدينة: ${cityFilter}`);

    updateActiveFiltersDisplay(activeFilters);
}

function getStatusText(status) {
    switch (status) {
        case 'active': return 'نشط';
        case 'inactive': return 'غير نشط';
        case 'pending': return 'في الانتظار';
        default: return status;
    }
}

function updateActiveFiltersDisplay(filters) {
    const activeFiltersDiv = document.getElementById('activeFilters');
    const filterTagsDiv = document.getElementById('filterTags');

    if (filters.length > 0) {
        activeFiltersDiv.classList.remove('hidden');
        filterTagsDiv.innerHTML = filters.map(filter =>
            `<span class="filter-tag">
                        ${filter}
                        <i class="fas fa-times remove-tag" onclick="removeFilter('${filter}')"></i>
                    </span>`
        ).join('');
    } else {
        activeFiltersDiv.classList.add('hidden');
    }
}

function removeFilter(filter) {
    if (filter.startsWith('البحث:')) {
        document.getElementById('searchInput').value = '';
    } else if (filter.startsWith('الحالة:')) {
        document.getElementById('statusFilter').value = '';
    } else if (filter.startsWith('المدينة:')) {
        document.getElementById('cityFilter').value = '';
    }
    filterCustomers();
}

function clearAllFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('cityFilter').value = '';
    filterCustomers();
}

// Modal functions
function openAddCustomerModal() {
    currentEditingId = null;
    document.getElementById('modalTitle').textContent = 'إضافة عميل جديد';
    document.getElementById('saveButtonText').textContent = 'حفظ العميل';
    document.getElementById('customerForm').reset();
    document.getElementById('customerModal').classList.remove('hidden');
}

function closeCustomerModal() {
    document.getElementById('customerModal').classList.add('hidden');
    currentEditingId = null;
}

function editCustomer(id) {
    currentEditingId = id;
    const customer = customersData[id];

    document.getElementById('modalTitle').textContent = 'تعديل بيانات العميل';
    document.getElementById('saveButtonText').textContent = 'تحديث البيانات';

    document.getElementById('customerName').value = customer.name;
    document.getElementById('companyName').value = customer.company;
    document.getElementById('customerEmail').value = customer.email;
    document.getElementById('customerPhone').value = customer.phone;
    document.getElementById('customerCity').value = customer.city;
    document.getElementById('customerStatus').value = customer.status;
    document.getElementById('customerAddress').value = customer.address || '';
    document.getElementById('customerNotes').value = customer.notes || '';

    document.getElementById('customerModal').classList.remove('hidden');
}

function viewCustomer(id) {
    currentViewId = id;
    const customer = customersData[id];

    document.getElementById('viewCustomerImage').src = `https://i.pravatar.cc/100?img=${id}`;
    document.getElementById('viewCustomerName').textContent = customer.name;
    document.getElementById('viewCustomerCompany').textContent = customer.company;
    document.getElementById('viewCustomerEmail').textContent = customer.email;
    document.getElementById('viewCustomerPhone').textContent = customer.phone;
    document.getElementById('viewCustomerCity').textContent = customer.city;
    document.getElementById('viewCustomerDate').textContent = customer.date;

    const statusSpan = document.getElementById('viewCustomerStatus');
    statusSpan.className = `status-${customer.status}`;
    statusSpan.textContent = getStatusText(customer.status);

    document.getElementById('viewCustomerModal').classList.remove('hidden');
}

function closeViewCustomerModal() {
    document.getElementById('viewCustomerModal').classList.add('hidden');
    currentViewId = null;
}

function editCustomerFromView() {
    closeViewCustomerModal();
    editCustomer(currentViewId);
}

function deleteCustomer(id) {
    currentDeleteId = id;
    document.getElementById('deleteModal').classList.remove('hidden');
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.add('hidden');
    currentDeleteId = null;
}

function confirmDelete() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        closeDeleteModal();

        // Remove from data
        delete customersData[currentDeleteId];

        // Remove from table
        const rows = document.querySelectorAll('#customersTableBody tr');
        rows.forEach(row => {
            const actionButtons = row.querySelector('[onclick*="' + currentDeleteId + '"]');
            if (actionButtons) {
                row.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => row.remove(), 300);
            }
        });

        showToast('تم حذف العميل بنجاح');
        currentDeleteId = null;
    }, 1500);
}

function saveCustomer(event) {
    event.preventDefault();

    showLoading();

    setTimeout(() => {
        hideLoading();
        closeCustomerModal();

        if (currentEditingId) {
            showToast('تم تحديث بيانات العميل بنجاح');
        } else {
            showToast('تم إضافة العميل الجديد بنجاح');
        }

        // In real app, would send data to server
        // For demo, just show success message
    }, 2000);
}

function exportCustomers() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        showToast('تم تصدير بيانات العملاء بنجاح');
        // In real app, would generate and download file
    }, 1500);
}

function changePage(direction) {
    // Pagination functionality would go here
    console.log('Changing page:', direction);
}

// Utility functions
function showLoading() {
    document.getElementById('loadingModal').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingModal').classList.add('hidden');
}

function showToast(message) {
    const toast = document.getElementById('successToast');
    document.getElementById('toastMessage').textContent = message;
    toast.classList.remove('translate-x-full');
    setTimeout(() => {
        toast.classList.add('translate-x-full');
    }, 3000);
}

// Add CSS for fade out animation
const style = document.createElement('style');
style.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(-100%); }
            }
        `;
document.head.appendChild(style);

// Sidebar toggle functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleButton = document.getElementById('sidebarToggle');
    const toggleIcon = toggleButton.querySelector('i');

    sidebar.classList.toggle('hidden');

    if (sidebar.classList.contains('hidden')) {
        mainContent.classList.remove('mr-64');
        mainContent.classList.add('mr-0');
        toggleIcon.className = 'fas fa-bars';
    } else {
        mainContent.classList.remove('mr-0');
        mainContent.classList.add('mr-64');
        toggleIcon.className = 'fas fa-times';
    }
}