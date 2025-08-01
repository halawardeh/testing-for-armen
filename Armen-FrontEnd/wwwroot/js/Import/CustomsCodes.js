// Initialize AOS
AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
});

// Global Variables
let notificationCount = 3;
let productCounter = 15;
let currentPhotoButton = null;
let selectedRow = null;

// Document Ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Products Table loaded successfully');
    
    // Initialize table calculations
    updateAllCalculations();
    updateStatistics();
    
    // Add event listeners for contenteditable cells
    addTableEventListeners();
    
    // Initialize row selection
    initializeRowSelection();
    
    // Request notification permission
    if (Notification.permission === 'default') {
        Notification.requestPermission();
    }
    
    // Simulate receiving new notification from shipping department
    setTimeout(() => {
        addShippingNotification('تم تحديث موعد الاستلام من المخزن إلى 26/7', 'ORD-2025-008');
    }, 10000);
});

// Initialize row selection - تحديد الصفوف
function initializeRowSelection() {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    tableBody.addEventListener('click', function(e) {
        const row = e.target.closest('.product-row');
        if (!row) return;

        // Don't select if clicking on interactive elements
        if (e.target.closest('.btn-delete, .btn-duplicate, .btn-change-photo, [contenteditable="true"]')) {
            return;
        }

        // Clear previous selection
        if (selectedRow) {
            selectedRow.classList.remove('selected');
        }

        // Select new row
        if (selectedRow !== row) {
            row.classList.add('selected');
            selectedRow = row;
            showToast(`تم تحديد المنتج: ${row.querySelector('.cell-name').textContent}`, 'info');
        } else {
            selectedRow = null;
        }
    });

    // Clear selection when clicking outside table
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.products-table')) {
            if (selectedRow) {
                selectedRow.classList.remove('selected');
                selectedRow = null;
            }
        }
    });
}

// Table Event Listeners
function addTableEventListeners() {
    const table = document.getElementById('productsTable');
    if (!table) return;

    // Add event listeners to editable cells
    table.addEventListener('input', function(e) {
        if (e.target.contentEditable === 'true') {
            const row = e.target.closest('tr');
            if (row) {
                updateRowCalculations(row);
                updateTotals();
                updateStatistics();
            }
        }
    });

    // Add event listeners for Enter key to move to next cell
    table.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.contentEditable === 'true') {
            e.preventDefault();
            moveToNextCell(e.target);
        }
        
        // Delete selected row with Delete key
        if (e.key === 'Delete' && selectedRow && !e.target.contentEditable) {
            deleteRow(selectedRow.querySelector('.btn-delete'));
        }
    });
}

// Move to next editable cell
function moveToNextCell(currentCell) {
    const row = currentCell.closest('tr');
    const cells = Array.from(row.querySelectorAll('[contenteditable="true"]'));
    const currentIndex = cells.indexOf(currentCell);
    
    if (currentIndex < cells.length - 1) {
        cells[currentIndex + 1].focus();
    } else {
        // Move to first cell of next row
        const nextRow = row.nextElementSibling;
        if (nextRow && !nextRow.classList.contains('totals-row')) {
            const firstEditableCell = nextRow.querySelector('[contenteditable="true"]');
            if (firstEditableCell) {
                firstEditableCell.focus();
            }
        }
    }
}

// Row Calculations
function updateRowCalculations(row) {
    const cartons = parseFloat(row.querySelector('.cell-cartons').textContent) || 0;
    const piecesPerCarton = parseFloat(row.querySelector('.cell-pieces-carton').textContent) || 0;
    const sets = parseFloat(row.querySelector('.cell-sets').textContent) || 1;
    const unitPrice = parseFloat(row.querySelector('.cell-unit-price').textContent) || 0;
    const cbm = parseFloat(row.querySelector('.cell-cbm').textContent) || 0;
    const costPrice = parseFloat(row.querySelector('.cell-cost-price').textContent) || 0;

    // Calculate total pieces
    const totalPieces = cartons * piecesPerCarton;
    row.querySelector('.cell-total-pieces').textContent = totalPieces.toLocaleString();

    // Calculate total price
    const totalPrice = totalPieces * unitPrice;
    row.querySelector('.cell-total-price').textContent = totalPrice.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Calculate total CBM
    const totalCBM = cartons * cbm;
    row.querySelector('.cell-total-cbm').textContent = totalCBM.toFixed(3);

    // Calculate profit
    const profit = totalPrice - costPrice;
    const profitPerPiece = totalPieces > 0 ? profit / totalPieces : 0;
    row.querySelector('.cell-profit').textContent = profitPerPiece.toFixed(2);
}

