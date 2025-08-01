// TasksDetalse Accounting JavaScript

// Initialize AOS
AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
});

// Global variables
let uploadedFile = null;
let isFormValid = false;

// File upload handling
function handleFileUpload(input) {
    const file = input.files[0];
    if (file) {
        uploadedFile = file;
        showFilePreview(file);
        validateForm();
    }
}

function showFilePreview(file) {
    const preview = document.getElementById('filePreview');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');

    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    preview.classList.remove('hidden');
}

function removeFile() {
    uploadedFile = null;
    document.getElementById('financialFile').value = '';
    document.getElementById('filePreview').classList.add('hidden');
    validateForm();
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Drag and drop functionality
const dropArea = document.getElementById('dropArea');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.add('drag-over'), false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.remove('drag-over'), false);
});

dropArea.addEventListener('drop', function(e) {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        document.getElementById('financialFile').files = files;
        handleFileUpload({ files: files });
    }
});

// Update statistics display
function updateStatistics() {
    const totalCost = parseFloat(document.getElementById('totalCost').value) || 0;
    const profitAmount = parseFloat(document.getElementById('profitAmount').value) || 0;
    validateForm();
}

// Form validation
function validateForm() {
    const totalCost = document.getElementById('totalCost').value;
    const profitAmount = document.getElementById('profitAmount').value;
    const hasFile = uploadedFile !== null;

    isFormValid = totalCost && profitAmount && hasFile;

    const closeBtn = document.getElementById('closeOrderBtn');
    closeBtn.disabled = !isFormValid;

    if (isFormValid) {
        closeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        closeBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

// Close order financially
function closeOrderFinancially() {
    if (!isFormValid) {
        showAlert('???? ????? ???? ???????? ???????? ??? ???????', 'error');
        return;
    }

    // Fill confirmation modal data
    const totalCost = parseFloat(document.getElementById('totalCost').value);
    const profitAmount = parseFloat(document.getElementById('profitAmount').value);

    document.getElementById('confirmTotalCost').textContent = `$ ${totalCost.toFixed(2)}`;
    document.getElementById('confirmProfitAmount').textContent = `$ ${profitAmount.toFixed(2)}`;

    document.getElementById('confirmModal').classList.add('active');
}

// Confirm close order
function confirmCloseOrder() {
    closeModal();

    // Show loading state
    const closeBtn = document.getElementById('closeOrderBtn');
    closeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ???? ???????...';
    closeBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        showAlert('?? ????? ????? ?????? ?????! ?? ??? ???????? ?? ????? ??????????.', 'success');

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
            window.location.href = '/Accounting/Dashboard';
        }, 3000);
    }, 2000);
}

// Modal functions
function closeModal() {
    document.getElementById('confirmModal').classList.remove('active');
}

// Download file function
function downloadFile(fileType) {
    showAlert(`???? ????? ${fileType}...`, 'info');
}

// Alert function
function showAlert(message, type = 'success') {
    const alertElement = document.getElementById('successAlert');
    const messageElement = document.getElementById('alertMessage');

    messageElement.textContent = message;

    // Change colors based on type
    alertElement.className = 'success-alert show';
    if (type === 'error') {
        alertElement.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } else if (type === 'info') {
        alertElement.style.background = 'linear-gradient(135deg, #3b82f6, #1e40af)';
    } else {
        alertElement.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    }

    setTimeout(() => {
        alertElement.classList.remove('show');
    }, 5000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateStatistics();
    validateForm();
    console.log('Accounting Task Details page loaded successfully');
});