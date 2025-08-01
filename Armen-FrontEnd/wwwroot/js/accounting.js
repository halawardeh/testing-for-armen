// Accounting Layout JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Handle sidebar toggle
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('hidden');
            mainContent.classList.toggle('expanded');
            
            // Change toggle icon
            const toggleIcon = sidebarToggleBtn.querySelector('i');
            if (sidebar.classList.contains('hidden')) {
                toggleIcon.classList.remove('fa-times');
                toggleIcon.classList.add('fa-bars');
            } else {
                toggleIcon.classList.remove('fa-bars');
                toggleIcon.classList.add('fa-times');
            }
        });
    }
    
    // Handle sidebar menu items active state
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
    
    // Automatically set active sidebar item based on current URL
    const currentPath = window.location.pathname;
    
    sidebarItems.forEach(item => {
        const itemUrl = item.getAttribute('href');
        if (itemUrl && currentPath.includes(itemUrl)) {
            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to current item
            item.classList.add('active');
        }
    });
    
    // Handle responsive behavior
    function handleResponsive() {
        if (window.innerWidth < 992) {
            sidebar.classList.add('hidden');
            mainContent.classList.add('expanded');
        } else {
            sidebar.classList.remove('hidden');
            mainContent.classList.remove('expanded');
        }
    }
    
    // Initial check
    handleResponsive();
    
    // Listen for window resize
    window.addEventListener('resize', handleResponsive);
});