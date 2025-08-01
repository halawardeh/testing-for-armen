// بيانات العملاء والطلبات
let clients = [
    {
        id: 1,
        name: "أحمد محمد",
        nationalId: "1234567890",
        phone: "0501234567",
        email: "ahmed@example.com",
        ordersCount: 2,
        status: "active",
        orders: [
            {
                orderId: 101,
                type: "استيراد بضائع",
                date: "2023-05-15",
                status: "completed",
                attachments: "invoice-import.pdf",
                details: "طلب استيراد أدوات كهربائية من الصين"
            },
            {
                orderId: 102,
                type: "تخليص جمركي",
                date: "2023-06-20",
                status: "pending",
                attachments: "customs-documents.zip",
                details: "تخليص جمركي لشحنة ملابس واردة من تركيا"
            }
        ]
    },
    {
        id: 2,
        name: "سارة عبدالله",
        nationalId: "0987654321",
        phone: "0559876543",
        email: "sara@example.com",
        ordersCount: 1,
        status: "active",
        orders: [
            {
                orderId: 201,
                type: "تصدير بضائع",
                date: "2023-07-10",
                status: "completed",
                attachments: "export-license.pdf",
                details: "تصدير منتجات غذائية إلى الإمارات"
            }
        ]
    }
];

// العناصر والمتغيرات
const clientsTable = document.getElementById('clientsTable');
const pagination = document.getElementById('pagination');
const clientModal = new bootstrap.Modal(document.getElementById('clientModal'));
const ordersModal = new bootstrap.Modal(document.getElementById('ordersModal'));
const saveClientBtn = document.getElementById('saveClientBtn');
const clientNameTitle = document.getElementById('clientNameTitle');
const ordersTable = document.getElementById('ordersTable');

let currentPage = 1;
const itemsPerPage = 5;
let totalPages = Math.ceil(clients.length / itemsPerPage);

// عرض العملاء
function renderClients() {
    clientsTable.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, clients.length);

    for (let i = startIndex; i < endIndex; i++) {
        const client = clients[i];
        const row = document.createElement('tr');

        row.innerHTML = `
                    <td class="d-flex align-items-center">${client.id}</td>
                    <td>
                      <div class="d-flex align-items-center">
                        <div  me-3">
                          <i ></i>
                        </div>
                        <span >${client.name}</span>
                      </div>
                    </td>
                    <td class="text-muted">${client.nationalId}</td>
                    <td>${client.phone}</td>
                    <td class="text-muted">${client.email}</td>
                    <td>
                      <span class="badge" style="background-color: var(--primary); color: white;">${client.ordersCount}</span>
                    </td>
                    
                    <td class="text-center">
                      <button class="btn action-btn btn-edit edit-client btn-outline-primary" data-id="${client.id}" title="تعديل">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="btn action-btn btn-view view-orders btn-outline-primary " data-id="${client.id}" title="عرض الطلبات">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button class="btn action-btn btn-delete delete-client btn-outline-primary" data-id="${client.id}" title="حذف">
                        <i class="fas fa-trash "></i>
                      </button>
                      
                    </td>
                `;

        clientsTable.appendChild(row);
    }

    // إضافة معالجات الأحداث للأزرار
    document.querySelectorAll('.edit-client').forEach(btn => {
        btn.addEventListener('click', function () {
            const clientId = parseInt(this.getAttribute('data-id'));
            editClient(clientId);
        });
    });

    document.querySelectorAll('.delete-client').forEach(btn => {
        btn.addEventListener('click', function () {
            const clientId = parseInt(this.getAttribute('data-id'));
            deleteClient(clientId);
        });
    });

    document.querySelectorAll('.view-orders').forEach(btn => {
        btn.addEventListener('click', function () {
            const clientId = parseInt(this.getAttribute('data-id'));
            viewClientOrders(clientId);
        });
    });
}

