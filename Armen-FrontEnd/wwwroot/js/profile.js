// Profile Page JavaScript - محسن ومتطور
document.addEventListener('DOMContentLoaded', function() {
    initializeProfile();
    animateStatsOnLoad();
    initializeScrollAnimations();
});

function initializeProfile() {
    // Initialize all profile components
    initializeMenuNavigation();
    initializeSettingsTabs();
    initializeNotifications();
    initializeInteractiveElements();
    initializeFormAnimations();
    initializeTooltips();
    handleResponsiveChanges();
}

// Enhanced Menu Navigation with smooth transitions
function initializeMenuNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.profile-section');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');
            
            // Remove active class from all menu items
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
                menuItem.style.transform = '';
            });
            
            // Add active class to clicked item with animation
            item.classList.add('active');
            item.style.transform = 'translateX(-10px) scale(1.02)';
            
            // Hide all sections with fade out
            sections.forEach(section => {
                if (section.classList.contains('active')) {
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        section.classList.remove('active');
                    }, 300);
                }
            });
            
            // Show target section with fade in
            setTimeout(() => {
                const targetSection = document.getElementById(targetTab);
                if (targetSection) {
                    targetSection.classList.add('active');
                    
                    // Trigger animations for the new section
                    setTimeout(() => {
                        targetSection.style.opacity = '1';
                        targetSection.style.transform = 'translateY(0)';
                        triggerSectionAnimations(targetSection);
                    }, 50);
                }
            }, 300);
            
            // Show success notification
            showNotification(`تم التبديل إلى ${item.querySelector('span').textContent}`, 'success');
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(-3px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
}

// Enhanced Settings Tabs
function initializeSettingsTabs() {
    const settingsTabs = document.querySelectorAll('.settings-tab');
    const settingsContents = document.querySelectorAll('.settings-content');

    settingsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-settings-tab');
            
            // Remove active class from all tabs
            settingsTabs.forEach(t => {
                t.classList.remove('active');
                t.style.transform = '';
            });
            
            // Add active class to clicked tab
            tab.classList.add('active');
            tab.style.transform = 'translateY(-2px)';
            
            // Hide all contents
            settingsContents.forEach(content => {
                content.classList.remove('active');
                content.style.opacity = '0';
            });
            
            // Show target content with animation
            setTimeout(() => {
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                    targetContent.style.opacity = '1';
                }
            }, 200);
        });
    });
}

// Enhanced Notifications Management
function initializeNotifications() {
    // Mark individual notification as read
    const markReadButtons = document.querySelectorAll('.notification-item .mark-read');
    markReadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const notificationItem = this.closest('.notification-item');
            
            // Add animation
            notificationItem.style.transform = 'scale(0.95)';
            notificationItem.style.opacity = '0.5';
            
            setTimeout(() => {
                notificationItem.classList.remove('unread');
                notificationItem.style.transform = '';
                notificationItem.style.opacity = '';
                this.style.display = 'none';
                
                updateNotificationCount();
                showNotification('تم وضع علامة قراءة على الإشعار', 'success');
            }, 300);
        });
    });
    
    // Mark all notifications as read
    const markAllReadButton = document.querySelector('.mark-all-read');
    if (markAllReadButton) {
        markAllReadButton.addEventListener('click', function() {
            const unreadNotifications = document.querySelectorAll('.notification-item.unread');
            
            unreadNotifications.forEach((notification, index) => {
                setTimeout(() => {
                    notification.style.transform = 'scale(0.95)';
                    notification.style.opacity = '0.5';
                    
                    setTimeout(() => {
                        notification.classList.remove('unread');
                        notification.style.transform = '';
                        notification.style.opacity = '';
                        
                        const markReadBtn = notification.querySelector('.mark-read');
                        if (markReadBtn) markReadBtn.style.display = 'none';
                    }, 200);
                }, index * 100);
            });
            
            setTimeout(() => {
                updateNotificationCount();
                this.style.display = 'none';
                showNotification('تم وضع علامة قراءة على جميع الإشعارات', 'success');
            }, unreadNotifications.length * 100 + 200);
        });
    }
}

