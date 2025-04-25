// Enhanced Chatbot Configuration
const chatbotConfig = {
    categories: [
        {
            id: 'home',
            icon: 'fa-solid fa-house',
            title: 'Home',
            description: 'Get started with our GRC platform',
            questions: ["What is GRC?", "How can I get started?", "What's included in the platform?"]
        },
        {
            id: 'governance',
            icon: 'fa-solid fa-landmark-dome',
            title: 'Governance',
            description: 'Explore governance related topics',
            questions: [
                "What is Governance in GRC?", 
                "What are the key components of Governance scope?", 
                "What are the main principles of good Governance?",
                "What are popular Governance frameworks?",
                "What tools support Governance implementation?",
                "What are common Governance challenges?",
                "How can organizations improve Governance?",
                "What does the GRC framework include?",
                "Why is stakeholder engagement important in Governance?",
                "How does Governance relate to risk management?"
            ]
        },
        {
            id: 'risk',
            icon: 'fa-solid fa-shield-halved',
            title: 'Risk Management',
            description: 'Learn about risk management techniques',
            questions: [
                "What is Risk Management?", 
                "What are the main types of risks organizations face?", 
                "What are the key steps in risk management?",
                "What are popular risk management frameworks?",
                "What is the FAIR framework?",
                "What tools are available for risk management?",
                "What is OCTAVE risk assessment?",
                "How does Rapid Risk Assessment (RRA) work?",
                "Why is risk management important?"
            ]
        },
        {
            id: 'framework',
            icon: 'fa-solid fa-clipboard-check',
            title: 'Compliance Frameworks',
            description: 'Discover compliance frameworks and standards',
            questions: [
                "What is SOC 2 compliance?", 
                "What does HIPAA protect?", 
                "What is the purpose of PCI-DSS?",
                "What are the core functions of NIST CSF?",
                "What rights does GDPR provide?",
                "What is ISO 27001 certification?",
                "Who needs to comply with CCPA?",
                "What is FedRAMP authorization?",
                "What are the CMMC maturity levels?",
                "What does COBIT framework cover?",
                "What is CERT-IN?"
            ]
        },
        {
            id: 'audit',
            icon: 'fa-solid fa-magnifying-glass-chart',
            title: 'Audit',
            description: 'Learn about audit processes and tools',
            questions: [
                "What is an Audit in GRC?",
                "What are the main types of audits?",
                "Why are audits important?",
                "What are common audit report types?",
                "How do audits support GRC?"
            ]
        },
        {
            id: 'services',
            icon: 'fa-solid fa-handshake-angle',
            title: 'What we provide?',
            description: 'Explore our resources and services',
            questions: ["Resources to learn GRC", "Readiness for compliance score and suggestion", "Blogs to read"]
        }
    ],
    responses: {
        'What is Governance in GRC?': {
            text: 'Governance in GRC refers to the framework of rules, policies, and processes that guide an organization\'s behavior and decision-making. It ensures integrity, risk management, and legal compliance while promoting transparency and accountability.',
            links: [
                { text: 'Learn More', url: 'governance.html' }
            ]
        },
        'What are the key components of Governance scope?': {
            text: 'Governance involves strategic planning, policy development, risk assessment, and performance monitoring. It structures decision-making and goal achievement while ensuring regulatory compliance.\n\nKey components include:\nStrategic planning and oversight\nPolicy development and implementation\nRisk assessment and management\nPerformance monitoring and reporting',
            links: [
                { text: 'Learn More', url: 'governance.html' }
            ]
        },
        'What are the main principles of good Governance?': {
            text: 'The core principles are:\n\nAccountability: Clear responsibilities and reporting mechanisms\nTransparency: Open access to governance information and processes\nIntegrity: High ethical standards and professional conduct\nResponsiveness: Quickly adapting to emerging risks and changes',
            links: [
                { text: 'Learn More', url: 'governance.html#evaluating-governance-quality' }
            ]
        },
        'What are popular Governance frameworks?': {
            text: 'Key frameworks include:\n\nCOSO: Internal controls & risk management\nCOBIT: IT governance & management\nITIL: IT service management\nNIST CSF: Cybersecurity risk management\nISO/IEC 38500: IT governance principles\nCMMI: Process improvement framework',
            links: [
                { text: 'Learn More', url: 'governance.html#frameworks' }
            ]
        },
        'What tools support Governance implementation?': {
            text: 'Leading tools include:\n\Collibra\nIBM Cloud Pak for Data \nSAP GRC\nAlation \nInformatica \nDiligent GRC\n\nThese tools help automate compliance and oversight processes we will reccomend to learn more and choose tools wisely as per need.',
            links: [
                { text: 'Learn More', url: 'tools.html#governance-tools' }
            ]
        },
        'What are common Governance challenges?': {
            text: 'Organizations face several key challenges:\n\nComplex Regulatory Environment\nResource Constraints\nCultural Resistance\nTechnology Integration\n\nThese challenges require careful planning and management to overcome.',
            links: [
                { text: 'Learn More', url: 'governance.html#governance-challenges' }
            ]
        },
        'How can organizations improve Governance?': {
            text: 'Improvement strategies include:\n\nBuilding a strong governance structure\nEnhancing risk management practices\nPromoting a culture of compliance\nLeveraging technology for efficiency\nContinuous improvement of policies',
            links: [
                { text: 'Learn More', url: 'governance.html' }
            ]
        },
        'What does the GRC framework include?': {
            text: 'The framework comprises:\n\nLeadership and Oversight: Defines organizational structure and responsibilities\nStrategic Direction: Aligns organizational goals with mission\nPolicy Framework: Develops comprehensive decision-making guidelines\nStakeholder Engagement: Ensures all stakeholder concerns are addressed',
            links: [
                { text: 'Learn More', url: 'governance.html' }
            ]
        },
        'Why is stakeholder engagement important in Governance?': {
            text: 'Stakeholder engagement ensures all stakeholder concerns are considered in decision-making, promoting transparency and building trust in organizational processes. It\'s a crucial component of effective governance that helps maintain organizational accountability.',
            links: [
                { text: 'Learn More', url: 'governance.html' }
            ]
        },
        'How does Governance relate to risk management?': {
            text: 'Governance provides the structure for identifying and managing risks through policies, oversight, and strategic alignment, making risk management a core Governance component. This integration ensures comprehensive risk oversight and effective decision-making.',
            links: [
                { text: 'Learn More', url: 'governance.html' }
            ]
        },
        'What is Risk Management?': {
            text: 'Risk management is the systematic process of identifying, assessing, and mitigating threats that can affect an organization. It involves analyzing risks\' likelihood and impact, developing strategies to minimize harm, and monitoring effectiveness. The goal is to transform uncertainties into actionable plans.',
            links: [
                { text: 'Learn More', url: 'rsk.html' }
            ]
        },
        'What are the main types of risks organizations face?': {
            text: 'Key risk types include:\n\n• Operational Risk (internal process failures)\n\n• Asset Impairment Risk (loss of asset value)\n\n• Competitive Risk (market changes)\n\n• Franchise Risk (loss of stakeholder confidence)\n\nEach requires specific mitigation strategies to protect business continuity.',
            links: [
                { text: 'Learn More', url: 'rsk.html' }
            ]
        },
        'What are the key steps in risk management?': {
            text: 'The 5-step process includes:\n\n1. Risk Identification\n2. Risk Analysis\n3. Risk Prioritization\n4. Risk Treatment (Mitigation)\n5. Continuous Monitoring\n\nThis cycle ensures comprehensive risk coverage and timely response.',
            links: [
                { text: 'Learn More', url: 'rsk.html#risk-process' }
            ]
        },
        'What are popular risk management frameworks?': {
            text: 'Leading frameworks include:\n\n ISO 31000 (general risk)\n NIST Cybersecurity Framework (IT security)\n COSO ERM (enterprise risk)\n• FAIR (quantitative analysis)\n OCTAVE (business-focused assessments)\n\nEach serves different organizational needs.',
            links: [
                { text: 'Basic Overview', url: 'rsk.html#frameworks' },
            ]
        },
        'What is the FAIR framework?': {
            text: 'FAIR (Factor Analysis of Information Risk) is a quantitative model that measures cyber risks in financial terms. Unlike qualitative methods, it calculates probable loss magnitudes, helping prioritize risks based on potential monetary impact.',
            links: [
                { text: 'Learn More', url: 'rsk.html#frameworks' }
            ]
        },
        'What tools are available for risk management?': {
            text: 'Popular tools include:\n\n IBM OpenPages (AI-driven GRC)\n• Archer Insight (risk quantification)\n Riskonnect (enterprise risk integration)\n SAI360 (compliance management)\n Netflix RiskQuant (open-source risk calculation)',
            links: [
                { text: 'Explore Tools', url: 'tools.html#risk-management' }
            ]
        },
        'What is OCTAVE risk assessment?': {
            text: 'Developed by Carnegie Mellon, OCTAVE evaluates cybersecurity risks through business impact analysis rather than just technical vulnerabilities. It emphasizes critical assets and cross-departmental collaboration.',
            links: [
                { text: 'Learn More', url: 'rsk3.html' }
            ]
        },
        'How does Rapid Risk Assessment (RRA) work?': {
            text: 'RRA is a quick (30-60 minute) high-level analysis method developed by Mozilla. It identifies major security risks, prioritizes mitigation efforts, and can be regularly updated as new threats emerge—ideal for fast-moving organizations.',
            links: [
                { text: 'Learn More', url: 'rsk3.html' }
            ]
        },
      
        'Why is risk management important?': {
            text: 'Effective risk management:\n\n Enhances decision-making with data-driven insights\n Minimizes financial/reputational damage\n Enables calculated risk-taking for innovation\n\nIt transforms uncertainty from a threat into a managed business factor.',
            links: [
                { text: 'Learn More', url: 'rsk.html' }
            ]
        },
        'What is an Audit in GRC?': {
            text: 'An audit is a systematic examination of an organization\'s financial records, operations, compliance status, and risk management practices. It verifies accuracy, completeness, and adherence to laws/standards through independent assessment.\n\nKey areas examined include:\n• Financial records and statements\n• Operations and processes\n• Compliance with regulations\n• Risk management practices',
            links: [
                { text: 'Learn More', url: 'audit.html' }
            ]
        },
        'What are the main types of audits?': {
            text: 'Key audit types include:\n\n Compliance Audits (regulatory adherence)\n Risk Audits (risk control assessment)\n IT/Cybersecurity Audits (system security)\n Financial Audits (statement reviews)\n Operational Audits (process efficiency)\n\nAdditional types include:\n• Internal Audits\n• Environmental Audits\n• External Audits',
            links: [
                { text: 'Learn More', url: 'audit.html#audit-types' }
            ]
        },
        'Why are audits important?': {
            text: 'Audits serve multiple crucial purposes:\n\n Ensure accuracy and detect errors\n Maintain regulatory compliance\n Prevent fraud and build stakeholder trust\n Improve risk management and operational efficiency\n\nAdditional benefits include:\n• Strengthening internal controls\n• Supporting strategic planning\n• Enhancing operational efficiency',
            links: [
                { text: 'Learn More', url: 'audit.html#audit-importance' }
            ]
        },
        'What are common audit report types?': {
            text: 'Audit outcomes include:\n\n• Unqualified/Clean: No significant issues found\n• Qualified: Minor issues present\n• Adverse: Significant problems identified\n• Disclaimer: Unable to form conclusive opinion\n\nEach type indicates different levels of assurance and concerns.',
            links: [
                { text: 'Learn More', url: 'audit.html#audit-reporting' }
            ]
        },
        'How do audits support GRC?': {
            text: 'Audits strengthen GRC by:\n\n Validating compliance with policies/laws\n Identifying control gaps and risks\n Providing data for strategic decisions\n Enhancing transparency and accountability\n\nThis comprehensive approach ensures effective governance, risk management, and compliance.',
            links: [
                { text: 'Learn More', url: 'audit.html' }
            ]
        },
        'What is SOC 2 compliance?': {
            text: 'SOC 2 (System and Organization Controls 2) ensures service organizations manage customer data securely. It\'s based on five principles:\n\nSecurity\nAvailability\nProcessing Integrity\nConfidentiality\nPrivacy\n\nThis framework is particularly important for cloud service providers.',
            links: [
                { text: 'Learn More', url: 'frame.html' }
            ]
        },
        'What does HIPAA protect?': {
            text: 'HIPAA (Health Insurance Portability and Accountability Act) safeguards personal health information (PHI). It includes:\n\n Privacy Rules\n Security Requirements\n Breach Notification Protocols\n\nSpecifically designed for the healthcare industry to protect sensitive patient data.',
            links: [
                { text: 'Learn More', url: 'frame.html' }
            ]
        },
        'What is the purpose of PCI-DSS?': {
            text: 'The Payment Card Industry Data Security Standard (PCI DSS) ensures:\n\n✔ Secure credit card processing\n✔ Safe data storage\n✔ Protected data transmission\n\nIt helps prevent payment card fraud by establishing security standards for merchants and service providers.',
            links: [
                { text: 'Learn More', url: 'frame.html' }
            ]
        },
        'What are the core functions of NIST CSF?': {
            text: 'The NIST Cybersecurity Framework includes five core functions:\n\n1️ Identify\n2️Protect\n3️ Detect\n4️ Respond\n5️ Recover\n\nThis structured approach helps organizations manage and reduce cybersecurity risks effectively.',
            links: [
                { text: 'Learn More', url: 'frame.html' }
            ]
        },
        'What rights does GDPR provide?': {
            text: 'The General Data Protection Regulation (GDPR) provides EU citizens with:\n\n Right to access personal data\n Right to correct inaccurate information\n Right to deletion ("right to be forgotten")\n\nIt\'s the world\'s strictest privacy and security law.',
            links: [
                { text: 'Learn More', url: 'frame.html' }
            ]
        },
        'What is ISO 27001 certification?': {
            text: 'ISO/IEC 27001 is the international standard for information security management systems (ISMS). It provides:\n\n Framework for security practices\n Continuous improvement methodology\n Risk management approach\n\nHelps organizations establish, implement, maintain, and improve information security.',
            links: [
                { text: 'Learn More', url: 'frame.html' }
            ]
        },
        'Who needs to comply with CCPA?': {
            text: 'The California Consumer Privacy Act (CCPA) applies to businesses that:\n\nCollect California residents\' personal data\nMeet revenue thresholds\nProcess significant data volumes\n\nProvides consumers rights to:\nKnow what data is collected\nDelete their data\nOpt-out of data sales',
            links: [
                { text: 'Learn More', url: 'frame.html' }
            ]
        },
        'What is FedRAMP authorization?': {
            text: 'FedRAMP is a U.S. government program that:\n\n Standardizes cloud security assessment\n Provides "do once, use many times" framework\n Authorizes cloud services for federal use\n\nStreamlines security assessment process for cloud providers serving federal agencies.',
            links: [
                { text: 'Learn More', url: 'frame.html' }
            ]
        },
        'What are the CMMC maturity levels?': {
            text: 'The Cybersecurity Maturity Model Certification (CMMC) has five levels:\n\n1️ Basic Cyber Hygiene\n2️ Intermediate Cyber Hygiene\n3️ Good Cyber Hygiene\n4️ Proactive Practices\n5️ Advanced/Progressive\n\nRequired for defense contractors based on their work.',
            links: [
                { text: 'Learn More', url: 'frame.html' }
            ]
        },
        'What does COBIT framework cover?': {
            text: 'COBIT (Control Objectives for Information and Related Technologies) provides:\n\nIT governance and management\nBusiness-IT alignment\nProcess frameworks\n\nHelps organizations:\nAlign IT strategy with business goals\nOptimize information flows\nStructure IT processes',
            links: [
                { text: 'Learn More', url: 'frame.html' }
            ]
        },
        'What is CERT-IN?': {
            text: 'The CERT-IN (Indian Computer Emergency Response Team) framework is a cornerstone of India\'s cybersecurity strategy. It provides regulations for:\n\n• Incident reporting (within 6 hours of detection)\n• Log retention (180 days within India)\n• NTP synchronization requirements\n• Cybersecurity compliance for organizations operating in India\n\nEstablished under the IT Act Section 70B, it serves as the national agency for cyber incident response.',
            links: [
                { text: 'Learn More', url: 'certin.html' }
            ]
        },
        'Resources to learn GRC': {
            text: "We offer comprehensive resources to help you learn about GRC. Our platform includes educational materials, guides, templates, and interactive tools designed to enhance your understanding of governance, risk, and compliance concepts.",
            links: [
                {
                    text: "Explore our learning resources",
                    url: "home.html#learn-grc"
                }
            ]
        },
        'Readiness for compliance score and suggestion': {
            text: "Our readiness assessment tool provides a personalized compliance score and tailored suggestions to improve your organization's GRC posture. Take our assessment to identify gaps and receive actionable recommendations.",
            links: [
                {
                    text: "Take compliance readiness assessment",
                    url: "asses_list.html"
                }
            ]
        },
        'Blogs to read': {
            text: "We regularly publish insightful articles, case studies, and best practices in our blog. Stay informed about the latest trends, regulatory updates, and practical advice from GRC experts.",
            links: [
                {
                    text: "Browse our blog articles",
                    url: "blog.html"
                }
            ]
        }
    },
    defaultResponses: [
        {
            text: "I understand you're asking about {topic}. Here are some helpful resources:",
            links: [
                { text: 'GRC Guide', url: 'frame.html' },
                { text: 'Best Practices', url: 'governance.html' }
            ]
        },
        {
            text: "Let me help you with {topic}. Check out these relevant pages:",
            links: [
                { text: 'Knowledge Base', url: 'blog.html' },
                { text: 'Framework Guide', url: 'frame.html' }
            ]
        }
    ],
    greetings: [
        "Hello! I'm your GRC Assistant. How can I help you today?",
        "Welcome! I can assist you with Governance, Risk, Framework, and Audit topics.",
        "Hi there! I'm here to help with your GRC questions.",
        "Greetings! Let me help you explore GRC topics and solutions.",
        "Welcome to GRC Portal! I'm your personal assistant for all things GRC."
    ],
    suggestions: [
        "Learn about governance",
        "Explore risk management",
        "Understand frameworks",
        "Discover audit processes",
        "Tell me about compliance",
        "How to manage risks?",
        "What is GRC?",
        "Show me frameworks"
    ],
    generalResponses: {
        'hello': [
            "Hello! How can I assist you with GRC today?",
            "Hi there! Would you like to explore our GRC services?",
            "Greetings! I can help you with Governance, Risk, and Compliance topics."
        ],
        'hi': [
            "Hi! Ready to dive into GRC topics?",
            "Hello! What would you like to learn about today?",
            "Hi there! Let's explore GRC together."
        ],
        'hey': [
            "Hey! How can I help you with GRC?",
            "Hello! Ready to learn about GRC?",
            "Hey there! What GRC topics interest you?"
        ],
        'thank you': [
            "You're welcome! Is there anything else you'd like to know about GRC?",
            "Glad I could help! Feel free to ask more questions about GRC.",
            "My pleasure! Don't hesitate to ask about any GRC topic."
        ],
        'thanks': [
            "You're welcome! Need help with anything else?",
            "Anytime! Let me know if you have more questions.",
            "Happy to help! What else would you like to know?"
        ],
        'bye': [
            "Goodbye! Feel free to return if you have more GRC questions.",
            "Take care! I'm here 24/7 for your GRC needs.",
            "Bye! Come back anytime to learn more about GRC."
        ],
        'goodbye': [
            "Goodbye! Remember, I'm always here to help with GRC.",
            "Have a great day! Return anytime for GRC assistance.",
            "Take care! Looking forward to helping you again with GRC topics."
        ],
        'help': [
            "I can help you with:\n1. Governance topics\n2. Risk management\n3. Compliance frameworks\n4. Audit processes\nWhat would you like to explore?",
            "Need assistance? I can guide you through:\n- GRC basics\n- Framework implementation\n- Risk assessment\n- Compliance checks",
            "I'm here to help! Choose a category to explore:\n- Governance\n- Risk Management\n- Frameworks\n- Audit"
        ]
    },
    keywordMappings: {
        'governance': {
            category: 'governance',
            keywords: ['govern', 'policy', 'management', 'strategy', 'board', 'leadership'],
            suggestion: "Would you like to explore our Governance category?"
        },
        'risk': {
            category: 'risk',
            keywords: ['risk', 'threat', 'vulnerability', 'assessment', 'mitigation', 'security'],
            suggestion: "Shall we look at Risk Management topics?"
        },
        'framework': {
            category: 'framework',
            keywords: ['framework', 'standard', 'compliance', 'regulation', 'iso', 'nist', 'soc', 'hipaa', 'gdpr', 'cert-in', 'certin', 'pci', 'dss', 'cmmc', 'fedramp', 'cobit', 'ccpa'],
            suggestion: "Would you like to learn about specific frameworks?"
        },
        'audit': {
            category: 'audit',
            keywords: ['audit', 'assessment', 'review', 'evaluation', 'check', 'examine'],
            suggestion: "Interested in learning about Audit processes?"
        },
        'services': {
            category: 'services',
            keywords: ['provide', 'service', 'offering', 'resource', 'learn', 'readiness', 'blog', 'score', 'suggestion', 'help'],
            suggestion: "Would you like to see what resources and services we provide?"
        }
    }
};

