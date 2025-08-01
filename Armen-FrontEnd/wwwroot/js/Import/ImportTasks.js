// Import Tasks Page JavaScript - Following Suppliers Design Pattern

// Global variables
let currentFilter = 'all';
let currentSearchTerm = '';
let tasksData = [];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('?? Tasks page initialized');
    
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 800,
            easing: 'ease-in-out',
        });
    }
    
    // Initialize counters
    initializeCounters();
    
    // Initialize filter functionality
    initializeFilters();
    
    // Initialize search functionality
    initializeSearch();
    
    // Load tasks data
    loadTasksData();
    
    console.log('? Tasks page setup complete');
});

// Initialize counter animations
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 50);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Initialize filter functionality
function initializeFilters() {
    const statusFilter = document.getElementById('statusFilter');
    const priorityFilter = document.getElementById('priorityFilter');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterTasks();
        });
    }
    
    if (priorityFilter) {
        priorityFilter.addEventListener('change', function() {
            filterTasks();
        });
    }
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearchTerm = this.value.toLowerCase().trim();
            filterTasks();
        });
    }
}

// Load tasks data
function loadTasksData() {
    // Simulate loading tasks data
    tasksData = [
        {
            id: 'ORD-2025-005',
            client: '???? ???????? ????????',
            employee: '???? ???? ????',
            status: 'review',
            priority: 'high',
            date: '2025-07-20',
            goodsType: '????? ?????????',
            weight: '2.5 ??',
            port: '????? ??????'
        },
        {
            id: 'ORD-2025-006',
            client: '???? ??????? ??????',
            employee: '???? ????',
            status: 'new',
            priority: 'medium',
            date: '2025-07-22',
            goodsType: '????? ????',
            weight: '500 ???',
            port: '???? ?????? ?????'
        },
        {
            id: 'ORD-2025-007',
            client: '???? ?????? ????????',
            employee: '???? ?????',
            status: 'in-progress',
            priority: 'high',
            date: '2025-07-18',
            goodsType: '???? ????',
            weight: '15 ??',
            port: '????? ??????'
        },
        {
            id: 'ORD-2025-004',
            client: '???? ?????? ??????',
            employee: '????? ???',
            status: 'completed',
            priority: 'low',
            date: '2025-07-15',
            goodsType: '???? ?????',
            weight: '8 ??',
            port: '????? ??????'
        },
        {
            id: 'ORD-2025-008',
            client: '???? ????????? ???????',
            employee: '??? ????',
            status: 'new',
            priority: 'medium',
            date: '2025-07-23',
            goodsType: '???????',
            weight: '3.2 ??',
            port: '????? ??????'
        }
    ];
    
    console.log('?? Tasks data loaded:', tasksData.length, 'tasks');
}