// Update all calculations
function updateAllCalculations() {
    const rows = document.querySelectorAll('.product-row');
    rows.forEach(row => updateRowCalculations(row));
    updateTotals();
}

// Update totals row
function updateTotals() {
    const rows = document.querySelectorAll('.product-row');
    let totalCartons = 0;
    let totalPiecesCarton = 0;
    let totalPieces = 0;
    let totalSets = 0;
    let grandTotal = 0;
    let totalCBM = 0;
    let totalCostPrice = 0;
    let totalProfit = 0;

    rows.forEach(row => {
        totalCartons += parseFloat(row.querySelector('.cell-cartons').textContent) || 0;
        totalPiecesCarton += parseFloat(row.querySelector('.cell-pieces-carton').textContent) || 0;
        totalPieces += parseFloat(row.querySelector('.cell-total-pieces').textContent.replace(/,/g, '')) || 0;
        totalSets += parseFloat(row.querySelector('.cell-sets').textContent) || 0;
        grandTotal += parseFloat(row.querySelector('.cell-total-price').textContent.replace(/,/g, '')) || 0;
        totalCBM += parseFloat(row.querySelector('.cell-total-cbm').textContent) || 0;
        totalCostPrice += parseFloat(row.querySelector('.cell-cost-price').textContent.replace(/,/g, '')) || 0;
    });

    totalProfit = grandTotal - totalCostPrice;

    // Update totals row
    document.getElementById('totalCartons').innerHTML = `<strong>${totalCartons}</strong>`;
    document.getElementById('totalPiecesCarton').innerHTML = `<strong>${totalPiecesCarton}</strong>`;
    document.getElementById('totalPieces').innerHTML = `<strong>${totalPieces.toLocaleString()}</strong>`;
    document.getElementById('totalSets').innerHTML = `<strong>${totalSets}</strong>`;
    document.getElementById('grandTotal').innerHTML = `<strong>¥ ${grandTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</strong>`;
    document.getElementById('totalCBM').innerHTML = `<strong>${totalCBM.toFixed(3)}</strong>`;
    document.getElementById('totalCostPrice').innerHTML = `<strong>¥ ${totalCostPrice.toLocaleString('en-US', {minimumFractionDigits: 2})}</strong>`;
    document.getElementById('totalProfit').innerHTML = `<strong>¥ ${totalProfit.toLocaleString('en-US', {minimumFractionDigits: 2})}</strong>`;
}

// Update statistics
function updateStatistics() {
    const rows = document.querySelectorAll('.product-row');
    const productCount = rows.length;
    
    let totalValue = 0;
    let totalWeight = 0;
    let totalCBM = 0;

    rows.forEach(row => {
        totalValue += parseFloat(row.querySelector('.cell-total-price').textContent.replace(/,/g, '')) || 0;
        totalWeight += parseFloat(row.querySelector('.cell-weight').textContent) || 0;
        totalCBM += parseFloat(row.querySelector('.cell-total-cbm').textContent) || 0;
    });

    document.getElementById('statsProducts').textContent = productCount;
    document.getElementById('statsValue').textContent = `¥${Math.round(totalValue).toLocaleString()}`;
    document.getElementById('statsWeight').textContent = totalWeight.toFixed(2);
    document.getElementById('statsCBM').textContent = totalCBM.toFixed(3);
}

// Add new row
function addNewRow() {
    const tableBody = document.getElementById('tableBody');
    const newRowHtml = `
        <tr class="product-row" data-category="NEW">
            <td class="cell-index">NEW-${++productCounter}</td>
            <td class="cell-photo">
                <div class="photo-cell">
                    <img src="https://via.placeholder.com/60x60/f0f0f0/999999?text=صورة" alt="منتج جديد" class="product-image">
                    <button class="btn-change-photo" onclick="changePhoto(this)">
                        <i class="fas fa-camera"></i>
                    </button>
                </div>
            </td>
            <td class="cell-name" contenteditable="true">منتج جديد</td>
            <td class="cell-cartons" contenteditable="true">1</td>
            <td class="cell-pieces-carton" contenteditable="true">1</td>
            <td class="cell-total-pieces calculated">1</td>
            <td class="cell-sets" contenteditable="true">1</td>
            <td class="cell-unit-price" contenteditable="true">0.00</td>
            <td class="cell-total-price calculated">0.00</td>
            <td class="cell-cbm" contenteditable="true">0.000</td>
            <td class="cell-total-cbm calculated">0.000</td>
            <td class="cell-weight" contenteditable="true">0.00</td>
            <td class="cell-cost-price" contenteditable="true">0.00</td>
            <td class="cell-profit calculated">0.00</td>
            <td class="cell-notes" contenteditable="true">-</td>
            <td class="cell-actions">
                <button class="btn-delete" onclick="deleteRow(this)">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn-duplicate" onclick="duplicateRow(this)">
                    <i class="fas fa-copy"></i>
                </button>
            </td>
        </tr>
    `;
    
    tableBody.insertAdjacentHTML('beforeend', newRowHtml);
    updateStatistics();
    
    // Show success message
    showToast('تم إضافة منتج جديد بنجاح', 'success');
}

