// HS Code Database
const hsCodeDatabase = [
    {
        code: "8517.12.00",
        description: "هواتف ذكية وأجهزة اتصالات متنقلة",
        category: "أجهزة إلكترونية",
        status: "allowed",
        taxRate: 15,
        customsConditions: [
            "شهادة مطابقة من هيئة الاتصالات وتقنية المعلومات (CITC)",
            "فحص المعدات في مختبرات معتمدة قبل الإفراج",
            "دفع رسوم الترخيص والفحص المطلوبة",
            "تقديم فاتورة أصلية وشهادة منشأ",
            "التأكد من عدم احتواء الجهاز على برامج محظورة"
        ],
        importRequirements: [
            "ترخيص استيراد من وزارة التجارة",
            "سجل تجاري ساري المفعول",
            "شهادة تأمين على البضاعة"
        ],
        restrictions: [],
        additionalFees: "رسوم فحص 150 ريال + رسوم ترخيص 200 ريال",
        processingTime: "3-5 أيام عمل"
    },
    {
        code: "8471.30.00",
        description: "أجهزة حاسوب محمولة ولوحية",
        category: "أجهزة كمبيوتر",
        status: "allowed",
        taxRate: 10,
        customsConditions: [
            "فحص البرمجيات المثبتة مسبقاً للتأكد من عدم وجود برامج ممنوعة",
            "التأكد من مطابقة المواصفات التقنية للمعايير المحلية",
            "شهادة CE أو FCC للأجهزة الإلكترونية"
        ],
        importRequirements: [
            "ترخيص استيراد للكميات التجارية (أكثر من 10 وحدات)",
            "سجل تجاري للمستوردين التجاريين"
        ],
        restrictions: [],
        additionalFees: "رسوم فحص 100 ريال للكميات التجارية",
        processingTime: "2-3 أيام عمل"
    },
    {
        code: "6109.10.00",
        description: "قمصان قطنية (تي شيرت)",
        category: "ملابس",
        status: "allowed",
        taxRate: 25,
        customsConditions: [
            "فحص جودة المواد المستخدمة للتأكد من مطابقة معايير السلامة",
            "التأكد من عدم احتواء الملابس على مواد ضارة أو محظورة",
            "فحص التسمية وبطاقة المنشأ"
        ],
        importRequirements: [
            "ترخيص استيراد للكميات التجارية",
            "شهادة منشأ معتمدة من الغرفة التجارية"
        ],
        restrictions: [
            "منع استيراد الملابس المستعملة",
            "منع الملابس التي تحتوي على رسوم أو عبارات غير مناسبة"
        ],
        additionalFees: "رسوم فحص 50 ريال للشحنة",
        processingTime: "1-2 يوم عمل"
    },
    {
        code: "3004.50.00",
        description: "أدوية تحتوي على فيتامينات ومكملات غذائية",
        category: "أدوية ومكملات",
        status: "conditional",
        taxRate: 5,
        customsConditions: [
            "ترخيص مسبق من هيئة الغذاء والدواء السعودية (SFDA) - إجباري",
            "فحص في مختبرات الأدوية المعتمدة قبل الإفراج",
            "تقديم شهادات التحليل الكاملة من بلد المنشأ",
            "التأكد من تاريخ الصلاحية (لا يقل عن 75% من العمر الافتراضي)",
            "شهادة ممارسات التصنيع الجيدة (GMP)"
        ],
        importRequirements: [
            "ترخيص مستورد أدوية من هيئة الغذاء والدواء",
            "سجل تجاري متخصص في المواد الصيدلانية",
            "مخزن مؤهل ومرخص لحفظ الأدوية"
        ],
        restrictions: [
            "ممنوع استيراد الأدوية منتهية الصلاحية",
            "يتطلب موافقة خاصة للمواد الخاضعة للرقابة"
        ],
        additionalFees: "رسوم ترخيص 500 ريال + رسوم فحص 300 ريال",
        processingTime: "7-14 يوم عمل"
    }
];

// Handle Enter key
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

// Perform search
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (!searchTerm) {
        alert('الرجاء إدخال كلمة البحث');
        return;
    }

    showLoading();

    setTimeout(() => {
        const results = searchHSCode(searchTerm);
        displayResults(results);
        hideLoading();
    }, 1500);
}

// Quick search
function quickSearch(term) {
    document.getElementById('searchInput').value = term;
    performSearch();
}

// Search in database
function searchHSCode(searchTerm) {
    const term = searchTerm.toLowerCase();
    return hsCodeDatabase.filter(item => 
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.code.includes(term)
    );
}

// Show loading
function showLoading() {
    document.getElementById('loadingDiv').classList.add('show');
}

// Hide loading
function hideLoading() {
    document.getElementById('loadingDiv').classList.remove('show');
}

// Display results
function displayResults(results) {
    const container = document.getElementById('resultsContainer');
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="text-center">
                <h3 class="product-name">لم يتم العثور على نتائج</h3>
                <p class="text-gray-500">جرب البحث بكلمات مختلفة</p>
            </div>
        `;
        return;
    }

    let html = `
        <div class="text-center mb-5">
            <h2 class="product-name">نتائج البحث</h2>
            <p class="text-gray-500">تم العثور على ${results.length} نتيجة مطابقة</p>
        </div>
    `;

    results.forEach(item => {
        const statusClass = item.status === 'allowed' ? 'status-allowed' : 
                          item.status === 'restricted' ? 'status-restricted' : 'status-conditional';
        
        const statusText = item.status === 'allowed' ? 'مسموح' :
                         item.status === 'restricted' ? 'مقيد' : 'مشروط';

        html += `
            <div class="result-card">
                <div class="result-header">
                    <h3 class="product-name">${item.description}</h3>
                    <div class="badges">
                        <span class="code-badge">كود HS: ${item.code}</span>
                        <span class="category-badge">${item.category}</span>
                        <span class="${statusClass}">${statusText}</span>
                    </div>
                </div>

                <div class="tax-section">
                    <h4 class="product-name mb-4">معلومات الرسوم الجمركية</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div >
                            <p class="text-gray-600 mb-2">الرسوم الجمركية: <span>${item.taxRate}%</span></p>
                        </div>
                        <div >
                            <p class="text-gray-600 mb-2">حالة الاستيراد: <span class="font-bold">${statusText}</span></p>
                        </div>
                        <div>
                            <p class="text-gray-600 mb-2">مدة المعاملة :<span class="font-bold">${item.processingTime}</span></p>
                        </div>
                    </div>
                </div>

                ${item.customsConditions?.length > 0 ? `
                <div class="conditions-box">
                    <h4 class="product-name mb-4">الشروط المطلوبة للاستيراد</h4>
                    <ul class="list-unstyled">
                        ${item.customsConditions.map(condition => `
                            <li class="mb-2">
                                <i class="fas fa-check ml-2"></i>
                                ${condition}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                ` : ''}

                ${item.restrictions?.length > 0 ? `
                <div class="restrictions-box">
                    <h4 class="product-name mb-4">قيود وتحذيرات هامة</h4>
                    <ul class="list-unstyled">
                        ${item.restrictions.map(restriction => `
                            <li class="mb-2">
                                <i class="fas fa-exclamation-triangle ml-2"></i>
                                ${restriction}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
        `;
    });

    container.innerHTML = html;
}

// Focus search input on page load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchInput').focus();
}); 