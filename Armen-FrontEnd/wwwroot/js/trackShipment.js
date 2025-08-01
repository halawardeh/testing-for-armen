// بيانات تتبع الشحنات
const trackingData = {
    ARM001: {
        customerName: "محمد أحمد العلي",
        customerPhone: "+970 59 123 4567",
        customerEmail: "mohamed@example.com",
        containerNumber: "ARM001",
        currentLocation: "البحر الأبيض المتوسط",
        destination: "جنين، فلسطين",
        deliveryDate: "15 فبراير 2025",
        weight: "2.5 طن",
        dimensions: "2.6 × 24 × 6 متر",
        status: "في الطريق",
        statusType: "shipping",
        timeline: [
            {
                status: "تم استلام الطلب",
                location: "مكتب آرمن - غوانغتشو",
                date: "2025-01-10",
                icon: "fas fa-check-circle",
                completed: true
            },
            {
                status: "تم جمع البضائع",
                location: "مستودع التجميع - شنغهاي",
                date: "2025-01-15",
                icon: "fas fa-boxes",
                completed: true
            },
            {
                status: "تم التحميل على السفينة",
                location: "ميناء شنغهاي",
                date: "2025-01-20",
                icon: "fas fa-ship",
                completed: true
            },
            {
                status: "في الطريق",
                location: "البحر الأبيض المتوسط",
                date: "2025-01-25",
                icon: "fas fa-water",
                completed: false,
                active: true
            },
            {
                status: "وصول إلى الميناء",
                location: "ميناء حيفا - إسرائيل",
                date: "متوقع: 2025-02-05",
                icon: "fas fa-anchor",
                completed: false
            },
            {
                status: "التخليص الجمركي",
                location: "جسر الملك حسين",
                date: "متوقع: 2025-02-08",
                icon: "fas fa-file-alt",
                completed: false
            },
            {
                status: "التوصيل للعميل",
                location: "جنين، فلسطين",
                date: "متوقع: 2025-02-15",
                icon: "fas fa-home",
                completed: false
            }
        ]
    },
    ARM002: {
        customerName: "فاطمة خالد السعد",
        customerPhone: "+970 59 987 6543",
        customerEmail: "fatima@example.com",
        containerNumber: "ARM002",
        currentLocation: "ميناء حيفا",
        destination: "رام الله، فلسطين",
        deliveryDate: "25 يناير 2025",
        weight: "3.2 طن",
        dimensions: "3.0 × 20 × 5 متر",
        status: "وصل الميناء",
        statusType: "arrived",
        timeline: [
            {
                status: "تم استلام الطلب",
                location: "مكتب آرمن - غوانغتشو",
                date: "2024-12-20",
                icon: "fas fa-check-circle",
                completed: true
            },
            {
                status: "تم جمع البضائع",
                location: "مستودع التجميع - شنغهاي",
                date: "2024-12-25",
                icon: "fas fa-boxes",
                completed: true
            },
            {
                status: "تم التحميل على السفينة",
                location: "ميناء شنغهاي",
                date: "2025-01-01",
                icon: "fas fa-ship",
                completed: true
            },
            {
                status: "في الطريق",
                location: "المحيط الهندي",
                date: "2025-01-05",
                icon: "fas fa-water",
                completed: true
            },
            {
                status: "وصول إلى الميناء",
                location: "ميناء حيفا - إسرائيل",
                date: "2025-01-18",
                icon: "fas fa-anchor",
                completed: false,
                active: true
            },
            {
                status: "التخليص الجمركي",
                location: "جسر الملك حسين",
                date: "متوقع: 2025-01-22",
                icon: "fas fa-file-alt",
                completed: false
            },
            {
                status: "التوصيل للعميل",
                location: "رام الله، فلسطين",
                date: "متوقع: 2025-01-25",
                icon: "fas fa-home",
                completed: false
            }
        ]
    },
    ARM003: {
        customerName: "أحمد عبدالله المصري",
        customerPhone: "+970 59 555 7777",
        customerEmail: "ahmed.masri@example.com",
        containerNumber: "ARM003",
        currentLocation: "تم التسليم",
        destination: "غزة، فلسطين",
        deliveryDate: "تم التسليم في 10 يناير 2025",
        weight: "1.8 طن",
        dimensions: "2.0 × 15 × 4 متر",
        status: "تم التسليم",
        statusType: "delivered",
        timeline: [
            {
                status: "تم استلام الطلب",
                location: "مكتب آرمن - غوانغتشو",
                date: "2024-11-15",
                icon: "fas fa-check-circle",
                completed: true
            },
            {
                status: "تم جمع البضائع",
                location: "مستودع التجميع - شنغهاي",
                date: "2024-11-20",
                icon: "fas fa-boxes",
                completed: true
            },
            {
                status: "تم التحميل على السفينة",
                location: "ميناء شنغهاي",
                date: "2024-11-25",
                icon: "fas fa-ship",
                completed: true
            },
            {
                status: "في الطريق",
                location: "قناة السويس",
                date: "2024-12-10",
                icon: "fas fa-water",
                completed: true
            },
            {
                status: "وصول إلى الميناء",
                location: "ميناء حيفا - إسرائيل",
                date: "2024-12-20",
                icon: "fas fa-anchor",
                completed: true
            },
            {
                status: "التخليص الجمركي",
                location: "معبر إيرز",
                date: "2025-01-05",
                icon: "fas fa-file-alt",
                completed: true
            },
            {
                status: "تم التسليم",
                location: "غزة، فلسطين",
                date: "2025-01-10",
                icon: "fas fa-check-double",
                completed: false,
                active: true
            }
        ]
    }
};

