// تبديل الشريط الجانبي
document.querySelectorAll('.sidebar-toggler').forEach(toggler => {
    toggler.addEventListener('click', function () {
        document.getElementById('sidebar').classList.toggle('show');
    });
});

// تعيين قسم للطلب
document.querySelectorAll('.department-select').forEach(select => {
    select.addEventListener('change', function () {
        const orderId = this.closest('tr').querySelector('td:first-child').textContent;
        const departmentValue = this.value;
        const departmentNames = {
            'accounting': 'قسم المحاسبة',
            'shipping': 'قسم الشحن',
            'import': 'قسم الاستيراد'
        };
        const departmentName = departmentNames[departmentValue] || 'غير محدد';

        console.log(`تم تعيين الطلب ${orderId} للقسم ${departmentName}`);
    });
});

// فلترة الطلبات حسب الحالة
document.getElementById('statusFilter').addEventListener('change', function () {
    const selectedStatus = this.value;
    document.querySelectorAll('.data-table tbody tr').forEach(row => {
        const statusText = row.querySelector('.status-badge')?.textContent.trim();
        if (selectedStatus === 'all' || statusText === selectedStatus) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// عرض التفاصيل عند الضغط على زر التفاصيل
document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', function () {
        const row = this.closest('tr');
        const orderId = row.querySelector('td:nth-child(1)').textContent;
        const client = row.querySelector('td:nth-child(2)').textContent;
        const date = row.querySelector('td:nth-child(3)').textContent;
        const status = row.querySelector('.status-badge').textContent.trim();
        const department = row.querySelector('.department-select').selectedOptions[0].textContent;

        alert(`تفاصيل الطلب:\n\nرقم الطلب: ${orderId}\nالعميل: ${client}\nالتاريخ: ${date}\nالحالة: ${status}\nالقسم: ${department}`);
    });
});
