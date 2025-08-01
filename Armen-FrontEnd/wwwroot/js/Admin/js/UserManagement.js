// بيانات المستخدمين مع التقييمات الأسبوعية
let users = [
    {
        id: 1,
        name: "أحمد محمد",
        nationalId: "987654321",
        phone: "0599123456",
        email: "ahmed@armin.com",
        password: "ahmed123",
        job: "customs_agent",
        ratings: [
            { week: 1, date: "2023-10-01", rating: 8 },
            { week: 2, date: "2023-10-08", rating: 7 },
            { week: 3, date: "2023-10-15", rating: 9 }
        ]
    },
    {
        id: 2,
        name: "سارة أحمد",
        nationalId: "123456789",
        phone: "0599876543",
        email: "sara@armin.com",
        password: "sara456",
        job: "accountant",
        ratings: [
            { week: 1, date: "2023-10-01", rating: 6 },
            { week: 2, date: "2023-10-08", rating: 8 },
            { week: 3, date: "2023-10-15", rating: 7 }
        ]
    },
    // ... باقي المستخدمين بنفس الهيكل
];

// متغيرات الترقيم الصفحي
const itemsPerPage = 4;
let currentPage = 1;
let totalPages = Math.ceil(users.length / itemsPerPage);

// DOM Elements
const usersTableBody = document.getElementById('usersTableBody');
const pagination = document.getElementById('pagination');
const userModal = new bootstrap.Modal(document.getElementById('userModal'));
const saveUserBtn = document.getElementById('saveUserBtn');
const modalTitle = document.getElementById('modalTitle');
const userForm = document.getElementById('userForm');
const ratingsHistoryModal = new bootstrap.Modal(document.getElementById('ratingsHistoryModal'));

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function () {
    renderUsers();
    renderPagination();
    setupEventListeners();
});

// ... (بقية الكود كما هو)

// عرض المستخدمين في الجدول
function renderUsers() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const usersToShow = users.slice(startIndex, endIndex);

    usersTableBody.innerHTML = '';

    usersToShow.forEach(user => {
        const lastRating = user.ratings.length > 0 ? user.ratings[user.ratings.length - 1].rating : 'N/A';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.nationalId}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>${'*'.repeat(8)}</td>
            <td>${user.job === 'accountant' ? 'محاسب' : 'مخلص جمركي'}</td>
            <td>
                <span class="badge bg-${getRatingColor(lastRating)}">
                    ${lastRating}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-info export-ratings" data-id="${user.id}">
                    <i class="fas fa-file-excel"></i> تصدير
                </button>
            </td>
            <td>
                <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-warning edit-user" data-id="${user.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger delete-user" data-id="${user.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        usersTableBody.appendChild(row);
    });
}

// تصدير تقييمات الموظف إلى Excel
function exportToExcel(userId) {
    const user = users.find(u => u.id == userId);
    if (!user) return;

    // إنشاء بيانات Excel
    let csvContent = "data:text/csv;charset=utf-8,";

    // عنوان الملف
    csvContent += `سجل التقييمات الأسبوعية للموظف ${user.name}\n\n`;

    // العناوين
    csvContent += "الأسبوع,التاريخ,التقييم\n";

    // البيانات
    user.ratings.forEach(rating => {
        csvContent += `${rating.week},${rating.date},${rating.rating}\n`;
    });

    // إنشاء الرابط وتنزيل الملف
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `تقييمات_${user.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// إعداد معالجات الأحداث
function setupEventListeners() {
    // ... (بقية المعالجات كما هي)

    document.addEventListener('click', function (e) {
        // ... (بقية الأحداث كما هي)

        // تصدير التقييمات
        if (e.target.closest('.export-ratings')) {
            const userId = parseInt(e.target.closest('.export-ratings').getAttribute('data-id'));
            exportToExcel(userId);
        }
    });
}

// ... (بقية الدوال كما هي)
// حساب متوسط التقييم
function calculateAverageRating(ratings) {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((total, r) => total + r.rating, 0);
    return sum / ratings.length;
}

// الحصول على لون حسب التقييم
function getRatingColor(rating) {
    if (rating === 'N/A') return 'secondary';
    if (rating >= 8) return 'success';
    if (rating >= 5) return 'warning';
    return 'danger';
}

// عرض الترقيم الصفحي
function renderPagination() {
    pagination.innerHTML = '';

    // زر السابق
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#" aria-label="السابق">&laquo;</a>`;
    prevLi.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderUsers();
            renderPagination();
        }
    });
    pagination.appendChild(prevLi);

    // أرقام الصفحات
    for (let i = 1; i <= totalPages; i++) {
        const pageLi = document.createElement('li');
        pageLi.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageLi.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageLi.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            renderUsers();
            renderPagination();
        });
        pagination.appendChild(pageLi);
    }

    // زر التالي
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#" aria-label="التالي">&raquo;</a>`;
    nextLi.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderUsers();
            renderPagination();
        }
    });
    pagination.appendChild(nextLi);
}

