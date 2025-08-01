// Initialize AOS
AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
});

// Add comment functionality
function addComment() {
    const commentText = document.getElementById('newComment').value.trim();
    if (!commentText) {
        alert('يرجى كتابة التعليق أولاً');
        return;
    }
    const commentItem = document.createElement('div');
    commentItem.className = 'comment-item';
    commentItem.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">محمد العلي (الشحن)</span>
            <span class="comment-date">الآن</span>
        </div>
        <div class="comment-text">${commentText}</div>
    `;
    const commentsSection = document.querySelector('.comments-section');
    const addCommentDiv = commentsSection.querySelector('.mt-6');
    commentsSection.insertBefore(commentItem, addCommentDiv);
    document.getElementById('newComment').value = '';
    alert('تم إرسال التعليق بنجاح! سيصل إشعار لقسم الاستيراد.');
}

// Update status
function updateStatus() {
    const status = document.getElementById('shippingStatus').value;
    let statusText = '';
    switch(status) {
        case 'coordinating': statusText = 'جاري التنسيق'; break;
        case 'contacting_warehouse': statusText = 'التواصل مع المخازن'; break;
        case 'waiting_confirmation': statusText = 'بانتظار تأكيد الحجز'; break;
        case 'booked': statusText = 'تم الحجز'; break;
        case 'in_transit': statusText = 'قيد النقل'; break;
        case 'delivered': statusText = 'تم التسليم'; break;
    }
    alert(`تم تحديث حالة الشحن إلى: ${statusText}`);
}

// Open final report modal
function openFinalReportModal() {
    document.getElementById('finalReportModal').classList.add('show');
}

// Close modal
function closeModal(modalId) {
    if (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('show');
        }
    } else {
        // Close all modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
            modal.classList.remove('show');
        });
        document.getElementById('finalReportModal').classList.remove('show');
    }
}

// Handle report file upload
function handleReportUpload(input) {
    const file = input.files[0];
    if (file) {
        const fileName = file.name;
        const fileSize = (file.size / 1024 / 1024).toFixed(2);
        document.getElementById('reportFileName').textContent = `${fileName} (${fileSize} MB)`;
        document.getElementById('uploadedReport').style.display = 'block';
    }
}

function removeReportFile() {
    document.getElementById('reportFileInput').value = '';
    document.getElementById('uploadedReport').style.display = 'none';
}

// Complete shipping task
function completeShippingTask() {
    const reportFile = document.getElementById('reportFileInput').files[0];
    // Validation
    if (!reportFile) {
        alert('يرجى رفع ملف التقرير');
        return;
    }
    // Simulate completion process
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري الإرسال...';
    btn.disabled = true;
    setTimeout(() => {
        closeModal();
        alert('تم إكمال مهمة الشحن بنجاح! تم إرسال إشعار للمحاسب بأن تكاليف الشحن أصبحت نهائية ومتاحة.');
        window.location.href = '/Shipping/Dashboard';
    }, 2000);
}

// ========== Products Table Management Functions ==========

// Table management functions
function addNewRow() {
    console.log('➕ Adding new row to table');
    const tableBody = document.getElementById('tableBody');
    if (tableBody) {
        const newRowHtml = `
            <tr class="product-row" data-category="NEW">
                <td class="cell-index" contenteditable="true">NEW-${Date.now()}</td>
                <td class="cell-factory-name" contenteditable="true">اسم المصنع</td>
                <td class="cell-photo">
                    <div class="photo-cell">
                        <img src="https://via.placeholder.com/60x60/CCCCCC/000000?text=صورة" alt="منتج جديد" class="product-image">
                        <button class="btn-change-photo" onclick="changePhoto(this)">
                            <i class="fas fa-camera"></i>
                        </button>
                    </div>
                </td>
                <td class="cell-name" contenteditable="true">اسم المنتج</td>
                <td class="cell-cartons" contenteditable="true">0</td>
                <td class="cell-pieces-carton" contenteditable="true">0</td>
                <td class="cell-total-pieces calculated">0</td>
                <td class="cell-sets" contenteditable="true">0</td>
                <td class="cell-unit-price" contenteditable="true">0.00</td>
                <td class="cell-total-price calculated">0.00</td>
                <td class="cell-cbm" contenteditable="true">0.00</td>
                <td class="cell-total-cbm calculated">0.00</td>
                <td class="cell-weight" contenteditable="true">0.00</td>
                <td class="cell-cost-price" contenteditable="true">0.00</td>
                <td class="cell-profit calculated">0.00</td>
                <td class="cell-notes" contenteditable="true">ملاحظات</td>
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
        
        // Add event listeners to the new row
        addCalculationListeners();
        
        // Update totals
        updateTableTotals();
        showSuccessMessage('تم إضافة صف جديد!');
    }
}

