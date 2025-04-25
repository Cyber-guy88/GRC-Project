// Compliance & Security Frameworks Data
const frameworksData = [
    {
        id: 1,
        name: 'COBIT',
        fullName: 'Control Objectives for Information and Related Technologies',
        description: 'A framework created by ISACA for IT management and IT governance. COBIT provides an implementable set of controls over information technology and organizes them around a logical framework of IT-related processes and enablers.',
        icon: 'fas fa-tasks',
        category: 'governance',
        tags: ['IT Governance', 'Enterprise Architecture', 'Risk Management'],
        learnMoreUrl: 'cobit.html'
    },
    {
        id: 2,
        name: 'NIST CSF',
        fullName: 'NIST Cybersecurity Framework',
        description: 'A voluntary framework consisting of standards, guidelines, and best practices to manage cybersecurity risk. Created through collaboration between industry and government, the framework helps organizations to better manage and reduce cybersecurity risk.',
        icon: 'fas fa-shield-alt',
        category: 'risk',
        tags: ['Cybersecurity', 'Risk Management', 'Critical Infrastructure'],
        learnMoreUrl: 'nistcsf.html'
    },
    {
        id: 3,
        name: 'ISO 27001',
        fullName: 'ISO/IEC 27001',
        description: 'The ISO/IEC 27001 is an internationally recognized standard for managing information security. It provides a framework for establishing, implementing, maintaining, and continually improving an Information Security Management System (ISMS).',
        icon: 'fas fa-lock',
        category: 'compliance',
        tags: ['ISMS', 'Security Certification', 'Global Standard'],
        learnMoreUrl: 'iso27001.html'
    },
    {
        id: 4,
        name: 'ITIL',
        fullName: 'Information Technology Infrastructure Library',
        description: 'The ITIL (Information Technology Infrastructure Library) framework is a widely accepted set of best practices and guidelines for managing IT services.',
        icon: 'fas fa-cogs',
        category: 'governance',
        tags: ['Service Management', 'IT Operations', 'Change Management'],
        learnMoreUrl: 'itil.html'
    },
    {
        id: 5,
        name: 'GDPR',
        fullName: 'General Data Protection Regulation',
        description: 'The General Data Protection Regulation (GDPR) is the EU law governing data protection and privacy. It provides rights like access, correction, and deletion of personal data.',
        icon: 'fas fa-user-shield',
        category: 'compliance',
        tags: ['Data Privacy', 'EU Regulation', 'Personal Data'],
        learnMoreUrl: 'gdpr.html'
    },
    {
        id: 6,
        name: 'COSO',
        fullName: 'Committee of Sponsoring Organizations of the Treadway Commission',
        description: 'The COSO (Committee of Sponsoring Organizations of the Treadway Commission) framework is a widely recognized tool for designing, implementing, and evaluating internal controls within organizations.',
        icon: 'fas fa-balance-scale',
        category: 'governance',
        tags: ['Internal Control', 'Enterprise Risk', 'Corporate Governance'],
        learnMoreUrl: 'coso.html'
    },
    {
        id: 7,
        name: 'SOC 2',
        fullName: 'Service Organization Control 2',
        description: 'SOC 2 (System and Organization Controls 2) ensures service organizations manage customer data securely. It is based on five principles: Security, Availability, Processing Integrity, Confidentiality, and Privacy.',
        icon: 'fas fa-check-circle',
        category: 'compliance',
        tags: ['Data Security', 'Trust Services', 'Service Organizations'],
        learnMoreUrl: 'soc2.html'
    },
    {
        id: 8,
        name: 'FAIR',
        fullName: 'Factor Analysis of Information Risk',
        description: 'A taxonomy of the factors that contribute to risk and how they affect each other. It is primarily concerned with establishing accurate probabilities for the frequency and magnitude of data loss events.',
        icon: 'fas fa-chart-line',
        category: 'risk',
        tags: ['Risk Analysis', 'Quantitative Risk', 'Financial Impact'],
        learnMoreUrl: 'fair.html'
    },
    {
        id: 9,
        name: 'PCI DSS',
        fullName: 'Payment Card Industry Data Security Standard',
        description: 'The Payment Card Industry Data Security Standard (PCI DSS) ensures secure processing, storage, and transmission of credit card data to prevent fraud.',
        icon: 'fas fa-credit-card',
        category: 'compliance',
        tags: ['Payment Security', 'Card Processing', 'Data Protection'],
        learnMoreUrl: 'pcidss.html'
    },
    {
        id: 10,
        name: 'HIPAA',
        fullName: 'Health Insurance Portability and Accountability Act',
        description: 'HIPAA (Health Insurance Portability and Accountability Act) protects personal health information (PHI). It includes rules for privacy, security, and breach notification in healthcare.',
        icon: 'fas fa-hospital',
        category: 'compliance',
        tags: ['Healthcare', 'Privacy', 'Data Protection'],
        learnMoreUrl: 'hipaa_c.html'
    },
    {
        id: 11,
        name: 'DPDPA',
        fullName: 'Digital Personal Data Protection Act',
        description: 'The Digital Personal Data Protection Act (DPDPA) is an Indian data protection law that regulates personal data collection, storage, and processing.',
        icon: 'fas fa-user-lock',
        category: 'compliance',
        tags: ['India', 'Data Protection', 'Privacy'],
        learnMoreUrl: 'dpdpa.html'
    },
    {
        id: 12,
        name: 'CCPA',
        fullName: 'California Consumer Privacy Act',
        description: 'The California Consumer Privacy Act (CCPA) is a landmark privacy law enacted in 2018 to enhance consumer rights and data protection for residents of California, USA.',
        icon: 'fas fa-user-shield',
        category: 'compliance',
        tags: ['California', 'Privacy', 'Consumer Rights'],
        learnMoreUrl: 'ccpa.html'
    },
    {
        id: 13,
        name: 'FedRAMP',
        fullName: 'Federal Risk and Authorization Management Program',
        description: 'The Federal Risk and Authorization Management Program (FedRAMP) is a U.S. government-wide initiative designed to standardize the security assessment, authorization, and continuous monitoring of cloud services.',
        icon: 'fas fa-cloud',
        category: 'compliance',
        tags: ['Government', 'Cloud Security', 'US Federal'],
        learnMoreUrl: 'fedramp.html'
    },
    {
        id: 14,
        name: 'CMMC',
        fullName: 'Cybersecurity Maturity Model Certification',
        description: 'The Cybersecurity Maturity Model Certification (CMMC) is a framework developed by the U.S. Department of Defence (DoD) to enhance the cybersecurity practices of contractors within the defence Industrial Base (DIB).',
        icon: 'fas fa-shield-alt',
        category: 'compliance',
        tags: ['Defense', 'Cybersecurity', 'Certification'],
        learnMoreUrl: 'cmmc.html'
    },
    {
        id: 15,
        name: 'ISO 31000',
        fullName: 'ISO 31000 Risk Management',
        description: 'ISO 31000 is an international standard that provides principles and guidelines for risk management.',
        icon: 'fas fa-exclamation-triangle',
        category: 'risk',
        tags: ['Risk Management', 'International Standard', 'Enterprise Risk'],
        learnMoreUrl: 'iso31000.html'
    },
    {
        id: 16,
        name: 'NIST AI RMF',
        fullName: 'NIST AI Risk Management Framework',
        description: 'The NIST AI Risk Management Framework (AI RMF) helps organizations manage risks associated with artificial intelligence (AI) systems.',
        icon: 'fas fa-robot',
        category: 'risk',
        tags: ['AI', 'Risk Management', 'Emerging Technology'],
        learnMoreUrl: 'airmf.html'
    },
    {
        id: 17,
        name: 'NIST 800-53',
        fullName: 'NIST Special Publication 800-53',
        description: 'NIST Special Publication 800-53 provides a robust catalog of security and privacy controls for federal information systems.',
        icon: 'fas fa-file-contract',
        category: 'risk',
        tags: ['Federal', 'Security Controls', 'Compliance'],
        learnMoreUrl: 'nist800-53.html'
    },
    {
        id: 18,
        name: 'NIST 800-12',
        fullName: 'NIST Special Publication 800-12',
        description: 'This document serves as a beginner-friendly guide to understanding and implementing information security principles.',
        icon: 'fas fa-book',
        category: 'risk',
        tags: ['Guidelines', 'Information Security', 'Fundamentals'],
        learnMoreUrl: 'nist800-12.html'
    },
    {
        id: 19,
        name: 'NIST 800-14',
        fullName: 'NIST Special Publication 800-14',
        description: 'This publication outlined the principles and practices necessary for establishing a baseline of security for IT systems.',
        icon: 'fas fa-clipboard-list',
        category: 'risk',
        tags: ['IT Security', 'Baseline', 'Principles'],
        learnMoreUrl: 'nist800-14.html'
    },
    {
        id: 20,
        name: 'NIST 800-26',
        fullName: 'NIST Special Publication 800-26',
        description: 'NIST 800-26 provided organizations with a structured method to evaluate the effectiveness of their IT security controls.',
        icon: 'fas fa-tasks',
        category: 'risk',
        tags: ['Evaluation', 'Security Controls', 'Assessment'],
        learnMoreUrl: 'nist800-26.html'
    },
    {
        id: 21,
        name: 'IT Act',
        fullName: 'Information Technology Act',
        description: 'The IT Act provides legal framework for electronic governance and commerce in India.',
        icon: 'fas fa-gavel',
        category: 'compliance',
        tags: ['India', 'Legal', 'Electronic Commerce'],
        learnMoreUrl: 'itact.html'
    },
    {
        id: 22,
        name: 'ISO 38500',
        fullName: 'ISO/IEC 38500',
        description: 'ISO/IEC 38500 provides principles for the effective, efficient, and acceptable use of IT within organizations.',
        icon: 'fas fa-sitemap',
        category: 'governance',
        tags: ['IT Governance', 'Leadership', 'Decision Making'],
        learnMoreUrl: 'iso38500.html'
    },
    {
        id: 23,
        name: 'RBI',
        fullName: 'Reserve Bank of India IT Framework',
        description: 'The RBI Master Direction on IT Governance, Risk, Controls, and Assurance Practices strengthens cybersecurity and IT infrastructure resilience for financial institutions in India.',
        icon: 'fas fa-university',
        category: 'governance',
        tags: ['Banking', 'Financial Security', 'IT Governance'],
        learnMoreUrl: 'rbi.html'
    },
    {
        id: 24,
        name: 'FISMA',
        fullName: 'Federal Information Security Management Act',
        description: 'FISMA is a federal law that requires federal agencies to develop, document, and implement agency-wide programs to provide information security for their operations and assets.',
        icon: 'fas fa-shield-alt',
        category: 'compliance',
        tags: ['Government', 'Federal', 'Information Security'],
        learnMoreUrl: 'fisma.html'
    },
    {
        id: 25,
        name: 'CERT-IN',
        fullName: 'Indian Computer Emergency Response Team',
        description: 'The CERT-IN framework is a cornerstone of India\'s cybersecurity strategy, providing regulations for incident reporting, vulnerability management, and cybersecurity compliance for organizations operating in India.',
        icon: 'fas fa-shield-alt',
        category: 'compliance',
        tags: ['Cybersecurity', 'India', 'Incident Response'],
        learnMoreUrl: 'certin.html'
    }
];

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    const accordion = document.querySelector('.accordion');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const searchInput = document.getElementById('searchInput');
    
    // Initialize the framework cards
    initFrameworkCards();
    
    // Add event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter frameworks based on category
            const selectedCategory = this.getAttribute('data-category');
            filterFrameworks(selectedCategory);
        });
    });
    
    // Function to initialize framework cards
    function initFrameworkCards() {
        // Clear accordion content
        accordion.innerHTML = '';
        
        // Generate framework cards
        frameworksData.forEach(framework => {
            const card = createFrameworkCard(framework);
            accordion.appendChild(card);
        });
    }
    
    // Function to create a framework card
    function createFrameworkCard(framework) {
        const card = document.createElement('div');
        card.className = 'framework-card';
        card.setAttribute('data-category', framework.category);
        
        const tagHtml = framework.tags.map(tag => {
            const tagClass = framework.category === 'governance' ? 'governance' : 
                        framework.category === 'risk' ? 'risk' : 'compliance';
            return `<span class="framework-tag ${tagClass}">${tag}</span>`;
        }).join('');
        
        card.innerHTML = `
            <div class="card-header">
                <div class="card-icon ${framework.category}">
                    <i class="${framework.icon}"></i>
                </div>
                <h3>${framework.name}</h3>
                
            </div>
            <div class="card-content">
                <h4 class="card-title">${framework.fullName}</h4>
                <p class="card-description">${framework.description}</p>
                <div class="tag-container">
                    ${tagHtml}
                </div>
                <div class="card-actions">
                    <button class="card-btn btn-learn" onclick="window.location.href='${framework.learnMoreUrl}'">
                        <i class="fas fa-book"></i>
                        <span>Learn More</span>
                    </button>
                    
                </div>
            </div>
        `;
        
        return card;
    }
    
    // Function to filter frameworks based on category
    function filterFrameworks(category) {
        const cards = document.querySelectorAll('.framework-card');
        
        cards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                // Add staggered animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50 * Math.min(Array.from(cards).indexOf(card), 5)); // Limit delay to prevent too long animations
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
    }
    
    // Search functionality
function searchFramework() {
        const searchTerm = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.framework-card');
        
        cards.forEach(card => {
            const cardName = card.querySelector('h3').textContent.toLowerCase();
            const cardDesc = card.querySelector('p').textContent.toLowerCase();
            const cardFullName = card.querySelector('h4').textContent.toLowerCase();
            const cardTags = Array.from(card.querySelectorAll('.framework-tag')).map(tag => tag.textContent.toLowerCase());
            
            if (
                cardName.includes(searchTerm) || 
                cardDesc.includes(searchTerm) || 
                cardFullName.includes(searchTerm) ||
                cardTags.some(tag => tag.includes(searchTerm))
            ) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
    }
    
    // Attach search function to window for global access
    window.searchFramework = searchFramework;
});
