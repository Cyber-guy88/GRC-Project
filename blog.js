document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].classList.toggle('rotate-45');
            spans[1].classList.toggle('opacity-0');
            spans[2].classList.toggle('rotate-negative-45');
        });
    }
    
    // Mobile dropdown toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        if (window.innerWidth <= 768) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // Category tabs filtering
    const categoryTabs = document.querySelectorAll('.tab');
    const blogCards = document.querySelectorAll('.blog-card');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            const category = tab.getAttribute('data-category');
            
            // Filter blog cards
            blogCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('animate-fade-in');
                    }, 10);
                } else {
                    const cardCategories = card.getAttribute('data-category');
                    if (cardCategories && cardCategories.includes(category)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('animate-fade-in');
                        }, 10);
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('animate-fade-in');
                    }
                }
            });
        });
    });
    
    // View toggle (grid/list)
    const viewButtons = document.querySelectorAll('.view-btn');
    const blogGrid = document.querySelector('.blog-grid');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all view buttons
            viewButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const viewType = btn.getAttribute('data-view');
            
            if (viewType === 'list') {
                blogGrid.classList.add('list-view');
            } else {
                blogGrid.classList.remove('list-view');
            }
        });
    });
    
    // Smooth scrolling for navigation links
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
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput.value) {
                // In a real implementation, you would send this to your server
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Add CSS for mobile menu toggle animation
    const style = document.createElement('style');
    style.textContent = `
        .rotate-45 {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .opacity-0 {
            opacity: 0;
        }
        .rotate-negative-45 {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    `;
    document.head.appendChild(style);
    
    // Initialize animations
    document.querySelectorAll('.blog-card').forEach(card => {
        card.classList.add('animate-fade-in');
    });

    // Blog card animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe each blog card
    blogCards.forEach(card => {
        observer.observe(card);
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        filterBlogCards(searchTerm);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase();
            filterBlogCards(searchTerm);
        }
    });

    // Filter blog cards
    function filterBlogCards(searchTerm) {
        blogCards.forEach(card => {
            const title = card.querySelector('.blog-title').textContent.toLowerCase();
            const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
            const category = card.dataset.category.toLowerCase();
            
            if (title.includes(searchTerm) || 
                excerpt.includes(searchTerm) || 
                category.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // View toggle functionality
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');

    gridViewBtn.addEventListener('click', () => {
        blogGrid.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });

    listViewBtn.addEventListener('click', () => {
        blogGrid.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });

    // Category filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            filterByCategory(category);
        });
    });

    function filterByCategory(category) {
        blogCards.forEach(card => {
            if (category === 'all' || card.dataset.category.includes(category)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');

    sortSelect.addEventListener('change', () => {
        const sortBy = sortSelect.value;
        sortBlogCards(sortBy);
    });

    function sortBlogCards(sortBy) {
        const cards = Array.from(blogCards);
        
        cards.sort((a, b) => {
            switch(sortBy) {
                case 'latest':
                    return new Date(b.querySelector('.blog-date').textContent) - 
                           new Date(a.querySelector('.blog-date').textContent);
                case 'popular':
                    return parseInt(b.querySelector('.blog-read-time').textContent) - 
                           parseInt(a.querySelector('.blog-read-time').textContent);
                case 'trending':
                    // Implement trending logic based on your criteria
                    return Math.random() - 0.5;
                default:
                    return 0;
            }
        });
        
        // Clear and re-append sorted cards
        cards.forEach(card => blogGrid.appendChild(card));
    }

    // Add hover effect for blog cards
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Pagination functionality
    const pagination = document.querySelector('.pagination');
    const itemsPerPage = 4; // Show 4 items on first page
    const totalItems = blogCards.length;
    const totalPages = Math.ceil(totalItems / (itemsPerPage - 1)); // Adjusting calculation for 3 items on second page

    function showPage(pageNum) {
        // Hide all blog cards first
        blogCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Calculate start and end indices
        let startIndex, endIndex;
        
        if (pageNum === 1) {
            // First page shows 4 items
            startIndex = 0;
            endIndex = itemsPerPage - 1;
        } else {
            // Subsequent pages show 3 items
            startIndex = itemsPerPage + ((pageNum - 2) * 3);
            endIndex = startIndex + 2;
        }
        
        // Show cards for current page
        for (let i = startIndex; i <= Math.min(endIndex, totalItems - 1); i++) {
            blogCards[i].style.display = 'flex';
        }
        
        // Update active state in pagination
        document.querySelectorAll('.page-link').forEach(link => {
            link.classList.remove('active');
            if (parseInt(link.textContent) === pageNum) {
                link.classList.add('active');
            }
        });
    }

    // Create pagination links
    if (totalItems > itemsPerPage) {
        let paginationHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `<a href="#" class="page-link ${i === 1 ? 'active' : ''}">${i}</a>`;
        }
        pagination.innerHTML = paginationHTML;
        
        // Add event listeners to pagination links
        document.querySelectorAll('.page-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageNum = parseInt(e.target.textContent);
                showPage(pageNum);
            });
        });
        
        // Show first page by default
        showPage(1);
    } else {
        // If there are fewer items than the items per page, hide pagination
        pagination.style.display = 'none';
    }
});