function addNewColumn() {
    console.log('📋 Adding new column to table');
    const modal = document.getElementById('addColumnModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.classList.add('show');
        
        // Ensure modal is centered
        setTimeout(() => {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.margin = 'auto';
            }
        }, 100);
    }
}

function confirmAddColumn() {
    const columnName = document.getElementById('newColumnName').value.trim();
    const columnType = document.getElementById('columnType').value;
    
    if (!columnName) {
        alert('يرجى إدخال اسم العمود');
        return;
    }
    
    // هنا يمكن إضافة المنطق لإضافة العمود الجديد
    alert(`تم إضافة العمود: ${columnName} من نوع: ${columnType}`);
    closeModal('addColumnModal');
}

function saveData() {
    console.log('💾 Saving table data');
    showSuccessMessage('تم حفظ البيانات بنجاح!');
}

function exportToExcel() {
    console.log('📊 Exporting to Excel');
    showSuccessMessage('تم تصدير البيانات إلى Excel!');
}

function exportToPDF() {
    console.log('📄 Exporting to PDF');
    showSuccessMessage('تم تصدير البيانات إلى PDF!');
}

// Calculate row totals when values change
function calculateRowTotals(element) {
    const row = element.closest('tr');
    if (!row) return;

    const cartons = parseFloat(row.querySelector('.cell-cartons')?.textContent || 0);
    const piecesPerCarton = parseFloat(row.querySelector('.cell-pieces-carton')?.textContent || 0);
    const unitPrice = parseFloat(row.querySelector('.cell-unit-price')?.textContent || 0);
    const cbmPerCarton = parseFloat(row.querySelector('.cell-cbm')?.textContent || 0);
    const costPrice = parseFloat(row.querySelector('.cell-cost-price')?.textContent || 0);

    // Calculate totals
    const totalPieces = cartons * piecesPerCarton;
    const totalPrice = totalPieces * unitPrice;
    const totalCbm = cartons * cbmPerCarton;
    
    // حساب الربح الصحيح: الربح = السعر الإجمالي - سعر التكلفة
    const profit = totalPrice - costPrice;

    // Update calculated fields
    const totalPiecesCell = row.querySelector('.cell-total-pieces');
    const totalPriceCell = row.querySelector('.cell-total-price');
    const totalCbmCell = row.querySelector('.cell-total-cbm');
    const profitCell = row.querySelector('.cell-profit');

    if (totalPiecesCell) totalPiecesCell.textContent = totalPieces.toLocaleString();
    if (totalPriceCell) totalPriceCell.textContent = totalPrice.toFixed(2);
    if (totalCbmCell) totalCbmCell.textContent = totalCbm.toFixed(3);
    if (profitCell) profitCell.textContent = profit.toFixed(2);

    // Update table totals
    updateTableTotals();
}

// Update table footer totals
function updateTableTotals() {
    const rows = document.querySelectorAll('#tableBody .product-row');
    let totals = {
        cartons: 0,
        piecesCarton: 0,
        totalPieces: 0,
        sets: 0,
        totalPrice: 0,
        totalCbm: 0,
        totalWeight: 0,
        totalCostPrice: 0,
        totalProfit: 0
    };

    rows.forEach(row => {
        totals.cartons += parseFloat(row.querySelector('.cell-cartons')?.textContent || 0);
        totals.piecesCarton += parseFloat(row.querySelector('.cell-pieces-carton')?.textContent || 0);
        totals.totalPieces += parseFloat(row.querySelector('.cell-total-pieces')?.textContent?.replace(/,/g, '') || 0);
        totals.sets += parseFloat(row.querySelector('.cell-sets')?.textContent || 0);
        totals.totalPrice += parseFloat(row.querySelector('.cell-total-price')?.textContent || 0);
        totals.totalCbm += parseFloat(row.querySelector('.cell-total-cbm')?.textContent || 0);
        totals.totalWeight += parseFloat(row.querySelector('.cell-weight')?.textContent || 0);
        totals.totalCostPrice += parseFloat(row.querySelector('.cell-cost-price')?.textContent || 0);
        
        // حساب الربح المنطقي لكل صف: السعر الإجمالي - سعر التكلفة
        const rowTotalPrice = parseFloat(row.querySelector('.cell-total-price')?.textContent || 0);
        const rowCostPrice = parseFloat(row.querySelector('.cell-cost-price')?.textContent || 0);
        totals.totalProfit += (rowTotalPrice - rowCostPrice);
    });

    // Update footer cells
    const updateFooterCell = (id, value, format = 'number') => {
        const cell = document.getElementById(id);
        if (cell) {
            if (format === 'currency') {
                cell.innerHTML = `<strong>¥ ${value.toFixed(2)}</strong>`;
            } else if (format === 'weight') {
                cell.innerHTML = `<strong>${value.toFixed(2)}</strong>`;
            } else if (format === 'cbm') {
                cell.innerHTML = `<strong>${value.toFixed(3)}</strong>`;
            } else {
                cell.innerHTML = `<strong>${value.toLocaleString()}</strong>`;
            }
        }
    };

    updateFooterCell('totalCartons', totals.cartons);
    updateFooterCell('totalPiecesCarton', totals.piecesCarton);
    updateFooterCell('totalPieces', totals.totalPieces);
    updateFooterCell('totalSets', totals.sets);
    updateFooterCell('grandTotal', totals.totalPrice, 'currency');
    updateFooterCell('totalCBM', totals.totalCbm, 'cbm');
    updateFooterCell('totalWeight', totals.totalWeight, 'weight');
    updateFooterCell('totalCostPrice', totals.totalCostPrice, 'currency');
    updateFooterCell('totalProfit', totals.totalProfit, 'currency');

    // Update statistics cards
    updateStatisticsCards(totals);
}

