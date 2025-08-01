document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('shipping-form');
    const orderDetailsForm = document.getElementById('order-details-form');
    const loader = document.getElementById('calculation-loader');
    const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'));

    let currentStep = 1;
    let calculatedPrice = null;
    let shipmentData = null;

    const baseRate = 50; // Base rate per CBM
    const weightMultiplier = 2; // Additional cost per kg
    const insuranceRate = 0.02; // 2% of shipment value

    // Initialize
    updateProgressBar(1);
    initializeDatalistInputs();

    // Volume type switching
    const volumeTypeRadios = document.querySelectorAll('input[name="volume-type"]');
    const cbmInputs = document.getElementById('cbm-inputs');
    const dimensionsInputs = document.getElementById('dimensions-inputs');

    volumeTypeRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'cbm') {
                cbmInputs.classList.add('active');
                dimensionsInputs.classList.remove('active');
                clearDimensionsInputs();
            } else {
                cbmInputs.classList.remove('active');
                dimensionsInputs.classList.add('active');
                clearCbmInputs();
            }
        });
    });

    function clearCbmInputs() {
        document.getElementById('cbm').value = '';
        document.getElementById('cartons-cbm').value = '';
    }

    function clearDimensionsInputs() {
        document.getElementById('length').value = '';
        document.getElementById('width').value = '';
        document.getElementById('height').value = '';
        document.getElementById('cartons-dim').value = '';
    }

    // Initialize Datalist Inputs
    function initializeDatalistInputs() {
        const inputsWithDatalist = document.querySelectorAll('input[list]');

        inputsWithDatalist.forEach(input => {
            // Handle input interactions
            input.addEventListener('focus', function () {
                this.style.boxShadow = '0 0 0 4px rgba(2, 95, 112, 0.15)';
                const arrow = this.nextElementSibling;
                if (arrow && arrow.classList.contains('select-arrow')) {
                    arrow.style.transform = 'translateY(-50%) rotate(180deg)';
                    arrow.style.color = 'var(--primary-color)';
                }
            });

            input.addEventListener('blur', function () {
                this.style.boxShadow = '';
                const arrow = this.nextElementSibling;
                if (arrow && arrow.classList.contains('select-arrow')) {
                    arrow.style.transform = 'translateY(-50%)';
                    arrow.style.color = 'var(--text-muted)';
                }
            });

            // Handle click on arrow
            const arrow = input.nextElementSibling;
            if (arrow && arrow.classList.contains('select-arrow')) {
                arrow.addEventListener('click', function () {
                    input.focus();
                    // Trigger datalist dropdown
                    input.click();
                });
            }
        });
    }

    // Step navigation
    window.goToStep = function (step) {
        currentStep = step;
        updateProgressBar(step);
        showStep(step);

        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Add confetti for step 3
        if (step === 3) {
            setTimeout(() => {
                createConfetti();
            }, 500);
        }
    };

    function updateProgressBar(step) {
        const progressFill = document.getElementById('progress-fill');
        const currentStepSpan = document.getElementById('current-step');
        const stepIndicators = document.querySelectorAll('.step-indicator');

        // Update progress fill width
        const progressPercent = (step / 3) * 100;
        progressFill.style.width = progressPercent + '%';

        // Update current step text
        currentStepSpan.textContent = step;

        // Update step indicators
        stepIndicators.forEach((indicator, index) => {
            const stepNumber = index + 1;
            indicator.classList.remove('active', 'completed');

            if (stepNumber < step) {
                indicator.classList.add('completed');
            } else if (stepNumber === step) {
                indicator.classList.add('active');
            }
        });

        // Update progress labels
        const labels = document.querySelectorAll('.progress-labels span');
        labels.forEach((label, index) => {
            const labelStep = index + 1;
            if (labelStep <= step) {
                label.style.color = 'var(--primary-color)';
                label.style.fontWeight = '700';
            } else {
                label.style.color = 'var(--text-muted)';
                label.style.fontWeight = '600';
            }
        });
    }

    function showStep(step) {
        const stepContents = document.querySelectorAll('.step-content');
        stepContents.forEach(content => {
            content.classList.remove('active');
        });

        const targetStep = document.getElementById(`step-${step}`);
        if (targetStep) {
            targetStep.classList.add('active');
        }
    }

    // Form submission for step 1 (calculator)
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate form data
        if (!validateCalculatorForm()) {
            return;
        }

        // Show loader
        loader.style.display = 'flex';

        // Get form values
        const volumeType = document.querySelector('input[name="volume-type"]:checked').value;
        let volume = 0;
        let cartons = 0;

        if (volumeType === 'cbm') {
            volume = parseFloat(document.getElementById('cbm').value) || 0;
            cartons = parseInt(document.getElementById('cartons-cbm').value) || 0;
        } else {
            const length = parseFloat(document.getElementById('length').value) || 0;
            const width = parseFloat(document.getElementById('width').value) || 0;
            const height = parseFloat(document.getElementById('height').value) || 0;
            cartons = parseInt(document.getElementById('cartons-dim').value) || 0;

            // Calculate CBM from dimensions (convert cm to meters)
            volume = (length * width * height * cartons) / 1000000;
        }

        shipmentData = {
            origin: document.getElementById('origin').value,
            destination: document.getElementById('destination').value,
            itemType: document.getElementById('item-type').value,
            volume: volume,
            cartons: cartons,
            weight: parseFloat(document.getElementById('weight').value),
            insurance: document.getElementById('insurance').checked,
            volumeType: volumeType
        };

        // Add dimensions if using dimensions method
        if (volumeType === 'dimensions') {
            shipmentData.length = parseFloat(document.getElementById('length').value);
            shipmentData.width = parseFloat(document.getElementById('width').value);
            shipmentData.height = parseFloat(document.getElementById('height').value);
        }

        // Calculate costs
        calculateShippingCost(shipmentData);

        // Simulate calculation delay
        setTimeout(() => {
            // Update shipment details
            updateShipmentDetails(shipmentData);

            // Update costs
            updateCostSummary(shipmentData);

            // Hide loader and show modal
            loader.style.display = 'none';
            resultsModal.show();

            showToast('تم حساب التكلفة بنجاح!', 'success');
        }, 2000);
    });

    function validateCalculatorForm() {
        const volumeType = document.querySelector('input[name="volume-type"]:checked').value;

        if (volumeType === 'cbm') {
            const cbmField = document.getElementById('cbm');
            const cartonsField = document.getElementById('cartons-cbm');

            if (!cbmField.value) {
                showFieldError(cbmField, 'يرجى إدخال الحجم بالـ CBM');
                return false;
            }
            if (!cartonsField.value) {
                showFieldError(cartonsField, 'يرجى إدخال عدد الكراتين');
                return false;
            }
        } else {
            const lengthField = document.getElementById('length');
            const widthField = document.getElementById('width');
            const heightField = document.getElementById('height');
            const cartonsField = document.getElementById('cartons-dim');

            if (!lengthField.value) {
                showFieldError(lengthField, 'يرجى إدخال الطول');
                return false;
            }
            if (!widthField.value) {
                showFieldError(widthField, 'يرجى إدخال العرض');
                return false;
            }
            if (!heightField.value) {
                showFieldError(heightField, 'يرجى إدخال الارتفاع');
                return false;
            }
            if (!cartonsField.value) {
                showFieldError(cartonsField, 'يرجى إدخال عدد الكراتين');
                return false;
            }
        }

        const weightField = document.getElementById('weight');
        const itemTypeField = document.getElementById('item-type');
        const destinationField = document.getElementById('destination');

        if (!weightField.value) {
            showFieldError(weightField, 'يرجى إدخال الوزن');
            return false;
        }
        if (!itemTypeField.value) {
            showFieldError(itemTypeField, 'يرجى إدخال نوع البضاعة');
            return false;
        }
        if (!destinationField.value) {
            showFieldError(destinationField, 'يرجى اختيار الوجهة');
            return false;
        }

        return true;
    }

    function showFieldError(field, message) {
        field.style.borderColor = '#dc3545';
        field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.2)';
        field.style.animation = 'shake 0.6s ease-in-out';
        field.focus();

        // Remove error styling after user starts typing
        field.addEventListener('input', function () {
            this.style.borderColor = '';
            this.style.boxShadow = '';
            this.style.animation = '';
        }, { once: true });

        showToast(message, 'error');
    }

    function calculateShippingCost(data) {
        // Calculate shipping cost based on volume and weight
        const volumeCost = data.volume * baseRate;
        const weightCost = data.weight * weightMultiplier;
        const shippingCost = Math.max(volumeCost, weightCost); // Take the higher value

        // Calculate insurance cost if selected
        let insuranceCost = 0;
        if (data.insurance) {
            // Estimate shipment value for insurance calculation
            const estimatedValue = shippingCost * 10; // Rough estimate
            insuranceCost = estimatedValue * insuranceRate;
        }

        data.shippingCost = shippingCost;
        data.insuranceCost = insuranceCost;
        data.totalCost = shippingCost + insuranceCost;

        calculatedPrice = data.totalCost;
    }

    function updateShipmentDetails(data) {
        const shipmentDetails = document.getElementById('shipment-details');

        let dimensionsText = '';
        if (data.volumeType === 'cbm') {
            dimensionsText = `${data.volume.toFixed(2)} CBM`;
        } else {
            dimensionsText = `${data.length} × ${data.width} × ${data.height} سم`;
        }

        shipmentDetails.innerHTML = `
            <div class="detail-row">
                <span class="detail-label"><i class="fas fa-boxes"></i> نوع البضاعة:</span>
                <span class="detail-value">${data.itemType}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label"><i class="fas fa-route"></i> المسار:</span>
                <span class="detail-value">${data.origin} ← ${data.destination}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label"><i class="fas fa-cube"></i> الحجم:</span>
                <span class="detail-value">${dimensionsText}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label"><i class="fas fa-box"></i> عدد الكراتين:</span>
                <span class="detail-value">${data.cartons}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label"><i class="fas fa-weight-hanging"></i> الوزن:</span>
                <span class="detail-value">${data.weight} كجم</span>
            </div>
            ${data.insurance ? `
            <div class="detail-row">
                <span class="detail-label"><i class="fas fa-shield-alt"></i> التأمين:</span>
                <span class="detail-value">مشمول</span>
            </div>
            ` : ''}
        `;
    }

    function updateCostSummary(data) {
        const shippingCostSpan = document.getElementById('shipping-cost');
        const insuranceCostSpan = document.getElementById('insurance-cost');
        const totalCostSpan = document.getElementById('total-cost');
        const insuranceRow = document.getElementById('insurance-row');

        shippingCostSpan.textContent = `$${data.shippingCost.toFixed(2)}`;

        if (data.insurance) {
            insuranceRow.style.display = 'flex';
            insuranceCostSpan.textContent = `$${data.insuranceCost.toFixed(2)}`;
        } else {
            insuranceRow.style.display = 'none';
        }

        totalCostSpan.textContent = `$${data.totalCost.toFixed(2)}`;

        // Add animation to total cost
        totalCostSpan.style.animation = 'totalCostPulse 1s ease';
        setTimeout(() => {
            totalCostSpan.style.animation = '';
        }, 1000);
    }

    // Accept price and go to step 2
    window.acceptPrice = function () {
        resultsModal.hide();
        setTimeout(() => {
            goToStep(2);
            showToast('ممتاز! الآن أكمل بيانات الطلب', 'success');
        }, 300);
    };

    // Form submission for step 2 (order details)
    orderDetailsForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate order details form
        if (!validateOrderDetailsForm()) {
            return;
        }

        // Process order submission
        submitOrder();
    });

    function validateOrderDetailsForm() {
        const fields = [
            { id: 'customer-name', message: 'يرجى إدخال الاسم الكامل' },
            { id: 'customer-phone', message: 'يرجى إدخال رقم الهاتف' },
            { id: 'delivery-address', message: 'يرجى إدخال عنوان التسليم' },
            { id: 'product-description', message: 'يرجى إدخال وصف المنتجات' },
            { id: 'product-quantity', message: 'يرجى إدخال الكمية' }
        ];

        for (let field of fields) {
            const element = document.getElementById(field.id);
            if (!element.value.trim()) {
                showFieldError(element, field.message);
                return false;
            }
        }

        // Validate phone number format
        const phoneField = document.getElementById('customer-phone');
        const phonePattern = /^[\+]?[0-9\-\(\)\s]+$/;
        if (!phonePattern.test(phoneField.value)) {
            showFieldError(phoneField, 'يرجى إدخال رقم هاتف صحيح');
            return false;
        }

        // Validate email if provided
        const emailField = document.getElementById('customer-email');
        if (emailField.value && !isValidEmail(emailField.value)) {
            showFieldError(emailField, 'يرجى إدخال بريد إلكتروني صحيح');
            return false;
        }

        return true;
    }

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function submitOrder() {
        // Show loading state
        const submitBtn = orderDetailsForm.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;

        // Collect all order data
        const orderData = {
            // Shipping data
            ...shipmentData,
            calculatedPrice: calculatedPrice,

            // Product details
            productDescription: document.getElementById('product-description').value,
            productQuantity: document.getElementById('product-quantity').value,
            productValue: document.getElementById('product-value').value,

            // Customer data
            customerName: document.getElementById('customer-name').value,
            customerPhone: document.getElementById('customer-phone').value,
            customerEmail: document.getElementById('customer-email').value,
            customerCompany: document.getElementById('customer-company').value,
            deliveryAddress: document.getElementById('delivery-address').value,
            orderNotes: document.getElementById('order-notes').value,

            // Timestamp
            submittedAt: new Date().toISOString()
        };

        console.log('Order submitted:', orderData);

        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;

            // Go to success step
            goToStep(3);

            showToast('تم إرسال طلب السعر بنجاح!', 'success');
        }, 2500);
    }

    // Reset calculator
    window.resetCalculator = function () {
        form.reset();
        orderDetailsForm.reset();
        shipmentData = null;
        calculatedPrice = null;

        // Reset volume type to CBM
        document.querySelector('input[name="volume-type"][value="cbm"]').checked = true;
        cbmInputs.classList.add('active');
        dimensionsInputs.classList.remove('active');

        goToStep(1);
        showToast('تم إعادة تعيين النموذج', 'info');
    };

    // Confetti animation
    function createConfetti() {
        const container = document.getElementById('confetti-container');
        const colors = ['#f5a623', '#025f70', '#28a745', '#17a2b8', '#dc3545'];

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 2 + 's';
                confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';

                container.appendChild(confetti);

                setTimeout(() => {
                    if (container.contains(confetti)) {
                        container.removeChild(confetti);
                    }
                }, 5000);
            }, i * 100);
        }
    }

    // Toast notification system
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;

        const icon = getToastIcon(type);
        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        // Show with animation
        setTimeout(() => toast.classList.add('show'), 100);

        // Remove after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 4000);
    }

    function getToastIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-triangle',
            'warning': 'exclamation-circle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Add smooth form interactions
    document.querySelectorAll('.form-input').forEach(field => {
        field.addEventListener('focus', function () {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
        });

        field.addEventListener('blur', function () {
            this.style.transform = '';
            if (!this.matches(':focus')) {
                this.style.boxShadow = '';
            }
        });
    });

    // Add button interactions
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
});

// Add CSS for toast notifications and additional animations
const additionalStyles = `
    .toast-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        padding: 18px 24px;
        box-shadow: 0 12px 30px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 9999;
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        min-width: 320px;
        border-left: 5px solid;
    }
    
    .toast-notification.show {
        transform: translateX(0);
    }
    
    .toast-error {
        border-left-color: #dc3545;
        color: #721c24;
    }
    
    .toast-success {
        border-left-color: #28a745;
        color: #155724;
    }
    
    .toast-warning {
        border-left-color: #ffc107;
        color: #856404;
    }
    
    .toast-info {
        border-left-color: #17a2b8;
        color: #0c5460;
    }
    
    .toast-notification i {
        font-size: 20px;
        opacity: 0.9;
    }
    
    .toast-notification span {
        font-weight: 600;
        line-height: 1.5;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
        20%, 40%, 60%, 80% { transform: translateX(8px); }
    }
    
    @keyframes totalCostPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); color: var(--secondary-color); }
    }
    
    @media (max-width: 768px) {
        .toast-notification {
            right: 10px;
            left: 10px;
            transform: translateY(-100%);
            max-width: none;
            min-width: auto;
        }
        
        .toast-notification.show {
            transform: translateY(0);
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);