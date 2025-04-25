/**
 * GRC Portal - Main JavaScript
 * Enhances smooth scrolling behavior and adds interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Update current year for footer copyright
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Enhanced Smooth Scrolling for all internal links
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only process internal links (not # alone which is sometimes used for buttons)
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Check if browser supports smooth scrolling natively
                    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
                    
                    if (supportsNativeSmoothScroll) {
                        // Let CSS handle it, but ensure proper offset for fixed header
                        window.scrollTo({
                            top: targetElement.offsetTop - 80, // Account for header height
                            behavior: 'smooth'
                        });
                    } else {
                        // Fallback for browsers without smooth scrolling support
                        smoothScroll(targetElement, 1000); // 1000ms = 1s duration
                    }
                }
            }
        });
    });
    
    // Smooth scroll polyfill for browsers that don't support it
    function smoothScroll(target, duration) {
        const targetPosition = target.getBoundingClientRect().top - 80; // Account for header
        const startPosition = window.pageYOffset;
        const distance = targetPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const scrollY = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, scrollY);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        // Easing function - easeInOutQuad
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }

    // Handle header scroll effect - make it smaller on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Add animation classes to elements when they come into view
    const addAnimationOnScroll = () => {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-section');
                    // Stop observing after animation is added
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    };
    
    // Only run the animation if the browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
        addAnimationOnScroll();
    }

    // Prevent page jumping on refresh
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.onbeforeunload = function() {
        window.scrollTo(0, 0);
    };
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form inputs
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Get error message spans
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmError = document.getElementById('confirm-error');
    const generalError = document.getElementById('general-error');

    // Reset error messages
    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmError.textContent = "";
    generalError.textContent = "";

    let isValid = true;

    // ✅ Username validation (min 3 characters)
    if (username.length < 3) {
        usernameError.textContent = "Username must be at least 3 characters!";
        usernameError.style.visibility = "visible";
        isValid = false;
    }

    // ✅ Email validation (valid email format)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = "Invalid email format!";
        emailError.style.visibility = "visible";
        isValid = false;
    }

    // ✅ Password strength validation
    if (password.length < 8 || 
        !/[A-Z]/.test(password) || 
        !/[a-z]/.test(password) || 
        !/\d/.test(password) || 
        !/[\W]/.test(password)) {
        passwordError.textContent = "Password must be at least 8 characters long, contain an uppercase letter, lowercase letter, a number, and a special character!";
        passwordError.style.visibility = "visible";
        isValid = false;
    }

    // ✅ Confirm password validation
    if (password !== confirmPassword) {
        confirmError.textContent = "Passwords do not match!";
        confirmError.style.visibility = "visible";
        isValid = false;
    }

    if (!isValid) return; // Stop form submission if errors exist

    // Prepare form data
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirm_password", confirmPassword);

    // Send data to PHP
    fetch("signup.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "error") {
            generalError.textContent = data.message;
            generalError.style.visibility = "visible";
        } else if (data.status === "success") {
            alert("Signup Successful! Redirecting to login...");
            window.location.href = "login.html"; // Redirect to login page
        }
    })
    .catch(error => {
        console.error("Error:", error);
        generalError.textContent = "Something went wrong. Please try again.";
        generalError.style.visibility = "visible";
    });
});


