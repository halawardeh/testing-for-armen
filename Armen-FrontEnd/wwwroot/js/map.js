
        // Standard Mobile Menu Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (mobileMenuBtn && mobileMenu) {
                mobileMenuBtn.addEventListener('click', function() {
                    const isMenuOpen = mobileMenu.classList.contains('mobile-menu-show');
                    
                    if (isMenuOpen) {
                        // Close menu
                        mobileMenu.classList.remove('mobile-menu-show');
                        mobileMenuBtn.classList.remove('active');
                    } else {
                        // Open menu
                        mobileMenu.classList.add('mobile-menu-show');
                        mobileMenuBtn.classList.add('active');
                    }
                });
                
                // Close mobile menu when clicking outside
                document.addEventListener('click', function(e) {
                    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                        mobileMenu.classList.remove('mobile-menu-show');
                        mobileMenuBtn.classList.remove('active');
                    }
                });
            }
        });

// MAP PAGE SPECIFIC FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function () {
    const mockData = {
        ports: [
            {id: 1, name: 'ميناء شانغهاي', country: 'الصين', lat: 31.2304, lng: 121.4737, teus: '47.3M', info: 'أكبر ميناء حاويات في العالم.' },
            {id: 2, name: 'ميناء شنتشن', country: 'الصين', lat: 22.5431, lng: 114.0579, teus: '30M', info: 'بوابة رئيسية لصناعة الإلكترونيات.' },
            {id: 3, name: 'ميناء نينغبو-تشوشان', country: 'الصين', lat: 29.8683, lng: 121.5439, teus: '33.3M', info: 'الأكثر ازدحامًا.' },
            {id: 4, name: 'ميناء حيفا', country: 'فلسطين', lat: 32.8184, lng: 34.9892, teus: '3M', info: 'أحد أكبر موانئ شرق المتوسط.' },
            {id: 5, name: 'ميناء أشدود', country: 'فلسطين', lat: 31.8014, lng: 34.6433, teus: '1.5M', info: 'ميناء حيوي للبضائع.' }
        ],
        schedules: [
            {id: 101, lineId: 1, departurePortId: 1, arrivalPortId: 4, departure: '2025-08-01', arrival: '2025-08-25', duration: 24, serviceType: 'fast', availableContainers: [{type: '20ft', price: 2250}, {type: '40ft', price: 3800}] },
            {id: 102, lineId: 2, departurePortId: 1, arrivalPortId: 4, departure: '2025-08-03', arrival: '2025-08-29', duration: 26, serviceType: 'fast', availableContainers: [{type: '20ft', price: 2100}, {type: '40hc', price: 4100}] },
        ],
        shippingLines: [{id: 1, name: 'Maersk', logo: '🚢' }, {id: 2, name: 'MSC', logo: '🛳️' }],
        hsCodes: {'electronics': {hs: '8517.12', ar: 'إلكترونيات', cn: '电子产品' }, 'default': {hs: '0000.00', ar: 'بضائع عامة', cn: '一般商品' } },
        cities: [{name: 'Shanghai', lat: 31.2304, lng: 121.4737, inlandCost: 250 }],
    };
    
    let bookingState = {};
    let userBookings = [];

    // --- DOM ELEMENTS ---
    const bookingPanel = document.getElementById('booking-panel');
    const bookingPanelHeader = document.getElementById('booking-panel-header');
    const bookingPanelBody = document.getElementById('booking-panel-body');

    // --- MAP INITIALIZATION ---
    const map = L.map('map', {zoomControl: false }).setView([30, 85], 4);
    L.control.zoom({position: 'bottomright' }).addTo(map);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CARTO', maxZoom: 19
    }).addTo(map);

    // Enhanced ports data with more beautiful icons
    const portIcons = {
        1: 'fas fa-anchor',
        2: 'fas fa-ship',
        3: 'fas fa-sailboat',
        4: 'fas fa-ferry',
        5: 'fas fa-dharmachakra'
    };

    mockData.ports.forEach(port => {
        const iconClass = portIcons[port.id] || 'fas fa-anchor';

        const enhancedPortIcon = L.divIcon({
            html: `
                <div class="custom-map-icon" data-port-id="${port.id}">
                    <div class="pulse"></div>
                    <div class="ripple"></div>
                    <div class="ripple"></div>
                    <div class="icon-body">
                        <i class="${iconClass}"></i>
                    </div>
                </div>
            `,
            className: '',
            iconSize: [40, 40],
            iconAnchor: [20, 20] 
        });

        const popupContent = `
            <div class="port-popup-title">${port.name}</div>
            <div style="margin: 8px 0; color: #6b7280;">
                <strong>الدولة:</strong> ${port.country}
            </div>
            <div style="margin: 8px 0; color: #6b7280;">
                <strong>المعلومات:</strong> ${port.info}
            </div>
            <div class="mt-3">
                <button class="book-from-here-btn w-full bg-[var(--accent-color)] text-white p-3 rounded-lg font-bold hover:bg-green-700 transition" data-port-id="${port.id}">
                    <i class="fas fa-anchor" style="margin-left: 8px;"></i>
                    ابدأ الحجز من ${port.name}
                </button>
            </div>
        `;

        const marker = L.marker([port.lat, port.lng], {icon: enhancedPortIcon })
            .addTo(map)
            .bindPopup(popupContent, {
                maxWidth: 300,
                className: 'custom-popup'
            });
    });

    // --- CORE WORKFLOW ---
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('book-from-here-btn')) {
            const portId = parseInt(e.target.dataset.portId);
            const port = mockData.ports.find(p => p.id === portId);
            if (port) {
                map.closePopup();
                handlePortClick(port);
            }
        }
    });

    // Enhanced Toast notification system - يظهر تحت الـ navbar
    function showToast(message, type = 'info') {
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = `toast-notification`;
        
        // تحسين موضع الـ toast ليظهر تحت الـ navbar
        toast.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            z-index: 998;
            padding: 16px 20px;
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            transform: translateX(400px);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 350px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            font-family: 'Cairo', sans-serif;
        `;

        // تعيين الألوان حسب النوع
        const colors = {
            info: 'background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white;',
            success: 'background: linear-gradient(135deg, #10b981, #059669); color: white;',
            warning: 'background: linear-gradient(135deg, #f59e0b, #d97706); color: white;'
        };
        
        toast.style.cssText += colors[type] || colors.info;

        const iconMap = {
            info: 'fas fa-info-circle',
            success: 'fas fa-check-circle',
            warning: 'fas fa-exclamation-triangle'
        };

        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="${iconMap[type] || iconMap.info}" style="font-size: 20px; opacity: 0.9;"></i>
                <span style="font-weight: 600; font-size: 14px; flex: 1;">${message}</span>
                <div style="width: 4px; height: 24px; background: rgba(255, 255, 255, 0.3); border-radius: 2px;"></div>
            </div>
        `;

        document.body.appendChild(toast);

        // تحريك الدخول
        setTimeout(() => {
            toast.style.transform = 'translateX(0) scale(1.02)';
        }, 100);

        // إخفاء بعد 4 ثواني
        setTimeout(() => {
            toast.style.transform = 'translateX(400px) scale(0.95)';
            toast.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 500);
        }, 4000);
    }

    function handlePortClick(port) {
        bookingState = { port: port };

        // Enhanced map animation - smooth zoom to selected port
        map.flyTo([port.lat, port.lng], 10, {
            animate: true,
            duration: 2,
            easeLinearity: 0.1
        });

        // Show loading effect
        const loadingSpinner = document.getElementById('loading-spinner');
        if (loadingSpinner) {
            loadingSpinner.classList.remove('hidden');
        }

        // Simulate loading time for better UX
        setTimeout(() => {
            if (loadingSpinner) {
                loadingSpinner.classList.add('hidden');
            }

            renderSchedulesForPort(port);

            // Show booking panel with smooth animation
            const panel = document.getElementById('booking-panel');
            panel.classList.add('show');

            // Close any open popups
            map.closePopup();
        }, 1200);
    }

    function renderSchedulesForPort(port) {
        bookingPanelHeader.innerHTML = `
            <div>
                <h2 style="font-size: 1.3rem; font-weight: 800; margin: 0; color: white;">${port.name}</h2>
                <p style="font-size: 0.9rem; opacity: 0.9; margin: 0.2rem 0 0 0; color: rgba(255,255,255,0.9);">${port.country} • جاهز للحجز</p>
            </div>
        `;
        
        const schedules = mockData.schedules.filter(s => s.departurePortId === port.id);

        if (schedules.length === 0) {
            bookingPanelBody.innerHTML = `
                <div style="text-align: center; padding: 3rem 1rem;">
                    <div style="font-size: 4rem; color: #9ca3af; margin-bottom: 1rem;">⚓</div>
                    <p style="color: #6b7280; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;">لا توجد رحلات مجدولة حالياً</p>
                    <p style="color: #9ca3af; font-size: 0.9rem;">سيتم إضافة رحلات جديدة قريباً</p>
                </div>
            `;
            return;
        }

        bookingPanelBody.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <!-- Port Information Card -->
                <div class="glass-effect" style="padding: 1.2rem; border-radius: 18px; margin-bottom: 0.5rem;">
                    <h3 style="font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem; color: var(--primary-color); display: flex; align-items: center; gap: 0.5rem;">
                        🚢 معلومات الميناء
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem; font-size: 0.85rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem; background: rgba(34, 197, 94, 0.1); border-radius: 10px;">
                            <i class="fas fa-circle" style="color: #22c55e; font-size: 0.7rem;"></i>
                            <span style="font-weight: 500;">الحالة: نشط</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem; background: rgba(59, 130, 246, 0.1); border-radius: 10px;">
                            <i class="fas fa-chart-bar" style="color: #3b82f6; font-size: 0.8rem;"></i>
                            <span style="font-weight: 500;">السعة: ${Math.floor(Math.random() * 30) + 70}%</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem; background: rgba(168, 85, 247, 0.1); border-radius: 10px;">
                            <i class="fas fa-ship" style="color: #a855f7; font-size: 0.8rem;"></i>
                            <span style="font-weight: 500;">الرحلات: ${schedules.length}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem; background: rgba(249, 115, 22, 0.1); border-radius: 10px;">
                            <i class="fas fa-clock" style="color: #f97316; font-size: 0.8rem;"></i>
                            <span style="font-weight: 500;">24/7 متاح</span>
                        </div>
                    </div>
                </div>

                <!-- Available Schedules -->
                <h3 style="font-weight: 700; font-size: 1.1rem; color: var(--primary-color); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                    ✈️ الرحلات المتاحة
                </h3>
                
                ${schedules.map(schedule => {
                    const line = mockData.shippingLines.find(l => l.id === schedule.lineId);
                    const arrivalPort = mockData.ports.find(p => p.id === schedule.arrivalPortId);
                    const serviceTypeClass = schedule.serviceType === 'fast' ? 'background: linear-gradient(135deg, #dcfce7, #bbf7d0); color: #15803d; border: 1px solid #86efac;' : 'background: linear-gradient(135deg, #fef3c7, #fde68a); color: #92400e; border: 1px solid #fbbf24;';
                    const serviceTypeText = schedule.serviceType === 'fast' ? 'شحن سريع' : 'اقتصادي';

                    return `
                        <div class="glass-effect" style="padding: 1.3rem; border-radius: 18px; border: 1px solid rgba(226, 232, 240, 0.7); transition: all 0.3s ease; position: relative; overflow: hidden;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <span style="font-size: 2.5rem;">${line.logo}</span>
                                    <div>
                                        <span style="font-weight: 700; font-size: 1.1rem; color: var(--primary-color);">${line.name}</span>
                                        <p style="font-size: 0.8rem; color: #6b7280; margin: 0.2rem 0 0 0;">خط شحن معتمد</p>
                                    </div>
                                </div>
                                <span style="padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; ${serviceTypeClass}">${serviceTypeText}</span>
                            </div>
                            
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem; font-size: 0.85rem; color: #6b7280; margin-bottom: 1rem;">
                                <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: rgba(248, 250, 252, 0.8); border-radius: 8px;">
                                    <i class="fas fa-map-marker-alt" style="color: #ef4444; font-size: 0.8rem;"></i>
                                    <span><strong style="color: #374151;">الوجهة:</strong> ${arrivalPort.name}</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: rgba(248, 250, 252, 0.8); border-radius: 8px;">
                                    <i class="fas fa-clock" style="color: #f59e0b; font-size: 0.8rem;"></i>
                                    <span><strong style="color: #374151;">المدة:</strong> ${schedule.duration} يوم</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: rgba(248, 250, 252, 0.8); border-radius: 8px;">
                                    <i class="fas fa-calendar" style="color: #8b5cf6; font-size: 0.8rem;"></i>
                                    <span><strong style="color: #374151;">المغادرة:</strong> ${schedule.departure}</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: rgba(248, 250, 252, 0.8); border-radius: 8px;">
                                    <i class="fas fa-anchor" style="color: #06b6d4; font-size: 0.8rem;"></i>
                                    <span><strong style="color: #374151;">الوصول:</strong> ${schedule.arrival}</span>
                                </div>
                            </div>
                            
                            <div style="border-top: 1px solid rgba(229, 231, 235, 0.6); padding-top: 1rem;">
                                <h4 style="font-size: 0.9rem; font-weight: 700; color: #374151; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
                                    📦 اختر نوع الحاوية
                                </h4>
                                <div style="display: flex; flex-direction: column; gap: 0.6rem;">
                                    ${schedule.availableContainers.map(container => `
                                        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255, 255, 255, 0.9); padding: 1rem; border-radius: 12px; border: 1px solid rgba(229, 231, 235, 0.5); transition: all 0.3s ease;">
                                            <div style="display: flex; align-items: center; gap: 0.8rem;">
                                                <i class="fas fa-cube" style="color: #6b7280; font-size: 1.2rem;"></i>
                                                <div>
                                                    <span style="font-weight: 700; color: #374151; font-size: 0.95rem;">${container.type.replace('ft', ' قدم').replace('hc', ' مرتفعة')}</span>
                                                    <p style="font-size: 0.8rem; color: #6b7280; margin: 0.2rem 0 0 0;">حاوية قياسية</p>
                                                </div>
                                            </div>
                                            <div style="display: flex; align-items: center; gap: 0.8rem;">
                                                <span style="font-size: 1.2rem; font-weight: 800; color: var(--primary-color);">$${container.price}</span>
                                                <button class="book-btn" style="background: linear-gradient(135deg, var(--secondary-color), #e67604); color: white; border: none; padding: 0.6rem 1rem; border-radius: 10px; font-weight: 600; font-size: 0.85rem; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.4rem; box-shadow: 0 4px 12px rgba(200, 100, 4, 0.3);" 
                                                        data-schedule-id="${schedule.id}" 
                                                        data-container-type="${container.type}" 
                                                        data-container-price="${container.price}">
                                                    <i class="fas fa-plus" style="font-size: 0.8rem;"></i>احجز
                                                </button>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    bookingPanelBody.addEventListener('click', e => {
        if (e.target.classList.contains('book-btn')) {
            const scheduleId = parseInt(e.target.dataset.scheduleId);
            bookingState.schedule = mockData.schedules.find(s => s.id === scheduleId);
            bookingState.container = {type: e.target.dataset.containerType, price: parseFloat(e.target.dataset.containerPrice) };
            renderFinalForm();
        } else if (e.target.id === 'back-to-schedules') {
            renderSchedulesForPort(bookingState.port);
        }
    });

    function renderFinalForm() {
        bookingPanelHeader.innerHTML = `
            <div>
                <h2 style="font-size: 1.3rem; font-weight: 800; margin: 0; color: white;">تفاصيل الحجز النهائية</h2>
                <button id="back-to-schedules" style="background: none; border: none; color: rgba(255,255,255,0.8); font-size: 0.85rem; font-weight: 600; cursor: pointer; margin-top: 0.3rem; display: flex; align-items: center; gap: 0.3rem; transition: color 0.3s ease;">
                    ← العودة للرحلات
                </button>
            </div>
        `;
        
        bookingPanelBody.innerHTML = `
            <form id="final-booking-form" style="display: flex; flex-direction: column; gap: 1.5rem;">
                <!-- 1. شروط النقل -->
                <fieldset style="border: none; padding: 0; margin: 0;">
                    <legend style="font-size: 1rem; font-weight: 700; color: var(--primary-color); margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
                        🚚 1. شروط النقل
                    </legend>
                    <select id="incoterm" style="width: 100%; background: rgba(248, 250, 252, 0.9); border: 2px solid #e2e8f0; border-radius: 12px; padding: 0.9rem; font-size: 0.9rem; font-family: 'Cairo', sans-serif; transition: all 0.3s ease;">
                        <option value="FOB">FOB - المورد يسلم للميناء</option>
                        <option value="EXW">EXW - استلام من المصنع</option>
                    </select>
                </fieldset>

                <!-- 2. تفاصيل الشحنة -->
                <fieldset style="border: none; padding: 0; margin: 0;">
                    <legend style="font-size: 1rem; font-weight: 700; color: var(--primary-color); margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
                        📦 2. تفاصيل الشحنة
                    </legend>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div id="exw-fields-container" style="display: none; flex-direction: column; gap: 1rem;">
                            <input type="text" id="loading-city" placeholder="مدينة التحميل (مثال: Shanghai)" style="width: 100%; background: rgba(248, 250, 252, 0.9); border: 2px solid #e2e8f0; border-radius: 12px; padding: 0.9rem; font-size: 0.9rem; font-family: 'Cairo', sans-serif; transition: all 0.3s ease;">
                        </div>
                        <input type="text" id="warehouse-address" placeholder="عنوان المخزن" required style="width: 100%; background: rgba(248, 250, 252, 0.9); border: 2px solid #e2e8f0; border-radius: 12px; padding: 0.9rem; font-size: 0.9rem; font-family: 'Cairo', sans-serif; transition: all 0.3s ease;">
                        <input type="tel" id="contact-phone" placeholder="رقم تواصل صيني" required style="width: 100%; background: rgba(248, 250, 252, 0.9); border: 2px solid #e2e8f0; border-radius: 12px; padding: 0.9rem; font-size: 0.9rem; font-family: 'Cairo', sans-serif; transition: all 0.3s ease;">
                        <input type="date" id="loading-date" required style="width: 100%; background: rgba(248, 250, 252, 0.9); border: 2px solid #e2e8f0; border-radius: 12px; padding: 0.9rem; font-size: 0.9rem; font-family: 'Cairo', sans-serif; transition: all 0.3s ease;">
                        <input type="number" id="cargo-value" placeholder="قيمة الفاتورة التجارية ($)" style="width: 100%; background: rgba(248, 250, 252, 0.9); border: 2px solid #e2e8f0; border-radius: 12px; padding: 0.9rem; font-size: 0.9rem; font-family: 'Cairo', sans-serif; transition: all 0.3s ease;">
                    </div>
                </fieldset>

                <!-- 3. خدمات إضافية -->
                <fieldset style="border: none; padding: 0; margin: 0;">
                    <legend style="font-size: 1rem; font-weight: 700; color: var(--primary-color); margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
                        ⚙️ 3. خدمات إضافية
                    </legend>
                    <div style="display: flex; flex-direction: column; gap: 0.8rem; padding: 1rem; background: rgba(248, 250, 252, 0.7); border-radius: 12px;">
                        <div id="insurance-option-container" style="display: none;">
                            <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer; font-size: 0.9rem;">
                                <input type="checkbox" id="add-insurance" disabled style="width: 1rem; height: 1rem; accent-color: var(--secondary-color);">
                                <span style="color: #374151;">إضافة تأمين (2% من قيمة الفاتورة)</span>
                            </label>
                        </div>
                        <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer; font-size: 0.9rem;">
                            <input type="checkbox" id="add-customs" style="width: 1rem; height: 1rem; accent-color: var(--secondary-color);">
                            <span style="color: #374151;">طلب خدمة التخليص الجمركي (رسوم ثابتة $500)</span>
                        </label>
                    </div>
                </fieldset>

                <!-- الإجمالي النهائي -->
                <div style="text-align: center; border-top: 2px dashed #d1d5db; padding-top: 1.2rem; margin-top: 0.5rem;">
                    <p style="font-size: 0.9rem; color: #6b7280; margin-bottom: 0.5rem;">الإجمالي النهائي</p>
                    <p style="font-size: 2.5rem; font-weight: 800; color: var(--primary-color); margin: 0;">$<span id="total-price">${bookingState.container.price.toFixed(2)}</span></p>
                </div>
                
                <button type="submit" style="width: 100%; background: linear-gradient(135deg, var(--secondary-color), #e67604); color: white; border: none; font-weight: 700; padding: 1.2rem; border-radius: 12px; font-size: 1.1rem; transition: all 0.3s ease; box-shadow: 0 6px 20px rgba(200, 100, 4, 0.3);">
                    أرسل طلب الحجز الآن
                </button>
            </form>
        `;

        // Add event listeners for the new dynamic form
        setupFinalFormListeners();
    }

    function setupFinalFormListeners() {
        const form = document.getElementById('final-booking-form');
        const incotermSelect = form.querySelector('#incoterm');
        
        const updateTotal = () => {
            let total = bookingState.container.price;
            if (incotermSelect.value === 'EXW') {
                const city = mockData.cities.find(c => c.name.toLowerCase() === form.querySelector('#loading-city').value.toLowerCase().trim());
                if (city) total += city.inlandCost;
            }
            if (form.querySelector('#add-insurance')?.checked) {
                const cargoValue = parseFloat(form.querySelector('#cargo-value').value) || 0;
                if (cargoValue > 0) total += cargoValue * 0.02;
            }
            if (form.querySelector('#add-customs').checked) total += 500;
            form.querySelector('#total-price').textContent = total.toFixed(2);
        };
        
        incotermSelect.addEventListener('change', () => {
            const isExw = incotermSelect.value === 'EXW';
            const exwContainer = form.querySelector('#exw-fields-container');
            const insuranceContainer = form.querySelector('#insurance-option-container');
            
            if (isExw) {
                exwContainer.style.display = 'flex';
                insuranceContainer.style.display = 'block';
            } else {
                exwContainer.style.display = 'none';
                insuranceContainer.style.display = 'none';
                if (form.querySelector('#add-insurance')) {
                    form.querySelector('#add-insurance').checked = false;
                }
            }
            updateTotal();
        });
        
        form.querySelector('#cargo-value').addEventListener('input', (e) => {
            const insuranceCheckbox = form.querySelector('#add-insurance');
            if (insuranceCheckbox) {
                insuranceCheckbox.disabled = !e.target.value || e.target.value <= 0;
                if(insuranceCheckbox.disabled) insuranceCheckbox.checked = false;
            }
            updateTotal();
        });

        form.addEventListener('input', updateTotal);
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Close booking panel first
            const panel = document.getElementById('booking-panel');
            panel.classList.remove('show');

            // Show success message
            showToast('تم حفظ بيانات الحجز بنجاح! 📋', 'success');

            // Show file upload modal after a short delay
            setTimeout(() => {
                showFileUploadModal();
            }, 1000);
        });
    }

    // --- Other Listeners ---
    document.getElementById('close-booking-panel').addEventListener('click', () => {
        const panel = document.getElementById('booking-panel');
        panel.classList.remove('show');

        // Reset map view to original position
        map.flyTo([30, 85], 4, {
            animate: true,
            duration: 1.5
        });

        showToast('تم إغلاق لوحة الحجز 📋', 'info');
    });
    
    document.getElementById('back-to-map-btn').addEventListener('click', () => {
        document.getElementById('customs-page').classList.remove('active');
        document.getElementById('main-app-view').classList.add('active');
    });

    // Welcome message and initial setup
    setTimeout(() => {
        showToast('🗺️ مرحباً بك في خريطة الشحن التفاعلية! اختر ميناء للبدء', 'info');
    }, 1000);

    // File Upload Modal Functions
    function showFileUploadModal() {
        const modal = document.getElementById('file-upload-modal');
        modal.classList.add('show');
    }

    function hideFileUploadModal() {
        const modal = document.getElementById('file-upload-modal');
        modal.classList.remove('show');

        // Reset form
        document.getElementById('file-upload-form').reset();
        document.getElementById('file-preview').style.display = 'none';
        document.getElementById('file-list').innerHTML = '';
    }

    // File Upload Event Listeners
    document.getElementById('close-file-modal').addEventListener('click', hideFileUploadModal);
    document.getElementById('cancel-upload-btn').addEventListener('click', hideFileUploadModal);

    // File selection and drag & drop
    const fileInput = document.getElementById('file-input');
    const fileDropZone = document.getElementById('file-drop-zone');
    const filePreview = document.getElementById('file-preview');
    const fileList = document.getElementById('file-list');
    const selectFilesBtn = document.getElementById('select-files-btn');
    
    selectFilesBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', handleFiles);

    // Drag and drop functionality
    fileDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileDropZone.classList.add('dragover');
    });
    
    fileDropZone.addEventListener('dragleave', () => {
        fileDropZone.classList.remove('dragover');
    });
    
    fileDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        fileDropZone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFiles({target: {files} });
    });

    function handleFiles(event) {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        filePreview.style.display = 'block';
        fileList.innerHTML = '';

        files.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'flex items-center justify-between bg-gray-50 p-3 rounded-lg';

            const fileIcon = getFileIcon(file.name);
            const fileSize = formatFileSize(file.size);

            fileItem.innerHTML = `
                <div class="flex items-center gap-3">
                    <i class="${fileIcon} text-2xl text-gray-600"></i>
                    <div>
                        <div class="font-semibold text-gray-800">${file.name}</div>
                        <div class="text-sm text-gray-500">${fileSize}</div>
                    </div>
                </div>
                <button type="button" class="text-red-500 hover:text-red-700" onclick="removeFile(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            `;

            fileList.appendChild(fileItem);
        });
    }

    function getFileIcon(filename) {
        const extension = filename.split('.').pop().toLowerCase();
        const iconMap = {
            'pdf': 'fas fa-file-pdf text-red-500',
            'xlsx': 'fas fa-file-excel text-green-600',
            'xls': 'fas fa-file-excel text-green-600',
            'docx': 'fas fa-file-word text-blue-600',
            'doc': 'fas fa-file-word text-blue-600',
            'jpg': 'fas fa-file-image text-purple-500',
            'jpeg': 'fas fa-file-image text-purple-500',
            'png': 'fas fa-file-image text-purple-500'
        };
        return iconMap[extension] || 'fas fa-file text-gray-500';
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 بايت';
        const k = 1024;
        const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    window.removeFile = function(index) {
        const dt = new DataTransfer();
        const files = Array.from(fileInput.files);
        
        files.forEach((file, i) => {
            if (i !== index) {
                dt.items.add(file);
            }
        });

        fileInput.files = dt.files;
        handleFiles({target: {files: dt.files } });
    };

    // File upload form submission
    document.getElementById('file-upload-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const files = fileInput.files;
        const cargoType = document.getElementById('cargo-type').value;
        const cargoWeight = document.getElementById('cargo-weight').value;
        const notes = document.getElementById('additional-notes').value;

        if (files.length === 0) {
            showToast('يرجى اختيار ملف واحد على الأقل 📎', 'warning');
            return;
        }

        // Simulate file upload
        showToast('جاري رفع الملفات... ⏳', 'info');
        
        setTimeout(() => {
            hideFileUploadModal();
            showToast('تم رفع الملفات بنجاح! ✅ سيتم التواصل معك خلال 24 ساعة', 'success');

            // Reset map view
            map.flyTo([30, 85], 4, {
                animate: true,
                duration: 1.5
            });
        }, 2000);
    });

    // Add click effect to map icons
    map.on('click', function(e) {
        // Create ripple effect at click location
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(0, 168, 120, 0.3);
            pointer-events: none;
            z-index: 1000;
            animation: click-ripple 0.6s ease-out forwards;
        `;

        const mapContainer = document.getElementById('map');
        mapContainer.appendChild(ripple);

        const containerPoint = map.containerPointToLayerPoint(map.mouseEventToContainerPoint(e.originalEvent));
        ripple.style.left = (containerPoint.x - 10) + 'px';
        ripple.style.top = (containerPoint.y - 10) + 'px';
        
        setTimeout(() => {
            if (mapContainer.contains(ripple)) {
                mapContainer.removeChild(ripple);
            }
        }, 600);
    });

});
