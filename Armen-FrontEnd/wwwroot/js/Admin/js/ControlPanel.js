
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


// تهيئة الخريطة
function initMap() {
    const map = L.map('liveShipmentMap').setView([24.7136, 46.6753], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // بيانات وهمية للنقاط (ستأتي من API في التطبيق الحقيقي)
    const shipments = [
        {
            id: 'SH-78945',
            lat: 24.7136,
            lng: 46.6753,
            status: 'moving',
            driver: 'أحمد محمد',
            vehicle: 'TRK-005',
            speed: '65 كم/س',
            destination: 'جدة'
        },
        {
            id: 'SH-78946',
            lat: 24.6232,
            lng: 46.7151,
            status: 'stopped',
            driver: 'محمد علي',
            vehicle: 'TRK-007',
            speed: '0 كم/س',
            destination: 'الرياض'
        },
        {
            id: 'SH-78947',
            lat: 24.5432,
            lng: 46.8143,
            status: 'delayed',
            driver: 'خالد سعد',
            vehicle: 'TRK-012',
            speed: '45 كم/س',
            destination: 'الدمام'
        }
    ];

    // إضافة النقاط إلى الخريطة
    shipments.forEach(shipment => {
        let iconColor;
        if (shipment.status === 'moving') iconColor = 'green';
        else if (shipment.status === 'stopped') iconColor = 'red';
        else if (shipment.status === 'delayed') iconColor = 'orange';
        else iconColor = 'blue';

        const icon = L.divIcon({
            className: 'shipment-marker',
            html: `<div class="marker-pin" style="background-color:${iconColor}"></div><i class="fas fa-truck"></i>`,
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });

        const marker = L.marker([shipment.lat, shipment.lng], { icon }).addTo(map);

        marker.on('click', function () {
            // تحديث بيانات البوب أب
            document.getElementById('popup-shipment-id').textContent = shipment.id;
            document.getElementById('popup-driver').textContent = shipment.driver;
            document.getElementById('popup-vehicle').textContent = shipment.vehicle;
            document.getElementById('popup-status').textContent =
                shipment.status === 'moving' ? 'قيد النقل' :
                    shipment.status === 'stopped' ? 'متوقفة' : 'بها تأخير';
            document.getElementById('popup-status').className =
                shipment.status === 'moving' ? 'badge bg-success' :
                    shipment.status === 'stopped' ? 'badge bg-danger' : 'badge bg-warning';
            document.getElementById('popup-speed').textContent = shipment.speed;
            document.getElementById('popup-destination').textContent = shipment.destination;

            // عرض البوب أب
            const popup = document.getElementById('mapPopup');
            popup.classList.remove('d-none');
            popup.style.top = `${event.containerPoint.y}px`;
            popup.style.left = `${event.containerPoint.x}px`;
        });
    });

    // إغلاق البوب أب عند النقر على الزر
    document.querySelector('.btn-close-popup').addEventListener('click', function () {
        document.getElementById('mapPopup').classList.add('d-none');
    });

    // تحديث الخريطة
    document.getElementById('refreshMap').addEventListener('click', function () {
        // هنا سيتم إضافة كود التحديث من API
        document.getElementById('last-update-time').textContent = `اليوم ${new Date().toLocaleTimeString()}`;
    });

    // تصفية النقاط
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.addEventListener('click', function () {
            // هنا سيتم إضافة كود التصفية
            document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// تهيئة الخريطة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initMap);