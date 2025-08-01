// متغيرات النظام
let currentExchangeRates = {
    USD_TO_ILS: 3.7000,
    USD_TO_CNY: 7.2500,
    ILS_TO_CNY: 1.9600
};

// ترتيب العملات من الأعلى إلى الأقل قيمة
const currencyOrder = ['USD', 'CNY', 'ILS'];

// بيانات الفواتير
let invoices = [
    {
        id: 'INV-2025-001',
        customer: 'شركة النور للتجارة',
        date: '2025-01-15',
        amount: 2450,
        currency: 'USD',
        description: 'فاتورة مواد كهربائية وأجهزة إلكترونية'
    },
    {
        id: 'INV-2025-002',
        customer: 'شركة التقنية المتطورة',
        date: '2025-01-16',
        amount: 18500,
        currency: 'CNY',
        description: 'فاتورة أجهزة إلكترونية ومعدات تقنية'
    },
    {
        id: 'INV-2025-003',
        customer: 'مؤسسة الأمان للاستيراد',
        date: '2025-01-17',
        amount: 12800,
        currency: 'ILS',
        description: 'فاتورة مواد بناء ومعدات'
    },
    {
        id: 'INV-2025-004',
        customer: 'شركة الرائد للتجارة',
        date: '2025-01-18',
        amount: 3200,
        currency: 'USD',
        description: 'فاتورة أثاث مكتبي'
    },
    {
        id: 'INV-2025-005',
        customer: 'مجموعة الشرق للاستثمار',
        date: '2025-01-19',
        amount: 25000,
        currency: 'CNY',
        description: 'فاتورة معدات صناعية'
    }
];

// إعداد الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    renderInvoices();
    updateStatistics();
    updateExchangeRateInputs();
});

// تهيئة الصفحة
function initializePage() {
    // تحديث التاريخ الحالي
    document.getElementById('todayDate').textContent = new Date().toLocaleDateString('ar-EG');
    
    // إنشاء رقم فاتورة جديد عند فتح النموذج
    document.getElementById('addInvoiceModal').addEventListener('show.bs.modal', function () {
        document.getElementById('invoiceNumber').value = generateInvoiceNumber();
        document.getElementById('invoiceDate').value = new Date().toISOString().split('T')[0];
    });
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // تبديل الشريط الجانبي
    document.querySelectorAll('.sidebar-toggler').forEach(toggler => {
        toggler.addEventListener('click', function () {
            document.getElementById('sidebar').classList.toggle('show');
        });
    });

    // إدارة القائمة المنسدلة للمستخدم
    setupUserDropdown();

    // أحداث تحديث أسعار الصرف
    document.getElementById('updateRatesBtn').addEventListener('click', updateExchangeRates);
    document.getElementById('resetRatesBtn').addEventListener('click', resetExchangeRates);

    // أحداث نموذج الفاتورة
    document.getElementById('saveInvoiceBtn').addEventListener('click', saveInvoice);
    document.getElementById('updateInvoiceBtn').addEventListener('click', updateInvoice);

    // أحداث تحويل العملة في النموذج
    setupCurrencyConversion();

    // أحداث البحث والفلترة
    document.getElementById('searchInvoices').addEventListener('input', filterInvoices);
    document.getElementById('filterCurrency').addEventListener('change', filterInvoices);

    // تسجيل الخروج
    document.getElementById('logoutBtn').addEventListener('click', function (e) {
        e.preventDefault();
        if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
            alert('تم تسجيل الخروج بنجاح');
        }
    });
}

// إعداد القائمة المنسدلة للمستخدم
function setupUserDropdown() {
    const userDropdown = document.getElementById('userDropdown');
    const dropdownMenu = document.getElementById('dropdownMenu');

    userDropdown.addEventListener('click', function (e) {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        e.stopPropagation();
    });

    document.addEventListener('click', function () {
        dropdownMenu.style.display = 'none';
    });

    dropdownMenu.addEventListener('click', function (e) {
        e.stopPropagation();
    });
}

