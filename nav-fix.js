// This script fixes navigation issues and synchronizes the UI with proper classes

document.addEventListener('DOMContentLoaded', function() {
    // Fix for nist800-53.html
    const controlsGrid = document.querySelector('.controls-grid');
    if (controlsGrid) {
        controlsGrid.className = 'components-grid';
        
        const controlCards = document.querySelectorAll('.control-card');
        controlCards.forEach(card => {
            card.className = 'component-card';
        });
    }
    
    const implementationGrid = document.querySelector('.implementation-grid');
    if (implementationGrid) {
        implementationGrid.className = 'components-grid';
        
        const implementationCards = document.querySelectorAll('.implementation-card');
        implementationCards.forEach(card => {
            card.className = 'component-card';
        });
    }
    
    // Function to update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSectionId = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Add smooth scrolling to navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: 'smooth'
                });
                
                // Update active class manually
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize active link on page load
    updateActiveNavLink();
}); 