// Enhanced State Management
const chatState = {
    currentCategory: null,
    messageHistory: [],
    isMinimized: false,
    typingTimeout: null,
    welcomeShown: false,
    isOpen: false
};

// Initialize Chatbot
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded event fired in chatbot.js - initializing chatbot");
    initChatbot();
});

function initChatbot() {
    console.log("initChatbot function called - starting chatbot initialization");
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotWindow = document.getElementById('chatbotWindow');
    
    if (!chatbotButton || !chatbotWindow) {
        console.error('Chatbot elements not found');
        return;
    }
    
    console.log("Chatbot elements found, setting up click handler");
    chatbotButton.addEventListener('click', () => {
        chatState.isOpen = !chatState.isOpen;
        
        if (chatState.isOpen) {
            chatbotWindow.style.display = 'flex';
            setTimeout(() => {
                chatbotWindow.classList.add('active');
            }, 10);
            
            // Always clean up and show categories when opening
            const messagesContainer = document.getElementById('chatbotMessages');
            if (messagesContainer) {
                messagesContainer.innerHTML = ''; // Clear previous content
                showCategories();
                chatState.welcomeShown = true;
            }
        } else {
            chatbotWindow.classList.remove('active');
            setTimeout(() => {
                chatbotWindow.style.display = 'none';
            }, 300);
        }
    });
    
    // Setup other event listeners
    setupEventListeners();
    
    console.log("Chatbot initialized successfully");
}