// عرض طلبات العميل
function viewClientOrders(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    clientNameTitle.textContent = client.name;
    ordersTable.innerHTML = '';

    // ترتيب الطلبات من الأحدث إلى الأقدم
    const sortedOrders = [...client.orders].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedOrders.forEach(order => {
        const row = document.createElement('tr');

        // تحديد فئة الحالة
        let statusClass = '';
        let statusText = '';
        switch (order.status) {
            case 'pending':
                statusClass = 'bg-warning text-dark';
                statusText = 'قيد التنفيذ';
                break;
            case 'completed':
                statusClass = 'bg-success text-white';
                statusText = 'مكتمل';
                break;
            case 'rejected':
                statusClass = 'bg-danger text-white';
                statusText = 'مرفوض';
                break;
        }

        // زر المرفقات إذا وجدت
        const attachmentsBtn = order.attachments ?
            `<button class="btn btn-sm btn-success" onclick="downloadFile('${order.attachments}')">
                        تحميل
                    </button>` :
            '<span class="text-muted">لا يوجد</span>';

        row.innerHTML = `
                    <td class="fw-bold" style="color: var(--primary);">#${order.orderId}</td>
                    <td>${order.type}</td>
                    <td class="text-muted">${order.date}</td>
                    <td>
                        <span class="badge ${statusClass}">
                            ${statusText}
                        </span>
                    </td>
                    <td>${attachmentsBtn}</td>
                    <td class="text-center">
                        <button class="btn btn-sm" style="background-color: var(--primary); color: white; border-color: var(--primary);" class="view-details">
                            عرض التفاصيل
                        </button>
                    </td>
                `;

        ordersTable.appendChild(row);
    });

    // إضافة معالجات الأحداث لأزرار عرض التفاصيل
    document.querySelectorAll('.view-details').forEach((btn, index) => {
        btn.addEventListener('click', function () {
            const orderDetails = sortedOrders[index].details;
            alert(`تفاصيل الطلب:\n\n${orderDetails}`);
        });
    });

    ordersModal.show();
}

// الترقيم
function renderPagination() {
    pagination.innerHTML = '';

    if (totalPages <= 1) return;

    // زر السابق
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#">السابق</a>`;
    prevLi.addEventListener('click', function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderClients();
            renderPagination();
        }
    });
    pagination.appendChild(prevLi);

    // أرقام الصفحات
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${currentPage === i ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        li.addEventListener('click', function (e) {
            e.preventDefault();
            currentPage = i;
            renderClients();
            renderPagination();
        });
        pagination.appendChild(li);
    }

    // زر التالي
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#">التالي</a>`;
    nextLi.addEventListener('click', function (e) {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderClients();
            renderPagination();
        }
    });
    pagination.appendChild(nextLi);
}

// تعديل عميل
function editClient(id) {
    const client = clients.find(c => c.id === id);
    if (!client) return;

    document.getElementById('clientId').value = client.id;
    document.getElementById('fullName').value = client.name;
    document.getElementById('nationalId').value = client.nationalId;
    document.getElementById('phone').value = client.phone;
    document.getElementById('email').value = client.email;
    document.getElementById('status').value = client.status;

    document.getElementById('clientModalLabel').textContent = 'تعديل عميل';
    clientModal.show();
}

// حذف عميل
function deleteClient(id) {
    if (confirm('هل أنت متأكد من حذف هذا العميل؟')) {
        clients = clients.filter(c => c.id !== id);
        totalPages = Math.ceil(clients.length / itemsPerPage);
        if (currentPage > totalPages) currentPage = totalPages;
        renderClients();
        renderPagination();
    }
}

// تحميل ملف
function downloadFile(filename) {
    // في التطبيق الحقيقي، سيتم تحميل الملف من الخادم
    alert(`تحميل الملف: ${filename}`);
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function () {
    renderClients();
    renderPagination();

    // إضافة عميل جديد
    document.querySelector('[data-bs-target="#clientModal"]').addEventListener('click', function () {
        document.getElementById('clientModalLabel').textContent = 'إضافة عميل جديد';
        document.getElementById('clientId').value = '';
        document.getElementById('fullName').value = '';
        document.getElementById('nationalId').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
        document.getElementById('status').value = 'active';
    });
});

// حفظ العميل (إضافة أو تعديل)
saveClientBtn.addEventListener('click', function () {
    const id = document.getElementById('clientId').value;
    const name = document.getElementById('fullName').value.trim();
    const nationalId = document.getElementById('nationalId').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const status = document.getElementById('status').value;

    if (!name || !nationalId || !phone || !email) {
        alert("يرجى ملء جميع الحقول");
        return;
    }

    if (id) {
        // تعديل عميل موجود
        const index = clients.findIndex(c => c.id == id);
        if (index !== -1) {
            clients[index].name = name;
            clients[index].nationalId = nationalId;
            clients[index].phone = phone;
            clients[index].email = email;
            clients[index].status = status;
        }
    } else {
        // إضافة عميل جديد
        const newId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
        clients.push({
            id: newId,
            name,
            nationalId,
            phone,
            email,
            ordersCount: 0,
            status,
            orders: []
        });
        totalPages = Math.ceil(clients.length / itemsPerPage);
    }

    clientModal.hide();
    renderClients();
    renderPagination();
});