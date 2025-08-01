<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        // Initialize AOS
        document.addEventListener('DOMContentLoaded', function() {
            AOS.init({
                once: true,
                duration: 800,
                easing: 'ease-in-out',
            });
            
            console.log('Task Details page loaded successfully');
            
            // Load task data
            loadTaskData();
            
            // Initialize auto-save for notes
            initializeAutoSave();
            
            // Initialize sent status
            updateSentStatus();
            
            // Prevent auto notifications
            preventAutoNotifications();
            
            console.log('✅ Task Details page initialized successfully');
        });

        // Load task data based on ID
        function loadTaskData() {
            // Simulate different task data based on ID
            const taskDatabase = {
                'ORD-2025-005': {
                    client: 'شركة التقنيات المتطورة',
                    employee: 'أحمد محمد سالم',
                    date: '2025-07-20',
                    origin: 'الصين',
                    port: 'ميناء العقبة',
                    goodsType: 'أجهزة إلكترونية',
                    weight: '2.5 طن',
                    status: 'قيد المراجعة'
                },
                'ORD-2025-006': {
                    client: 'شركة الأدوات الطبية',
                    employee: 'سارة أحمد',
                    date: '2025-07-22',
                    origin: 'ألمانيا',
                    port: 'مطار الملكة علياء',
                    goodsType: 'أدوات طبية وجراحية',
                    weight: '500 كجم',
                    status: 'جديدة'
                },
                'ORD-2025-007': {
                    client: 'شركة البناء والتشييد',
                    employee: 'محمد العلي',
                    date: '2025-07-18',
                    origin: 'تركيا',
                    port: 'ميناء العقبة',
                    goodsType: 'مواد بناء ومعدات ثقيلة',
                    weight: '15 طن',
                    status: 'قيد التنفيذ'
                },
                'ORD-2025-008': {
                    client: 'شركة المنسوجات الراقية',
                    employee: 'عمر يوسف',
                    date: '2025-07-23',
                    origin: 'إيطاليا',
                    port: 'ميناء العقبة',
                    goodsType: 'أقمشة وخيوط عالية الجودة',
                    weight: '3.2 طن',
                    status: 'جديدة'
                },
                'ORD-2025-009': {
                    client: 'شركة الصناعات الغذائية',
                    employee: 'نور الدين',
                    date: '2025-07-21',
                    origin: 'فرنسا',
                    port: 'مطار الملكة علياء',
                    goodsType: 'مواد غذائية معلبة ومواد حافظة',
                    weight: '1.8 طن',
                    status: 'قيد المراجعة'
                },
                'ORD-2025-010': {
                    client: 'شركة قطع غيار السيارات',
                    employee: 'خالد أبو زيد',
                    date: '2025-07-19',
                    origin: 'كوريا الجنوبية',
                    port: 'ميناء العقبة',
                    goodsType: 'قطع غيار وإكسسوارات للسيارات',
                    weight: '5.5 طن',
                    status: 'قيد التنفيذ'
                }
            };
            
            // Get task data or use default
            taskData = taskDatabase[currentTaskId] || taskDatabase['ORD-2025-005'];
            
            // Update form fields
            updateFormFields();
            
            console.log('📊 Task data loaded:', taskData);
        }

        // Update form fields with task data
        function updateFormFields() {
            try {
                // Update form inputs
                const orderIdInput = document.getElementById('orderId');
                const clientNameInput = document.getElementById('clientName');
                const employeeNameInput = document.getElementById('employeeName');
                const orderDateInput = document.getElementById('orderDate');
                const originCountryInput = document.getElementById('originCountry');
                const arrivalPortInput = document.getElementById('arrivalPort');
                const goodsTypeInput = document.getElementById('goodsType');
                const totalWeightInput = document.getElementById('totalWeight');
                
                if (orderIdInput) orderIdInput.value = currentTaskId;
                if (clientNameInput) clientNameInput.value = taskData.client;
                if (employeeNameInput) employeeNameInput.value = taskData.employee;
                if (orderDateInput) orderDateInput.value = taskData.date;
                if (originCountryInput) originCountryInput.value = taskData.origin;
                if (arrivalPortInput) arrivalPortInput.value = taskData.port;
                if (goodsTypeInput) goodsTypeInput.value = taskData.goodsType;
                if (totalWeightInput) totalWeightInput.value = taskData.weight;
                
                // Update status badge
                const statusBadge = document.querySelector('.status-badge');
                if (statusBadge) {
                    statusBadge.textContent = taskData.status;
                    statusBadge.className = 'status-badge ' + getStatusClass(taskData.status);
                }
                
                console.log('✅ Form fields updated successfully');
            } catch (error) {
                console.error('❌ Error updating form fields:', error);
            }
        }

        // Get status class based on status text
        function getStatusClass(status) {
            const statusClasses = {
                'جديدة': 'status-new',
                'قيد التنفيذ': 'status-in-progress',
                'قيد المراجعة': 'status-review',
                'مكتملة': 'status-completed',
                'ملغية': 'status-cancelled'
            };
            return statusClasses[status] || 'status-review';
        }

        // Initialize auto-save for notes
        function initializeAutoSave() {
            const notesTextarea = document.getElementById('reviewNotes');
            if (notesTextarea) {
                // Auto-save notes
                notesTextarea.addEventListener('input', function() {
                    localStorage.setItem(`reviewNotes_${currentTaskId}`, this.value);
                    console.log(`💾 Notes auto-saved for ${currentTaskId}`);
                });
                
                // Load saved notes
                const savedNotes = localStorage.getItem(`reviewNotes_${currentTaskId}`);
                if (savedNotes) {
                    notesTextarea.value = savedNotes;
                    console.log(`📝 Loaded saved notes for ${currentTaskId}`);
                }
            }
        }

        // Save order details
        function saveOrderDetails() {
            console.log('💾 Saving order details for:', currentTaskId);
            
            const formData = {
                orderId: document.getElementById('orderId')?.value,
                clientName: document.getElementById('clientName')?.value,
                employeeName: document.getElementById('employeeName')?.value,
                orderDate: document.getElementById('orderDate')?.value,
                originCountry: document.getElementById('originCountry')?.value,
                arrivalPort: document.getElementById('arrivalPort')?.value,
                goodsType: document.getElementById('goodsType')?.value,
                totalWeight: document.getElementById('totalWeight')?.value
            };
            
            // Save to localStorage
            localStorage.setItem(`orderData_${currentTaskId}`, JSON.stringify(formData));
            
            // Show success message
            showSuccessMessage('تم حفظ التعديلات بنجاح!');
            
            console.log('✅ Order details saved:', formData);
        }

        // Complete review function
        function completeReview() {
            console.log('🎯 Completing review for:', currentTaskId);
            
            const modal = document.getElementById('completionModal');
            if (modal) {
                modal.style.display = 'flex';
                modal.classList.add('show');
            }
        }

        // Confirm completion
        function confirmCompletion() {
            const notes = document.getElementById('reviewNotes')?.value.trim();
            
            if (!notes) {
                alert('يرجى إضافة ملاحظاتك قبل إكمال المراجعة');
                closeModal('completionModal');
                document.getElementById('reviewNotes')?.focus();
                return;
            }

            // Show loading state
            const btn = event.target;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري الإرسال...';
            btn.disabled = true;

            // Simulate completion process
            setTimeout(() => {
                closeModal('completionModal');
                showSuccessMessage(`تم إكمال مراجعة ${currentTaskId} وإرسال إشعار لموظف الاستيراد بنجاح!`);
                
                // Mark as completed
                localStorage.setItem(`completed_${currentTaskId}`, 'true');
                
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                // Redirect after delay
                setTimeout(() => {
                    window.location.href = '/Import/Tasks';
                }, 1500);
            }, 2000);
        }

        // Send to Shipping
        function sendToShipping() {
            console.log('🚛 Sending to shipping for:', currentTaskId);
            
            // Check if table has data
            const tableBody = document.getElementById('tableBody');
            if (!tableBody || tableBody.children.length === 0) {
                alert('لا يوجد منتجات في الجدول للإرسال');
                return;
            }
            
            const modal = document.getElementById('shippingModal');
            if (modal) {
                modal.style.display = 'flex';
                modal.classList.add('show');
            }
        }

        // Confirm send to shipping
        function confirmSendToShipping() {
            const btn = event.target;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري الإرسال...';
            btn.disabled = true;

            // Simulate sending process
            setTimeout(() => {
                closeModal('shippingModal');
                showSuccessMessage(`تم إرسال جدول المنتجات لـ ${currentTaskId} لقسم الشحن بنجاح!`);
                
                // Mark as sent to shipping
                localStorage.setItem(`sentToShipping_${currentTaskId}`, 'true');
                updateSentStatus();
                
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        }

        // Send to Accounting
        function sendToAccounting() {
            console.log('💰 Sending to accounting for:', currentTaskId);
            
            // Check if table has data
            const tableBody = document.getElementById('tableBody');
            if (!tableBody || tableBody.children.length === 0) {
                alert('لا يوجد منتجات في الجدول للإرسال');
                return;
            }
            
            const modal = document.getElementById('accountingModal');
            if (modal) {
                modal.style.display = 'flex';
                modal.classList.add('show');
            }
        }

        // Confirm send to accounting
        function confirmSendToAccounting() {
            const btn = event.target;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري الإرسال...';
            btn.disabled = true;

            // Simulate sending process
            setTimeout(() => {
                closeModal('accountingModal');
                showSuccessMessage(`تم إرسال جدول المنتجات لـ ${currentTaskId} لقسم المحاسبة بنجاح!`);
                
                // Mark as sent to accounting
                localStorage.setItem(`sentToAccounting_${currentTaskId}`, 'true');
                updateSentStatus();
                
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        }

        // Update sent status indicators
        function updateSentStatus() {
            const sentToShipping = localStorage.getItem(`sentToShipping_${currentTaskId}`);
            const sentToAccounting = localStorage.getItem(`sentToAccounting_${currentTaskId}`);
            
            // Update shipping button if sent
            if (sentToShipping) {
                const shippingBtn = document.querySelector('button[onclick="sendToShipping()"]');
                if (shippingBtn && !shippingBtn.querySelector('.sent-indicator')) {
                    shippingBtn.insertAdjacentHTML('beforeend', ' <span class="sent-indicator">✓</span>');
                    shippingBtn.style.background = '#10b981';
                    shippingBtn.title = 'تم الإرسال لقسم الشحن';
                }
            }
            
            // Update accounting button if sent
            if (sentToAccounting) {
                const accountingBtn = document.querySelector('button[onclick="sendToAccounting()"]');
                if (accountingBtn && !accountingBtn.querySelector('.sent-indicator')) {
                    accountingBtn.insertAdjacentHTML('beforeend', ' <span class="sent-indicator">✓</span>');
                    accountingBtn.style.background = '#10b981';
                    accountingBtn.title = 'تم الإرسال لقسم المحاسبة';
                }
            }
        }

        // Add comment function
        function addComment() {
            const commentInput = document.getElementById('newComment');
            if (!commentInput || !commentInput.value.trim()) {
                alert('يرجى كتابة تعليق قبل الإرسال');
                return;
            }
            
            const commentsSection = document.querySelector('.comments-section');
            const now = new Date();
            const dateStr = now.toLocaleDateString('ar-SA') + ' - ' + now.toLocaleTimeString('ar-SA', {hour: '2-digit', minute: '2-digit'});
            
            // Create new comment element
            const newComment = document.createElement('div');
            newComment.className = 'comment-item';
            newComment.innerHTML = `
                <div class="comment-header">
                    <span class="comment-author">سامر أحمد (التخليص الجمركي)</span>
                    <span class="comment-date">${dateStr}</span>
                </div>
                <div class="comment-text">${commentInput.value.trim()}</div>
            `;
            
            // Insert before the add comment section
            const addCommentSection = document.querySelector('.mt-6');
            commentsSection.insertBefore(newComment, addCommentSection);
            
            // Clear input
            commentInput.value = '';
            
            // Save comment
            const comments = JSON.parse(localStorage.getItem(`comments_${currentTaskId}`) || '[]');
            comments.push({
                author: 'سامر أحمد (التخليص الجمركي)',
                date: dateStr,
                text: commentInput.value.trim()
            });
            localStorage.setItem(`comments_${currentTaskId}`, JSON.stringify(comments));
            
            showSuccessMessage('تم إضافة التعليق بنجاح!');
            
            console.log('💬 Comment added for:', currentTaskId);
        }

        // Close modal function
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
            }
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
            
            if (sidebar && mainContent && toggleButton) {
                const toggleIcon = toggleButton.querySelector('i');
                
                sidebar.classList.toggle('hidden');
                
                if (sidebar.classList.contains('hidden')) {
                    mainContent.classList.remove('mr-64');
                    mainContent.classList.add('mr-0');
                    if (toggleIcon) toggleIcon.className = 'fas fa-bars';
                } else {
                    mainContent.classList.remove('mr-0');
                    mainContent.classList.add('mr-64');
                    if (toggleIcon) toggleIcon.className = 'fas fa-times';
                }
            }
        }

        // Prevent any automatic notifications or popups
        function preventAutoNotifications() {
            // Override any automatic notification functions
            window.showAutoNotification = function() { return false; };
            window.autoShowModal = function() { return false; };
            
            // Clear any existing intervals for notifications
            for (let i = 1; i < 99999; i++) {
                window.clearInterval(i);
                window.clearTimeout(i);
            }
        }

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
                
                // Update totals immediately
                updateTableTotals();
                showSuccessMessage('تم إضافة صف جديد!');
                
                console.log('✅ New row added and listeners attached');
            }
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
                
                // حساب الربح الصحيح لكل صف: السعر الإجمالي - سعر التكلفة
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

        // Add Column functionality
        function addNewColumn() {
            console.log('➕ Opening add column modal');
            const modal = document.getElementById('addColumnModal');
            if (modal) {
                modal.style.display = 'flex';
            }
        }

        function confirmAddColumn() {
            const columnName = document.getElementById('newColumnName')?.value.trim();
            const columnType = document.getElementById('columnType')?.value;
            
            if (!columnName) {
                alert('يرجى إدخال اسم العمود');
                return;
            }
            
            console.log('Adding new column:', columnName, columnType);
            
            // Add to header
            const thead = document.querySelector('#productsTable thead tr');
            const actionsHeader = thead.querySelector('.col-actions');
            const newHeader = document.createElement('th');
            newHeader.className = `col-${columnName.toLowerCase().replace(/\s+/g, '-')}`;
            newHeader.textContent = columnName;
            thead.insertBefore(newHeader, actionsHeader);
            
            // Add to all rows
            const rows = document.querySelectorAll('#tableBody .product-row');
            rows.forEach(row => {
                const actionsCell = row.querySelector('.cell-actions');
                const newCell = document.createElement('td');
                newCell.className = `cell-${columnName.toLowerCase().replace(/\s+/g, '-')}`;
                newCell.contentEditable = true;
                
                if (columnType === 'number' || columnType === 'currency') {
                    newCell.textContent = '0.00';
                } else if (columnType === 'date') {
                    newCell.textContent = new Date().toISOString().split('T')[0];
                } else {
                    newCell.textContent = '';
                }
                
                row.insertBefore(newCell, actionsCell);
            });
            
            // Add to footer
            const footerRow = document.querySelector('#productsTable tfoot tr');
            if (footerRow) {
                const actionsFooter = footerRow.querySelector('td:last-child');
                const newFooterCell = document.createElement('td');
                newFooterCell.innerHTML = '<strong>-</strong>';
                footerRow.insertBefore(newFooterCell, actionsFooter);
            }
            
            closeModal('addColumnModal');
            addCalculationListeners();
            showSuccessMessage(`تم إضافة العمود "${columnName}" بنجاح!`);
        }

        // Export functions
        function exportToExcel() {
            console.log('📊 Exporting to Excel...');
            
            // Recalculate before export
            updateTableTotals();
            
            if (typeof XLSX === 'undefined') {
                alert('مكتبة Excel غير متاحة حالياً');
                return;
            }
            
            const table = document.getElementById('productsTable');
            const workbook = XLSX.utils.table_to_book(table);
            XLSX.writeFile(workbook, `منتجات_${currentTaskId}_${new Date().toISOString().split('T')[0]}.xlsx`);
            showSuccessMessage('تم تصدير البيانات إلى Excel بنجاح!');
        }

        function exportToPDF() {
            console.log('📄 Exporting to PDF...');
            
            // Recalculate before export
            updateTableTotals();
            
            if (typeof jsPDF === 'undefined') {
                alert('مكتبة PDF غير متاحة حالياً');
                return;
            }
            
            const element = document.getElementById('productsTable');
            
            if (typeof html2canvas !== 'undefined') {
                html2canvas(element).then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    const imgWidth = 210;
                    const pageHeight = 295;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    let heightLeft = imgHeight;
                    let position = 0;

                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;

                    while (heightLeft >= 0) {
                        position = heightLeft - imgHeight;
                        pdf.addPage();
                        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                    }

                    pdf.save(`منتجات_${currentTaskId}_${new Date().toISOString().split('T')[0]}.pdf`);
                    showSuccessMessage('تم تصدير البيانات إلى PDF بنجاح!');
                });
            } else {
                alert('مكتبة html2canvas غير متاحة حالياً');
            }
        }