// Update statistics cards
function updateStatisticsCards(totals) {
    const updateStatsCard = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    };

    updateStatsCard('statsProducts', document.querySelectorAll('#tableBody .product-row').length);
    updateStatsCard('statsValue', `¥${totals.totalPrice.toFixed(0)}`);
    updateStatsCard('statsWeight', totals.totalWeight.toFixed(2));
    updateStatsCard('statsCBM', totals.totalCbm.toFixed(3));
}

// Delete row function
function deleteRow(button) {
    const row = button.closest('tr');
    if (row && confirm('هل أنت متأكد من حذف هذا الصف؟')) {
        row.remove();
        updateTableTotals();
        showSuccessMessage('تم حذف الصف بنجاح!');
    }
}

// Duplicate row function
function duplicateRow(button) {
    const row = button.closest('tr');
    if (row) {
        const newRow = row.cloneNode(true);
        // Update the index
        const indexCell = newRow.querySelector('.cell-index');
        if (indexCell) {
            const originalIndex = indexCell.textContent;
            indexCell.textContent = originalIndex + '-copy';
        }
        row.parentNode.insertBefore(newRow, row.nextSibling);
        
        // Add event listeners to the duplicated row
        addCalculationListeners();
        
        updateTableTotals();
        showSuccessMessage('تم تكرار الصف بنجاح!');
    }
}

// Change photo function
function changePhoto(button) {
    const fileInput = document.getElementById('imageFileInput');
    if (fileInput) {
        fileInput.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = button.parentNode.querySelector('.product-image');
                    if (img) {
                        img.src = e.target.result;
                        showSuccessMessage('تم تغيير الصورة بنجاح!');
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        fileInput.click();
    }
}

// Handle image upload
function handleImageUpload(input) {
    // This function is called from the HTML
    // The actual handling is done in changePhoto function
}

// Add calculation listeners to editable cells
function addCalculationListeners() {
    document.querySelectorAll('[contenteditable="true"]').forEach(cell => {
        if (cell.classList.contains('cell-cartons') || 
            cell.classList.contains('cell-pieces-carton') ||
            cell.classList.contains('cell-unit-price') ||
            cell.classList.contains('cell-cbm') ||
            cell.classList.contains('cell-cost-price')) {
            
            // Remove existing listeners to avoid duplicates
            cell.removeEventListener('input', handleCellInput);
            cell.removeEventListener('blur', handleCellInput);
            
            // Add new listeners
            cell.addEventListener('input', handleCellInput);
            cell.addEventListener('blur', handleCellInput);
        }
    });
}

// Handle cell input changes
function handleCellInput(event) {
    const cell = event.target;
    
    // Ensure the value is a valid number
    let value = parseFloat(cell.textContent) || 0;
    if (isNaN(value)) value = 0;
    
    // Update the cell with the validated value
    cell.textContent = value.toString();
    
    // Recalculate row totals
    calculateRowTotals(cell);
}

// Show success message
function showSuccessMessage(message) {
    // Create or update success toast
    let toast = document.getElementById('successToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'successToast';
        toast.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 z-50';
        toast.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-check-circle ml-2"></i>
                <span id="toastMessage">${message}</span>
            </div>
        `;
        document.body.appendChild(toast);
    } else {
        document.getElementById('toastMessage').textContent = message;
    }
    
    // Show toast
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-x-full');
    }, 3000);
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
    console.log('Shipping Task Details page loaded successfully');
    
    // Auto-save comments
    const commentTextarea = document.getElementById('newComment');
    if(commentTextarea) {
        commentTextarea.addEventListener('input', function() {
            localStorage.setItem('shippingComment_ORD-2025-005', this.value);
        });
        // Load saved comment
        const savedComment = localStorage.getItem('shippingComment_ORD-2025-005');
        if (savedComment) {
            commentTextarea.value = savedComment;
        }
    }
    
    // Initialize table calculations
    addCalculationListeners();
    updateTableTotals();
});

