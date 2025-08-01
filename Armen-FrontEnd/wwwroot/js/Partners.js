// تأكيد الحذف
function confirmDelete() {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذه الشركة؟')) {
        alert('تم حذف الشركة بنجاح');
    }
}

// إضافة شركة جديدة
function addCompany() {
    const name = document.getElementById('companyName').value;

    if (!name) {
        alert('يرجى إدخال جميع الحقول المطلوبة');
        return;
    }

    alert(`تم إضافة شركة ${name} بنجاح`);

    // إعادة تعيين النموذج
    document.getElementById('addCompanyForm').reset();

    // إخفاء عرض الشعار إذا كان موجودًا
    const logo = document.getElementById('logoPreview');
    if (logo) {
        logo.style.display = 'none';
    }

    // إغلاق نافذة المودال
    const modal = bootstrap.Modal.getInstance(document.getElementById('addCompanyModal'));
    if (modal) {
        modal.hide();
    }
}

// حفظ التعديلات على الشركة
function saveCompany() {
    const name = document.getElementById('editCompanyName').value;

    if (!name) {
        alert('يرجى إدخال جميع الحقول المطلوبة');
        return;
    }

    alert(`تم تعديل بيانات شركة ${name} بنجاح`);

    // إغلاق نافذة المودال
    const modal = bootstrap.Modal.getInstance(document.getElementById('editCompanyModal'));
    if (modal) {
        modal.hide();
    }
}