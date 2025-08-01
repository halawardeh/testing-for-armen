
    // بيانات الأخبار (ستأتي من قاعدة البيانات في التطبيق الحقيقي)
    const newsData = {
        1: {
        id: 1,
    title: "إطلاق خدمة الشحن الجوي السريع إلى الصين",
    date: "2023-05-15",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    content: "نفخر بالإعلان عن إطلاق خدمة الشحن الجوي السريع مباشرة إلى جميع المدن الصينية الرئيسية بأسعار تنافسية مع وقت توصيل لا يتجاوز 72 ساعة. هذه الخدمة الجديدة تأتي استجابة لاحتياجات عملائنا الكرام الذين يبحثون عن حلول سريعة وآمنة لنقل بضائعهم.",
    status: "published",
    category: "services",
    featured: true
      },
    2: {
        id: 2,
    title: "تخفيضات كبيرة على رسوم التخليص الجمركي",
    date: "2023-05-08",
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    content: "بمناسبة الذكرى السنوية لتأسيس الشركة، نقدم تخفيضات تصل إلى 30% على خدمات التخليص الجمركي لجميع العملاء. هذه العروض سارية طوال شهر مايو 2023 ولجميع أنواع البضائع المستوردة أو المصدرة عبر موانئنا المختلفة.",
    status: "published",
    category: "offers",
    featured: true
      },
    3: {
        id: 3,
    title: "افتتاح فرع جديد في مدينة دبي",
    date: "2023-05-01",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    content: "يسرنا الإعلان عن افتتاح فرعنا الجديد في دبي لخدمة عملائنا في الإمارات ودول الخليج العربي. الفرع الجديد يقدم جميع خدمات الاستيراد والتصدير والشحن الجوي والبحري مع فريق محترف من الخبراء في مجال التجارة الدولية.",
    status: "published",
    category: "branches",
    featured: true
      }
    };

    // معاينة الصورة عند تغيير الرابط
    $('#newsImageUrl').on('input', function() {
      const url = $(this).val();
    if (url) {
        $('#imagePreview').attr('src', url).show();
      } else {
        $('#imagePreview').hide();
      }
    });

    // فتح Modal لإضافة خبر جديد
    $('[data-bs-target="#addNewsModal"]').click(function() {
        $('#newsModalLabel').text('إضافة خبر جديد');
    $('#newsForm')[0].reset();
    $('#imagePreview').hide();
    $('#deleteNewsBtn').hide();
    $('#newsModal').modal('show');
    });

    // وظيفة تعديل الخبر
    function editNews(id) {
      const news = newsData[id];
    if (news) {
        $('#newsModalLabel').text('تعديل الخبر');
    $('#newsId').val(news.id);
    $('#newsTitle').val(news.title);
    $('#newsDate').val(news.date);
    $('#newsImageFile').val(''); // إعادة تعيين حقل الملف
    $('#newsContent').val(news.content);
    $('#newsStatus').val(news.status);
    $('#newsCategory').val(news.category);
    $('#featuredNews').prop('checked', news.featured);
    $('#imagePreview').attr('src', news.imageUrl).show();
    $('#deleteNewsBtn').show();
    $('#newsModal').modal('show');
      } else {
        alert('لم يتم العثور على الخبر المطلوب!');
      }
    }

    // وظيفة حذف الخبر
    function deleteNews(id) {
      const news = newsData[id];
    if (!news) {
        alert('لم يتم العثور على الخبر المطلوب!');
    return;
      }

    if (confirm(`هل أنت متأكد من حذف الخبر: "${news.title}"؟\nلا يمكن التراجع عن هذه العملية.`)) {
        // محاكاة عملية الحذف
        delete newsData[id];
    alert('تم حذف الخبر بنجاح!');

    // إخفاء النافذة المنبثقة إذا كانت مفتوحة
    $('#newsModal').modal('hide');

    // في التطبيق الحقيقي، ستقوم بإعادة تحميل الصفحة أو إزالة الكارد من DOM
    location.reload();
      }
    }

    // حفظ الخبر (إضافة/تعديل)
    $('#saveNewsBtn').click(function() {
      const form = document.getElementById('newsForm');
    if (form.checkValidity()) {
        // هنا سيتم إرسال البيانات إلى الخادم في التطبيق الحقيقي
        alert('تم حفظ الخبر بنجاح!');
    $('#newsModal').modal('hide');
        // إعادة تحميل الصفحة أو تحديث قائمة الأخبار
      } else {
        form.classList.add('was-validated');
      }
    });

    // حذف الخبر
    $('#deleteNewsBtn').click(function() {
      const id = $('#newsId').val();
    deleteNews(id);
    });

    // تعيين تاريخ اليوم كتاريخ افتراضي
    const today = new Date().toISOString().split('T')[0];
    $('#newsDate').val(today);

    // إعداد بسيط للصفحة
    $(document).ready(function() {
        // تحسين تجربة النماذج
        $('.form-control, .form-select').on('focus', function () {
            $(this).css('border-color', 'var(--primary)');
        }).on('blur', function () {
            $(this).css('border-color', '#e9ecef');
        });
    });

    // إضافة CSS بسيط
    $('<style>')
        .prop('type', 'text/css')
        .html(`
        .btn:focus {
            outline: none;
        box-shadow: 0 0 0 3px rgba(2, 95, 112, 0.2);
        }
        .form-control:focus, .form-select:focus {
            box - shadow: 0 0 0 3px rgba(2, 95, 112, 0.1);
        }
        `)
        .appendTo('head');