// Delete row
function deleteRow(button) {
    const row = button.closest('tr');
    const productName = row.querySelector('.cell-name').textContent;
    
    if (confirm(`هل أنت متأكد من حذف المنتج "${productName}"؟`)) {
        // Clear selection if this row is selected
        if (selectedRow === row) {
            selectedRow = null;
        }
        
        row.remove();
        updateTotals();
        updateStatistics();
        showToast(`تم حذف المنتج "${productName}" بنجاح`, 'success');
    }
}

// Duplicate row
function duplicateRow(button) {
    const row = button.closest('tr');
    const newRow = row.cloneNode(true);
    
    // Update the index
    const indexCell = newRow.querySelector('.cell-index');
    const currentIndex = indexCell.textContent;
    const category = currentIndex.split('-')[0];
    indexCell.textContent = `${category}-${++productCounter}`;
    
    // Insert after current row
    row.parentNode.insertBefore(newRow, row.nextSibling);
    
    updateTotals();
    updateStatistics();
    showToast('تم نسخ المنتج بنجاح', 'success');
}

// Change photo
function changePhoto(button) {
    currentPhotoButton = button;
    document.getElementById('imageFileInput').click();
}

// Handle image upload
function handleImageUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (currentPhotoButton) {
                const img = currentPhotoButton.parentNode.querySelector('.product-image');
                img.src = e.target.result;
                showToast('تم تحديث الصورة بنجاح', 'success');
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Add new column
function addNewColumn() {
    document.getElementById('addColumnModal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function confirmAddColumn() {
    const columnName = document.getElementById('newColumnName').value;
    const columnType = document.getElementById('columnType').value;
    
    if (!columnName.trim()) {
        alert('يرجى إدخال اسم العمود');
        return;
    }
    
    const table = document.getElementById('productsTable');
    const headerRow = table.querySelector('thead tr');
    const actionsHeader = headerRow.querySelector('.col-actions');
    
    // Add header
    const newHeader = document.createElement('th');
    newHeader.className = 'col-custom';
    newHeader.textContent = columnName;
    headerRow.insertBefore(newHeader, actionsHeader);
    
    // Add cells to all rows
    const rows = table.querySelectorAll('tbody tr:not(.totals-row)');
    rows.forEach(row => {
        const actionsCell = row.querySelector('.cell-actions');
        const newCell = document.createElement('td');
        newCell.className = 'cell-custom';
        newCell.contentEditable = 'true';
        newCell.textContent = columnType === 'number' ? '0' : '-';
        row.insertBefore(newCell, actionsCell);
    });
    
    // Add to totals row
    const totalsRow = table.querySelector('.totals-row');
    if (totalsRow) {
        const totalsActionsCell = totalsRow.children[totalsRow.children.length - 1];
        const newTotalCell = document.createElement('td');
        newTotalCell.textContent = '';
        totalsRow.insertBefore(newTotalCell, totalsActionsCell);
    }
    
    closeModal('addColumnModal');
    document.getElementById('newColumnName').value = '';
    document.getElementById('columnType').value = 'text';
    
    showToast(`تم إضافة العمود "${columnName}" بنجاح`, 'success');
}

// Save data
function saveData() {
    const data = collectTableData();
    localStorage.setItem('productsData', JSON.stringify(data));
    showToast('تم حفظ البيانات بنجاح', 'success');
    console.log('Saved data:', data);
}

// Collect table data
function collectTableData() {
    const rows = document.querySelectorAll('.product-row');
    const data = [];
    
    rows.forEach(row => {
        const rowData = {
            index: row.querySelector('.cell-index').textContent,
            category: row.getAttribute('data-category'),
            name: row.querySelector('.cell-name').textContent,
            cartons: row.querySelector('.cell-cartons').textContent,
            piecesPerCarton: row.querySelector('.cell-pieces-carton').textContent,
            totalPieces: row.querySelector('.cell-total-pieces').textContent,
            sets: row.querySelector('.cell-sets').textContent,
            unitPrice: row.querySelector('.cell-unit-price').textContent,
            totalPrice: row.querySelector('.cell-total-price').textContent,
            cbm: row.querySelector('.cell-cbm').textContent,
            totalCBM: row.querySelector('.cell-total-cbm').textContent,
            weight: row.querySelector('.cell-weight').textContent,
            costPrice: row.querySelector('.cell-cost-price').textContent,
            profit: row.querySelector('.cell-profit').textContent,
            notes: row.querySelector('.cell-notes').textContent,
            image: row.querySelector('.product-image').src
        };
        data.push(rowData);
    });
    
    return data;
}

// Convert image to base64 for Excel export
async function imageToBase64(imgSrc) {
    return new Promise((resolve) => {
        if (imgSrc.startsWith('data:')) {
            resolve(imgSrc);
            return;
        }
        
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 60;
            canvas.height = 60;
            ctx.drawImage(img, 0, 0, 60, 60);
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = function() {
            resolve(''); // Return empty if image fails to load
        };
        img.src = imgSrc;
    });
}

// Export to Excel with images
async function exportToExcel() {
    try {
        showToast('جاري تحضير ملف Excel مع الصور...', 'info');
        
        const data = collectTableData();
        const processedData = [];
        
        // Process each row and convert images
        for (const row of data) {
            const processedRow = { ...row };
            
            // Convert image to base64 for Excel
            if (row.image && !row.image.includes('placeholder')) {
                try {
                    const base64Image = await imageToBase64(row.image);
                    if (base64Image) {
                        processedRow.image = base64Image;
                    } else {
                        processedRow.image = 'صورة غير متاحة';
                    }
                } catch (error) {
                    console.warn('Failed to convert image:', error);
                    processedRow.image = 'فشل في تحويل الصورة';
                }
            } else {
                processedRow.image = 'لا توجد صورة';
            }
            
            processedData.push(processedRow);
        }
        
        const ws = XLSX.utils.json_to_sheet(processedData, {
            header: [
                'index', 'category', 'name', 'cartons', 'piecesPerCarton', 
                'totalPieces', 'sets', 'unitPrice', 'totalPrice', 'cbm', 
                'totalCBM', 'weight', 'costPrice', 'profit', 'notes', 'image'
            ]
        });
        
        // Set Arabic column headers
        XLSX.utils.sheet_add_aoa(ws, [[
            'الرقم', 'الفئة', 'اسم المنتج', 'عدد الكراتين', 'القطع/الكرتون',
            'إجمالي القطع', 'عدد الأطقم', 'سعر الوحدة', 'السعر الإجمالي', 'CBM/CTN',
            'إجمالي CBM', 'الوزن', 'سعر التكلفة', 'الربح', 'ملاحظات', 'الصورة'
        ]], { origin: 'A1' });
        
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "المنتجات");
        
        // Set column widths
        ws['!cols'] = [
            {wch: 10}, {wch: 8}, {wch: 20}, {wch: 12}, {wch: 15}, 
            {wch: 15}, {wch: 12}, {wch: 12}, {wch: 15}, {wch: 10}, 
            {wch: 15}, {wch: 10}, {wch: 15}, {wch: 10}, {wch: 20}, {wch: 30}
        ];
        
        // Generate filename with current date
        const now = new Date();
        const filename = `منتجات_مع_الصور_${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')}.xlsx`;
        
        XLSX.writeFile(wb, filename);
        showToast('تم تصدير ملف Excel بنجاح مع جميع الصور! 🎉', 'success');
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        showToast('حدث خطأ أثناء تصدير ملف Excel', 'error');
    }
}

// Export to PDF with images
async function exportToPDF() {
    try {
        showToast('جاري تحضير ملف PDF مع الصور...', 'info');
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('l', 'mm', 'a4'); // landscape orientation
        
        // Add title
        doc.setFontSize(16);
        doc.text('Products List with Images - قائمة المنتجات مع الصور', 20, 20);
        
        // Get table data
        const data = collectTableData();
        
        let yPosition = 40;
        const lineHeight = 25; // Increased for images
        
        // Headers
        doc.setFontSize(10);
        doc.text('Index', 20, yPosition);
        doc.text('Image', 40, yPosition);
        doc.text('Name', 70, yPosition);
        doc.text('Cartons', 110, yPosition);
        doc.text('Total Price', 150, yPosition);
        
        yPosition += lineHeight;
        
        // Data rows with images
        for (const row of data) {
            if (yPosition > 160) { // New page if needed
                doc.addPage();
                yPosition = 20;
            }
            
            doc.text(row.index, 20, yPosition);
            
            // Add image if available
            if (row.image && !row.image.includes('placeholder')) {
                try {
                    const base64Image = await imageToBase64(row.image);
                    if (base64Image) {
                        doc.addImage(base64Image, 'PNG', 40, yPosition - 10, 20, 20);
                    }
                } catch (error) {
                    doc.text('No Image', 40, yPosition);
                }
            } else {
                doc.text('No Image', 40, yPosition);
            }
            
            doc.text(row.name.substring(0, 12), 70, yPosition);
            doc.text(row.cartons, 110, yPosition);
            doc.text(row.totalPrice, 150, yPosition);
            
            yPosition += lineHeight;
        }
        
        // Generate filename with current date
        const now = new Date();
        const filename = `منتجات_مع_الصور_${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')}.pdf`;
        
        doc.save(filename);
        showToast('تم تصدير ملف PDF بنجاح مع جميع الصور! 🎉', 'success');
    } catch (error) {
        console.error('Error exporting to PDF:', error);
        showToast('حدث خطأ أثناء تصدير ملف PDF', 'error');
    }
}

// Send to shipping department
function sendToShipping() {
    const data = collectTableData();
    // Here you would normally send to server
    console.log('Sending to shipping department:', data);
    showToast('تم إرسال البيانات لقسم الشحن بنجاح', 'success');
    
    // Add notificationaa
    setTimeout(() => {
        addShippingNotification('تم استلام قائمة المنتجات الجديدة وجاري المراجعة', 'SHIP-' + Date.now());
    }, 2000);
}

// Send to accounting department
function sendToAccounting() {
    const data = collectTableData();
    // Here you would normally send to server
    console.log('Sending to accounting department:', data);
    showToast('تم إرسال البيانات لقسم المحاسبة بنجاح', 'success');
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add toast styles if not exist
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border-radius: 10px;
                padding: 15px 20px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                z-index: 9999;
                min-width: 300px;
                animation: slideInRight 0.3s ease;
            }
            .toast-success { border-left: 4px solid #10b981; }
            .toast-error { border-left: 4px solid #ef4444; }
            .toast-info { border-left: 4px solid #3b82f6; }
            .toast-content { display: flex; align-items: center; gap: 10px; }
            .toast-success i { color: #10b981; }
            .toast-error i { color: #ef4444; }
            .toast-info i { color: #3b82f6; }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Notification functionality
function toggleNotifications() {
    const container = document.getElementById('notificationContainer');
    if (container.style.display === 'none') {
        container.style.display = 'block';
        document.querySelectorAll('.notification.new').forEach(notification => {
            notification.classList.remove('new');
        });
        updateNotificationBadge(0);
    } else {
        container.style.display = 'none';
    }
}

function closeNotification(notificationId) {
    const notification = document.getElementById(notificationId);
    notification.style.animation = 'slideOutLeft 0.5s ease';
    setTimeout(() => {
        notification.remove();
        const remainingNotifications = document.querySelectorAll('.notification').length;
        if (remainingNotifications === 0) {
            document.getElementById('notificationContainer').style.display = 'none';
        }
    }, 500);
}

function updateNotificationBadge(count) {
    const badge = document.getElementById('notificationBadge');
    if (count > 0) {
        badge.textContent = count;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

function addShippingNotification(message, orderId) {
    const container = document.getElementById('notificationContainer');
    const notificationId = 'notification_' + Date.now();
    
    const notification = document.createElement('div');
    notification.className = 'notification new';
    notification.id = notificationId;
    notification.innerHTML = `
        <button class="notification-close" onclick="closeNotification('${notificationId}')">×</button>
        <div class="notification-header">
            <span class="notification-title">رسالة جديدة من قسم الشحن</span>
            <span class="notification-time">الآن</span>
        </div>
        <div class="notification-content">
            <strong>قسم الشحن:</strong> ${message} - الطلب #${orderId}
        </div>
    `;
    
    container.insertBefore(notification, container.firstChild);
    notificationCount++;
    updateNotificationBadge(notificationCount);
    
    container.style.display = 'block';
    
    if (Notification.permission === 'granted') {
        new Notification('رسالة جديدة من قسم الشحن', {
            body: message,
            icon: '/favicon.ico'
        });
    }
}

// Add CSS animation for slide out
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutLeft {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-100%); opacity: 0; }
    }
`;
document.head.appendChild(style);