
    // تبديل الشريط الجانبي
    document.querySelectorAll('.sidebar-toggler').forEach(toggler => {
        toggler.addEventListener('click', function () {
            document.getElementById('sidebar').classList.toggle('show');
        });
    });

    // إظهار/إخفاء القائمة المنسدلة لصورة الأدمن
    const userDropdown = document.getElementById('userDropdown');
    const dropdownMenu = document.getElementById('dropdownMenu');

    userDropdown.addEventListener('click', function(e) {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    e.stopPropagation();
    });

    // إغلاق القائمة عند النقر في أي مكان آخر
    document.addEventListener('click', function() {
        dropdownMenu.style.display = 'none';
    });

    // منع إغلاق القائمة عند النقر عليها
    dropdownMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // معالجة النقر على تسجيل الخروج
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
    alert('تم تسجيل الخروج بنجاح');
      // هنا يمكنك إضافة التوجيه إلى صفحة تسجيل الخروج
      // window.location.href = 'logout.html';
    });

    // مخطط الأداء السنوي
    const annualCtx = document.getElementById('annualChart').getContext('2d');
    const annualChart = new Chart(annualCtx, {
        type: 'bar',
    data: {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
    {
        label: 'واردات',
    data: [120, 190, 170, 210, 230, 250, 220, 240, 260, 280, 300, 320],
    backgroundColor: '#1ABC9C',
    borderRadius: 5
          },
    {
        label: 'صادرات',
    data: [80, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210],
    backgroundColor: '#3498DB',
    borderRadius: 5
          }
    ]
      },
    options: {
        responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
        position: 'top',
    rtl: true
          },
        },
    scales: {
        x: {
        grid: {
        display: false
            }
          },
    y: {
        beginAtZero: true,
    grid: {
        color: '#f0f0f0'
            }
          }
        }
      }
    });
