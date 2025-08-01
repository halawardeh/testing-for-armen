document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    function startCounting() {
        if (hasAnimated) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // Animation duration in milliseconds
            const step = target / (duration / 16); // Update every 16ms (60fps)
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });

        hasAnimated = true;
    }

    // Start counting when the stats section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Video modal functionality
    const videoLink = document.querySelector('.video-link');
    if (videoLink) {
        videoLink.addEventListener('click', function (e) {
            e.preventDefault();
            const videoUrl = this.getAttribute('data-video-url');

            // Create modal
            const modalHtml = `
                <div class="video-modal">
                    <div class="video-modal-overlay"></div>
                    <div class="video-modal-content">
                        <button class="close-modal">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="video-container">
                            <iframe src="${videoUrl}" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                </div>
            `;

            // Add modal to body
            document.body.insertAdjacentHTML('beforeend', modalHtml);

            // Add modal styles dynamically
            const style = document.createElement('style');
            style.textContent = `
                .video-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .video-modal.active {
                    opacity: 1;
                }
                
                .video-modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                }
                
                .video-modal-content {
                    position: relative;
                    width: 90%;
                    max-width: 1000px;
                    background: black;
                    border-radius: 2px;
                    overflow: hidden;
                    transform: scale(0.7);
                    transition: transform 0.3s ease;
                }
                
                .video-modal.active .video-modal-content {
                    transform: scale(1);
                }
                
                .close-modal {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    width: 40px;
                    height: 40px;
                    background: var(--secondary-color);
                    border: none;
                    border-radius: 50%;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    z-index: 10;
                    transition: background-color 0.3s ease;
                }
                
                .close-modal:hover {
                    background: var(--primary-color);
                }
                
                .video-container {
                    position: relative;
                    padding-bottom: 56.25%;
                    height: 0;
                    overflow: hidden;
                }
                
                .video-container iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            `;
            document.head.appendChild(style);

            // Show modal with animation
            const modal = document.querySelector('.video-modal');
            requestAnimationFrame(() => {
                modal.classList.add('active');
            });

            // Close modal functionality
            const closeBtn = modal.querySelector('.close-modal');
            const overlay = modal.querySelector('.video-modal-overlay');

            function closeModal() {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }

            closeBtn.addEventListener('click', closeModal);
            overlay.addEventListener('click', closeModal);

            // Close on escape key
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') closeModal();
            });
        });
    }
});

// --- Progress Bar and Success Modal Logic ---
document.addEventListener('DOMContentLoaded', function () {
    // Progress Bar Logic
    const form = document.getElementById('quoteForm');
    const sections = form ? form.querySelectorAll('.form-section') : [];
    const progressFill = document.getElementById('progressFill');
    let currentSection = 0;

    function updateProgressBar() {
        if (!progressFill || sections.length === 0) return;
        const percent = ((currentSection + 1) / sections.length) * 100;
        progressFill.style.width = percent + '%';
    }

    // Optionally, you can add next/prev navigation between sections here
    // For now, update progress on input focus/blur as a simple demo
    if (form && sections.length > 0) {
        sections.forEach((section, idx) => {
            const inputs = section.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', function () {
                    currentSection = idx;
                    updateProgressBar();
                });
            });
        });
        // Set initial progress
        updateProgressBar();
    }

    // Success Modal Logic
    const successModal = document.getElementById('successModal');
    if (form && successModal) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // Optionally validate form here
            successModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    // Close modal function for button
    window.closeSuccessModal = function () {
        if (successModal) {
            successModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };
    // Also close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && successModal && successModal.style.display === 'flex') {
            window.closeSuccessModal();
        }
    });
}); 