// Update notification count in badge
function updateNotificationCount() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const notificationBadges = document.querySelectorAll('[data-tab="notifications"] .notification-badge');
    
    notificationBadges.forEach(badge => {
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'inline-block';
            badge.style.animation = 'badgePulse 2s infinite';
        } else {
            badge.style.display = 'none';
        }
    });
}

// Enhanced Animations
function animateStatsOnLoad() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach((stat, index) => {
        const finalText = stat.textContent;
        const numericValue = parseFloat(finalText);
        
        if (!isNaN(numericValue)) {
            // Add entrance animation delay
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                stat.style.transition = 'all 0.5s ease';
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
                
                // Animate the number
                animateNumber(stat, 0, numericValue, 2000, finalText);
            }, index * 200);
        }
    });
}

function animateNumber(element, start, end, duration, originalText) {
    const startTime = performance.now();
    const isDecimal = originalText.includes('.');
    const suffix = originalText.replace(/[\d.]/g, '');
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * easeOutCubic(progress);
        const displayValue = isDecimal ? current.toFixed(1) : Math.round(current);
        
        element.textContent = displayValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Progress Bar Animations
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            bar.style.width = width;
        }, index * 300);
    });
}

// Enhanced Scroll Animations
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('progress-bar')) {
                    animateProgressBars();
                }
                
                if (entry.target.classList.contains('stat-card')) {
                    const icon = entry.target.querySelector('.stat-icon');
                    if (icon) {
                        setTimeout(() => {
                            icon.style.transform = 'rotateY(360deg) scale(1.1)';
                            setTimeout(() => {
                                icon.style.transform = '';
                            }, 600);
                        }, 200);
                    }
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.stat-card, .activity-card, .shipment-card, .address-card, .timeline-item, .notification-item');
    elementsToAnimate.forEach(el => observer.observe(el));
}

function triggerSectionAnimations(section) {
    const animatableElements = section.querySelectorAll('.stat-card, .activity-card, .shipment-card, .address-card, .timeline-item, .notification-item');
    
    animatableElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px) rotateX(10deg)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) rotateX(0deg)';
        }, index * 100);
    });
    
    // Animate progress bars if present
    setTimeout(() => {
        animateProgressBars();
    }, 500);
}

// Enhanced Interactive Elements
function initializeInteractiveElements() {
    // Profile avatar hover effect
    initializeAvatarEffects();
    
    // Quick action buttons
    initializeQuickActions();
    
    // Address card interactions
    initializeAddressCards();
    
    // Form validations
    initializeFormValidations();
    
    // Toggle switches
    initializeToggleSwitches();
    
    // Card hover effects
    initializeCardEffects();
}

function initializeAvatarEffects() {
    const heroAvatar = document.querySelector('.hero-avatar-img');
    const profileAvatar = document.querySelector('.profile-hero-avatar');
    
    if (heroAvatar && profileAvatar) {
        profileAvatar.addEventListener('click', function() {
            // Create file input for avatar upload
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        // Add loading animation
                        heroAvatar.style.opacity = '0.5';
                        heroAvatar.style.transform = 'scale(1.1) rotate(180deg)';
                        
                        setTimeout(() => {
                            heroAvatar.src = e.target.result;
                            heroAvatar.style.opacity = '1';
                            heroAvatar.style.transform = 'scale(1) rotate(0deg)';
                            showNotification('تم تحديث الصورة الشخصية بنجاح! 📸', 'success');
                        }, 500);
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            fileInput.click();
        });
        
        // Add hover effect
        profileAvatar.addEventListener('mouseenter', function() {
            heroAvatar.style.transform = 'scale(1.05) rotateY(10deg)';
        });
        
        profileAvatar.addEventListener('mouseleave', function() {
            heroAvatar.style.transform = 'scale(1) rotateY(0deg)';
        });
    }
}

