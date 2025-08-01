document.addEventListener('DOMContentLoaded', function() {
    // تسريع إظهار القسم النشط مباشرة
    const sections = document.querySelectorAll('.profile-section');
    sections.forEach(section => section.classList.add('hidden'));

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    // Set initial active tab
    const initialActiveTab = document.querySelector('.tab-button.active');
    if (initialActiveTab) {
        const initialTabId = initialActiveTab.getAttribute('data-tab');
        const initialSection = document.getElementById(initialTabId);
        if (initialSection) {
            initialSection.classList.remove('hidden');
            initialSection.classList.add('active');
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            sections.forEach(section => {
                if (section.id !== tabId) {
                    section.classList.remove('active');
                    setTimeout(() => {
                        section.classList.add('hidden');
                    }, 100);
                }
            });
            const activeSection = document.getElementById(tabId);
            if (activeSection) {
                activeSection.classList.remove('hidden');
                setTimeout(() => {
                    activeSection.classList.add('active');
                }, 10);
            }
        });
    });

    // Avatar upload functionality
    const avatarOverlay = document.querySelector('.avatar-overlay');
    if (avatarOverlay) {
        avatarOverlay.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        document.querySelector('.profile-avatar img').src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });
    }

    // تعطيل AOS مؤقتاً ثم تفعيله بعد رسم الصفحة
    setTimeout(function() {
        if (window.AOS) {
            AOS.init({
                once: true,
                duration: 600,
                easing: 'ease-in-out',
                startEvent: 'DOMContentLoaded',
            });
        }
    }, 50);

    // Initialize AOS
    AOS.init({
        once: true,
        duration: 800,
        easing: 'ease-in-out',
    });

    // Profile functions
    function editProfile() {
        const inputs = document.querySelectorAll('.form-input:not([disabled])');
        inputs.forEach(input => {
            input.style.background = 'white';
            input.style.borderColor = '#f97316';
        });
        alert('يمكنك الآن تحرير المعلومات القابلة للتعديل');
    }
    function saveChanges() {
        alert('تم حفظ التغييرات بنجاح!');
    }
    function changePassword() {
        alert('سيتم توجيهك لصفحة تغيير كلمة المرور');
    }
    function viewPendingTasks() {
        window.location.href = '/Shipping/Dashboard';
    }
    function trackShipments() {
        alert('سيتم توجيهك لنظام تتبع الشحنات');
    }
    function generateReport() {
        alert('جاري إنشاء تقرير الأداء الشهري...');
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
        console.log('Shipping Profile page loaded successfully');
    });
});
