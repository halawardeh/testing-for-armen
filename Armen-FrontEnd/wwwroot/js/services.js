document.addEventListener('DOMContentLoaded', function () {
    // First, ensure all form elements are interactive
    enableFormElements();

    // Modal handling
    const serviceButtons = document.querySelectorAll('.service-btn');
    const modals = document.querySelectorAll('.service-modal');
    const closeButtons = document.querySelectorAll('[data-modal-close]');

    // Function to enable all form elements
    function enableFormElements() {
        document.querySelectorAll('input, textarea, select').forEach(el => {
            el.removeAttribute('readonly');
            el.disabled = false;
            el.style.pointerEvents = 'auto';
        });
    }

    // Open modal when clicking service button
    serviceButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const serviceCard = this.closest('.service-card');
            const serviceType = serviceCard.getAttribute('data-service');
            const modal = document.getElementById(`${serviceType}Modal`);
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
                // Re-enable form elements when modal opens
                enableFormElements();
            }
        });
    });

    // Close modal when clicking close button or outside
    function closeModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.service-modal');
            closeModal(modal);
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('show')) {
                    closeModal(modal);
                }
            });
        }
    });

    // Form handling
    const invitationForm = document.getElementById('invitationForm');
    const visaForm = document.getElementById('visaForm');
    const translatorForm = document.getElementById('translatorForm');
    const flightForm = document.getElementById('flightForm');
    const transferForm = document.getElementById('transferForm');
    const destinationCitySelect = document.getElementById('destinationCitySelect');
    const hotelGroup = document.getElementById('hotelGroup');
    const hotelSelect = document.getElementById('hotelSelect');
    const roomGroup = document.getElementById('roomGroup');
    const roomSelect = document.getElementById('roomSelect');

    // Invitation form
    if (invitationForm) {
        const customerTypeInputs = invitationForm.querySelectorAll('[name="customer_type"]');
        const priceSpan = document.getElementById('invitationPrice');
        const professionSelect = document.getElementById('professionSelect');
        const otherProfessionGroup = document.getElementById('otherProfessionGroup');

        customerTypeInputs.forEach(input => {
            input.addEventListener('change', function () {
                priceSpan.textContent = this.value === 'existing' ? '0' : '200';
            });
        });

        professionSelect.addEventListener('change', function () {
            otherProfessionGroup.style.display = this.value === 'other' ? 'block' : 'none';
        });

        invitationForm.addEventListener('submit', handleFormSubmit);
    }

    // Visa form
    if (visaForm) {
        const serviceTierInputs = visaForm.querySelectorAll('[name="service_tier"]');
        const hasInvitationInputs = visaForm.querySelectorAll('[name="has_invitation"]');
        const invitationField = document.getElementById('visaInvitationField');
        const priceSpan = document.getElementById('visaPrice');

        serviceTierInputs.forEach(input => {
            input.addEventListener('change', function () {
                priceSpan.textContent = this.value === 'normal' ? '350' : '550';
            });
        });

        hasInvitationInputs.forEach(input => {
            input.addEventListener('change', function () {
                invitationField.style.display = this.value === 'yes' ? 'block' : 'none';
            });
        });

        visaForm.addEventListener('submit', handleFormSubmit);
    }

    // Translator form
    if (translatorForm) {
        const periodTypeInputs = translatorForm.querySelectorAll('[name="period_type"]');
        const daysInput = translatorForm.querySelector('input[type="number"]');
        const priceSpan = document.getElementById('translatorPrice');

        function updateTranslatorPrice() {
            const basePrice = document.querySelector('[name="period_type"]:checked').value === 'normal' ? 150 : 300;
            const days = parseInt(daysInput.value) || 1;
            priceSpan.textContent = basePrice * days;
        }

        periodTypeInputs.forEach(input => {
            input.addEventListener('change', updateTranslatorPrice);
        });

        daysInput.addEventListener('input', updateTranslatorPrice);
        translatorForm.addEventListener('submit', handleFormSubmit);
    }

    // Flight form
    if (flightForm) {
        flightForm.addEventListener('submit', handleFormSubmit);
    }

    // Transfer form
    const hotelsByCity = {
        beijing: [
            { name: 'فندق بكين الدولي', value: 'beijing_international', rooms: ['مفردة', 'مزدوجة', 'جناح'] },
            { name: 'فندق القصر', value: 'beijing_palace', rooms: ['مفردة', 'مزدوجة'] },
            { name: 'فندق المطار', value: 'beijing_airport', rooms: ['مفردة'] }
        ],
        shanghai: [
            { name: 'شنغهاي سنترال', value: 'shanghai_central', rooms: ['مفردة', 'مزدوجة', 'جناح'] },
            { name: 'شنغهاي إيربورت', value: 'shanghai_airport', rooms: ['مفردة', 'مزدوجة'] }
        ],
        guangzhou: [
            { name: 'قوانزو بلازا', value: 'guangzhou_plaza', rooms: ['مفردة', 'مزدوجة'] },
            { name: 'قوانزو إيربورت', value: 'guangzhou_airport', rooms: ['مفردة'] }
        ],
        shenzhen: [
            { name: 'شينزن جراند', value: 'shenzhen_grand', rooms: ['مفردة', 'مزدوجة', 'جناح'] }
        ],
        yiwu: [
            { name: 'يي وو هوتيل', value: 'yiwu_hotel', rooms: ['مفردة', 'مزدوجة'] }
        ]
    };

    if (destinationCitySelect) {
        destinationCitySelect.addEventListener('change', function () {
            const city = this.value;
            hotelSelect.innerHTML = '<option value="">اختر الفندق</option>';
            roomSelect.innerHTML = '<option value="">اختر الغرفة</option>';
            roomGroup.style.display = 'none';
            if (hotelsByCity[city]) {
                hotelsByCity[city].forEach(hotel => {
                    const opt = document.createElement('option');
                    opt.value = hotel.value;
                    opt.textContent = hotel.name;
                    hotelSelect.appendChild(opt);
                });
                hotelGroup.style.display = 'block';
            } else {
                hotelGroup.style.display = 'none';
            }
        });
    }
    if (hotelSelect) {
        hotelSelect.addEventListener('change', function () {
            const city = destinationCitySelect.value;
            const selectedHotel = hotelsByCity[city]?.find(h => h.value === this.value);
            roomSelect.innerHTML = '<option value="">اختر الغرفة</option>';
            if (selectedHotel) {
                selectedHotel.rooms.forEach(room => {
                    const opt = document.createElement('option');
                    opt.value = room;
                    opt.textContent = room;
                    roomSelect.appendChild(opt);
                });
                roomGroup.style.display = 'block';
            } else {
                roomGroup.style.display = 'none';
            }
        });
    }
    if (transferForm) {
        transferForm.addEventListener('submit', handleFormSubmit);
    }

    // Hotel form
    const hotelForm = document.getElementById('hotelForm');
    const hotelCitySelect = document.getElementById('hotelCitySelect');
    const hotelListGroup = document.getElementById('hotelListGroup');
    const hotelListSelect = document.getElementById('hotelListSelect');
    const hotelRoomGroup = document.getElementById('hotelRoomGroup');
    const hotelRoomSelect = document.getElementById('hotelRoomSelect');

    if (hotelCitySelect) {
        hotelCitySelect.addEventListener('change', function () {
            const city = this.value;
            hotelListSelect.innerHTML = '<option value="">اختر الفندق</option>';
            hotelRoomSelect.innerHTML = '<option value="">اختر الغرفة</option>';
            hotelRoomGroup.style.display = 'none';
            if (hotelsByCity[city]) {
                hotelsByCity[city].forEach(hotel => {
                    const opt = document.createElement('option');
                    opt.value = hotel.value;
                    opt.textContent = hotel.name;
                    hotelListSelect.appendChild(opt);
                });
                hotelListGroup.style.display = 'block';
            } else {
                hotelListGroup.style.display = 'none';
            }
        });
    }
    if (hotelListSelect) {
        hotelListSelect.addEventListener('change', function () {
            const city = hotelCitySelect.value;
            const selectedHotel = hotelsByCity[city]?.find(h => h.value === this.value);
            hotelRoomSelect.innerHTML = '<option value="">اختر الغرفة</option>';
            if (selectedHotel) {
                selectedHotel.rooms.forEach(room => {
                    const opt = document.createElement('option');
                    opt.value = room;
                    opt.textContent = room;
                    hotelRoomSelect.appendChild(opt);
                });
                hotelRoomGroup.style.display = 'block';
            } else {
                hotelRoomGroup.style.display = 'none';
            }
        });
    }
    if (hotelForm) {
        hotelForm.addEventListener('submit', handleFormSubmit);
    }

    // Generic form submit handler
    function handleFormSubmit(e) {
        e.preventDefault();
        // Here you would typically send the form data to your server
        // For now, we'll just show a success message
        alert('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
        const modal = this.closest('.service-modal');
        closeModal(modal);
        this.reset();
    }

    // Handle clicking the "تريد طلب تأشيرة دخول؟" link to open visa modal
    const goToVisaModal = document.getElementById('goToVisaModal');
    if (goToVisaModal) {
        goToVisaModal.addEventListener('click', function (e) {
            e.preventDefault();
            // Close any currently open modal
            document.querySelector('.service-modal.show')?.classList.remove('show');
            // Open visa modal
            document.getElementById('visaModal').classList.add('show');
            // Disable page scroll while modal is open
            document.body.style.overflow = 'hidden';
        });
    }
}); 