// Handle Enter key - مع تأثير بصري
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        // إضافة تأثير بصري للزر عند الضغط على Enter
        const searchBtn = document.querySelector('.search-btn');
        searchBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            searchBtn.style.transform = '';
            trackShipment();
        }, 150);
    }
}

// تعيين رقم التتبع من الأرقام التجريبية - مع تأثير بصري
function setTrackingNumber(number) {
    const input = document.getElementById('trackingNumber');

    // إضافة تأثير الكتابة المتدرجة
    input.value = '';
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < number.length) {
            input.value += number.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            // إضافة تأثير التركيز
            input.focus();
            input.style.borderColor = 'var(--primary-color)';
            input.style.transform = 'translateY(-2px)';
            input.style.boxShadow = '0 10px 20px rgba(2, 95, 112, 0.2)';

            setTimeout(() => {
                trackShipment();
            }, 500);
        }
    }, 100);
}

// تتبع الشحنة - مع تأثيرات محسنة
function trackShipment() {
    const trackingNumber = document.getElementById('trackingNumber').value.trim();

    if (!trackingNumber) {
        // إضافة تأثير اهتزاز للخانة الفارغة
        const input = document.getElementById('trackingNumber');
        input.style.animation = 'shake 0.5s ease-in-out';
        input.style.borderColor = '#ef4444';

        setTimeout(() => {
            input.style.animation = '';
            input.style.borderColor = '#ddd';
        }, 500);

        // إظهار رسالة خطأ مخصصة
        showCustomAlert('⚠️ الرجاء إدخال رقم تتبع الشحنة', 'warning');
        return;
    }

    // إضافة تأثير على زر البحث
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.style.transform = 'scale(0.95)';
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري البحث...';

    // إظهار التحميل
    showLoading();

    setTimeout(() => {
        const shipmentData = trackingData[trackingNumber];

        if (!shipmentData) {
            hideLoading();
            searchBtn.innerHTML = '<i class="fas fa-search"></i> تتبع الشحنة';
            searchBtn.style.transform = '';
            displayNoResults();
            return;
        }

        // تحديث المعلومات
        updateShipmentInfo(shipmentData);
        hideLoading();

        // إعادة تعيين زر البحث
        searchBtn.innerHTML = '<i class="fas fa-search"></i> تتبع الشحنة';
        searchBtn.style.transform = '';

        showResults();

        // التمرير إلى النتائج مع تأثير سلس
        const resultsContainer = document.getElementById('resultsContainer');
        const offsetTop = resultsContainer.getBoundingClientRect().top + window.pageYOffset;

        // تحديد المسافة حسب حجم الشاشة
        const isMobile = window.innerWidth <= 768;
        const offset = isMobile ? -20 : -50;

        window.scrollTo({
            top: offsetTop + offset,
            behavior: 'smooth'
        });

        // إضافة تأثير نجاح
        showCustomAlert('✅ تم العثور على الشحنة بنجاح!', 'success');
    }, 2000);
}

