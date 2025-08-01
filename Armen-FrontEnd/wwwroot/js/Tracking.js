
    // بيانات الموظفين والتقييمات
    let employees = [
    {
        id: 1,
    name: "أحمد محمد",
    jobTitle: "موظف توثيق شحنات",
    department: "قسم التصدير",
    hireDate: "2022-01-15",
    performance: [
    {date: "2023-07-15", rating: 8.5, notes: "تنسيق ممتاز في معاملات التصدير" },
    {date: "2023-07-08", rating: 7.8, notes: "تحسن في تنظيم مستندات الشحن" },
    {date: "2023-07-01", rating: 7.2, notes: "يحتاج لمزيد من الدقة في الفواتير" }
    ]
  },
    {
        id: 2,
    name: "سارة عبدالله",
    jobTitle: "مسؤولة استيراد",
    department: "قسم الاستيراد",
    hireDate: "2021-11-20",
    performance: [
    {date: "2023-07-14", rating: 9.2, notes: "تتابع الشحنات بدقة وتنجز المهام بكفاءة" },
    {date: "2023-07-07", rating: 8.9, notes: "تعامل ممتاز مع الموردين الخارجيين" }
    ]
  },
    {
        id: 3,
    name: "خالد أحمد",
    jobTitle: "موظف تخليص جمركي",
    department: "التخليص الجمركي",
    hireDate: "2022-03-10",
    performance: [
    {date: "2023-07-13", rating: 6.5, notes: "يحتاج إلى سرعة أكبر في إجراءات التخليص" },
    {date: "2023-07-06", rating: 5.8, notes: "تأخير في تسليم بعض الوثائق الجمركية" }
    ]
  },
    {
        id: 4,
    name: "نورا سعيد",
    jobTitle: "محاسبة شحنات دولية",
    department: "المالية",
    hireDate: "2022-05-05",
    performance: [
    {date: "2023-07-12", rating: 8.0, notes: "تتقن الحسابات المتعلقة بالتكاليف الجمركية" },
    {date: "2023-07-05", rating: 7.5, notes: "عمل جيد لكن تحتاج لتحسين سرعة الإنجاز" }
    ]
  }
    ];


    // العناصر والمتغيرات
    const usersTable = document.getElementById('usersTable');
    const userModal = new bootstrap.Modal(document.getElementById('userModal'));
    const performanceModal = new bootstrap.Modal(document.getElementById('performanceModal'));
    const saveUserBtn = document.getElementById('saveUserBtn');
    const performanceForm = document.getElementById('performanceForm');
    const employeeName = document.getElementById('employeeName');
    const employeeJob = document.getElementById('employeeJob');
    const performanceHistory = document.getElementById('performanceHistory');

    let currentPage = 1;
    const itemsPerPage = 10;
    let totalPages = Math.ceil(employees.length / itemsPerPage);

    // عرض الموظفين
    function renderEmployees() {
        usersTable.innerHTML = '';
      
      employees.forEach(employee => {
        const row = document.createElement('tr');

        // حساب متوسط التقييم
        const avgRating = employee.performance.length > 0 ? 
          (employee.performance.reduce((sum, eval) => sum + eval.rating, 0) / employee.performance.length) :
    0;

    // تحديد فئة التقييم
    let ratingClass = '';
        if (avgRating >= 8) ratingClass = 'rating-excellent';
        else if (avgRating >= 6.5) ratingClass = 'rating-good';
        else if (avgRating >= 5) ratingClass = 'rating-average';
    else ratingClass = 'rating-poor';

    row.innerHTML = `
    <td>${employee.id}</td>
    <td>${employee.name}</td>
    <td>${employee.jobTitle}</td>
    <td>${employee.department}</td>
    <td>${employee.hireDate}</td>
    <td>
        <span class="performance-rating ${ratingClass}">
            ${avgRating.toFixed(1)}
        </span>
    </td>
    <td>
        <button class="btn btn-sm btn-warning edit-user" data-id="${employee.id}">تعديل</button>
        <button class="btn btn-sm btn-danger delete-user" data-id="${employee.id}">حذف</button>
        <button class="btn btn-sm btn-info evaluate-user" data-id="${employee.id}">تقييم</button>
    </td>
    `;

    usersTable.appendChild(row);
      });

      // إضافة معالجات الأحداث للأزرار
      document.querySelectorAll('.edit-user').forEach(btn => {
        btn.addEventListener('click', function () {
            const userId = parseInt(this.getAttribute('data-id'));
            editUser(userId);
        });
      });
      
      document.querySelectorAll('.delete-user').forEach(btn => {
        btn.addEventListener('click', function () {
            const userId = parseInt(this.getAttribute('data-id'));
            deleteUser(userId);
        });
      });
      
      document.querySelectorAll('.evaluate-user').forEach(btn => {
        btn.addEventListener('click', function () {
            const userId = parseInt(this.getAttribute('data-id'));
            evaluateUser(userId);
        });
      });
      
      document.querySelectorAll('.view-performance').forEach(btn => {
        btn.addEventListener('click', function () {
            const userId = parseInt(this.getAttribute('data-id'));
            viewPerformanceHistory(userId);
        });
      });
    }

    // عرض سجل التقييمات
    function viewPerformanceHistory(userId) {
      const employee = employees.find(e => e.id === userId);
    if (!employee) return;

    employeeName.textContent = employee.name;
    employeeJob.textContent = `${employee.jobTitle} - ${employee.department}`;
    document.getElementById('performanceUserId').value = employee.id;

      // عرض أحدث التقييمات أولاً
      const sortedPerformance = [...employee.performance].sort((a, b) => new Date(b.date) - new Date(a.date));

    performanceHistory.innerHTML = '';

    if (sortedPerformance.length === 0) {
        performanceHistory.innerHTML = '<p class="text-muted">لا توجد تقييمات سابقة</p>';
    return;
      }
      
      sortedPerformance.forEach(eval => {
        const evalItem = document.createElement('div');
    evalItem.className = 'performance-item';

    // تحديد فئة التقييم
    let ratingClass = '';
        if (eval.rating >= 8) ratingClass = 'rating-excellent';
        else if (eval.rating >= 6.5) ratingClass = 'rating-good';
        else if (eval.rating >= 5) ratingClass = 'rating-average';
    else ratingClass = 'rating-poor';

    evalItem.innerHTML = `
    <div class="d-flex justify-content-between">
        <span class="date">${eval.date}</span>
        <span class="performance-rating ${ratingClass}">${eval.rating.toFixed(1)}</span>
    </div>
    ${eval.notes ? `<div class="notes">${eval.notes}</div>` : ''}
    `;

    performanceHistory.appendChild(evalItem);
      });

    performanceModal.show();
    }

    // تقييم موظف
    function evaluateUser(userId) {
      const employee = employees.find(e => e.id === userId);
    if (!employee) return;

    employeeName.textContent = employee.name;
    employeeJob.textContent = `${employee.jobTitle} - ${employee.department}`;
    document.getElementById('performanceUserId').value = employee.id;
    document.getElementById('rating').value = '';
    document.getElementById('evaluationDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('notes').value = '';

      // عرض أحدث التقييمات أولاً
      const sortedPerformance = [...employee.performance].sort((a, b) => new Date(b.date) - new Date(a.date));

    performanceHistory.innerHTML = '';

    if (sortedPerformance.length === 0) {
        performanceHistory.innerHTML = '<p class="text-muted">لا توجد تقييمات سابقة</p>';
      } else {
        sortedPerformance.forEach(eval => {
            const evalItem = document.createElement('div');
            evalItem.className = 'performance-item';

            // تحديد فئة التقييم
            let ratingClass = '';
            if (eval.rating >= 8) ratingClass = 'rating-excellent';
            else if (eval.rating >= 6.5) ratingClass = 'rating-good';
            else if (eval.rating >= 5) ratingClass = 'rating-average';
            else ratingClass = 'rating-poor';

            evalItem.innerHTML = `
            <div class="d-flex justify-content-between">
              <span class="date">${eval.date}</span>
              <span class="performance-rating ${ratingClass}">${eval.rating.toFixed(1)}</span>
            </div>
            ${eval.notes ? `<div class="notes">${eval.notes}</div>` : ''}
          `;

            performanceHistory.appendChild(evalItem);
        });
      }

    performanceModal.show();
    }

    // تعديل موظف
    function editUser(id) {
      const employee = employees.find(e => e.id === id);
    if (!employee) return;

    document.getElementById('userId').value = employee.id;
    document.getElementById('fullName').value = employee.name;
    document.getElementById('jobTitle').value = employee.jobTitle;
    document.getElementById('department').value = employee.department;
    document.getElementById('hireDate').value = employee.hireDate;

    document.getElementById('userModalLabel').textContent = 'تعديل بيانات الموظف';
    userModal.show();
    }

    // حذف موظف
    function deleteUser(id) {
      if (confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
        employees = employees.filter(e => e.id !== id);
    renderEmployees();
      }
    }

    // تهيئة الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        renderEmployees();

    // إضافة موظف جديد
    document.querySelector('[data-bs-target="#userModal"]').addEventListener('click', function() {
        document.getElementById('userModalLabel').textContent = 'إضافة موظف جديد';
    document.getElementById('userId').value = '';
    document.getElementById('fullName').value = '';
    document.getElementById('jobTitle').value = '';
    document.getElementById('department').value = '';
    document.getElementById('hireDate').value = new Date().toISOString().split('T')[0];
      });
    });

    // حفظ الموظف (إضافة أو تعديل)
    saveUserBtn.addEventListener('click', function() {
      const id = document.getElementById('userId').value;
    const name = document.getElementById('fullName').value.trim();
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const department = document.getElementById('department').value;
    const hireDate = document.getElementById('hireDate').value;

    if (!name || !jobTitle || !department || !hireDate) {
        alert("يرجى ملء جميع الحقول");
    return;
      }

    if (id) {
        // تعديل موظف موجود
        const index = employees.findIndex(e => e.id == id);
    if (index !== -1) {
        employees[index].name = name;
    employees[index].jobTitle = jobTitle;
    employees[index].department = department;
    employees[index].hireDate = hireDate;
        }
      } else {
        // إضافة موظف جديد
        const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    employees.push({
        id: newId,
    name,
    jobTitle,
    department,
    hireDate,
    performance: []
        });
      }

    userModal.hide();
    renderEmployees();
    });

    // حفظ التقييم
    performanceForm.addEventListener('submit', function(e) {
        e.preventDefault();

    const userId = parseInt(document.getElementById('performanceUserId').value);
    const rating = parseFloat(document.getElementById('rating').value);
    const date = document.getElementById('evaluationDate').value;
    const notes = document.getElementById('notes').value.trim();

    if (rating < 1 || rating > 10) {
        alert("يرجى إدخال تقييم بين 1 و 10");
    return;
      }
      
      const employee = employees.find(e => e.id === userId);
    if (!employee) return;

    // إضافة التقييم الجديد
    employee.performance.unshift({
        date,
        rating,
        notes
    });

    alert("تم حفظ التقييم بنجاح");
    performanceModal.hide();
    renderEmployees();
    });
