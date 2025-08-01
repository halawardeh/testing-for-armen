$(document)(function () {
    // بيانات أولية (يمكن استبدالها باتصال مع API حقيقي)
    let newsData = {
        1: {
            id: 1,
            title: "إطلاق خدمة الشحن الجوي السريع إلى الصين",
            date: "2023-05-15",
            imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
            content: "نفخر بالإعلان عن إطلاق خدمة الشحن الجوي السريع مباشرة إلى جميع المدن الصينية الرئيسية بأسعار تنافسية.",
            status: "published"
        },
        2: {
            id: 2,
            title: "تخفيضات كبيرة على رسوم التخليص الجمركي",
            date: "2023-05-08",
            imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
            content: "بمناسبة الذكرى السنوية لتأسيس الشركة، نقدم تخفيضات تصل إلى 30% على خدمات التخليص الجمركي لجميع العملاء.",
            status: "published"
        },
        3: {
            id: 3,
            title: "افتتاح فرع جديد في مدينة دبي",
            date: "2023-05-01",
            imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
            content: "يسرنا الإعلان عن افتتاح فرعنا الجديد في دبي لخدمة عملائنا في الإمارات ودول الخليج العربي.",
            status: "published"
        }
    };
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addNewsForm");
    const newsContainer = document.querySelector("#newsContainer .row");
    let newsIdCounter = 4; // لو عندك 3 أخبار مسبقًا

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // الحصول على القيم
        const title = document.getElementById("newsTitle").value;
        const content = document.getElementById("newsContent").value;
        const image = document.getElementById("newsImage").value;
        const date = document.getElementById("newsDate").value;
        const status = document.getElementById("newsStatus").value;

        // تحويل التاريخ لصيغة عربية
        const arabicDate = new Date(date).toLocaleDateString('ar-EG', {
            day: 'numeric', month: 'long', year: 'numeric'
        });

        // إنشاء العنصر الجديد
        const newsCard = document.createElement("div");
        newsCard.className = "col-md-6 col-lg-4 mb-4";
        newsCard.innerHTML = `
            <div class="card news-card h-100">
                <img src="${image}" class="card-img-top" alt="صورة الخبر">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="news-date"><i class="far fa-calendar-alt me-1"></i> ${arabicDate}</span>
                        <div><span class="badge bg-${status === 'published' ? 'success' : 'secondary'} me-1">${status === 'published' ? 'منشور' : 'غير معروض'}</span></div>
                    </div>
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${content}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <a href="#" class="btn btn-sm btn-outline-primary">قراءة المزيد</a>
                        <div class="btn-group" role="group">
                            <button class="btn btn-warning btn-xs me-1" onclick="editNews(${newsIdCounter})" title="تعديل الخبر">
                                <i class="far fa-edit me-1"></i>
                            </button>
                            <button class="btn btn-danger btn-xs" onclick="deleteNews(${newsIdCounter})" title="حذف الخبر">
                                <i class="far fa-trash-alt me-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // إضافته للصفحة
        newsContainer.appendChild(newsCard);

        // إغلاق المودال
        const modal = bootstrap.Modal.getInstance(document.getElementById("addNewsModal"));
        modal.hide();

        // إعادة تعيين النموذج
        form.reset();

        // تحديث عداد الأخبار
        newsIdCounter++;
    });
});

