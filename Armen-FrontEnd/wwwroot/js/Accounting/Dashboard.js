// Dashboard Accounting JavaScript

// Initialize AOS
AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
});

// Animated Counters
const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/[^0-9]/g, '') || 0;
                const inc = target / 50;
                const is$ = counter.textContent.includes('$');

                if (count < target) {
                    const newCount = Math.ceil(count + inc);
                    counter.innerText = is$ ? `$ ${newCount.toLocaleString()}` : newCount;
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = is$ ? `$ ${target.toLocaleString()}` : target;
                }
            };
            updateCount();
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    observer.observe(counter);
});

// Tab Management
function switchTab(evt, tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Quick Actions Functions
function showPendingTasks() {
    const pendingTab = document.querySelector('[onclick*="pendingReview"]');
    switchTab({ currentTarget: pendingTab }, 'pendingReview');
}

function generateFinancialReport() {
    alert('???? ????? ??????? ??????...');
}

function exportData() {
    alert('???? ????? ????????...');
}

function showSettings() {
    alert('??????? ?????? ????????');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Accounting Dashboard loaded successfully');
});