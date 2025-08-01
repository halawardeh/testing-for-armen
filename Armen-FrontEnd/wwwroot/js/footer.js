/**
 * Footer functionality for Armen Shipping Website
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top button functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) { // Show button after scrolling down 300px
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Newsletter form submission (placeholder)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get the email input value
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the data to a server
            // For now, just show an alert
            alert(`شكراً لاشتراكك في النشرة البريدية! سيتم إرسال التحديثات إلى ${email}`);
            
            // Reset the form
            this.reset();
        });
    }
});