// إعداد تحويل العملة في النموذج
function setupCurrencyConversion() {
    document.getElementById('invoiceAmount').addEventListener('input', convertCurrency);
    document.getElementById('invoiceCurrency').addEventListener('change', function () {
        document.getElementById('targetCurrency').value = '';
        document.getElementById('convertedAmount').value = '';
        document.getElementById('rateInfo').classList.add('d-none');
        convertCurrency();
    });
    document.getElementById('targetCurrency').addEventListener('change', convertCurrency);
}

// دالة تحديث أسعار الصرف
function updateExchangeRates() {
    const usdToIls = parseFloat(document.getElementById('usdToIls').value);
    const usdToCny = parseFloat(document.getElementById('usdToCny').value);
    const ilsToCny = parseFloat(document.getElementById('ilsToCny').value);

    if (!usdToIls || !usdToCny || !ilsToCny || usdToIls <= 0 || usdToCny <= 0 || ilsToCny <= 0) {
        alert('يرجى إدخال أسعار صرف صحيحة لجميع العملات');
        return;
    }

    // تحديث الأسعار
    currentExchangeRates.USD_TO_ILS = usdToIls;
    currentExchangeRates.USD_TO_CNY = usdToCny;
    currentExchangeRates.ILS_TO_CNY = ilsToCny;

    // حفظ في التخزين المحلي
    localStorage.setItem('exchangeRates', JSON.stringify(currentExchangeRates));

    // تحديث آخر تحديث
    const now = new Date();
    const updateTime = now.toLocaleTimeString('ar-EG', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    document.getElementById('lastUpdate').textContent = `آخر تحديث: اليوم ${updateTime}`;

    // تحديث حالة أسعار الصرف
    document.getElementById('exchangeStatus').textContent = 'محدث';

    // إعادة عرض الفواتير مع الأسعار الجديدة
    renderInvoices();

    // رسالة نجاح
    showNotification('تم تحديث أسعار الصرف بنجاح', 'success');
}

// استعادة الأسعار الافتراضية
function resetExchangeRates() {
    if (confirm('هل أنت متأكد من استعادة الأسعار الافتراضية؟')) {
        document.getElementById('usdToIls').value = '3.7000';
        document.getElementById('usdToCny').value = '7.2500';
        document.getElementById('ilsToCny').value = '1.9600';
        
        currentExchangeRates = {
            USD_TO_ILS: 3.7000,
            USD_TO_CNY: 7.2500,
            ILS_TO_CNY: 1.9600
        };

        localStorage.removeItem('exchangeRates');
        showNotification('تم استعادة الأسعار الافتراضية', 'info');
    }
}

// تحديث حقول أسعار الصرف من التخزين المحلي
function updateExchangeRateInputs() {
    const savedRates = localStorage.getItem('exchangeRates');
    if (savedRates) {
        currentExchangeRates = JSON.parse(savedRates);
        document.getElementById('usdToIls').value = currentExchangeRates.USD_TO_ILS.toFixed(4);
        document.getElementById('usdToCny').value = currentExchangeRates.USD_TO_CNY.toFixed(4);
        document.getElementById('ilsToCny').value = currentExchangeRates.ILS_TO_CNY.toFixed(4);
    }
}

// دالة توليد رقم فاتورة جديد
function generateInvoiceNumber() {
    const prefix = 'INV';
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${year}-${randomNum}`;
}

// دالة تحويل العملة في النموذج
function convertCurrency() {
    const invoiceAmount = parseFloat(document.getElementById('invoiceAmount').value);
    const fromCurrency = document.getElementById('invoiceCurrency').value;
    const toCurrency = document.getElementById('targetCurrency').value;

    if (!invoiceAmount || !toCurrency || invoiceAmount <= 0) {
        document.getElementById('convertedAmount').value = '';
        document.getElementById('rateInfo').classList.add('d-none');
        return;
    }

    if (fromCurrency === toCurrency) {
        document.getElementById('convertedAmount').value = invoiceAmount.toFixed(2);
        document.getElementById('rateInfo').classList.add('d-none');
        return;
    }

    const rate = getExchangeRate(fromCurrency, toCurrency);
    const convertedValue = invoiceAmount * rate;

    document.getElementById('convertedAmount').value = convertedValue.toFixed(2);
    document.getElementById('fromCurrencyText').textContent = fromCurrency;
    document.getElementById('toCurrencyText').textContent = toCurrency;
    document.getElementById('currentRate').textContent = rate.toFixed(4);
    document.getElementById('rateInfo').classList.remove('d-none');
}

// الحصول على سعر الصرف بين عملتين
function getExchangeRate(fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return 1;

    // التحويلات المباشرة
    if (fromCurrency === 'USD' && toCurrency === 'ILS') return currentExchangeRates.USD_TO_ILS;
    if (fromCurrency === 'USD' && toCurrency === 'CNY') return currentExchangeRates.USD_TO_CNY;
    if (fromCurrency === 'ILS' && toCurrency === 'CNY') return currentExchangeRates.ILS_TO_CNY;

    // التحويلات العكسية
    if (fromCurrency === 'ILS' && toCurrency === 'USD') return 1 / currentExchangeRates.USD_TO_ILS;
    if (fromCurrency === 'CNY' && toCurrency === 'USD') return 1 / currentExchangeRates.USD_TO_CNY;
    if (fromCurrency === 'CNY' && toCurrency === 'ILS') return 1 / currentExchangeRates.ILS_TO_CNY;

    return 1;
}

// دالة حفظ الفاتورة
function saveInvoice() {
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    const invoiceDate = document.getElementById('invoiceDate').value;
    const customerSelect = document.getElementById('customerSelect');
    const customer = customerSelect.options[customerSelect.selectedIndex].text;
    const amount = parseFloat(document.getElementById('invoiceAmount').value);
    const currency = document.getElementById('invoiceCurrency').value;
    const description = document.getElementById('invoiceDescription').value;

    if (!invoiceDate || !customer || !amount || amount <= 0) {
        alert('الرجاء إدخال جميع الحقول المطلوبة');
        return;
    }

    // عرض حالة التحميل
    const saveBtnText = document.getElementById('saveBtnText');
    const saveSpinner = document.getElementById('saveSpinner');
    saveBtnText.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>جاري الحفظ...';
    saveSpinner.classList.remove('d-none');

    // محاكاة عملية الحفظ
    setTimeout(() => {
        const newInvoice = {
            id: invoiceNumber,
            customer: customer,
            date: invoiceDate,
            amount: amount,
            currency: currency,
            description: description
        };

        invoices.push(newInvoice);
        renderInvoices();
        updateStatistics();

        // إغلاق النموذج وإعادة تعيينه
        const modal = bootstrap.Modal.getInstance(document.getElementById('addInvoiceModal'));
        modal.hide();
        document.getElementById('addInvoiceForm').reset();

        // إعادة الزر لحالته الأصلية
        saveBtnText.innerHTML = '<i class="fas fa-save me-2"></i>حفظ الفاتورة';
        saveSpinner.classList.add('d-none');

        showNotification(`تم حفظ الفاتورة ${newInvoice.id} بنجاح`, 'success');
    }, 1500);
}

// دالة تعديل الفاتورة
function editInvoice(invoiceId) {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    // تعبئة النموذج
    document.getElementById('editInvoiceId').value = invoice.id;
    document.getElementById('editInvoiceNumber').value = invoice.id;
    document.getElementById('editInvoiceDate').value = invoice.date;
    document.getElementById('editInvoiceAmount').value = invoice.amount;
    document.getElementById('editInvoiceCurrency').value = invoice.currency;
    document.getElementById('editInvoiceDescription').value = invoice.description;

    // تحديد العميل
    const customerSelect = document.getElementById('editCustomerSelect');
    for (let i = 0; i < customerSelect.options.length; i++) {
        if (customerSelect.options[i].text === invoice.customer) {
            customerSelect.selectedIndex = i;
            break;
        }
    }

    // فتح النموذج
    const editModal = new bootstrap.Modal(document.getElementById('editInvoiceModal'));
    editModal.show();
}

// دالة تحديث الفاتورة
function updateInvoice() {
    const invoiceId = document.getElementById('editInvoiceId').value;
    const invoiceDate = document.getElementById('editInvoiceDate').value;
    const customerSelect = document.getElementById('editCustomerSelect');
    const customer = customerSelect.options[customerSelect.selectedIndex].text;
    const amount = parseFloat(document.getElementById('editInvoiceAmount').value);
    const currency = document.getElementById('editInvoiceCurrency').value;
    const description = document.getElementById('editInvoiceDescription').value;

    if (!invoiceDate || !customer || !amount || amount <= 0) {
        alert('الرجاء إدخال جميع الحقول المطلوبة');
        return;
    }

    // عرض حالة التحميل
    const updateBtnText = document.getElementById('updateBtnText');
    const updateSpinner = document.getElementById('updateSpinner');
    updateBtnText.textContent = 'جاري التحديث...';
    updateSpinner.style.display = 'inline-block';

    setTimeout(() => {
        // تحديث الفاتورة
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

        renderInvoices();
        updateStatistics();

        // إغلاق النموذج
        const modal = bootstrap.Modal.getInstance(document.getElementById('editInvoiceModal'));
        modal.hide();

        // إعادة الزر لحالته الأصلية
        updateBtnText.textContent = 'حفظ التعديلات';
        updateSpinner.style.display = 'none';

        showNotification(`تم تحديث الفاتورة ${invoiceId} بنجاح`, 'success');
    }, 1000);
}

// دالة حذف الفاتورة
function deleteInvoice(invoiceId) {
    if (confirm(`هل أنت متأكد من حذف الفاتورة ${invoiceId}؟`)) {
        invoices = invoices.filter(invoice => invoice.id !== invoiceId);
        renderInvoices();
        updateStatistics();
        showNotification(`تم حذف الفاتورة ${invoiceId} بنجاح`, 'warning');
    }
}

// دالة عرض الفواتير
function renderInvoices() {
    const container = document.getElementById('invoicesContainer');
    container.innerHTML = '';

    if (invoices.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">لا توجد فواتير للعرض</h5>
                <p class="text-muted">ابدأ بإضافة فاتورة جديدة</p>
            </div>
        `;
        return;
    }

    invoices.forEach(invoice => {
        container.innerHTML += createInvoiceCard(invoice);
    });
}

