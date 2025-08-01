// Initialize AOS
AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
});

// Update current time
function updateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('current-time').textContent = now.toLocaleDateString('ar-SA', options);
}
updateTime();
setInterval(updateTime, 60000);

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

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        // Hide all tab contents
        tabContents.forEach(content => content.classList.add('hidden'));
        // Show selected tab content
        const targetTab = button.getAttribute('data-tab');
        document.getElementById(targetTab).classList.remove('hidden');
    });
});

// Task functions
function receiveTask(taskId) {
    showLoading();
    setTimeout(() => {
        hideLoading();
        showSuccessToast();
        // Remove task from new tasks table
        const row = event.target.closest('tr');
        row.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            row.remove();
            updateTaskCounts();
        }, 500);
    }, 2000);
}

function openTask(taskId) {
    window.location.href = `task-details.html?id=${taskId}`;
}

function viewCompletedTask(taskId) {
    window.location.href = `task-details.html?id=${taskId}&view=completed`;
}

function viewAssignedTask(taskId) {
    window.location.href = `task-details.html?id=${taskId}&view=assigned`;
}

// إظهار نموذج تعيين المهمة
function showAssignTaskModal() {
    document.getElementById('assignTaskModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // تعيين الحد الأدنى لتاريخ الاستحقاق (اليوم)
    const now = new Date();
    const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    document.getElementById('dueDate').min = today;
}

// إخفاء نموذج تعيين المهمة
function hideAssignTaskModal() {
    document.getElementById('assignTaskModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
    document.getElementById('assignTaskForm').reset();
}

// إرسال تعيين المهمة
function submitAssignTask(event) {
    event.preventDefault();

    const taskData = {
        type: document.getElementById('taskType').value,
        priority: document.getElementById('taskPriority').value,
        employee: document.getElementById('assignedEmployee').value,
        dueDate: document.getElementById('dueDate').value,
        referenceOrder: document.getElementById('referenceOrder').value,
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        notes: document.getElementById('taskNotes').value,
        assignedBy: 'أحمد محمد',
        assignedDate: new Date().toISOString()
    };

    showLoading();

    setTimeout(() => {
        hideLoading();
        hideAssignTaskModal();

        // إضافة المهمة إلى جدول المهام المعينة
        addTaskToAssignedTable(taskData);

        // إظهار رسالة النجاح
        showTaskAssignedToast();

        // تحديث العداد
        updateAssignedTasksCounter();

    }, 2000);
}

// إضافة المهمة إلى جدول المهام المعينة
function addTaskToAssignedTable(taskData) {
    const tbody = document.getElementById('assigned-tasks-body');
    const newTaskId = `AT-2025-${String(Date.now()).slice(-3)}`;
    const employeeNames = {
        'sarah-ahmed': 'سارة أحمد',
        'mohamed-khalid': 'محمد خالد',
        'fatima-ali': 'فاطمة علي',
        'ahmed-hassan': 'أحمد حسن',
        'nora-salem': 'نورا سالم',
        'omar-abdullah': 'عمر عبدالله'
    };

    const taskTypes = {
        'shipping-follow': 'متابعة شحنة',
        'customs-clearance': 'تخليص جمركي',
        'customer-contact': 'تواصل مع العميل',
        'documentation': 'إعداد الوثائق',
        'inspection': 'فحص البضائع',
        'delivery': 'التسليم'
    };

    const row = document.createElement('tr');
    row.innerHTML = `
                <td class="p-4 font-semibold">${newTaskId}</td>
                <td class="p-4">${employeeNames[taskData.employee]}</td>
                <td class="p-4">${taskTypes[taskData.type]}</td>
                <td class="p-4">${new Date().toLocaleString('ar-SA')}</td>
                <td class="p-4">
                    <span class="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">قيد التنفيذ</span>
                </td>
                <td class="p-4">
                    <button class="action-btn btn-open" onclick="viewAssignedTask('${newTaskId}')">
                        <i class="fas fa-eye ml-2"></i>
                        متابعة
                    </button>
                </td>
            `;

    tbody.insertBefore(row, tbody.firstChild);
}

// إظهار رسالة نجاح تعيين المهمة
function showTaskAssignedToast() {
    const successToast = document.getElementById('successToast');
    const message = successToast.querySelector('span');
    message.textContent = 'تم تعيين المهمة للموظف بنجاح!';
    successToast.classList.remove('translate-x-full');
    setTimeout(() => {
        successToast.classList.add('translate-x-full');
        message.textContent = 'تم استلام المهمة بنجاح!'; // العودة للرسالة الأصلية
    }, 3000);
}

// تحديث عداد المهام المعينة
function updateAssignedTasksCounter() {
    const assignedBadge = document.querySelector('.tab-button[data-tab="assigned-tasks"] .notification-badge');
    const currentCount = parseInt(assignedBadge.textContent);
    assignedBadge.textContent = currentCount + 1;
}

function showLoading() {
    document.getElementById('loadingModal').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingModal').classList.add('hidden');
}

function showSuccessToast() {
    const toast = document.getElementById('successToast');
    toast.classList.remove('translate-x-full');
    setTimeout(() => {
        toast.classList.add('translate-x-full');
    }, 3000);
}

function updateTaskCounts() {
    // Update counter numbers (simulated)
    const newTasksCounter = document.querySelector('.counter[data-target="7"]');
    const currentCount = parseInt(newTasksCounter.textContent);
    if (currentCount > 0) {
        newTasksCounter.textContent = currentCount - 1;
        newTasksCounter.setAttribute('data-target', currentCount - 1);
    }

    const myTasksCounter = document.querySelector('.counter[data-target="12"]');
    const myCurrentCount = parseInt(myTasksCounter.textContent);
    myTasksCounter.textContent = myCurrentCount + 1;
    myTasksCounter.setAttribute('data-target', myCurrentCount + 1);

    // Update notification badges
    const badges = document.querySelectorAll('.notification-badge');
    badges.forEach(badge => {
        if (badge.textContent === '7') {
            badge.textContent = '6';
        } else if (badge.textContent === '12') {
            badge.textContent = '13';
        }
    });
}

// Add fadeOut animation
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