function initializeQuickActions() {
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                handleQuickAction(action);
            }, 150);
        });
        
        // Enhanced hover effects
        btn.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotateY(180deg) scale(1.2)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotateY(0deg) scale(1)';
            }
        });
    });
}

function handleQuickAction(action) {
    const actions = {
        'شحنة جديدة': {
            message: 'سيتم توجيهك لصفحة إنشاء شحنة جديدة...',
            redirect: '/Services/NewShipment'
        },
        'تتبع شحنة': {
            message: 'سيتم توجيهك لصفحة تتبع الشحنات...',
            redirect: '/Services/TrackShipment'
        },
        'حاسبة التكلفة': {
            message: 'سيتم توجيهك لحاسبة تكلفة الشحن...',
            redirect: '/Services/Calculator'
        },
        'الدعم الفني': {
            message: 'سيتم توجيهك لصفحة الدعم الفني...',
            redirect: '/Home/Contact'
        }
    };
    
    const actionData = actions[action];
    if (actionData) {
        showNotification(actionData.message, 'info');
        
        setTimeout(() => {
            if (actionData.redirect) {
                window.location.href = actionData.redirect;
            }
        }, 1500);
    }
}

function initializeAddressCards() {
    // Edit address buttons
    const editBtns = document.querySelectorAll('.address-actions .edit');
    editBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const addressCard = this.closest('.address-card');
            
            // Add animation
            addressCard.style.transform = 'rotateY(5deg) scale(1.02)';
            setTimeout(() => {
                addressCard.style.transform = '';
                editAddress(addressCard);
            }, 300);
        });
    });
    
    // Delete address buttons
    const deleteBtns = document.querySelectorAll('.address-actions .delete');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const addressCard = this.closest('.address-card');
            deleteAddress(addressCard);
        });
    });
    
    // Add new address button
    const addAddressBtn = document.querySelector('.add-address-btn');
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                showAddAddressModal();
            }, 150);
        });
    }
}

function editAddress(addressCard) {
    showNotification('سيتم فتح نموذج تعديل العنوان...', 'info');
    // Here you would typically open a modal or form to edit the address
}

function deleteAddress(addressCard) {
    if (confirm('هل أنت متأكد من حذف هذا العنوان؟')) {
        addressCard.style.transform = 'rotateX(90deg) scale(0.8)';
        addressCard.style.opacity = '0';
        
        setTimeout(() => {
            addressCard.remove();
            showNotification('تم حذف العنوان بنجاح! 🗑️', 'success');
        }, 400);
    }
}

function showAddAddressModal() {
    showNotification('سيتم فتح نموذج إضافة عنوان جديد...', 'info');
    // Here you would open a modal with an address form
}

// Form Animations
function initializeFormAnimations() {
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(2, 95, 112, 0.15)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        input.addEventListener('input', function() {
            if (this.value) {
                this.style.borderColor = 'var(--secondary-color)';
            } else {
                this.style.borderColor = 'var(--border-color)';
            }
        });
    });
}

function initializeFormValidations() {
    const forms = document.querySelectorAll('.settings-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitBtn = form.querySelector('.save-btn');
            
            // Add loading animation
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';
            submitBtn.style.background = 'linear-gradient(135deg, #9ca3af, #6b7280)';
            
            // Simulate API call
            setTimeout(() => {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-save"></i> حفظ التغييرات';
                submitBtn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
                
                showNotification('تم حفظ التغييرات بنجاح! ✅', 'success');
                
                // Add success animation to form
                form.style.transform = 'scale(1.02)';
                form.style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.2)';
                
                setTimeout(() => {
                    form.style.transform = '';
                    form.style.boxShadow = '';
                }, 500);
            }, 2000);
        });
    });
}

// Toggle switches for notification preferences
function initializeToggleSwitches() {
    const switches = document.querySelectorAll('.notification-item .switch input[type="checkbox"]');
    
    switches.forEach(switchEl => {
        switchEl.addEventListener('change', function() {
            const preferenceItem = this.closest('.notification-item');
            const notificationTitle = preferenceItem.querySelector('h4').textContent;
            const slider = this.nextElementSibling;
            
            // Add animation to slider
            slider.style.transform = 'scale(1.1)';
            setTimeout(() => {
                slider.style.transform = '';
            }, 200);
            
            const status = this.checked ? 'تم تفعيل' : 'تم إلغاء';
            showNotification(`${status} ${notificationTitle}`, 'info');
        });
    });
}

