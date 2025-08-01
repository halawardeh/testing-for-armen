// تبديل الشريط الجانبي
document.querySelectorAll('.sidebar-toggler').forEach(toggler => {
    toggler.addEventListener('click', function () {
        document.getElementById('sidebar').classList.toggle('show');
    });
});

// إظهار/إخفاء القائمة المنسدلة لصورة الأدمن
const userDropdown = document.getElementById('userDropdown');
const dropdownMenu = document.getElementById('dropdownMenu');

if (userDropdown && dropdownMenu) {
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
}

// معالجة النقر على تسجيل الخروج
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        alert('تم تسجيل الخروج بنجاح');
    });
}

// وظائف تعديل البروفايل
const editProfileBtn = document.getElementById('editProfileBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const saveProfileBtn = document.getElementById('saveProfileBtn');
const profileActions = document.getElementById('profileActions');

if (editProfileBtn && cancelEditBtn && saveProfileBtn && profileActions) {
    // عناصر القيم
    const fullNameValue = document.getElementById('fullNameValue');
    const emailValue = document.getElementById('emailValue');
    const phoneValue = document.getElementById('phoneValue');
    const usernameValue = document.getElementById('usernameValue');
    const passwordValue = document.getElementById('passwordValue');
    const profileName = document.getElementById('profileName');

    // عناصر الإدخال
    const fullNameInput = document.getElementById('fullNameInput');
    const emailInput = document.getElementById('emailInput');
    const phoneInput = document.getElementById('phoneInput');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const passwordInputGroup = document.getElementById('passwordInputGroup');

    // تغيير صورة البروفايل
    const avatarInput = document.getElementById('avatarInput');
    const profileAvatar = document.getElementById('profileAvatar');
    const headerAvatar = document.getElementById('headerAvatar');

    if (avatarInput && profileAvatar) {
        avatarInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    profileAvatar.src = event.target.result;
                    if (headerAvatar) {
                        headerAvatar.src = event.target.result;
                    }
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // تبديل عرض كلمة المرور
    const passwordToggle = document.getElementById('passwordToggle');
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            passwordToggle.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }

    // تفعيل وضع التعديل
    editProfileBtn.addEventListener('click', function () {
        document.body.classList.add('edit-mode');
        profileActions.classList.remove('d-none');

        // إظهار حقول الإدخال وإخفاء القيم
        toggleEditMode(true);
    });

    // إلغاء التعديلات
    cancelEditBtn.addEventListener('click', function () {
        document.body.classList.remove('edit-mode');
        profileActions.classList.add('d-none');

        // إعادة تعيين القيم الأصلية
        if (fullNameInput && fullNameValue) fullNameInput.value = fullNameValue.textContent;
        if (emailInput && emailValue) emailInput.value = emailValue.textContent;
        if (phoneInput && phoneValue) phoneInput.value = phoneValue.textContent;
        if (usernameInput && usernameValue) usernameInput.value = usernameValue.textContent;
        if (passwordInput) passwordInput.value = '';

        toggleEditMode(false);
    });

    // حفظ التعديلات
    saveProfileBtn.addEventListener('click', function () {
        // تحديث القيم المعروضة
        if (fullNameValue && fullNameInput) fullNameValue.textContent = fullNameInput.value;
        if (emailValue && emailInput) emailValue.textContent = emailInput.value;
        if (phoneValue && phoneInput) phoneValue.textContent = phoneInput.value;
        if (usernameValue && usernameInput) usernameValue.textContent = usernameInput.value;
        if (profileName && fullNameInput) {
            const names = fullNameInput.value.split(' ');
            profileName.textContent = names[0] + (names[1] ? ' ' + names[1] : '');
        }

        if (passwordInput && passwordInput.value) {
            if (passwordValue) passwordValue.textContent = '••••••••';
            alert('تم تغيير كلمة المرور بنجاح');
        }

        // إخفاء وضع التعديل
        document.body.classList.remove('edit-mode');
        profileActions.classList.add('d-none');

        toggleEditMode(false);
        if (passwordInput) passwordInput.value = '';

        alert('تم حفظ التغييرات بنجاح');
    });

    function toggleEditMode(editMode) {
        // دالة مساعدة للتبديل بين وضع العرض والتعديل
        const toggleElements = [
            { value: fullNameValue, input: fullNameInput },
            { value: emailValue, input: emailInput },
            { value: phoneValue, input: phoneInput },
            { value: usernameValue, input: usernameInput },
            { value: passwordValue, input: passwordInputGroup }
        ];

        toggleElements.forEach(item => {
            if (item.value && item.input) {
                if (editMode) {
                    item.value.classList.add('d-none');
                    item.input.classList.remove('d-none');
                } else {
                    item.value.classList.remove('d-none');
                    item.input.classList.add('d-none');
                }
            }
        });
    }
}