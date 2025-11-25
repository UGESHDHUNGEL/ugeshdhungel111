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
// Step 4: HTML5 Media Elements JavaScript
// Simple canvas drawing and media controls

// Video Elements
const portfolioVideo = document.getElementById('portfolioVideo');
const playPauseIcon = document.getElementById('playPauseIcon');

// Audio Elements
const portfolioAudio = document.getElementById('portfolioAudio');
const audioPlayPauseIcon = document.getElementById('audioPlayPauseIcon');

// Canvas Element
const skillsCanvas = document.getElementById('skillsCanvas');
const ctx = skillsCanvas.getContext('2d');

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing HTML5 Media Elements...');
    
    // Draw initial canvas content
    drawSkillsChart();
    
    // Add event listeners for media elements
    initializeMediaEvents();
});

// Video Controls
function togglePlayPause() {
    if (portfolioVideo.paused) {
        portfolioVideo.play();
        playPauseIcon.className = 'fas fa-pause';
    } else {
        portfolioVideo.pause();
        playPauseIcon.className = 'fas fa-play';
    }
}

function toggleMute() {
    portfolioVideo.muted = !portfolioVideo.muted;
    const volumeIcon = document.getElementById('volumeIcon');
    volumeIcon.className = portfolioVideo.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        portfolioVideo.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Audio Controls
function toggleAudioPlayPause() {
    if (portfolioAudio.paused) {
        portfolioAudio.play();
        audioPlayPauseIcon.className = 'fas fa-pause';
    } else {
        portfolioAudio.pause();
        audioPlayPauseIcon.className = 'fas fa-play';
    }
}

function restartAudio() {
    portfolioAudio.currentTime = 0;
    portfolioAudio.play();
    audioPlayPauseIcon.className = 'fas fa-pause';
}

// Canvas Drawing Functions
function drawSkillsChart() {
    clearCanvas();
    
    const skills = [
        { name: 'HTML/CSS', level: 90, color: '#e74c3c' },
        { name: 'JavaScript', level: 85, color: '#f39c12' },
        { name: 'React', level: 75, color: '#3498db' },
        { name: 'Node.js', level: 70, color: '#2ecc71' },
        { name: 'UI/UX', level: 80, color: '#9b59b6' }
    ];
    
    const barWidth = 50;
    const barSpacing = 20;
    const startX = 50;
    const startY = 250;
    const maxBarHeight = 150;
    
    // Draw chart title
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Technical Skills Chart', 120, 30);
    
    // Draw bars
    skills.forEach((skill, index) => {
        const x = startX + (barWidth + barSpacing) * index;
        const barHeight = (skill.level / 100) * maxBarHeight;
        const y = startY - barHeight;
        
        // Draw bar
        ctx.fillStyle = skill.color;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw skill name
        ctx.fillStyle = '#2c3e50';
        ctx.font = '12px Arial';
        ctx.fillText(skill.name, x, startY + 20);
        
        // Draw percentage
        ctx.fillText(skill.level + '%', x + 10, y - 10);
    });
    
    // Draw axis
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, 50);
    ctx.lineTo(30, startY);
    ctx.lineTo(350, startY);
    ctx.stroke();
}

function drawCreativeDesign() {
    clearCanvas();
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 400, 300);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 300);
    
    // Draw creative elements
    drawCreativeShapes();
    drawPattern();
    drawText();
}

function drawCreativeShapes() {
    // Draw circles
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(80 + i * 60, 100, 20 + i * 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + i * 0.15})`;
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // Draw triangles
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(300, 50 + i * 80);
        ctx.lineTo(350, 100 + i * 80);
        ctx.lineTo(250, 100 + i * 80);
        ctx.closePath();
        ctx.fillStyle = `rgba(52, 152, 219, ${0.3 + i * 0.2})`;
        ctx.fill();
    }
}

function drawPattern() {
    // Draw pattern lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 400; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 300);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(400, i);
        ctx.stroke();
    }
}

function drawText() {
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('Creative Design', 140, 250);
    
    ctx.font = '14px Arial';
    ctx.fillText('Interactive Canvas Demo', 130, 270);
}

function clearCanvas() {
    ctx.clearRect(0, 0, skillsCanvas.width, skillsCanvas.height);
    
    // Draw white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, skillsCanvas.width, skillsCanvas.height);
}

// Initialize media event listeners
function initializeMediaEvents() {
    // Video events
    portfolioVideo.addEventListener('play', function() {
        console.log('Video started playing');
    });
    
    portfolioVideo.addEventListener('ended', function() {
        playPauseIcon.className = 'fas fa-play';
        console.log('Video ended');
    });
    
    // Audio events
    portfolioAudio.addEventListener('play', function() {
        console.log('Audio started playing');
    });
    
    portfolioAudio.addEventListener('ended', function() {
        audioPlayPauseIcon.className = 'fas fa-play';
        console.log('Audio ended');
    });
    
    // Canvas click event for interactivity
    skillsCanvas.addEventListener('click', function(event) {
        const rect = skillsCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        drawClickEffect(x, y);
    });
}

// Interactive canvas click effect
function drawClickEffect(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(231, 76, 60, 0.5)';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(46, 204, 113, 0.7)';
    ctx.fill();
    
    // Remove effect after 1 second
    setTimeout(() => {
        drawSkillsChart();
    }, 1000);
}

// Handle window resize for canvas
window.addEventListener('resize', function() {
    // Redraw canvas on resize to maintain quality
    drawSkillsChart();
});

let  = 0;
const slider = document.querySelector(".slider");
const totalImages = document.querySelectorAll(".slider img").length;

document.querySelector(".next").addEventListener("click", () => {
    index++;
    if (index >= totalImages) index = 0;
    updateSlider();
});

document.querySelector(".prev").addEventListener("click", () => {
    index--;
    if (index < 0) index = totalImages - 1;
    updateSlider();
});

function updateSlider() {
    slider.style.transform = `translateX(-${index * 100}%)`;
}
let slides = document.querySelectorAll(".slide");
let index = 0;

document.getElementById("nextBtn").addEventListener("click", () => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
});

document.getElementById("prevBtn").addEventListener("click", () => {
    slides[index].classList.remove("active");
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add("active");
});
