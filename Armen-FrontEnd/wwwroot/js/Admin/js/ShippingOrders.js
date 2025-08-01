
    // بيانات طلبات الشحن
   // بيانات طلبات الشحن (معدّلة لمواقع الصين وفلسطين + العملة بالدولار)
const shippingOrders = [
  {
    id: "SH-2023-001",
    clientName: "شركة التقنية المتطورة",
    shipmentType: "أجهزة إلكترونية",
    port: "ميناء غزة",
    voyage: "Voyage-1245",
    container: "TGHU-784512",
    transportType: "شاحنات",
    loadingCity: "غزة",
    warehouseAddress: "شارع الميناء، غزة، فلسطين",
    contactNumber: "+970 599 123 456",
    submissionDate: "2023-06-15",
    price: "3,300 $",
    status: "processing",
    employee: "أحمد محمد",
    attachments: [
      { name: "invoice.pdf", type: "pdf", url: "#" },
      { name: "packing_list.jpg", type: "image", url: "#" },
      { name: "contract.docx", type: "doc", url: "#" }
    ],
    activity: [
      { date: "2023-06-20 14:30", user: "أحمد محمد", action: "تم تغيير حالة الطلب إلى 'قيد المعالجة'" },
      { date: "2023-06-18 10:15", user: "سارة عبدالله", action: "تم إضافة ملاحظة: 'يجب التأكد من بيانات الفاتورة'" },
      { date: "2023-06-15 16:45", user: "نظام", action: "تم إنشاء الطلب" }
    ]
  },
  {
    id: "SH-2023-002",
    clientName: "مؤسسة الأقمشة الرفيعة",
    shipmentType: "أقمشة",
    port: "ميناء حيفا",
    voyage: "Voyage-9876",
    container: "MSKU-452369",
    transportType: "قطار",
    loadingCity: "نابلس",
    warehouseAddress: "شارع الصناعات، نابلس، فلسطين",
    contactNumber: "+970 568 765 432",
    submissionDate: "2023-06-10",
    price: "2,350 $",
    status: "pending",
    employee: "سارة عبدالله",
    attachments: [
      { name: "proforma_invoice.pdf", type: "pdf", url: "#" }
    ],
    activity: [
      { date: "2023-06-12 11:20", user: "سارة عبدالله", action: "تم إضافة ملاحظة: 'في انتظار تأكيد العميل'" },
      { date: "2023-06-10 09:30", user: "نظام", action: "تم إنشاء الطلب" }
    ]
  },
  {
    id: "SH-2023-003",
    clientName: "شركة الأدوات المنزلية",
    shipmentType: "أدوات مطبخ",
    port: "ميناء شنغهاي",
    voyage: "Voyage-6543",
    container: "BMOU-785412",
    transportType: "شاحنات",
    loadingCity: "شنتشن",
    warehouseAddress: "No. 789, Futian District, Shenzhen",
    contactNumber: "+86 137 1597 3579",
    submissionDate: "2023-06-05",
    price: "4,050 $",
    status: "completed",
    employee: "خالد أحمد",
    attachments: [
      { name: "invoice_003.pdf", type: "pdf", url: "#" },
      { name: "shipping_docs.zip", type: "zip", url: "#" }
    ],
    activity: [
      { date: "2023-06-08 15:10", user: "خالد أحمد", action: "تم تغيير حالة الطلب إلى 'مكتمل'" },
      { date: "2023-06-07 13:45", user: "خالد أحمد", action: "تم إضافة ملاحظة: 'تم التخليص الجمركي بنجاح'" },
      { date: "2023-06-06 10:30", user: "خالد أحمد", action: "تم تغيير حالة الطلب إلى 'قيد المعالجة'" },
      { date: "2023-06-05 14:20", user: "نظام", action: "تم إنشاء الطلب" }
    ]
  },
  {
    id: "SH-2023-004",
    clientName: "شركة الأثاث الفاخر",
    shipmentType: "أثاث",
    port: "ميناء نينغبو",
    voyage: "Voyage-3214",
    container: "CAIU-963258",
    transportType: "بحرية",
    loadingCity: "نينغبو",
    warehouseAddress: "No. 147, Yinzhou District, Ningbo",
    contactNumber: "+86 136 2589 1473",
    submissionDate: "2023-05-28",
    price: "6,000 $",
    status: "rejected",
    employee: "نورا سعيد",
    attachments: [
      { name: "quotation.pdf", type: "pdf", url: "#" },
      { name: "product_images.zip", type: "zip", url: "#" }
    ],
    activity: [
      { date: "2023-05-30 16:20", user: "نورا سعيد", action: "تم تغيير حالة الطلب إلى 'مرفوض'" },
      { date: "2023-05-30 10:45", user: "نورا سعيد", action: "تم إضافة ملاحظة: 'الكمية المطلوبة غير متوفرة حالياً'" },
      { date: "2023-05-29 14:30", user: "نورا سعيد", action: "تم تغيير حالة الطلب إلى 'قيد المعالجة'" },
      { date: "2023-05-28 11:15", user: "نظام", action: "تم إنشاء الطلب" }
    ]
  },
  {
    id: "SH-2023-005",
    clientName: "شركة مواد البناء",
    shipmentType: "مواد بناء",
    port: "ميناء تيانجين",
    voyage: "Voyage-7531",
    container: "FSCU-852147",
    transportType: "شاحنات",
    loadingCity: "تيانجين",
    warehouseAddress: "No. 258, Binhai District, Tianjin",
    contactNumber: "+86 135 4862 5973",
    submissionDate: "2023-05-20",
    price: "4,900 $",
    status: "processing",
    employee: "أحمد محمد",
    attachments: [],
    activity: [
      { date: "2023-05-22 09:15", user: "أحمد محمد", action: "تم تغيير حالة الطلب إلى 'قيد المعالجة'" },
      { date: "2023-05-20 13:40", user: "نظام", action: "تم إنشاء الطلب" }
    ]
  }
  
];


    // عرض جدول الطلبات
    function renderOrdersTable(orders) {
      const tableBody = document.getElementById('ordersTable');
      tableBody.innerHTML = '';
      
      orders.forEach(order => {
        let statusBadge = '';
        if (order.status === 'pending') {
          statusBadge = '<span class="status-badge status-pending">معلق</span>';
        } else if (order.status === 'processing') {
          statusBadge = '<span class="status-badge status-processing">قيد المعالجة</span>';
        } else if (order.status === 'completed') {
          statusBadge = '<span class="status-badge status-completed">مكتمل</span>';
        } else if (order.status === 'rejected') {
          statusBadge = '<span class="status-badge status-rejected">مرفوض</span>';
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.id}</td>
          <td>${order.clientName}</td>
          <td>${order.shipmentType}</td>
          <td>${order.port}</td>
          <td>${order.voyage}</td>
          <td>${order.container}</td>
          <td>${order.transportType}</td>
          <td>${order.submissionDate}</td>
          <td>${order.price}</td>
          <td>${statusBadge}</td>
          <td>${order.employee}</td>
          <td>
            <button class="btn btn-sm view-details-btn" data-id="${order.id}">
              <i ></i> عرض
            </button>
          </td>
        `;
        tableBody.appendChild(row);
      });
      
      // إضافة مستمعات الأحداث لأزرار العرض
      document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const orderId = this.getAttribute('data-id');
          showOrderDetails(orderId);
        });
      });
    }
    
    // عرض تفاصيل الطلب
    function showOrderDetails(orderId) {
      const order = shippingOrders.find(o => o.id === orderId);
      if (!order) return;
      
      // تعبئة بيانات الطلب
      document.getElementById('orderId').textContent = order.id;
      document.getElementById('clientName').textContent = order.clientName;
      document.getElementById('shipmentType').textContent = order.shipmentType;
      document.getElementById('port').textContent = order.port;
      document.getElementById('voyage').textContent = order.voyage;
      document.getElementById('container').textContent = order.container;
      document.getElementById('transportType').textContent = order.transportType;
      document.getElementById('loadingCity').textContent = order.loadingCity;
      document.getElementById('warehouseAddress').textContent = order.warehouseAddress;
      document.getElementById('contactNumber').textContent = order.contactNumber;
      document.getElementById('submissionDate').textContent = order.submissionDate;
      document.getElementById('price').textContent = order.price;
      
      // تعبئة المرفقات
      const attachmentsContainer = document.getElementById('attachmentsContainer');
      attachmentsContainer.innerHTML = '';
      
      if (order.attachments.length === 0) {
        attachmentsContainer.innerHTML = '<p>لا توجد مرفقات</p>';
      } else {
        order.attachments.forEach(attachment => {
          const attachmentItem = document.createElement('div');
          attachmentItem.className = 'attachment-item';
          
          let icon = '';
          if (attachment.type === 'pdf') {
            icon = '<i class="fas fa-file-pdf text-danger fs-3"></i>';
          } else if (attachment.type === 'image') {
            icon = '<i class="fas fa-file-image text-primary fs-3"></i>';
          } else if (attachment.type === 'doc') {
            icon = '<i class="fas fa-file-word text-info fs-3"></i>';
          } else if (attachment.type === 'zip') {
            icon = '<i class="fas fa-file-archive text-warning fs-3"></i>';
          } else {
            icon = '<i class="fas fa-file text-secondary fs-3"></i>';
          }
          
          attachmentItem.innerHTML = `
            <div class="attachment-thumbnail">
              ${icon}
            </div>
            <div class="attachment-name text-truncate" style="width: 100%;">${attachment.name}</div>
            <a href="${attachment.url}" class="btn btn-sm btn-outline-primary mt-1" download>
              <i class="fas fa-download"></i>
            </a>
          `;
          attachmentsContainer.appendChild(attachmentItem);
        });
      }
      
      // تعبئة سجل النشاط
      const activityTimeline = document.getElementById('activityTimeline');
      activityTimeline.innerHTML = '';
      
      order.activity.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
          <div class="activity-date">${activity.date}</div>
          <div class="activity-content">
            <span class="activity-user">${activity.user}:</span> ${activity.action}
          </div>
        `;
        activityTimeline.appendChild(activityItem);
      });
      
      // تعيين الحالة الحالية
      document.getElementById('statusSelect').value = order.status;
      
      // عرض المودال
      const modal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
      modal.show();
    }
    
    // تصفية الطلبات
    function filterOrders() {
      const status = document.getElementById('filterStatus').value;
      const port = document.getElementById('filterPort').value;
      const dateFrom = document.getElementById('filterDateFrom').value;
      const dateTo = document.getElementById('filterDateTo').value;
      
      let filteredOrders = [...shippingOrders];
      
      if (status) {
        filteredOrders = filteredOrders.filter(order => order.status === status);
      }
      
      if (port) {
        filteredOrders = filteredOrders.filter(order => order.port === port);
      }
      
      if (dateFrom) {
        filteredOrders = filteredOrders.filter(order => new Date(order.submissionDate) >= new Date(dateFrom));
      }
      
      if (dateTo) {
        filteredOrders = filteredOrders.filter(order => new Date(order.submissionDate) <= new Date(dateTo));
      }
      
      renderOrdersTable(filteredOrders);
    }
    
    // البحث عن الطلبات
    function searchOrders() {
      const searchTerm = document.getElementById('searchInput').value.toLowerCase();
      
      if (!searchTerm) {
        renderOrdersTable(shippingOrders);
        return;
      }
      
      const filteredOrders = shippingOrders.filter(order => 
        order.id.toLowerCase().includes(searchTerm) || 
        order.clientName.toLowerCase().includes(searchTerm) ||
        order.shipmentType.toLowerCase().includes(searchTerm) ||
        order.port.toLowerCase().includes(searchTerm) ||
        order.voyage.toLowerCase().includes(searchTerm) ||
        order.container.toLowerCase().includes(searchTerm) ||
        order.employee.toLowerCase().includes(searchTerm)
      );
      
      renderOrdersTable(filteredOrders);
    }
    
    // تهيئة الصفحة عند التحميل
    document.addEventListener('DOMContentLoaded', function() {
      // عرض جدول الطلبات
      renderOrdersTable(shippingOrders);
      
      // مستمع حدث لزر التصفية
      document.getElementById('filterBtn').addEventListener('click', function() {
        const modal = new bootstrap.Modal(document.getElementById('filterModal'));
        modal.show();
      });
      
      // مستمع حدث لتطبيق التصفية
      document.getElementById('applyFilterBtn').addEventListener('click', function() {
        filterOrders();
        const modal = bootstrap.Modal.getInstance(document.getElementById('filterModal'));
        modal.hide();
      });
      
      // مستمع حدث للبحث
      document.getElementById('searchInput').addEventListener('input', searchOrders);
      
      // مستمع حدث لتحديث الحالة
      document.getElementById('updateStatusBtn').addEventListener('click', function() {
        const orderId = document.getElementById('orderId').textContent;
        const newStatus = document.getElementById('statusSelect').value;
        
        // في تطبيق حقيقي، هنا ستكون استدعاء API لتحديث الحالة
        const order = shippingOrders.find(o => o.id === orderId);
        if (order) {
          order.status = newStatus;
          
          // إضافة نشاط جديد
          const now = new Date();
          const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
          
          order.activity.unshift({
            date: dateStr,
            user: "مدير النظام",
            action: `تم تغيير حالة الطلب إلى '${getStatusText(newStatus)}'`
          });
          
          // إعادة عرض الجدول
          renderOrdersTable(shippingOrders);
          
          // إعادة تعبئة سجل النشاط
          const activityTimeline = document.getElementById('activityTimeline');
          activityTimeline.innerHTML = '';
          
          order.activity.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
              <div class="activity-date">${activity.date}</div>
              <div class="activity-content">
                <span class="activity-user">${activity.user}:</span> ${activity.action}
              </div>
            `;
            activityTimeline.appendChild(activityItem);
          });
          
          alert('تم تحديث حالة الطلب بنجاح');
        }
      });
      
      // مستمع حدث لإضافة ملاحظة
      document.getElementById('addNoteBtn').addEventListener('click', function() {
        const orderId = document.getElementById('orderId').textContent;
        const noteText = document.getElementById('noteTextarea').value.trim();
        
        if (!noteText) {
          alert('الرجاء إدخال نص الملاحظة');
          return;
        }
        
        // في تطبيق حقيقي، هنا ستكون استدعاء API لإضافة الملاحظة
        const order = shippingOrders.find(o => o.id === orderId);
        if (order) {
          const now = new Date();
          const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
          
          order.activity.unshift({
            date: dateStr,
            user: "مدير النظام",
            action: `تم إضافة ملاحظة: '${noteText}'`
          });
          
          // إعادة تعبئة سجل النشاط
          const activityTimeline = document.getElementById('activityTimeline');
          activityTimeline.innerHTML = '';
          
          order.activity.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
              <div class="activity-date">${activity.date}</div>
              <div class="activity-content">
                <span class="activity-user">${activity.user}:</span> ${activity.action}
              </div>
            `;
            activityTimeline.appendChild(activityItem);
          });
          
          // مسح حقل الملاحظة
          document.getElementById('noteTextarea').value = '';
          
          alert('تم إضافة الملاحظة بنجاح');
        }
      });
      
      // مستمع حدث لتغيير الموظف المسؤول
      document.getElementById('updateEmployeeBtn').addEventListener('click', function() {
        const orderId = document.getElementById('orderId').textContent;
        const employeeSelect = document.getElementById('employeeSelect');
        const newEmployee = employeeSelect.options[employeeSelect.selectedIndex].text;
        
        // في تطبيق حقيقي، هنا ستكون استدعاء API لتحديث الموظف المسؤول
        const order = shippingOrders.find(o => o.id === orderId);
        if (order) {
          order.employee = newEmployee.split(' - ')[0];
          
          // إضافة نشاط جديد
          const now = new Date();
          const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
          
          order.activity.unshift({
            date: dateStr,
            user: "مدير النظام",
            action: `تم تغيير الموظف المسؤول إلى '${newEmployee}'`
          });
          
          // إعادة عرض الجدول
          renderOrdersTable(shippingOrders);
          
          // إعادة تعبئة سجل النشاط
          const activityTimeline = document.getElementById('activityTimeline');
          activityTimeline.innerHTML = '';
          
          order.activity.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
              <div class="activity-date">${activity.date}</div>
              <div class="activity-content">
                <span class="activity-user">${activity.user}:</span> ${activity.action}
              </div>
            `;
            activityTimeline.appendChild(activityItem);
          });
          
          alert('تم تغيير الموظف المسؤول بنجاح');
        }
      });
      
      // مستمع حدث لزر تصدير البيانات
      document.getElementById('exportBtn').addEventListener('click', function() {
        // في تطبيق حقيقي، هنا ستكون عملية تصدير البيانات
        alert('سيتم تصدير البيانات إلى ملف Excel');
      });
      
      // مستمع حدث لتبديل الشريط الجانبي
      document.querySelector('.sidebar-toggler').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('show');
      });
    });
    
    // مساعد للحصول على نص الحالة
    function getStatusText(status) {
      switch(status) {
        case 'pending': return 'معلق';
        case 'processing': return 'قيد المعالجة';
        case 'completed': return 'مكتمل';
        case 'rejected': return 'مرفوض';
        default: return '';
      }
    }

    const ordersPerPage = 2; // عدد الطلبات لكل صفحة
    let currentPage = 1;
  
    function renderOrders() {
      const container = document.getElementById("ordersContainer");
      container.innerHTML = "";
  
      const start = (currentPage - 1) * ordersPerPage;
      const end = start + ordersPerPage;
      const paginatedOrders = shippingOrders.slice(start, end);
  
      paginatedOrders.forEach(order => {
        const orderDiv = document.createElement("div");
        orderDiv.className = "card mb-3";
        orderDiv.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${order.id} - ${order.clientName}</h5>
            <p class="card-text">نوع الشحنة: ${order.shipmentType}</p>
            <p class="card-text">الموقع: ${order.loadingCity}</p>
            <p class="card-text">السعر: ${order.price}</p>
            <p class="card-text">الحالة: ${order.status}</p>
          </div>
        `;
        container.appendChild(orderDiv);
      });
    }
  
    function renderPagination() {
      const totalPages = Math.ceil(shippingOrders.length / ordersPerPage);
      const paginationContainer = document.getElementById("paginationContainer");
      paginationContainer.innerHTML = "";
  
      // زر السابق
      const prevItem = document.createElement("li");
      prevItem.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
      prevItem.innerHTML = `<a class="page-link" href="#">السابق</a>`;
      prevItem.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPage > 1) {
          currentPage--;
          updateUI();
        }
      });
      paginationContainer.appendChild(prevItem);
  
      // أرقام الصفحات
      for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement("li");
        pageItem.className = `page-item ${currentPage === i ? "active" : ""}`;
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener("click", (e) => {
          e.preventDefault();
          currentPage = i;
          updateUI();
        });
        paginationContainer.appendChild(pageItem);
      }
  
      // زر التالي
      const nextItem = document.createElement("li");
      nextItem.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
      nextItem.innerHTML = `<a class="page-link" href="#">التالي</a>`;
      nextItem.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
          currentPage++;
          updateUI();
        }
      });
      paginationContainer.appendChild(nextItem);
    }
  
    function updateUI() {
      renderOrders();
      renderPagination();
    }
  
    // عند تحميل الصفحة
    document.addEventListener("DOMContentLoaded", updateUI);
