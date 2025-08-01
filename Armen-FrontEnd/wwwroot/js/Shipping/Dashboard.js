// Initialize AOS
AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
});

// Tab switching functionality
function switchTab(evt, tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }

    // Show the selected tab content and mark button as active
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Start coordination function
function startCoordination(orderId) {
    if (confirm(`?? ???? ??? ??????? ????? ${orderId}?`)) {
        alert(`?? ??? ??????? ????? ${orderId}. ???? ???? ??? ????? "??? ???????"`);
        window.location.href = `/Shipping/TaskDetails?order=${orderId}`;
    }
}

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

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Shipping Dashboard loaded successfully');
    // Simulate real-time updates
    setInterval(function() {
        // Update timestamps or add new tasks simulation
        console.log('Checking for shipping updates...');
    }, 60000); // Check every minute
});