// Expose initChatbot to global scope for debugging
window.initChatbot = initChatbot;

// Enhanced Message Addition
function addMessage(type, content) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${type}`;
    
    if (typeof content === 'string') {
        messageDiv.textContent = content;
    } else {
        messageDiv.innerHTML = content;
    }
    
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

// Enhanced Message Appending
function appendMessage(text, type) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${type}`;
    
    // Process markdown-like syntax
    const processedText = processMessageText(text);
    messageDiv.innerHTML = processedText;
    
    // Add to container
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
    
    // Store in history
    chatState.messageHistory.push({ text, type });
}

// Process Message Text
function processMessageText(text) {
    // Convert URLs to links
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    
    // Convert markdown-like syntax
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert newlines to <br>
    text = text.replace(/\n/g, '<br>');
    
    return text;
}

// Handle User Message
function handleUserMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    
    if (text) {
        input.value = '';
        
        const messagesContainer = document.getElementById('chatbotMessages');
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'chatbot-message user';
        userMessage.textContent = text;
        messagesContainer.appendChild(userMessage);
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        messagesContainer.appendChild(typingIndicator);
        
        // Find and display response
        setTimeout(() => {
            typingIndicator.remove();
            const response = findResponse(text);
            
            const botMessage = document.createElement('div');
            botMessage.className = 'chatbot-message bot';
            
            let messageContent = `<div class="response-content"><p>${response.text}</p>`;
            
            if (response.links) {
                messageContent += `<div class="message-links">`;
                response.links.forEach(link => {
                    if (link.action) {
                        messageContent += `
                            <button onclick="${link.action}" class="message-link">
                                <i class="fas fa-chevron-right"></i>
                                ${link.text}
                            </button>`;
                    } else {
                        messageContent += `
                            <a href="${link.url}" class="message-link" target="_blank">
                                <i class="fas fa-external-link-alt"></i>
                                ${link.text}
                            </a>`;
                    }
                });
                messageContent += '</div>';
            }
            
            if (response.suggestions) {
                messageContent += `
                    <div class="chatbot-suggestions">
                        ${chatbotConfig.suggestions.slice(0, 4).map(suggestion => `
                            <button class="suggestion-button" onclick="handleUserMessage('${suggestion}')">
                                ${suggestion}
                            </button>
                        `).join('')}
                    </div>`;
            }
            
            messageContent += '</div>';
            botMessage.innerHTML = messageContent;
            messagesContainer.appendChild(botMessage);
            scrollToBottom();
            
            // Show follow-up suggestions for general responses
            if (response.isGeneral) {
                setTimeout(() => {
                    const suggestionMessage = document.createElement('div');
                    suggestionMessage.className = 'chatbot-message bot';
                    suggestionMessage.innerHTML = `
                        <div class="response-content">
                            <p>Here are some topics you might be interested in:</p>
                            <div class="chatbot-suggestions">
                                ${chatbotConfig.suggestions.slice(0, 4).map(suggestion => `
                                    <button class="suggestion-button" onclick="handleUserMessage('${suggestion}')">
                                        ${suggestion}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    `;
                    messagesContainer.appendChild(suggestionMessage);
                    scrollToBottom();
                }, 1000);
            }
        }, 1500);
    }
}

// Find Response
function findResponse(text) {
    const lowerText = text.toLowerCase();
    
    // Check for general responses first
    for (const [key, responses] of Object.entries(chatbotConfig.generalResponses)) {
        if (lowerText.includes(key)) {
            return {
                text: responses[Math.floor(Math.random() * responses.length)],
                isGeneral: true
            };
        }
    }
    
    // Check for direct matches in responses
    if (chatbotConfig.responses[text]) {
        return chatbotConfig.responses[text];
    }
    
    // Check for category keywords
    for (const [category, data] of Object.entries(chatbotConfig.keywordMappings)) {
        if (data.keywords.some(keyword => lowerText.includes(keyword))) {
            return {
                text: data.suggestion,
                suggestedCategory: category,
                links: [
                    { text: 'View Category', action: `showCategoryQuestions('${data.category}')` }
                ]
            };
        }
    }
    
    // Fuzzy match for responses
    for (const [question, response] of Object.entries(chatbotConfig.responses)) {
        if (question.toLowerCase().includes(lowerText) || 
            lowerText.includes(question.toLowerCase())) {
            return response;
        }
    }
    
    // Default response with suggestions
    return {
        text: "I understand you're interested in GRC. Here are some topics you might want to explore:",
        suggestions: true,
        links: [
            { text: 'Governance', action: "showCategoryQuestions('governance')" },
            { text: 'Risk Management', action: "showCategoryQuestions('risk')" },
            { text: 'Frameworks', action: "showCategoryQuestions('framework')" },
            { text: 'Audit', action: "showCategoryQuestions('audit')" }
        ]
    };
}

// Scroll to bottom of messages
function scrollToBottom() {
    const messagesContainer = document.getElementById('chatbotMessages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Toggle Minimize
function toggleMinimize() {
    const chatbot = document.getElementById('chatbotWindow');
    chatState.isMinimized = !chatState.isMinimized;
    
    if (chatState.isMinimized) {
        chatbot.classList.add('minimized');
    } else {
        chatbot.classList.remove('minimized');
    }
}

// Utility Functions
function showWelcomeAnimation() {
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'welcome-animation';
    welcomeDiv.innerHTML = `
        <div class="welcome-icon">
            <i class="fas fa-robot"></i>
        </div>
    `;
    
    document.getElementById('chatbotMessages').appendChild(welcomeDiv);
    
    // Remove after animation
    setTimeout(() => {
        welcomeDiv.remove();
    }, 3000);
}

// Setup Event Listeners
function setupEventListeners() {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendMessage');
    const minimizeButton = document.querySelector('.minimize-chatbot');
    const closeButton = document.querySelector('.close-chatbot');
    
    if (userInput && sendButton) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUserMessage();
            }
        });
        
        sendButton.addEventListener('click', handleUserMessage);
    }
    
    if (minimizeButton) {
        minimizeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const chatbotWindow = document.getElementById('chatbotWindow');
            chatbotWindow.classList.toggle('minimized');
        });
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const chatbotWindow = document.getElementById('chatbotWindow');
            chatbotWindow.classList.remove('active');
            setTimeout(() => {
                chatbotWindow.style.display = 'none';
            }, 300);
            chatState.isOpen = false;
        });
    }
}

// Show Categories
function showCategories() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const categoriesHtml = document.createElement('div');
    categoriesHtml.className = 'categories-container';
    
    categoriesHtml.innerHTML = `
        <div class="welcome-message">
            <div class="welcome-icon">
                <i class="fas fa-robot"></i>
            </div>
            <h2>How can I help you today?</h2>
            <p>Select a category to explore:</p>
        </div>
        <div class="categories-grid">
            ${chatbotConfig.categories.map(category => `
                <div class="category-card" onclick="showCategoryQuestions('${category.id}')">
                    <div class="category-icon">
                        <i class="${category.icon}"></i>
                    </div>
                    <div class="category-content">
                        <h3>${category.title}</h3>
                        <p>${category.description}</p>
                    </div>
                    <div class="category-arrow">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    messagesContainer.appendChild(categoriesHtml);
    scrollToBottom();
}

// Show Category Questions
function showCategoryQuestions(categoryId) {
    const category = chatbotConfig.categories.find(c => c.id === categoryId);
    if (!category) return;

    const messagesContainer = document.getElementById('chatbotMessages');
    const questionsContainer = document.createElement('div');
    questionsContainer.className = 'questions-container';
    
    questionsContainer.innerHTML = `
        <div class="questions-header">
            <button class="back-button" onclick="showCategories()">
                <i class="fas fa-arrow-left"></i>
                Back to Categories
            </button>
            <h3><i class="${category.icon}"></i> ${category.title}</h3>
        </div>
        <div class="questions-grid">
            ${category.questions.length > 0 ? 
                category.questions.map(question => `
                    <div class="question-card" onclick="handleQuestionClick('${question.replace(/'/g, "\\'")}')">
                        <i class="fas fa-question-circle"></i>
                        <span>${question}</span>
                    </div>
                `).join('') :
                `<div class="no-questions-message">
                    <i class="fas fa-info-circle"></i>
                    <p>Questions for this category will be added soon.</p>
                </div>`
            }
        </div>
    `;
    
    // Clear previous content and add new questions
    messagesContainer.innerHTML = '';
    messagesContainer.appendChild(questionsContainer);
}

// Handle Question Click
function handleQuestionClick(question) {
    console.log("Clicked question:", question); // Debug log
    console.log("Available responses:", Object.keys(chatbotConfig.responses)); // Debug log
    
    const messagesContainer = document.getElementById('chatbotMessages');
    
    // Get current category from the UI
    const categoryHeader = document.querySelector('.questions-header h3 i');
    const currentCategory = categoryHeader ? 
        chatbotConfig.categories.find(c => categoryHeader.className.includes(c.icon))?.id || 'general' : 
        'general';
    
    // Clear previous messages
    messagesContainer.innerHTML = '';
    
    // Add user question
    const userMessage = document.createElement('div');
    userMessage.className = 'chatbot-message user';
    userMessage.textContent = question;
    messagesContainer.appendChild(userMessage);
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    messagesContainer.appendChild(typingIndicator);
    
    // Get and display response after a short delay
    setTimeout(() => {
        // Remove typing indicator
        typingIndicator.remove();
        
        // Get response - try exact match first
        let response = chatbotConfig.responses[question];
        
        // If no exact match, try case-insensitive match
        if (!response) {
            for (const [key, value] of Object.entries(chatbotConfig.responses)) {
                if (key.toLowerCase() === question.toLowerCase()) {
                    response = value;
                    break;
                }
            }
        }
        
        // Create bot message
        const botMessage = document.createElement('div');
        botMessage.className = 'chatbot-message bot';
        
        if (response) {
            // Display actual response if available
            botMessage.innerHTML = `
                <div class="response-content">
                    <p>${response.text}</p>
                    ${response.links ? `
                        <div class="message-links">
                            ${response.links.map(link => `
                                <a href="${link.url}" class="message-link" target="_blank">
                                    <i class="fas fa-external-link-alt"></i>
                                    ${link.text}
                                </a>
                            `).join('')}
                        </div>
                    ` : ''}
                    <div class="back-to-questions">
                        <button onclick="showCategoryQuestions('${currentCategory}')" class="back-button">
                            <i class="fas fa-arrow-left"></i>
                            Back to Questions
                        </button>
                    </div>
                </div>
            `;
        } else {
            // Fallback for missing responses
            console.warn("No response found for:", question); // Debug log
            botMessage.innerHTML = `
                <div class="response-content">
                    <p>I'm still learning about "${question}". Please check our documentation for more information on this topic.</p>
                    <div class="back-to-questions">
                        <button onclick="showCategoryQuestions('${currentCategory}')" class="back-button">
                            <i class="fas fa-arrow-left"></i>
                            Back to Questions
                        </button>
                    </div>
                </div>
            `;
        }
        
        messagesContainer.appendChild(botMessage);
        scrollToBottom();
    }, 1000);
}