// دالة إنشاء بطاقة الفاتورة
function createInvoiceCard(invoice) {
    return `
        <div class="invoice-card" id="invoice-${invoice.id}">
            <div class="invoice-header">
                <h6>${invoice.id}</h6>
                <span class="currency-badge">${invoice.currency}</span>
            </div>
            <div class="card-body">
                <div class="invoice-info-row">
                    <span>العميل:</span>
                    <strong>${invoice.customer}</strong>
                </div>
                <div class="invoice-info-row">
                    <span>التاريخ:</span>
                    <strong>${invoice.date}</strong>
                </div>
                <div class="invoice-info-row">
                    <span>المبلغ:</span>
                    <strong>${formatCurrency(invoice.amount, invoice.currency)}</strong>
                </div>
                <div class="invoice-info-row">
                    <span>الوصف:</span>
                    <small>${invoice.description}</small>
                </div>
                
                <div class="conversion-section">
                    <label class="form-label">تحويل العملة:</label>
                    <select class="form-select form-select-sm mb-2" onchange="convertInvoiceCurrency(this, '${invoice.id}')">
                        <option value="">اختر العملة</option>
                        ${getCurrencyOptions(invoice.currency)}
                    </select>
                    <div id="conversionResult-${invoice.id}" class="conversion-result" style="display: none;">
                        <small>
                            <strong><span id="convertedValue-${invoice.id}">0</span> <span id="targetCurrency-${invoice.id}">ILS</span></strong>
                            <br>سعر الصرف: <span id="exchangeRate-${invoice.id}">3.70</span>
                        </small>
                    </div>
                </div>
                
                <div class="invoice-actions">
                    <button class="btn btn-sm btn-outline-primary" onclick="editInvoice('${invoice.id}')">
                        <i class="fas fa-edit"></i> تعديل
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteInvoice('${invoice.id}')">
                        <i class="fas fa-trash"></i> حذف
                    </button>
                </div>
            </div>
        </div>
    `;
}

