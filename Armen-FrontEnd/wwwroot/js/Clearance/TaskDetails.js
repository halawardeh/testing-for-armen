// Initialize AOS
AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
});

// File upload functionality
function handleFileUpload(input) {
    const file = input.files[0];
    if (file) {
        const fileName = file.name;
        const fileSize = (file.size / 1024 / 1024).toFixed(2);
        document.getElementById('fileName').textContent = `${fileName} (${fileSize} MB)`;
        document.getElementById('uploadedFile').style.display = 'block';
        // Simulate upload
        setTimeout(() => {
            alert(`تم رفع الملف: ${fileName} بنجاح!`);
        }, 1000);
    }
}
function removeFile() {
    document.getElementById('fileInput').value = '';
    document.getElementById('uploadedFile').style.display = 'none';
}
// Drag and drop functionality
const uploadArea = document.getElementById('uploadArea');
uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});
uploadArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
});
uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        document.getElementById('fileInput').files = files;
        handleFileUpload(document.getElementById('fileInput'));
    }
});
// Download main file
function downloadMainFile() {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'ORD-2025-005_MainFile.pdf';
    // Show loading message
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري التنزيل...';
    btn.disabled = true;
    setTimeout(() => {
        alert('تم تنزيل الملف الرئيسي بنجاح!');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 2000);
}
// Complete review
function completeReview() {
    document.getElementById('completionModal').classList.add('show');
}
function closeModal() {
    document.getElementById('completionModal').classList.remove('show');
}
function confirmCompletion() {
    const notes = document.getElementById('reviewNotes').value.trim();
    if (!notes) {
        alert('يرجى إضافة ملاحظاتك قبل إكمال المراجعة');
        closeModal();
        document.getElementById('reviewNotes').focus();
        return;
    }
    // Simulate completion process
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري الإرسال...';
    btn.disabled = true;
    setTimeout(() => {
        closeModal();
        alert('تم إكمال المراجعة وإرسال إشعار لموظف الاستيراد بنجاح!');
        window.location.href = '#';
    }, 2000);
}
// Sidebar toggle functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleButton = document.getElementById('sidebarToggle');
    const toggleIcon = toggleButton.querySelector('i');
    sidebar.classList.toggle('hidden');
    if (sidebar.classList.contains('hidden')) {
        mainContent.classList.remove('mr-64');
        mainContent.classList.add('mr-0');
        toggleIcon.className = 'fas fa-bars';
    } else {
        mainContent.classList.remove('mr-0');
        mainContent.classList.add('mr-64');
        toggleIcon.className = 'fas fa-times';
    }
}
// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Clearance Task Details page loaded successfully');
    // Auto-save notes
    const notesTextarea = document.getElementById('reviewNotes');
    notesTextarea.addEventListener('input', function() {
        localStorage.setItem('reviewNotes_ORD-2025-005', this.value);
    });
    // Load saved notes
    const savedNotes = localStorage.getItem('reviewNotes_ORD-2025-005');
    if (savedNotes) {
        notesTextarea.value = savedNotes;
    }
});

