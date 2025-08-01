// تبديل الشريط الجانبي
document.querySelectorAll('.sidebar-toggler').forEach(toggler => {
    toggler.addEventListener('click', function () {
        document.getElementById('sidebar').classList.toggle('show');
    });
});

// إظهار/إخفاء القائمة المنسدلة لصورة الأدمن
const userDropdown = document.getElementById('userDropdown');
const dropdownMenu = document.getElementById('dropdownMenu');

userDropdown.addEventListener('click', function (e) {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    e.stopPropagation();
});

// إغلاق القائمة عند النقر في أي مكان آخر
document.addEventListener('click', function () {
    dropdownMenu.style.display = 'none';
});

// منع إغلاق القائمة عند النقر عليها
dropdownMenu.addEventListener('click', function (e) {
    e.stopPropagation();
});

// معالجة النقر على تسجيل الخروج
document.getElementById('logoutBtn').addEventListener('click', function (e) {
    e.preventDefault();
    alert('تم تسجيل الخروج بنجاح');
    // هنا يمكنك إضافة التوجيه إلى صفحة تسجيل الخروج
    // window.location.href = 'logout.html';
});

// ترتيب العملات من الأعلى إلى الأقل قيمة
const currencyOrder = ['USD', 'CNY', 'ILS'];

// دالة إنشاء رقم فاتورة عشوائي
function generateInvoiceNumber() {
    const prefix = 'INV';
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000); // رقم عشوائي من 1000 إلى 9999
    return `${prefix}-${year}-${randomNum}`;
}

// توليد رقم فاتورة عند فتح المودال
document.getElementById('addInvoiceModal').addEventListener('show.bs.modal', function () {
    document.getElementById('invoiceNumber').value = generateInvoiceNumber();
});

// دالة تحويل العملة في نموذج الفاتورة
function convertCurrency() {
    const invoiceAmount = parseFloat(document.getElementById('invoiceAmount').value);
    const fromCurrency = document.getElementById('invoiceCurrency').value;
    const toCurrency = document.getElementById('targetCurrency').value;
    const exchangeRate = parseFloat(document.getElementById('exchangeRate').value);

    if (!invoiceAmount || !toCurrency || !exchangeRate) return;

    // تحديد إذا كنا نضرب أو نقسم بناء على ترتيب العملات
    const fromIndex = currencyOrder.indexOf(fromCurrency);
    const toIndex = currencyOrder.indexOf(toCurrency);
    let convertedValue;

    if (fromIndex < toIndex) {
        // من عملة أعلى إلى أقل (مثل دولار إلى شيكل) - نضرب
        convertedValue = invoiceAmount * exchangeRate;
    } else if (fromIndex > toIndex) {
        // من عملة أقل إلى أعلى (مثل شيكل إلى دولار) - نقسم
        convertedValue = invoiceAmount / exchangeRate;
    } else {
        // نفس العملة
        convertedValue = invoiceAmount;
    }

    document.getElementById('convertedAmount').value = convertedValue.toFixed(2);
    document.getElementById('fromCurrencyText').textContent = fromCurrency;
    document.getElementById('toCurrencyText').textContent = toCurrency;
    document.getElementById('currentRate').textContent = exchangeRate;
    document.getElementById('rateInfo').classList.remove('d-none');
}

// إضافة مستمعين للأحداث في نموذج الفاتورة
document.getElementById('invoiceAmount').addEventListener('input', convertCurrency);
document.getElementById('invoiceCurrency').addEventListener('change', function () {
    document.getElementById('targetCurrency').value = '';
    document.getElementById('convertedAmount').value = '';
    document.getElementById('rateInfo').classList.add('d-none');
});
document.getElementById('targetCurrency').addEventListener('change', convertCurrency);
document.getElementById('exchangeRate').addEventListener('input', convertCurrency);

// بيانات الفواتير (سيتم تخزينها في الذاكرة)
let invoices = [
    {
        id: generateInvoiceNumber(),
        customer: 'شركة النور للتجارة',
        date: '2023-10-15',
        amount: 1250,
        currency: 'USD',
        description: 'فاتورة مواد كهربائية'
    },
    {
        id: generateInvoiceNumber(),
        customer: 'شركة التقنية المتطورة',
        date: '2023-10-16',
        amount: 850,
        currency: 'CNY',
        description: 'فاتورة أجهزة إلكترونية'
    }
];

// دالة لعرض الفواتير
function renderInvoices() {
    const container = document.getElementById('invoicesContainer');
    container.innerHTML = '';



    // عرض الفواتير الموجودة
    invoices.forEach(invoice => {
        container.innerHTML += createInvoiceCard(invoice);
    });
}