// إعداد معالجات الأحداث
function setupEventListeners() {
    // إضافة مستخدم جديد
    document.querySelector('.add-user-btn').addEventListener('click', function () {
        modalTitle.textContent = 'إضافة موظف جديد';
        userForm.reset();
        document.getElementById('userId').value = '';
        userModal.show();
    });

    // حفظ المستخدم (إضافة/تعديل)
    saveUserBtn.addEventListener('click', saveUser);

    // معالجات الأحداث للعناصر الديناميكية
    document.addEventListener('click', function (e) {
        // التعديل
        if (e.target.closest('.edit-user')) {
            const userId = parseInt(e.target.closest('.edit-user').getAttribute('data-id'));
            editUser(userId);
        }

        // الحذف
        if (e.target.closest('.delete-user')) {
            const userId = parseInt(e.target.closest('.delete-user').getAttribute('data-id'));
            deleteUser(userId);
        }

        // عرض التقييمات
        if (e.target.closest('.view-ratings')) {
            const userId = parseInt(e.target.closest('.view-ratings').getAttribute('data-id'));
            showRatingsHistory(userId);
        }
    });
}

// تعديل مستخدم
function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        modalTitle.textContent = 'تعديل الموظف وإضافة تقييم جديد';
        document.getElementById('userId').value = user.id;
        document.getElementById('fullName').value = user.name;
        document.getElementById('nationalId').value = user.nationalId;
        document.getElementById('phone').value = user.phone;
        document.getElementById('email').value = user.email;
        document.getElementById('password').value = user.password;
        document.getElementById('jobTitle').value = user.job;
        document.getElementById('rating').value = '';
        userModal.show();
    }
}

// حذف مستخدم
function deleteUser(userId) {
    if (confirm('هل أنت متأكد من حذف هذا الموظف؟ سيتم حذف جميع بياناته بما في ذلك سجل التقييمات.')) {
        users = users.filter(user => user.id !== userId);
        totalPages = Math.ceil(users.length / itemsPerPage);

        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        renderUsers();
        renderPagination();
    }
}

// حفظ المستخدم (إضافة/تعديل)
function saveUser() {
    const userId = document.getElementById('userId').value;
    const rating = parseFloat(document.getElementById('rating').value);
    const currentDate = new Date().toISOString().split('T')[0];
    const currentWeek = Math.ceil(new Date().getDate() / 7);

    if (userId) {
        // تعديل مستخدم موجود وإضافة تقييم جديد
        const user = users.find(u => u.id == userId);
        if (user) {
            user.name = document.getElementById('fullName').value;
            user.nationalId = document.getElementById('nationalId').value;
            user.phone = document.getElementById('phone').value;
            user.email = document.getElementById('email').value;
            user.password = document.getElementById('password').value;
            user.job = document.getElementById('jobTitle').value;

            // إضافة التقييم الجديد
            user.ratings.push({
                week: currentWeek,
                date: currentDate,
                rating: rating
            });
        }
    } else {
        // إضافة مستخدم جديد مع أول تقييم
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        users.push({
            id: newId,
            name: document.getElementById('fullName').value,
            nationalId: document.getElementById('nationalId').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            job: document.getElementById('jobTitle').value,
            ratings: [{
                week: currentWeek,
                date: currentDate,
                rating: rating
            }]
        });
        totalPages = Math.ceil(users.length / itemsPerPage);
    }

    userModal.hide();
    renderUsers();
    renderPagination();
}

// عرض سجل التقييمات
function showRatingsHistory(userId) {
    const user = users.find(u => u.id == userId);
    if (!user) return;

    // ملء جدول التقييمات
    const ratingsBody = document.getElementById('ratingsHistoryBody');
    ratingsBody.innerHTML = '';

    user.ratings.forEach(r => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>الأسبوع ${r.week}</td>
            <td>${r.date}</td>
            <td>
                <span class="badge bg-${getRatingColor(r.rating)}">${r.rating}</span>
            </td>
        `;
        ratingsBody.appendChild(row);
    });

    // إنشاء الرسم البياني
    createRatingsChart(user.ratings);

    // عرض المودال
    ratingsHistoryModal.show();
}

// إنشاء رسم بياني للتقييمات
function createRatingsChart(ratings) {
    const ctx = document.getElementById('ratingsChart').getContext('2d');

    // إذا كان هناك رسم بياني موجود، قم بتدميره أولاً
    if (window.ratingsChart) {
        window.ratingsChart.destroy();
    }

    window.ratingsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ratings.map(r => `الأسبوع ${r.week}`),
            datasets: [{
                label: 'تقييم الأداء',
                data: ratings.map(r => r.rating),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 0,
                    max: 10,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    rtl: true
                },
                tooltip: {
                    rtl: true,
                    callbacks: {
                        label: function (context) {
                            return `التقييم: ${context.raw}`;
                        }
                    }
                }
            }
        }
    });
}