// Card Effects
function initializeCardEffects() {
    const cards = document.querySelectorAll('.stat-card, .activity-card, .shipment-card, .address-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notification => {
        notification.style.transform = 'translateX(400px) scale(0.8)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification custom-notification-${type}`;
    
    // Icon mapping
    const icons = {
        success: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-triangle',
        error: 'fas fa-times-circle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i class="${icons[type] || icons.info}" style="font-size: 20px;"></i>
            <span style="flex: 1;">${message}</span>
        </div>
    `;
    
    // Style notification
    const colors = {
        success: 'background: linear-gradient(135deg, #10b981, #059669); color: white;',
        warning: 'background: linear-gradient(135deg, #f59e0b, #d97706); color: white;',
        error: 'background: linear-gradient(135deg, #ef4444, #dc2626); color: white;',
        info: 'background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white;'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        font-weight: 600;
        font-size: 0.9rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        backdrop-filter: blur(20px);
        transform: translateX(400px) scale(0.8);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 350px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        ${colors[type] || colors.info}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px) scale(0.8)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 4000);
}

// Track shipment button functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('track-btn') || e.target.closest('.track-btn')) {
        e.preventDefault();
        const shipmentCard = e.target.closest('.shipment-card');
        const shipmentId = shipmentCard.querySelector('h3').textContent;
        
        // Add click animation
        const btn = e.target.closest('.track-btn');
        btn.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            btn.style.transform = '';
            showNotification(`سيتم توجيهك لتتبع الشحنة ${shipmentId}... 🚢`, 'info');
            
            setTimeout(() => {
                window.location.href = `/Services/TrackShipment?id=${shipmentId}`;
            }, 1500);
        }, 150);
    }
});

// Enhanced tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this, this.getAttribute('data-tooltip'));
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    hideTooltip(); // Remove any existing tooltip
    
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8));
        color: white;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        font-size: 0.85rem;
        font-weight: 500;
        z-index: 10000;
        pointer-events: none;
        white-space: nowrap;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        transform: translateY(10px) scale(0.8);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0) scale(1)';
    }, 10);
}

function hideTooltip() {
    const tooltip = document.querySelector('.custom-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(10px) scale(0.8)';
        setTimeout(() => tooltip.remove(), 300);
    }
}

// Handle responsive behavior
function handleResponsiveChanges() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleMediaChange(e) {
        if (e.matches) {
            adjustForMobile();
        } else {
            adjustForDesktop();
        }
    }
    
    mediaQuery.addListener(handleMediaChange);
    handleMediaChange(mediaQuery);
}

function adjustForMobile() {
    // Mobile-specific adjustments
    const heroActions = document.querySelector('.profile-hero-actions');
    if (heroActions) {
        heroActions.style.flexDirection = 'column';
        heroActions.style.width = '100%';
    }
    
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.style.justifyContent = 'center';
    });
}

function adjustForDesktop() {
    // Desktop-specific adjustments
    const heroActions = document.querySelector('.profile-hero-actions');
    if (heroActions) {
        heroActions.style.flexDirection = 'row';
        heroActions.style.width = 'auto';
    }
    
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.style.justifyContent = 'flex-start';
    });
}

// Add smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close notifications
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.custom-notification');
        notifications.forEach(notification => {
            notification.style.transform = 'translateX(400px) scale(0.8)';
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // Tab navigation for menu items
    if (e.key === 'Tab') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('menu-item')) {
            activeElement.style.outline = '2px solid var(--secondary-color)';
            activeElement.style.outlineOffset = '2px';
        }
    }
});

// Initialize page with welcome message
setTimeout(() => {
    showNotification('مرحباً بك في ملفك الشخصي! 👋', 'success');
}, 1000);