// دالة لإنشاء بطاقة فاتورة
function createInvoiceCard(invoice) {
    return `
        <div class="col-md-6 col-lg-4 mb-4" id="invoice-${invoice.id}">
          <div class="invoice-card card h-100">
            <div class="invoice-header d-flex justify-content-between align-items-center">
              <h6 class="mb-0">فاتورة ${invoice.id}</h6>
              <span class="currency-badge">${invoice.currency}</span>
            </div>
            <div class="card-body">
              <div class="d-flex justify-content-between mb-2">
                <span>العميل:</span>
                <strong>${invoice.customer}</strong>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>التاريخ:</span>
                <strong>${invoice.date}</strong>
              </div>
              <div class="d-flex justify-content-between mb-3">
                <span>المبلغ:</span>
                <strong>${formatCurrency(invoice.amount, invoice.currency)}</strong>
              </div>
              
              <hr>
              
              <div class="row mb-3">
                <div class="col-12">
                  <label class="form-label">تحويل العملة</label>
                  <select class="form-select form-select-sm mb-2" onchange="convertInvoiceCurrency(this, '${invoice.id}')">
                    <option value="">اختر العملة</option>
                    ${getCurrencyOptions(invoice.currency)}
                  </select>
                </div>
              </div>
              
              <div id="conversionResult-${invoice.id}" class="text-center" style="display: none;">
                <div class="alert alert-info p-2 mb-2">
                  <small>القيمة بعد التحويل: <span id="convertedValue-${invoice.id}">0</span> <span id="targetCurrency-${invoice.id}">ILS</span></small>
                  <br>
                  <small>سعر الصرف: <span id="exchangeRate-${invoice.id}">3.70</span></small>
                </div>
              </div>
              
              <div class="d-flex justify-content-between">
                <button class="btn btn-sm btn-outline-primary" onclick="editInvoice('${invoice.id}')">
                  <i class="fas fa-edit"></i> تعديل
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteInvoice('${invoice.id}')">
                  <i class="fas fa-trash"></i> حذف
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
}

// دالة للحصول على خيارات العملات للتحويل
function getCurrencyOptions(currentCurrency) {
    return currencyOrder
        .filter(currency => currency !== currentCurrency)
        .map(currency => {
            let currencyName = '';
            if (currency === 'USD') currencyName = 'دولار';
            else if (currency === 'ILS') currencyName = 'شيكل';
            else if (currency === 'CNY') currencyName = 'يوان';

            return `<option value="${currency}">${currencyName} (${currency})</option>`;
        })
        .join('');
}

// دالة لتنسيق العملة
function formatCurrency(amount, currency) {
    if (currency === 'USD') return `$${amount.toFixed(2)}`;
    if (currency === 'ILS') return `₪${amount.toFixed(2)}`;
    if (currency === 'CNY') return `¥${amount.toFixed(2)}`;
    return `${amount.toFixed(2)} ${currency}`;
}

// دالة تحويل العملة لبطاقة الفاتورة
function convertInvoiceCurrency(selectElement, invoiceId) {
    const selectedCurrency = selectElement.value;
    if (!selectedCurrency) {
        document.getElementById(`conversionResult-${invoiceId}`).style.display = 'none';
        return;
    }

    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    const fromCurrency = invoice.currency;
    const invoiceAmount = invoice.amount;

    const rate = parseFloat(prompt(`أدخل سعر صرف ${fromCurrency} إلى ${selectedCurrency}`));
    if (!rate || rate <= 0) {
        alert('يجب إدخال سعر صرف صحيح');
        selectElement.value = '';
        return;
    }

    const fromIndex = currencyOrder.indexOf(fromCurrency);
    const toIndex = currencyOrder.indexOf(selectedCurrency);
    let convertedValue;

    if (fromIndex < toIndex) {
        // من عملة أعلى إلى أقل (مثل دولار إلى شيكل) - نضرب
        convertedValue = invoiceAmount * rate;
    } else if (fromIndex > toIndex) {
        // من عملة أقل إلى أعلى (مثل شيكل إلى دولار) - نقسم
        convertedValue = invoiceAmount / rate;
    } else {
        // نفس العملة
        convertedValue = invoiceAmount;
    }

    document.getElementById(`convertedValue-${invoiceId}`).textContent = convertedValue.toFixed(2);
    document.getElementById(`targetCurrency-${invoiceId}`).textContent = selectedCurrency;
    document.getElementById(`exchangeRate-${invoiceId}`).textContent = rate;
    document.getElementById(`conversionResult-${invoiceId}`).style.display = 'block';
}

// دالة تعديل الفاتورة
function editInvoice(invoiceId) {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    // تعبئة النموذج ببيانات الفاتورة
    document.getElementById('editInvoiceId').value = invoice.id;
    document.getElementById('editInvoiceNumber').value = invoice.id;
    document.getElementById('editInvoiceDate').value = invoice.date;

    // تحديد العميل
    const customerSelect = document.getElementById('editCustomerSelect');
    for (let i = 0; i < customerSelect.options.length; i++) {
        if (customerSelect.options[i].text === invoice.customer) {
            customerSelect.selectedIndex = i;
            break;
        }
    }

    document.getElementById('editInvoiceAmount').value = invoice.amount;
    document.getElementById('editInvoiceCurrency').value = invoice.currency;
    document.getElementById('editInvoiceDescription').value = invoice.description;

    // فتح مودال التعديل
    const editModal = new bootstrap.Modal(document.getElementById('editInvoiceModal'));
    editModal.show();
}

// دالة حفظ التعديلات
document.getElementById('updateInvoiceBtn').addEventListener('click', function () {
    const invoiceId = document.getElementById('editInvoiceId').value;
    const invoiceDate = document.getElementById('editInvoiceDate').value;
    const customerSelect = document.getElementById('editCustomerSelect');
    const customer = customerSelect.options[customerSelect.selectedIndex].text;
    const amount = parseFloat(document.getElementById('editInvoiceAmount').value);
    const currency = document.getElementById('editInvoiceCurrency').value;
    const description = document.getElementById('editInvoiceDescription').value;

    if (!invoiceDate || !customer || !amount) {
        alert('الرجاء إدخال جميع الحقول المطلوبة');
        return;
    }

    // عرض رسالة تحميل
    const updateBtnText = document.getElementById('updateBtnText');
    const updateSpinner = document.getElementById('updateSpinner');
    updateBtnText.textContent = 'جاري التحديث...';
    updateSpinner.style.display = 'inline-block';

    // محاكاة عملية التحديث
    setTimeout(() => {
        // تحديث بيانات الفاتورة
        const invoiceIndex = invoices.findIndex(inv => inv.id === invoiceId);
        if (invoiceIndex !== -1) {
            invoices[invoiceIndex] = {
                id: invoiceId,
                customer: customer,
                date: invoiceDate,
                amount: amount,
                currency: currency,
                description: description
            };
        }

        // إعادة عرض الفواتير
        renderInvoices();

        // إغلاق المودال
        const modal = bootstrap.Modal.getInstance(document.getElementById('editInvoiceModal'));
        modal.hide();

        // إعادة زر التحديث إلى حالته الأصلية
        updateBtnText.textContent = 'حفظ التعديلات';
        updateSpinner.style.display = 'none';

        alert('تم تحديث الفاتورة بنجاح');
    }, 1000);
});

// دالة لحفظ الفاتورة
document.getElementById('saveInvoiceBtn').addEventListener('click', function () {
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    const invoiceDate = document.getElementById('invoiceDate').value;
    const customerSelect = document.getElementById('customerSelect');
    const customer = customerSelect.options[customerSelect.selectedIndex].text;
    const amount = parseFloat(document.getElementById('invoiceAmount').value);
    const currency = document.getElementById('invoiceCurrency').value;
    const description = document.getElementById('invoiceDescription').value;

    if (!invoiceDate || !customer || !amount) {
        alert('الرجاء إدخال جميع الحقول المطلوبة');
        return;
    }

    // عرض رسالة تحميل
    const saveBtnText = document.getElementById('saveBtnText');
    const saveSpinner = document.getElementById('saveSpinner');
    saveBtnText.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>جاري الحفظ...';
    saveSpinner.classList.remove('d-none');

    // محاكاة عملية الحفظ (في التطبيق الحقيقي يتم الاتصال بالخادم)
    setTimeout(() => {
        // إنشاء فاتورة جديدة
        const newInvoice = {
            id: invoiceNumber,
            customer: customer,
            date: invoiceDate,
            amount: amount,
            currency: currency,
            description: description
        };

        // إضافة الفاتورة إلى المصفوفة
        invoices.push(newInvoice);

        // إعادة عرض الفواتير
        renderInvoices();

        // إغلاق المودال
        const modal = bootstrap.Modal.getInstance(document.getElementById('addInvoiceModal'));
        modal.hide();

        // إعادة تعيين النموذج
        document.getElementById('addInvoiceForm').reset();

        // إعادة زر الحفظ إلى حالته الأصلية
        saveBtnText.innerHTML = '<i class="fas fa-save me-2"></i>حفظ الفاتورة';
        saveSpinner.classList.add('d-none');

        alert(`تم حفظ الفاتورة ${newInvoice.id} بنجاح`);
    }, 1000);
});

// دالة حذف الفاتورة
function deleteInvoice(invoiceId) {
    if (confirm(`هل أنت متأكد من حذف الفاتورة ${invoiceId}؟`)) {
        invoices = invoices.filter(invoice => invoice.id !== invoiceId);
        renderInvoices();
        alert(`تم حذف الفاتورة ${invoiceId} بنجاح`);
    }
}

// عرض الفواتير عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', renderInvoices);