// دالة تحويل العملة للفاتورة
function convertInvoiceCurrency(selectElement, invoiceId) {
    const selectedCurrency = selectElement.value;
    if (!selectedCurrency) {
        document.getElementById(`conversionResult-${invoiceId}`).style.display = 'none';
        return;
    }

    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    const fromCurrency = invoice.currency;
    const rate = getExchangeRate(fromCurrency, selectedCurrency);
    const convertedValue = invoice.amount * rate;

    document.getElementById(`convertedValue-${invoiceId}`).textContent = convertedValue.toFixed(2);
    document.getElementById(`targetCurrency-${invoiceId}`).textContent = selectedCurrency;
    document.getElementById(`exchangeRate-${invoiceId}`).textContent = rate.toFixed(4);
    document.getElementById(`conversionResult-${invoiceId}`).style.display = 'block';
}

// دالة الحصول على خيارات العملات
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

// دالة تنسيق العملة
function formatCurrency(amount, currency) {
    const formattedAmount = parseFloat(amount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    switch (currency) {
        case 'USD': return `$${formattedAmount}`;
        case 'ILS': return `₪${formattedAmount}`;
        case 'CNY': return `¥${formattedAmount}`;
        default: return `${formattedAmount} ${currency}`;
    }
}

// تحديث الإحصائيات
function updateStatistics() {
    document.getElementById('totalInvoices').textContent = invoices.length;
    
    // حساب إجمالي المبلغ بالدولار
    let totalInUSD = 0;
    invoices.forEach(invoice => {
        const rate = getExchangeRate(invoice.currency, 'USD');
        totalInUSD += invoice.amount * rate;
    });
    
    document.getElementById('totalAmount').textContent = formatCurrency(totalInUSD, 'USD');
}

// دالة البحث والفلترة
function filterInvoices() {
    const searchTerm = document.getElementById('searchInvoices').value.toLowerCase();
    const currencyFilter = document.getElementById('filterCurrency').value;

    let filteredInvoices = invoices;

    // فلترة بالبحث
    if (searchTerm) {
        filteredInvoices = filteredInvoices.filter(invoice => 
            invoice.id.toLowerCase().includes(searchTerm) ||
            invoice.customer.toLowerCase().includes(searchTerm) ||
            invoice.description.toLowerCase().includes(searchTerm)
        );
    }

    // فلترة بالعملة
    if (currencyFilter) {
        filteredInvoices = filteredInvoices.filter(invoice => 
            invoice.currency === currencyFilter
        );
    }

    // عرض النتائج المفلترة
    const container = document.getElementById('invoicesContainer');
    container.innerHTML = '';

    if (filteredInvoices.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">لا توجد نتائج مطابقة</h5>
                <p class="text-muted">جرب تعديل معايير البحث</p>
            </div>
        `;
        return;
    }

    filteredInvoices.forEach(invoice => {
        container.innerHTML += createInvoiceCard(invoice);
    });
}

// دالة عرض الإشعارات
function showNotification(message, type = 'info') {
    // إنشاء الإشعار
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    `;
    
    notification.innerHTML = `
        <i class="fas fa-${getIconForType(type)} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    // إزالة الإشعار تلقائياً بعد 5 ثواني
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// دالة الحصول على الأيقونة حسب نوع الإشعار
function getIconForType(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'warning': return 'exclamation-triangle';
        case 'danger': return 'exclamation-circle';
        default: return 'info-circle';
    }
}