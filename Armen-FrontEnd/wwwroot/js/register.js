document.addEventListener('DOMContentLoaded', function() {
    // Add animation delays to form elements
    const slideElements = document.querySelectorAll('.slide-in');
    slideElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });

    // Form validation and effects
    const form = document.getElementById('registerForm');
    const inputs = form.querySelectorAll('.input-field');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.borderColor = '#c86404';
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
                this.style.borderColor = '';
            }
        });

        // Add typing effect
        input.addEventListener('input', function() {
            this.style.borderColor = '#c86404';
            setTimeout(() => {
                if (!this.matches(':focus')) {
                    this.style.borderColor = '';
                }
            }, 300);
        });
    });

    // Password strength indicator
    if (passwordInput) {
        const strengthBar = document.createElement('div');
        strengthBar.className = 'password-strength';
        strengthBar.innerHTML = '<div class="password-strength-bar"></div>';
        passwordInput.parentElement.appendChild(strengthBar);

        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthBarFill = strengthBar.querySelector('.password-strength-bar');
            
            let strength = 0;
            if (password.length >= 8) strength++;
            if (/[a-z]/.test(password)) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;

            strengthBarFill.className = 'password-strength-bar';
            if (strength < 2) {
                strengthBarFill.classList.add('weak');
            } else if (strength < 4) {
                strengthBarFill.classList.add('medium');
            } else {
                strengthBarFill.classList.add('strong');
            }
        });
    }

    // Password confirmation validation
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value !== passwordInput.value) {
                this.style.borderColor = '#ef4444';
                this.classList.add('invalid');
                this.classList.remove('valid');
                this.setCustomValidity('????? ?????? ??? ???????');
            } else if (this.value) {
                this.style.borderColor = '#10b981';
                this.classList.add('valid');
                this.classList.remove('invalid');
                this.setCustomValidity('');
            }
        });

        passwordInput.addEventListener('input', function() {
            if (confirmPasswordInput.value && confirmPasswordInput.value !== this.value) {
                confirmPasswordInput.style.borderColor = '#ef4444';
                confirmPasswordInput.classList.add('invalid');
                confirmPasswordInput.classList.remove('valid');
                confirmPasswordInput.setCustomValidity('????? ?????? ??? ???????');
            } else if (confirmPasswordInput.value === this.value && this.value) {
                confirmPasswordInput.style.borderColor = '#10b981';
                confirmPasswordInput.classList.add('valid');
                confirmPasswordInput.classList.remove('invalid');
                confirmPasswordInput.setCustomValidity('');
            }
        });
    }

    // Submit button effect
    form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('.submit-btn');
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const phone = this.querySelector('input[name="phone"]').value;
        const password = this.querySelector('input[name="password"]').value;
        const confirmPassword = this.querySelector('input[name="confirmPassword"]').value;
        const terms = this.querySelector('input[name="terms"]').checked;

        // Basic validation
        if (!name || !email || !phone || !password || !confirmPassword) {
            e.preventDefault();
            showAlert('?????? ??? ???? ?????? ????????', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            e.preventDefault();
            showAlert('?????? ????? ???? ???????? ????', 'error');
            return;
        }

        if (password.length < 6) {
            e.preventDefault();
            showAlert('???? ?????? ??? ?? ???? 6 ???? ??? ?????', 'error');
            return;
        }

        if (password !== confirmPassword) {
            e.preventDefault();
            showAlert('????? ?????? ??? ???????', 'error');
            confirmPasswordInput.focus();
            return;
        }

        if (!terms) {
            e.preventDefault();
            showAlert('??? ???????? ??? ?????? ????????', 'error');
            return;
        }

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-left: 8px;"></i> ???? ????? ??????...';
        submitBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            showAlert('?? ????? ?????? ?????!', 'success');
        }, 1500);
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.startsWith('970')) {
                    value = '+970 ' + value.substring(3);
                } else if (value.startsWith('0')) {
                    value = '+970 ' + value.substring(1);
                } else if (!value.startsWith('970')) {
                    value = '+970 ' + value;
                }
                
                // Format the number with spaces
                if (value.length > 8) {
                    value = value.substring(0, 5) + ' ' + value.substring(5, 7) + ' ' + value.substring(7, 10) + ' ' + value.substring(10, 14);
                }
                
                this.value = value;
            }
        });
    }

    // Video background handling
    const video = document.getElementById('bg-video');
    if (video) {
        video.addEventListener('loadeddata', function() {
            video.style.opacity = '1';
        });

        // Fallback for mobile devices
        video.addEventListener('error', function() {
            document.body.style.background = 'linear-gradient(135deg, #025f70, #c86404)';
        });
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Alert notification function
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert-notification');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alert = document.createElement('div');
    alert.className = `alert-notification alert-${type}`;
    
    const colors = {
        success: 'background: linear-gradient(135deg, #10b981, #065f46); color: white;',
        error: 'background: linear-gradient(135deg, #ef4444, #dc2626); color: white;',
        warning: 'background: linear-gradient(135deg, #f59e0b, #d97706); color: white;',
        info: 'background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white;'
    };

    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };

    alert.innerHTML = `
        <i class="${icons[type]}" style="margin-left: 8px;"></i>
        ${message}
    `;

    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(400px);
        transition: all 0.3s ease;
        ${colors[type] || colors.info}
    `;

    document.body.appendChild(alert);

    // Animate in
    setTimeout(() => {
        alert.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 4 seconds
    setTimeout(() => {
        alert.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(alert)) {
                document.body.removeChild(alert);
            }
        }, 300);
    }, 4000);
}

// Add shake animation to invalid fields
function shakeField(field) {
    field.classList.add('shake');
    setTimeout(() => {
        field.classList.remove('shake');
    }, 500);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to submit form
    if (e.key === 'Enter' && e.target.matches('.input-field')) {
        const form = e.target.closest('form');
        if (form) {
            const submitBtn = form.querySelector('.submit-btn');
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.click();
            }
        }
    }
});

// Add focus ring for accessibility
document.addEventListener('focusin', function(e) {
    if (e.target.matches('.input-field, .submit-btn, a')) {
        e.target.style.outline = '2px solid #c86404';
        e.target.style.outlineOffset = '2px';
    }
});

document.addEventListener('focusout', function(e) {
    if (e.target.matches('.input-field, .submit-btn, a')) {
        e.target.style.outline = '';
        e.target.style.outlineOffset = '';
    }
});

// Prevent form submission on demo
function preventDemoSubmission() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showAlert('?? ????? ?????? ?????! ???? ????? ?????? ?????? ??????.', 'success');
            
            setTimeout(() => {
                window.location.href = '/User/Login';
            }, 2000);
        });
    });
}