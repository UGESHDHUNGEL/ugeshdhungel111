// ----------------------------
// THEME SWITCHER
// ----------------------------
const body = document.body;
const btn = document.getElementById("themeBtn");

let savedTheme = localStorage.getItem("theme");

// Apply saved theme or default
if (savedTheme === "dark") {
    body.classList.add("dark");
} else {
    body.classList.add("light");
}

if (btn) {
    btn.addEventListener("click", () => {
        if (body.classList.contains("light")) {
            body.classList.replace("light", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.replace("dark", "light");
            localStorage.setItem("theme", "light");
        }
    });
}

// ----------------------------
// SKILL BAR ANIMATION
// ----------------------------
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        let targetWidth = bar.getAttribute("data-progress");
        bar.style.width = targetWidth + "%";
    });
}

// Detect when skills section is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
        }
    });
}, { threshold: 0.3 });

// Observe skills section
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    observer.observe(skillsSection);
}

// ----------------------------
// SMOOTH SCROLLING
// ----------------------------
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.main ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ----------------------------
// CONTACT FORM HANDLING
// ----------------------------
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

function showFormMessage(message, type = 'error') {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
    }
}

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Reset message
        showFormMessage('', '');
        
        // Validation
        let isValid = true;
        
        if (name === "") {
            showFormMessage("Name is required!");
            isValid = false;
            return;
        }

        if (email === "") {
            showFormMessage("Email is required!");
            isValid = false;
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showFormMessage("Please enter a valid email address!");
            isValid = false;
            return;
        }

        if (message === "") {
            showFormMessage("Message cannot be empty!");
            isValid = false;
            return;
        }

        if (isValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Save to localStorage
            const formData = { name, email, message, timestamp: new Date().toISOString() };
            localStorage.setItem("contactFormData", JSON.stringify(formData));

            // Simulate API call delay
            setTimeout(() => {
                showFormMessage("Thank you! Your message has been sent successfully.", 'success');
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Optional: Redirect to form-details page
                // window.location.href = "form-details.html";
            }, 1500);
        }
    });
}

// ----------------------------
// FORM VALIDATION STYLING
// ----------------------------
function setupFormValidation() {
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#3498db';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#3498db';
            }
        });
    });
}

// Initialize form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', setupFormValidation);

// ----------------------------
// DISPLAY FORM DATA ON NEXT PAGE
// ----------------------------
const formDetailsDiv = document.getElementById("formDetails");

if (formDetailsDiv) {
    const storedData = localStorage.getItem("contactFormData");

    if (storedData) {
        try {
            const data = JSON.parse(storedData);
            
            formDetailsDiv.innerHTML = `
                <div class="form-details-container">
                    <h3>Form Submission Details</h3>
                    <div class="detail-item">
                        <strong>Name:</strong> ${data.name || 'N/A'}
                    </div>
                    <div class="detail-item">
                        <strong>Email:</strong> ${data.email || 'N/A'}
                    </div>
                    <div class="detail-item">
                        <strong>Message:</strong> ${data.message || 'N/A'}
                    </div>
                    ${data.timestamp ? `
                    <div class="detail-item">
                        <strong>Submitted:</strong> ${new Date(data.timestamp).toLocaleString()}
                    </div>
                    ` : ''}
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        Form submitted successfully!
                    </div>
                </div>
            `;
            
            // Optional: clear data after displaying
            // localStorage.removeItem("contactFormData");
        } catch (error) {
            formDetailsDiv.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    Error loading form data!
                </div>
            `;
        }
    } else {
        formDetailsDiv.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                No form data found!
            </div>
        `;
    }
}

// ----------------------------
// NAVBAR SCROLL EFFECT
// ----------------------------
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.main');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    }
});

// ----------------------------
// FLOATING CARDS ANIMATION
// ----------------------------
function initializeFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add delay for staggered animation
        card.style.animationDelay = `${index * 0.5}s`;
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeFloatingCards);

// ----------------------------
// PAGE LOAD ANIMATIONS
// ----------------------------
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ----------------------------
// ERROR HANDLING
// ----------------------------
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});