// Filter tasks based on search and filters
function filterTasks() {
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    const priorityFilter = document.getElementById('priorityFilter')?.value || '';
    const tableRows = document.querySelectorAll('#tasksTableBody tr');
    
    let visibleCount = 0;
    
    tableRows.forEach(row => {
        const status = row.getAttribute('data-status');
        const priority = row.getAttribute('data-priority');
        const rowText = row.textContent.toLowerCase();
        
        // Check if row matches all filters
        const matchesStatus = !statusFilter || status === statusFilter;
        const matchesPriority = !priorityFilter || priority === priorityFilter;
        const matchesSearch = !currentSearchTerm || rowText.includes(currentSearchTerm);
        
        if (matchesStatus && matchesPriority && matchesSearch) {
            row.style.display = '';
            row.style.animation = 'fadeIn 0.3s ease-in';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update active filters display
    updateActiveFilters(statusFilter, priorityFilter);
    
    // Update statistics
    updateFilteredStatistics(visibleCount);
    
    console.log('?? Filtered tasks:', visibleCount, 'visible');
}

// Update active filters display
function updateActiveFilters(statusFilter, priorityFilter) {
    const activeFiltersDiv = document.getElementById('activeFilters');
    const filterTagsDiv = document.getElementById('filterTags');
    
    if (!activeFiltersDiv || !filterTagsDiv) return;
    
    // Clear existing tags
    filterTagsDiv.innerHTML = '';
    
    const activeTags = [];
    
    // Add status filter tag
    if (statusFilter) {
        const statusText = getStatusText(statusFilter);
        activeTags.push(createFilterTag('??????: ' + statusText, () => {
            document.getElementById('statusFilter').value = '';
            filterTasks();
        }));
    }
    
    // Add priority filter tag
    if (priorityFilter) {
        const priorityText = getPriorityText(priorityFilter);
        activeTags.push(createFilterTag('????????: ' + priorityText, () => {
            document.getElementById('priorityFilter').value = '';
            filterTasks();
        }));
    }
    
    // Add search tag
    if (currentSearchTerm) {
        activeTags.push(createFilterTag('?????: ' + currentSearchTerm, () => {
            document.getElementById('searchInput').value = '';
            currentSearchTerm = '';
            filterTasks();
        }));
    }
    
    // Show/hide active filters section
    if (activeTags.length > 0) {
        activeTags.forEach(tag => filterTagsDiv.appendChild(tag));
        activeFiltersDiv.classList.remove('hidden');
    } else {
        activeFiltersDiv.classList.add('hidden');
    }
}

// Create filter tag element
function createFilterTag(text, removeCallback) {
    const tag = document.createElement('span');
    tag.className = 'filter-tag';
    tag.innerHTML = `
        ${text}
        <span class="remove-tag" onclick="this.parentElement.remove(); (${removeCallback})()">×</span>
    `;
    return tag;
}

// Get status text in Arabic
function getStatusText(status) {
    const statusMap = {
        'new': '?????',
        'in-progress': '??? ???????',
        'review': '??? ????????',
        'completed': '??????',
        'cancelled': '?????'
    };
    return statusMap[status] || status;
}

// Get priority text in Arabic
function getPriorityText(priority) {
    const priorityMap = {
        'high': '?????',
        'medium': '??????',
        'low': '??????'
    };
    return priorityMap[priority] || priority;
}

// Update filtered statistics
function updateFilteredStatistics(visibleCount) {
    // This would update the statistics cards based on filtered results
    console.log('?? Statistics updated for', visibleCount, 'visible tasks');
}

// View task details
function viewTask(taskId) {
    console.log('??? Viewing task:', taskId);
    
    // Add loading animation to the clicked button
    const button = event.target.closest('button');
    if (button) {
        const originalContent = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
        
        // Navigate after short delay
        setTimeout(() => {
            window.location.href = `/Import/TaskDetails?id=${taskId}`;
        }, 300);
    }
}

// Edit task
function editTask(taskId) {
    console.log('?? Editing task:', taskId);
    showSuccessMessage(`??? ????? ????? ?????? ${taskId}`);
    
    // Here you would open an edit modal or navigate to edit page
    // For now, we'll just show a message
}

// Add comment to task
function commentTask(taskId) {
    console.log('?? Adding comment to task:', taskId);
    
    // Show a simple prompt for demo purposes
    const comment = prompt('??? ?????? ??? ??????:');
    if (comment && comment.trim()) {
        showSuccessMessage(`?? ????? ??????? ?????? ${taskId}`);
        
        // Here you would save the comment to the backend
        console.log('Comment added:', comment);
    }
}

// Export tasks data
function exportTasks() {
    console.log('?? Exporting tasks data');
    showSuccessMessage('?? ????? ?????? ?????? ?????!');
    
    // Here you would implement actual export functionality
    // For demo, we'll just show success message
}

// Change page (pagination)
function changePage(direction) {
    console.log('?? Changing page:', direction > 0 ? 'next' : 'previous');
    
    // Here you would implement actual pagination
    showSuccessMessage('?? ????? ?????? ???????');
}

// Open add task modal (placeholder)
function openAddTaskModal() {
    console.log('? Opening add task modal');
    showSuccessMessage('??? ????? ????? ???? ?????');
    
    // Here you would open an actual modal
}

// Show success message
function showSuccessMessage(message) {
    let toast = document.getElementById('successToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'successToast';
        toast.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 z-50';
        toast.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-check-circle ml-2"></i>
                <span id="toastMessage">${message}</span>
            </div>
        `;
        document.body.appendChild(toast);
    } else {
        document.getElementById('toastMessage').textContent = message;
    }
    
    // Show toast
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        toast.classList.remove('show');
    }, 3000);
}

// Global functions for window access
window.viewTask = viewTask;
window.editTask = editTask;
window.commentTask = commentTask;
window.filterTasks = filterTasks;
window.exportTasks = exportTasks;
window.changePage = changePage;
window.openAddTaskModal = openAddTaskModal;

// Search functionality (for inline calls)
window.filterTasks = filterTasks;

console.log('?? Tasks page JavaScript loaded successfully');