// إظهار تنبيه مخصص
function showCustomAlert(message, type = 'info') {
    // إزالة أي تنبيه سابق
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alert = document.createElement('div');
    alert.className = `custom-alert custom-alert-${type}`;
    alert.innerHTML = message;

    // تحديد الألوان حسب النوع
    const colors = {
        success: 'background: linear-gradient(135deg, #10b981, #065f46); color: white;',
        warning: 'background: linear-gradient(135deg, #f59e0b, #d97706); color: white;',
        error: 'background: linear-gradient(135deg, #ef4444, #dc2626); color: white;',
        info: 'background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white;'
    };

    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        padding: 15px 25px;
        border-radius: 50px;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        transform: translateX(400px);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        ${colors[type] || colors.info}
    `;

    document.body.appendChild(alert);

    // تحريك الدخول
    setTimeout(() => {
        alert.style.transform = 'translateX(0)';
    }, 100);

    // إخفاء بعد 3 ثواني
    setTimeout(() => {
        alert.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(alert)) {
                document.body.removeChild(alert);
            }
        }, 500);
    }, 3000);
}

// إضافة تأثير اهتزاز
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}`;

// إضافة الكيفريمز إلى الصفحة
const styleElement = document.createElement('style');
styleElement.textContent = shakeKeyframes;
document.head.appendChild(styleElement);

// إظهار عدم وجود نتائج - مع تأثيرات مصححة
function displayNoResults() {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = `
        <div class="container">
            <div class="no-results-container" style="
                text-align: center;
                padding: 60px 20px;
                animation: fadeInScale 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            ">
                <div style="
                    font-size: 6rem;
                    color: #9ca3af;
                    margin-bottom: 2rem;
                    animation: float 3s ease-in-out infinite;
                ">📦</div>
                <h3 style="
                    color: var(--primary-color);
                    font-size: 2rem;
                    margin-bottom: 1rem;
                    animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
                ">لم يتم العثور على شحنة</h3>
                <p style="
                    color: #6b7280;
                    font-size: 1.1rem;
                    animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
                ">رقم التتبع غير صحيح. تأكد من الرقم وحاول مرة أخرى</p>
                <button onclick="location.reload()" style="
                    margin-top: 2rem;
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
                " onmouseover="this.style.transform='translateY(-3px) scale(1.05)'"
                   onmouseout="this.style.transform='translateY(0) scale(1)'">
                    🔄 المحاولة مرة أخرى
                </button>
            </div>
        </div>
    `;

    // إضافة الأنيميشن المصحح
    const additionalStyles = `
        @keyframes fadeInScale {
            0% {
                opacity: 0;
                transform: scale(0.8);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        @keyframes slideInUp {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    if (!document.querySelector('#additional-animations')) {
        const style = document.createElement('style');
        style.id = 'additional-animations';
        style.textContent = additionalStyles;
        document.head.appendChild(style);
    }

    showResults();
}

// تحديث معلومات الشحنة - مع تأثيرات محسنة
function updateShipmentInfo(data) {
    // تحديث المعلومات مع تأثير الكتابة
    animateTextUpdate('customerName', data.customerName);
    animateTextUpdate('customerPhone', data.customerPhone);
    animateTextUpdate('customerEmail', data.customerEmail);
    animateTextUpdate('containerNumber', data.containerNumber);
    animateTextUpdate('currentLocation', data.currentLocation);
    animateTextUpdate('destination', data.destination);
    animateTextUpdate('deliveryDate', data.deliveryDate);
    animateTextUpdate('weight', data.weight);
    animateTextUpdate('dimensions', data.dimensions);

    // حالة الشحنة مع تأثير خاص
    const statusElement = document.getElementById('currentStatus');
    const statusClass = `status-${data.statusType}`;
    const statusIcons = {
        'shipping': 'fas fa-ship',
        'arrived': 'fas fa-anchor',
        'delivered': 'fas fa-check-double'
    };

    statusElement.innerHTML = `
        <span class="status-badge ${statusClass}" style="
            animation: statusAppear 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.5s both;
        ">
            <i class="${statusIcons[data.statusType]}" style="animation: statusIconSpin 1s ease 1s;"></i>
            ${data.status} - ${data.currentLocation}
        </span>
    `;

    // تحديث التايم لاين
    updateTimeline(data.timeline);
}

// تحريك تحديث النص
function animateTextUpdate(elementId, newText) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';

        setTimeout(() => {
            element.textContent = newText;
            element.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200);
    }
}

// تصحيح الأنيميشن في JavaScript
function updateTimeline(timeline) {
    const timelineElement = document.getElementById('shipmentTimeline');
    let timelineHTML = '';

    timeline.forEach((item, index) => {
        const statusClass = item.completed ? 'completed' : (item.active ? 'active' : 'pending');
        const delay = index * 0.1;

        timelineHTML += `
            <div class="timeline-item ${statusClass}" style="
                animation: timelineItemSlide 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both;
            ">
                <div class="timeline-icon">
                    <i class="${item.icon}"></i>
                </div>
                <div class="timeline-content">
                    <div class="timeline-date">${item.date}</div>
                    <h4 class="timeline-title">${item.status}</h4>
                    <p class="timeline-location">${item.location}</p>
                </div>
            </div>
        `;
    });

    timelineElement.innerHTML = timelineHTML;

    // إضافة الأنيميشن المصحح للتايم لاين
    const timelineStyles = `
        @keyframes timelineItemSlide {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes statusAppear {
            0% {
                opacity: 0;
                transform: scale(0.5);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
        @keyframes statusIconSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    if (!document.querySelector('#timeline-animations')) {
        const style = document.createElement('style');
        style.id = 'timeline-animations';
        style.textContent = timelineStyles;
        document.head.appendChild(style);
    }
}

// إظهار التحميل - مع تأثيرات محسنة
function showLoading() {
    const loadingDiv = document.getElementById('loadingDiv');
    loadingDiv.classList.add('show');

    // إضافة تأثير صوتي (اختياري)
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('جاري البحث عن الشحنة');
        utterance.lang = 'ar-SA';
        utterance.volume = 0.1;
        speechSynthesis.speak(utterance);
    }
}

// إخفاء التحميل - مع تأثيرات محسنة
function hideLoading() {
    const loadingDiv = document.getElementById('loadingDiv');
    loadingDiv.classList.remove('show');
}

// إظهار النتائج - مع تأثيرات محسنة
function showResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.classList.add('show');

    // إضافة تأثير تدريجي للعناصر
    const cards = resultsContainer.querySelectorAll('.info-card, .status-card, .timeline-container');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// إضافة تأثيرات تفاعلية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('trackingNumber');

    // التركيز على خانة البحث مع تأثير (فقط في الشاشات الكبيرة)
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
        setTimeout(() => {
            input.focus();
            input.style.transform = 'scale(1.02)';

            setTimeout(() => {
                input.style.transform = 'scale(1)';
            }, 300);
        }, 1000);
    }

    // إضافة تأثيرات hover للعناصر التفاعلية
    const interactiveElements = document.querySelectorAll('.sample-link, .search-btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // معالجة تغيير حجم الشاشة
    handleResponsiveChanges();
});

// معالجة التغييرات الريسبونسيف
function handleResponsiveChanges() {
    let resizeTimeout;

    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            adjustLayoutForScreenSize();
        }, 250);
    });

    // تطبيق التعديلات الأولية
    adjustLayoutForScreenSize();
}

