// بيانات المستخدمين (يمكن استبدالها بطلب AJAX لخادم حقيقي)
let users = [
    {
        id: 1,
        name: "أحمد محمد",
        nationalId: "987654321",
        phone: "0599123456",
        email: "ahmed@armin.com",
        password: "ahmed123",
        job: "customs_agent",
        rating: 4.5
    },
    {
        id: 2,
        name: "سارة أحمد",
        nationalId: "123456789",
        phone: "0599876543",
        email: "sara@armin.com",
        password: "sara456",
        job: "accountant",
        rating: 5
    },
    {
        id: 3,
        name: "محمود علي",
        nationalId: "456789123",
        phone: "0599456789",
        email: "mahmoud@armin.com",
        password: "mahmoud789",
        job: "customs_agent",
        rating: 4
    },
    {
        id: 4,
        name: "هدى خالد",
        nationalId: "789123456",
        phone: "0599789123",
        email: "huda@armin.com",
        password: "huda012",
        job: "accountant",
        rating: 3.5
    },
    {
        id: 5,
        name: "خالد سعيد",
        nationalId: "321654987",
        phone: "0599321654",
        email: "khaled@armin.com",
        password: "khaled345",
        job: "customs_agent",
        rating: 4
    },
    {
        id: 6,
        name: "نورا محمد",
        nationalId: "654987321",
        phone: "0599654987",
        email: "nora@armin.com",
        password: "nora678",
        job: "accountant",
        rating: 4.5
    }
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

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function () {
    renderUsers();
    renderPagination();

    // تبديل الشريط الجانبي
    document.querySelectorAll('.sidebar-toggler').forEach(toggler => {
        toggler.addEventListener('click', function () {
            document.getElementById('sidebar').classList.toggle('show');
        });
    });
});

// عرض المستخدمين في الجدول
function renderUsers() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const usersToShow = users.slice(startIndex, endIndex);

    usersTableBody.innerHTML = '';

    usersToShow.forEach(user => {
        const row = document.createElement('tr');

        let starsHtml = `<span class="badge bg-info">${user.rating} / 10</span>`;
        rating: parseFloat(document.getElementById('rating').value)


        // إضافة خلية كلمة المرور المشفرة
        const encryptedPassword = '*'.repeat(8); // عرض 8 نجوم بدلاً من كلمة المرور

        row.innerHTML = `
          <td>${user.id}</td>
          <td>
            <div class="d-flex align-items-center">
              <div >${user.name.split(' ').map(n => n[0]).join('')}</div>
              <span>${user.name}</span>
            </div>
          </td>
          <td>${user.nationalId}</td>
          <td>${user.phone}</td>
          <td>${user.email}</td>
          <td class="password-field">${encryptedPassword}</td>
          <td>
            <span class="badge ${user.job === 'accountant' ? 'bg-success' : 'bg-primary'}">
              ${user.job === 'accountant' ? 'محاسب' : 'مخلص جمركي'}
            </span>
          </td>
          <td>
            <div class="rating-stars">
              ${starsHtml}
            </div>
          </td>
          <td>
            <button class="btn action-btn btn-edit edit-client btn-outline-primary" data-id="${user.id}" title="تعديل">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn action-btn btn-delete delete-client btn-outline-primary" data-id="${user.id}" title="حذف">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        `;



        usersTableBody.appendChild(row);
    });

    // إضافة معالجات الأحداث للأزرار الجديدة
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const userId = parseInt(this.getAttribute('data-id'));
            editUser(userId);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const userId = parseInt(this.getAttribute('data-id'));
            deleteUser(userId);
        });
    });
}

// عرض الترقيم الصفحي
function renderPagination() {
    pagination.innerHTML = '';

    // زر السابق
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `
        <a class="page-link" href="#" aria-label="السابق">
          <span aria-hidden="true">&laquo;</span>
        </a>
      `;
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
    nextLi.innerHTML = `
        <a class="page-link" href="#" aria-label="التالي">
          <span aria-hidden="true">&raquo;</span>
        </a>
      `;
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

// فتح نموذج إضافة مستخدم
document.querySelector('.add-user-btn').addEventListener('click', function () {
    modalTitle.textContent = 'إضافة مستخدم جديد';
    userForm.reset();
    document.getElementById('userId').value = '';
    userModal.show();
});

// تعديل مستخدم
function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        modalTitle.textContent = 'تعديل المستخدم';
        document.getElementById('userId').value = user.id;
        document.getElementById('fullName').value = user.name;
        document.getElementById('nationalId').value = user.nationalId;
        document.getElementById('phone').value = user.phone;
        document.getElementById('email').value = user.email;
        document.getElementById('password').value = user.password;
        document.getElementById('jobTitle').value = user.job;
        document.getElementById('rating').value = user.rating;

        userModal.show();
    }
}

// حذف مستخدم
function deleteUser(userId) {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
        users = users.filter(user => user.id !== userId);
        totalPages = Math.ceil(users.length / itemsPerPage);

        // التأكد من أن الصفحة الحالية ضمن الحدود الجديدة
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        renderUsers();
        renderPagination();
        alert('تم حذف المستخدم بنجاح');
    }
}

// حفظ المستخدم (إضافة/تعديل)
saveUserBtn.addEventListener('click', function () {
    const userId = document.getElementById('userId').value;
    const userData = {
        name: document.getElementById('fullName').value,
        nationalId: document.getElementById('nationalId').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        job: document.getElementById('jobTitle').value,
        rating: parseFloat(document.getElementById('rating').value)
    };

    if (userId) {
        // تعديل مستخدم موجود
        const index = users.findIndex(u => u.id === parseInt(userId));
        if (index !== -1) {
            users[index] = { ...users[index], ...userData };
        }
    } else {
        // إضافة مستخدم جديد
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        users.push({ id: newId, ...userData });
        totalPages = Math.ceil(users.length / itemsPerPage);
    }

    userModal.hide();
    renderUsers();
    renderPagination();
});