// تعديل التخطيط حسب حجم الشاشة
function adjustLayoutForScreenSize() {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 576;
    const searchCard = document.querySelector('.search-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const infoCards = document.querySelectorAll('.info-card');

    if (isMobile) {
        // تعديلات للموبايل
        if (searchCard) {
            searchCard.style.maxWidth = '100%';
            searchCard.style.margin = '0 10px';
        }

        // تقليل التأخير في الأنيميشن للموبايل
        timelineItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.05}s`;
        });

        infoCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // تعطيل بعض التأثيرات المعقدة في الشاشات الصغيرة
        if (isSmallMobile) {
            const particleElements = document.querySelectorAll('.inner-hero::before, .search-section::before');
            particleElements.forEach(element => {
                if (element) element.style.display = 'none';
            });
        }
    } else {
        // إعادة تعيين للشاشات الكبيرة
        if (searchCard) {
            searchCard.style.maxWidth = '600px';
            searchCard.style.margin = '0 auto';
        }

        timelineItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });

        infoCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });
    }
}

// تحسين تجربة اللمس للأجهزة المحمولة
function optimizeTouchExperience() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        // إضافة كلاس للأجهزة التي تدعم اللمس
        document.body.classList.add('touch-device');

        // تحسين الأزرار للمس
        const buttons = document.querySelectorAll('.search-btn, .sample-link');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function () {
                this.style.transform = 'scale(0.95)';
            });

            button.addEventListener('touchend', function () {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }
}

// استدعاء تحسين تجربة اللمس
document.addEventListener('DOMContentLoaded', optimizeTouchExperience);
