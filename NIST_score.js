// NIST Framework Assessment Data
const nistFramework = {
    identify: [
        {
            id: "ID-1",
            question: "Have you compiled a comprehensive inventory of all devices, software, and information utilized, such as laptops, smartphones, tablets, and point-of-sale systems?",
            original: "Compile a comprehensive inventory of all devices, software, and information utilized, such as laptops, smartphones, tablets, and point-of-sale systems."
        },
        {
            id: "ID-2",
            question: "Have you established and distributed a corporate cybersecurity guideline covering roles and duties for employees, vendors, and other individuals with access to confidential data?",
            original: "Establish and distribute a corporate cybersecurity guideline covering roles and duties for employees, vendors, and other individuals with access to confidential data."
        },
        {
            id: "ID-3",
            question: "Have you established procedures for safeguarding against a breach and mitigating the impact if one occurs?",
            original: "Establish procedures for safeguarding against a breach and mitigating the impact if one occurs."
        }
    ],
    protect: [
        {
            id: "PR-1",
            question: "Do you regulate access to your network and devices?",
            original: "Regulate access to your network and devices."
        },
        {
            id: "PR-2",
            question: "Do you encrypt sensitive information while at rest and in transit?",
            original: "Encrypt sensitive information while at rest and in transit."
        },
        {
            id: "PR-3",
            question: "Do you utilize security programs to safeguard data?",
            original: "Utilize security programs to safeguard data."
        },
        {
            id: "PR-4",
            question: "Do you regularly back up data?",
            original: "Regularly back up data."
        },
        {
            id: "PR-5",
            question: "Do you keep security software up to date, and automate updates where feasible?",
            original: "Keep security software up to date, and automate updates where feasible."
        },
        {
            id: "PR-6",
            question: "Have you established formal procedures for securely disposing of digital files and outdated devices?",
            original: "Establish formal procedures for securely disposing of digital files and outdated devices."
        },
        {
            id: "PR-7",
            question: "Do you educate all users on cybersecurity best practices to enhance understanding of personal risks and workplace responsibilities?",
            original: "Educate all users on cybersecurity best practices to enhance understanding of personal risks and workplace responsibilities."
        }
    ],
    detect: [
        {
            id: "DE-1",
            question: "Do you monitor your systems for unauthorized access, devices, and software?",
            original: "Monitor your systems for unauthorized access, devices, and software."
        },
        {
            id: "DE-2",
            question: "Do you investigate any unusual network or staff activities?",
            original: "Investigate any unusual network or staff activities."
        },
        {
            id: "DE-3",
            question: "Do you check for unauthorized users or connections on your network?",
            original: "Check for unauthorized users or connections on your network."
        }
    ],
    respond: [
        {
            id: "RS-1",
            question: "Have you developed a detailed plan for notifying individuals affected by data breaches?",
            original: "Notifying individuals affected by data breaches."
        },
        {
            id: "RS-2",
            question: "Have you developed a detailed plan for ensuring continuous business operations?",
            original: "Ensuring continuous business operations."
        },
        {
            id: "RS-3",
            question: "Have you developed a detailed plan for informing law enforcement and relevant authorities about breaches?",
            original: "Informing law enforcement and relevant authorities about the breach."
        },
        {
            id: "RS-4",
            question: "Have you developed a detailed plan for investigating and containing security breaches?",
            original: "Investigating and containing security breaches."
        },
        {
            id: "RS-5",
            question: "Have you developed a detailed plan for updating cybersecurity policy and plans based on experiences?",
            original: "Updating cybersecurity policy and plan based on experiences."
        },
        {
            id: "RS-6",
            question: "Have you developed a detailed plan for preparation for unforeseen events that might jeopardize data?",
            original: "Preparation for unforeseen events that might jeopardize data."
        },
        {
            id: "RS-7",
            question: "Do you regularly test your response plans?",
            original: "Then regularly test your plan."
        }
    ],
    recover: [
        {
            id: "RC-1",
            question: "Do you have a plan to repair and recover any affected equipment and network components after an attack?",
            original: "Repair and recover any affected equipment and network components."
        },
        {
            id: "RC-2",
            question: "Do you keep stakeholders informed about your response and recovery efforts?",
            original: "Keep stakeholders informed about your response and recovery efforts."
        }
    ]
};

// Recommendations database - detailed guidance for each control
const recommendationsDB = {
    // Identify
    "ID-1": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Create a comprehensive asset inventory system to track all hardware, software, and data assets in the organization. Consider using an automated asset discovery tool to ensure completeness."
        },
        "Partial": {
            priority: "high",
            recommendation: "Enhance your existing inventory system to ensure all assets are cataloged including cloud resources, IoT devices, and mobile assets. Implement regular inventory verification processes."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Maintain your comprehensive inventory with regular updates. Consider implementing automated asset discovery and management tools if not already in place."
        }
    },
    "ID-2": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Develop and distribute comprehensive cybersecurity guidelines that clearly define roles and responsibilities for all personnel with access to sensitive data."
        },
        "Partial": {
            priority: "high",
            recommendation: "Update your cybersecurity guidelines to address any gaps in role definitions and responsibilities. Ensure all stakeholders receive and acknowledge these updates."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Regularly review and update your cybersecurity guidelines to reflect changing threats and organizational changes. Consider gamification to improve employee engagement."
        }
    },
    "ID-3": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Establish formal incident response procedures for breach prevention and impact mitigation. Include detailed steps for different breach scenarios."
        },
        "Partial": {
            priority: "high",
            recommendation: "Strengthen existing procedures for breach protection and impact mitigation. Ensure they cover all critical systems and data types."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Regularly test your breach mitigation procedures through tabletop exercises and simulations to ensure effectiveness."
        }
    },
    
    // Protect
    "PR-1": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Implement robust access control measures including multi-factor authentication, least privilege principles, and regular access reviews."
        },
        "Partial": {
            priority: "high",
            recommendation: "Strengthen network and device access controls by implementing consistent policies across all systems. Consider implementing zero trust architecture principles."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Continue to refine access control measures with regular reviews and updates to reflect organizational changes and emerging threats."
        }
    },
    "PR-2": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Implement encryption for all sensitive data both at rest and in transit. Use industry-standard encryption protocols for data protection."
        },
        "Partial": {
            priority: "high",
            recommendation: "Expand encryption coverage to all sensitive data repositories and communication channels. Evaluate and upgrade encryption methods if necessary."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Regularly review encryption methods to ensure they meet or exceed industry standards. Consider quantum-resistant encryption for future-proofing."
        }
    },
    "PR-3": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Deploy comprehensive security solutions including antivirus, anti-malware, intrusion detection/prevention systems, and data loss prevention tools."
        },
        "Partial": {
            priority: "high",
            recommendation: "Enhance your security program suite to cover all potential attack vectors. Ensure proper integration between different security solutions."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Regularly evaluate the effectiveness of your security programs and consider advanced solutions like behavior-based detection systems."
        }
    },
    "PR-4": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Implement a comprehensive data backup strategy following the 3-2-1 rule (3 copies, 2 different media types, 1 off-site)."
        },
        "Partial": {
            priority: "high",
            recommendation: "Enhance your backup processes to ensure all critical data is included and test recovery procedures regularly."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Continue regular backup testing and consider implementing air-gapped backups for critical systems to protect against ransomware."
        }
    },
    "PR-5": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Implement automated patch management and software update systems for all devices and applications in your environment."
        },
        "Partial": {
            priority: "high",
            recommendation: "Expand your update automation to cover all systems and applications. Develop a consistent testing protocol for patches before deployment."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Maintain your update schedule and consider implementing vulnerability scanning to identify missing patches."
        }
    },
    "PR-6": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Establish formal data and device disposal procedures that ensure complete data sanitization using approved methods like secure wiping or physical destruction."
        },
        "Partial": {
            priority: "high",
            recommendation: "Formalize and document your disposal procedures to ensure consistency across all departments and asset types."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Regularly audit your disposal procedures for compliance and effectiveness. Consider certified destruction services for highly sensitive data."
        }
    },
    "PR-7": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Implement a comprehensive security awareness training program for all users with regular updates and testing."
        },
        "Partial": {
            priority: "high",
            recommendation: "Enhance your security training program with phishing simulations, role-specific training, and regular refresher courses."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Continue regular training and consider advanced simulations and gamification to improve engagement and retention."
        }
    },
    
    // Detect
    "DE-1": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Implement 24/7 monitoring for unauthorized access, devices, and software using SIEM (Security Information and Event Management) systems."
        },
        "Partial": {
            priority: "high",
            recommendation: "Enhance your monitoring capabilities to ensure comprehensive coverage of all systems and implement automated alerting."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Consider advanced detection technologies like behavior analytics and machine learning for improved threat detection."
        }
    },
    "DE-2": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Establish a formal process for investigating anomalous activities with clear escalation procedures and response playbooks."
        },
        "Partial": {
            priority: "high",
            recommendation: "Strengthen your investigation processes by adding automated analysis tools and regular reviews of detection effectiveness."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Consider implementing a Security Operations Center (SOC) or using a Managed Detection and Response (MDR) service for enhanced capabilities."
        }
    },
    "DE-3": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Implement regular network access audits and unauthorized connection detection through network access control (NAC) solutions."
        },
        "Partial": {
            priority: "high",
            recommendation: "Enhance your unauthorized access detection with automated scanning and alerting systems across all network segments."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Consider implementing continuous monitoring technologies and deception technologies (honeypots) to detect sophisticated attackers."
        }
    },
    
    // Respond
    "RS-1": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Develop a detailed data breach notification plan that complies with relevant regulations and includes templates and communication channels."
        },
        "Partial": {
            priority: "high",
            recommendation: "Enhance your notification procedures to ensure timely and comprehensive communications with affected individuals."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Regularly review and test your notification procedures and update them to reflect changing regulations."
        }
    },
    "RS-2": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Develop a business continuity plan with clear procedures for maintaining essential operations during security incidents."
        },
        "Partial": {
            priority: "high",
            recommendation: "Strengthen your business continuity procedures with regular testing and updates based on organizational changes."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Consider advanced continuity strategies like distributed operations and automated failover systems."
        }
    },
    "RS-3": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Establish procedures for law enforcement notification including contact points, required information, and timing considerations."
        },
        "Partial": {
            priority: "high",
            recommendation: "Enhance your authority notification procedures with templates and pre-established relationships with relevant agencies."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Maintain relationships with law enforcement contacts and regularly update notification procedures."
        }
    },
    "RS-4": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Develop detailed incident investigation and containment procedures with clear roles and responsibilities for the response team."
        },
        "Partial": {
            priority: "high",
            recommendation: "Enhance your investigation and containment procedures with additional tools and techniques for different attack scenarios."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Consider advanced forensic tools and techniques, and regular training for your incident response team."
        }
    },
    "RS-5": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Implement a process for reviewing and updating cybersecurity policies based on incidents and evolving threats."
        },
        "Partial": {
            priority: "high",
            recommendation: "Formalize the feedback loop between incident response and policy updates to ensure lessons learned are incorporated."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Consider threat intelligence integration to proactively update policies based on emerging threats."
        }
    },
    "RS-6": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Develop plans for unforeseen cybersecurity events including worst-case scenarios and novel attack vectors."
        },
        "Partial": {
            priority: "high",
            recommendation: "Expand your contingency planning to include more diverse scenarios and recovery strategies."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Regularly update your plans using threat intelligence and emerging attack pattern information."
        }
    },
    "RS-7": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Implement a regular testing schedule for all response plans including tabletop exercises and simulated incidents."
        },
        "Partial": {
            priority: "high",
            recommendation: "Expand your testing to include more realistic scenarios and involve all stakeholders in exercises."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Consider red team exercises and third-party evaluations of your response capabilities."
        }
    },
    
    // Recover
    "RC-1": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Develop detailed recovery procedures for all critical systems and infrastructure components with clear prioritization."
        },
        "Partial": {
            priority: "high",
            recommendation: "Enhance your recovery procedures with detailed technical guides and regular testing to validate effectiveness."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Consider automated recovery solutions and explore cyber insurance options for additional recovery support."
        }
    },
    "RC-2": {
        "No": {
            priority: "critical",
            recommendation: "Critical: Develop a stakeholder communication plan for recovery efforts with templates and designated spokespersons."
        },
        "Partial": {
            priority: "high",
            recommendation: "Enhance your communication procedures with more detailed information sharing guidelines and regular updates."
        },
        "Yes": {
            priority: "medium",
            recommendation: "Consider establishing a dedicated recovery communication team with specialized training in crisis communications."
        }
    }
};

// Maturity levels based on overall score ranges
const maturityLevels = [
    { min: 0, max: 20, level: "Initial - Practices are ad hoc and unestablished" },
    { min: 21, max: 40, level: "Developing - Basic practices exist but are inconsistent" },
    { min: 41, max: 60, level: "Defined - Practices are documented and implemented" },
    { min: 61, max: 80, level: "Managed - Practices are measured and controlled" },
    { min: 81, max: 100, level: "Optimizing - Focus on continuous improvement" }
];

// DOM elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and hide all contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.style.display = 'none');
            
            // Add active class to clicked button and show corresponding content
            button.classList.add('active');
            const category = button.getAttribute('data-category');
            document.getElementById(category).style.display = 'block';
        });
    });
    
    // Initialize next buttons
    const nextButtons = document.querySelectorAll('.next-btn[data-next]');
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const nextTabId = button.getAttribute('data-next');
            // Simulate click on the corresponding tab button
            document.querySelector(`.tab-btn[data-category="${nextTabId}"]`).click();
            // Scroll to top of the tab content
            document.getElementById(nextTabId).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
    
    // Final analyze button
    document.getElementById('finalAnalyzeBtn').addEventListener('click', () => {
        analyzeCompliance();
    });
    
    // Initialize checklists
    initializeChecklists();
    
    // Add analyze button event listener
    document.getElementById('analyzeBtn').addEventListener('click', analyzeCompliance);
    
    // Filter recommendations
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            filterRecommendations(filter);
        });
    });
    
    // Download PDF button
    document.getElementById('downloadPdf').addEventListener('click', generatePDFReport);
    
    // Add debug save button functionality after page is fully loaded
    const debugSaveBtn = document.getElementById('debugSaveBtn');
    if (debugSaveBtn) {
        debugSaveBtn.addEventListener('click', function() {
            // Create a sample assessment result
            const debugResults = {
                categories: {
                    identify: { total: 3, score: 66.67, implemented: 1, partial: 1, missing: 1 },
                    protect: { total: 7, score: 71.43, implemented: 3, partial: 2, missing: 2 },
                    detect: { total: 3, score: 83.33, implemented: 2, partial: 1, missing: 0 },
                    respond: { total: 7, score: 64.29, implemented: 3, partial: 1, missing: 3 },
                    recover: { total: 2, score: 75.00, implemented: 1, partial: 1, missing: 0 }
                },
                overall: {
                    total: 22,
                    implemented: 10,
                    partial: 6,
                    missing: 6,
                    score: 70.45
                },
                recommendations: [
                    {
                        id: "ID-1",
                        requirement: "Have you compiled a comprehensive inventory?",
                        category: "identify",
                        status: "Partial",
                        recommendation: "Enhance your existing inventory system",
                        priority: "high"
                    },
                    {
                        id: "PR-2",
                        requirement: "Do you encrypt sensitive information?",
                        category: "protect",
                        status: "No",
                        recommendation: "Implement encryption for all sensitive data",
                        priority: "critical"
                    }
                ]
            };
            
            // Save the debug data
            saveAssessmentResults(debugResults);
            
            // Show a message
            alert("Debug data saved. Check dashboard to verify.");
        });
    }
});

// Initialize the checklists with questions
function initializeChecklists() {
    // Initialize for each category
    initializeChecklistForCategory('identify');
    initializeChecklistForCategory('protect');
    initializeChecklistForCategory('detect');
    initializeChecklistForCategory('respond');
    initializeChecklistForCategory('recover');
    
    // Update progress indicators
    updateAssessmentProgress();
}

function initializeChecklistForCategory(category) {
    const tbody = document.getElementById(`${category}Checklist`);
    const items = nistFramework[category];
    
    tbody.innerHTML = '';
    
    items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td data-id="${item.id}">${item.question}</td>
            <td class="status-cell">
                <div class="status-indicator" id="status-${item.id}"></div>
            </td>
            <td class="implementation-cell">
                <button class="impl-btn yes" onclick="selectImplementation(this, 'Yes', '${item.id}')">Yes</button>
                <button class="impl-btn partial" onclick="selectImplementation(this, 'Partial', '${item.id}')">Partial</button>
                <button class="impl-btn no" onclick="selectImplementation(this, 'No', '${item.id}')">No</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Implementation selection logic
function selectImplementation(button, status, itemId) {
    // Update button states
    const buttons = button.parentElement.getElementsByClassName('impl-btn');
    Array.from(buttons).forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    
    // Update status indicator
    const statusCell = document.getElementById(`status-${itemId}`);
    statusCell.className = 'status-indicator ' + status.toLowerCase();
    
    // Update icon based on status
    updateStatusIcon(statusCell, status);
    
    // Update progress
    updateAssessmentProgress();
}

// Update status indicator with appropriate icon
function updateStatusIcon(cell, status) {
    const iconMap = {
        'Yes': '<i class="fas fa-check-circle"></i>',
        'Partial': '<i class="fas fa-exclamation-circle"></i>',
        'No': '<i class="fas fa-times-circle"></i>'
    };
    cell.innerHTML = iconMap[status];
}

// Update overall assessment progress
function updateAssessmentProgress() {
    const totalItems = countTotalItems();
    const answeredItems = countAnsweredItems();
    
    if (totalItems === 0) return;
    
    const progressPercentage = Math.round((answeredItems / totalItems) * 100);
    
    document.getElementById('progressPercentage').textContent = `${progressPercentage}%`;
    document.getElementById('progressBar').style.width = `${progressPercentage}%`;
}

// Count total number of checklist items
function countTotalItems() {
    let count = 0;
    for (const category in nistFramework) {
        count += nistFramework[category].length;
    }
    return count;
}

// Count number of answered items
function countAnsweredItems() {
    let count = 0;
    document.querySelectorAll('.impl-btn.selected').forEach(() => {
        count++;
    });
    return count;
}

// Main analysis function
function analyzeCompliance() {
    const results = {
        categories: {
            identify: { total: 0, score: 0, implemented: 0, partial: 0, missing: 0 },
            protect: { total: 0, score: 0, implemented: 0, partial: 0, missing: 0 },
            detect: { total: 0, score: 0, implemented: 0, partial: 0, missing: 0 },
            respond: { total: 0, score: 0, implemented: 0, partial: 0, missing: 0 },
            recover: { total: 0, score: 0, implemented: 0, partial: 0, missing: 0 }
        },
        overall: {
            total: 0,
            implemented: 0,
            partial: 0,
            missing: 0,
            score: 0
        },
        recommendations: []
    };

    // Calculate scores for each category
    for (const category in nistFramework) {
        results.categories[category].total = nistFramework[category].length;
        results.overall.total += nistFramework[category].length;
        
        // Check each item in the category
        nistFramework[category].forEach(item => {
            // Find the selected implementation status for this item
            const statusCell = document.getElementById(`status-${item.id}`);
            let status = "Not Assessed";
            
            // If status cell has children, determine the status
            if (statusCell && statusCell.querySelector('i')) {
                const icon = statusCell.querySelector('i');
                if (icon.classList.contains('fa-check-circle')) {
                    status = "Yes";
                    results.categories[category].implemented++;
                    results.overall.implemented++;
                } else if (icon.classList.contains('fa-exclamation-circle')) {
                    status = "Partial";
                    results.categories[category].partial++;
                    results.overall.partial++;
                } else if (icon.classList.contains('fa-times-circle')) {
                    status = "No";
                    results.categories[category].missing++;
                    results.overall.missing++;
                }
            }
            
            // Add recommendation if not fully implemented
            if (status === "Partial" || status === "No") {
                const recommendation = recommendationsDB[item.id][status];
                results.recommendations.push({
                    id: item.id,
                    requirement: item.question,
                    category: category,
                    status: status,
                    recommendation: recommendation.recommendation,
                    priority: recommendation.priority
                });
            }
        });
        
        // Calculate category score (Yes = 1, Partial = 0.5, No = 0)
        if (results.categories[category].total > 0) {
            results.categories[category].score = (
                (results.categories[category].implemented + (results.categories[category].partial * 0.5)) / 
                results.categories[category].total
            ) * 100;
        }
    }
    
    // Calculate overall score - ensure this is correct
    if (results.overall.total > 0) {
        // Using the formula: (implemented + (partial * 0.5)) / total * 100
        const scoreValue = (
            (results.overall.implemented + (results.overall.partial * 0.5)) / 
            results.overall.total
        ) * 100;
        
        // Make sure it's a valid number
        results.overall.score = isNaN(scoreValue) ? 0 : scoreValue;
        
        console.log('Overall score calculation:', {
            implemented: results.overall.implemented,
            partial: results.overall.partial,
            total: results.overall.total,
            formula: `(${results.overall.implemented} + (${results.overall.partial} * 0.5)) / ${results.overall.total} * 100`,
            calculatedScore: results.overall.score
        });
    }
    
    // Display results
    displayResults(results);
    
    // Show the results section
    document.getElementById('assessmentResults').classList.remove('hidden');
    
    // Scroll to results
    document.getElementById('assessmentResults').scrollIntoView({ behavior: 'smooth' });
    
    // Call the save function after analysis
    saveAssessmentResults(results);
    
    return results;
}

// Display the analysis results
function displayResults(results) {
    // Update date
    document.getElementById('generationDate').textContent = new Date().toLocaleString();
    
    // Update overall score - ensure we're using the correct value
    const overallScore = Math.round(results.overall.score);
    document.getElementById('complianceScore').textContent = `${overallScore}%`;
    
    // Update score circle
    const scoreDashArray = 408; // Circumference of the circle (2 * π * r)
    const dashOffset = scoreDashArray - (scoreDashArray * overallScore / 100);
    document.getElementById('scoreCircleFill').style.strokeDasharray = `${scoreDashArray * overallScore / 100} ${scoreDashArray}`;
    
    // Set color based on score
    const scoreCircleFill = document.getElementById('scoreCircleFill');
    if (overallScore < 40) {
        scoreCircleFill.style.stroke = '#ef4444'; // Danger
    } else if (overallScore < 70) {
        scoreCircleFill.style.stroke = '#f59e0b'; // Warning
    } else {
        scoreCircleFill.style.stroke = '#10b981'; // Success
    }
    
    // Update maturity level - make sure we're using the calculated score
    const maturityLevel = getMaturityLevel(overallScore);
    document.getElementById('maturityLevelText').textContent = maturityLevel;
    
    // Update category scores
    for (const category in results.categories) {
        const score = Math.round(results.categories[category].score);
        document.getElementById(`${category}Score`).textContent = `${score}%`;
        document.getElementById(`${category}ScoreResult`).textContent = `${score}%`;
        document.getElementById(`${category}ProgressBar`).style.width = `${score}%`;
    }
    
    // Update counts
    document.getElementById('implementedCount').textContent = results.overall.implemented;
    document.getElementById('partialCount').textContent = results.overall.partial;
    document.getElementById('missingCount').textContent = results.overall.missing;
    
    // Display recommendations
    displayRecommendations(results.recommendations);
}

// Get maturity level text based on score
function getMaturityLevel(score) {
    for (const level of maturityLevels) {
        if (score >= level.min && score <= level.max) {
            return level.level;
        }
    }
    return "Not assessed";
}

// Display recommendations with priority sorting
function displayRecommendations(recommendations) {
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = '';
    
    // Sort recommendations by priority (critical first, then high, then medium)
    const sortedRecommendations = recommendations.sort((a, b) => {
        const priorityOrder = { 'critical': 0, 'high': 1, 'medium': 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    
    sortedRecommendations.forEach(rec => {
        const recItem = document.createElement('div');
        recItem.className = `recommendation-item ${rec.priority}`;
        recItem.setAttribute('data-priority', rec.priority);
        recItem.setAttribute('data-category', rec.category);
        
        // Get icon for category
        const categoryIcons = {
            'identify': 'fas fa-search',
            'protect': 'fas fa-shield-alt',
            'detect': 'fas fa-radar',
            'respond': 'fas fa-bolt',
            'recover': 'fas fa-sync-alt'
        };
        
        // Format category name for display
        const categoryDisplay = rec.category.charAt(0).toUpperCase() + rec.category.slice(1);
        
        recItem.innerHTML = `
            <span class="priority-tag ${rec.priority}">${rec.priority}</span>
            <h3>${rec.requirement}</h3>
            <p><strong>Recommendation:</strong> ${rec.recommendation}</p>
            <div class="recommendation-meta">
                <div class="recommendation-category">
                    <i class="${categoryIcons[rec.category]}"></i> ${categoryDisplay}
                </div>
                <div class="recommendation-status ${rec.status.toLowerCase()}">${rec.status}</div>
            </div>
        `;
        recommendationsList.appendChild(recItem);
    });
    
    // If no recommendations, show message
    if (recommendations.length === 0) {
        recommendationsList.innerHTML = '<p class="no-recommendations">No recommendations needed. All controls are fully implemented!</p>';
    }
}

// Filter recommendations by priority
function filterRecommendations(filter) {
    const items = document.querySelectorAll('.recommendation-item');
    
    items.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'block';
        } else {
            if (item.getAttribute('data-priority') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

// Function to save assessment results for dashboard integration
function saveAssessmentResults(results) {
    try {
        // Get current user
        const currentUser = getCurrentUser();
        
        console.log("Saving NIST assessment results for user:", currentUser);
        console.log("Assessment results to save:", results);
        
        if (!results || typeof results !== 'object') {
            console.error("Invalid results object");
            return;
        }
        
        // Create assessment data object with all required fields
        const assessmentData = {
            framework: 'NIST CSF',
            date: new Date().toISOString(),
            score: Math.round(results.overall.score) || 0,
            status: getMaturityLevel(results.overall.score),
            details: {
                implemented: results.overall.implemented || 0,
                partial: results.overall.partial || 0,
                missing: results.overall.missing || 0,
                categoryScores: {
                    identify: results.categories.identify.score || 0,
                    protect: results.categories.protect.score || 0,
                    detect: results.categories.detect.score || 0,
                    respond: results.categories.respond.score || 0,
                    recover: results.categories.recover.score || 0
                },
                recommendations: Array.isArray(results.recommendations) ? results.recommendations : []
            }
        };
        
        console.log("Formatted assessment data:", assessmentData);
        
        // Get existing assessments or create empty object
        let userAssessments;
        try {
            userAssessments = JSON.parse(localStorage.getItem('userAssessments') || '{}');
        } catch (error) {
            console.error("Error parsing existing userAssessments:", error);
            userAssessments = {};
        }
        
        // Add assessment to user's assessments
        if (!userAssessments[currentUser]) {
            userAssessments[currentUser] = [];
        }
        
        userAssessments[currentUser].push(assessmentData);
        
        // Save back to localStorage
        try {
            localStorage.setItem('userAssessments', JSON.stringify(userAssessments));
            
            // Also set the current user to ensure the dashboard can find it
            localStorage.setItem('currentUser', currentUser);
            
            console.log("Assessment data saved to localStorage successfully");
        } catch (error) {
            console.error("Error saving to localStorage:", error);
            alert("Error saving assessment results. localStorage may be full or unavailable.");
        }
        
        // Show confirmation
        const savedNotice = document.createElement('div');
        savedNotice.className = 'saved-notice';
        savedNotice.innerHTML = '<i class="fas fa-check"></i> Assessment saved to dashboard';
        savedNotice.style.backgroundColor = '#e8f5e9';
        savedNotice.style.color = '#2e7d32';
        savedNotice.style.padding = '10px';
        savedNotice.style.borderRadius = '4px';
        savedNotice.style.marginTop = '20px';
        savedNotice.style.textAlign = 'center';
        document.getElementById('assessmentResults').appendChild(savedNotice);
        
        // Remove notice after 3 seconds
        setTimeout(() => {
            savedNotice.remove();
        }, 3000);
        
        // Verify data was saved correctly
        setTimeout(() => {
            try {
                const savedData = JSON.parse(localStorage.getItem('userAssessments') || '{}');
                if (savedData[currentUser] && savedData[currentUser].length > 0) {
                    const lastSaved = savedData[currentUser][savedData[currentUser].length - 1];
                    console.log("Verification: Last saved assessment:", lastSaved);
                    
                    if (lastSaved.framework !== 'NIST CSF' || typeof lastSaved.score !== 'number') {
                        console.error("Verification failed: Saved data doesn't match expected format");
                    }
                }
            } catch (e) {
                console.error("Error during verification:", e);
            }
        }, 100);
    } catch (error) {
        console.error("Critical error in saveAssessmentResults:", error);
    }
}

// Helper function to get current user
function getCurrentUser() {
    // Try to get current user from localStorage (set during login)
    const user = localStorage.getItem('currentUser') || sessionStorage.getItem('userEmail');
    
    // If no user is logged in, try to use alternative methods
    if (!user) {
        // Try to get from localStorage user data
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (userData.email) {
            return userData.email;
        }
        
        // Try username instead of email if available
        const userName = localStorage.getItem('userName') || sessionStorage.getItem('userName');
        if (userName) {
            return userName;
        }
    }
    
    return user || 'default_user'; // Return user or default if not found
}

// Function to generate and download PDF report
function generatePDFReport() {
    // Show loading state
    const downloadBtn = document.getElementById('downloadPdf');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    downloadBtn.disabled = true;
    
    // Use setTimeout to allow UI to update before PDF generation (which can be resource-intensive)
    setTimeout(() => {
        try {
            // Initialize jsPDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'mm', 'a4');
            
            // Set document properties
            doc.setProperties({
                title: 'NIST Cybersecurity Framework Assessment Report',
                subject: 'Assessment Report',
                author: 'GRC Portal',
                creator: 'NIST CSF Assessment Tool'
            });
            
            // Add header
            doc.setFontSize(22);
            doc.setTextColor(26, 86, 219); // Primary color
            doc.text('NIST Cybersecurity Framework', 105, 20, { align: 'center' });
            doc.setFontSize(18);
            doc.text('Assessment Report', 105, 30, { align: 'center' });
            
            // Add date
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 40, { align: 'center' });
            
            // Add overall score section
            doc.setFontSize(16);
            doc.setTextColor(26, 86, 219);
            doc.text('Overall Compliance Score', 20, 55);
            
            // Get overall score - Ensure we're getting the exact text from the DOM
            const overallScore = document.getElementById('complianceScore').textContent.trim();
            const maturityLevel = document.getElementById('maturityLevelText').textContent.trim();
            
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text(`Score: ${overallScore}`, 20, 65);
            doc.text(`Maturity Level: ${maturityLevel}`, 20, 75);
            
            // Add status counts
            doc.setFontSize(16);
            doc.setTextColor(26, 86, 219);
            doc.text('Implementation Status', 20, 90);
            
            const implementedCount = document.getElementById('implementedCount').textContent;
            const partialCount = document.getElementById('partialCount').textContent;
            const missingCount = document.getElementById('missingCount').textContent;
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(`Implemented: ${implementedCount}`, 20, 100);
            doc.text(`Partial: ${partialCount}`, 20, 108);
            doc.text(`Missing: ${missingCount}`, 20, 116);
            
            // Add category scores
            doc.setFontSize(16);
            doc.setTextColor(26, 86, 219);
            doc.text('Category Scores', 20, 130);
            
            const categoryScores = [
                { name: 'Identify', score: document.getElementById('identifyScoreResult').textContent },
                { name: 'Protect', score: document.getElementById('protectScoreResult').textContent },
                { name: 'Detect', score: document.getElementById('detectScoreResult').textContent },
                { name: 'Respond', score: document.getElementById('respondScoreResult').textContent },
                { name: 'Recover', score: document.getElementById('recoverScoreResult').textContent }
            ];
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            
            let yPos = 140;
            categoryScores.forEach(category => {
                doc.text(`${category.name}: ${category.score}`, 20, yPos);
                yPos += 8;
            });
            
            // Add recommendations
            doc.addPage();
            doc.setFontSize(18);
            doc.setTextColor(26, 86, 219);
            doc.text('Recommendations', 105, 20, { align: 'center' });
            
            // Get all visible recommendations
            const recommendations = document.querySelectorAll('.recommendation-item:not([style*="display: none"])');
            
            if (recommendations.length > 0) {
                let recYPos = 40;
                let pageCount = 2; // Starting from page 2
                
                recommendations.forEach((rec, index) => {
                    // Check if we need a new page
                    if (recYPos > 250) {
                        doc.addPage();
                        pageCount++;
                        recYPos = 30;
                    }
                    
                    // Extract recommendation details
                    const priority = rec.querySelector('.priority-tag').textContent;
                    const title = rec.querySelector('h3').textContent.trim();
                    const description = rec.querySelector('p').textContent.trim();
                    
                    // Set styles based on priority
                    let priorityColor;
                    switch(priority.toLowerCase()) {
                        case 'critical':
                            priorityColor = [239, 68, 68]; // Red
                            break;
                        case 'high':
                            priorityColor = [245, 158, 11]; // Orange
                            break;
                        default:
                            priorityColor = [26, 86, 219]; // Blue
                    }
                    
                    // Draw a priority indicator
                    doc.setFillColor(...priorityColor);
                    doc.rect(15, recYPos - 5, 5, 5, 'F');
                    
                    // Add title with priority
                    doc.setFontSize(12);
                    doc.setTextColor(...priorityColor);
                    doc.text(`${index + 1}. ${title} (${priority})`, 25, recYPos);
                    
                    // Add description
                    doc.setFontSize(10);
                    doc.setTextColor(0, 0, 0);
                    
                    // Split long text to fit page width
                    const splitText = doc.splitTextToSize(description, 170);
                    doc.text(splitText, 25, recYPos + 8);
                    
                    // Update Y position for next item, accounting for text height
                    recYPos += 20 + (splitText.length * 5);
                });
            } else {
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0);
                doc.text('No recommendations found. All controls are fully implemented!', 20, 40);
            }
            
            // Add footer with page numbers
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(10);
                doc.setTextColor(100, 100, 100);
                doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
                doc.text('NIST Cybersecurity Framework Assessment Report', 105, 295, { align: 'center' });
            }
            
            // Save the PDF
            doc.save('NIST_CSF_Assessment_Report.pdf');
            
            // Show success message
            const assessmentResults = document.getElementById('assessmentResults');
            const savedNotice = document.createElement('div');
            savedNotice.className = 'saved-notice';
            savedNotice.innerHTML = '<i class="fas fa-check"></i> PDF Report successfully generated';
            savedNotice.style.backgroundColor = '#e8f5e9';
            savedNotice.style.color = '#2e7d32';
            savedNotice.style.padding = '10px';
            savedNotice.style.borderRadius = '4px';
            savedNotice.style.marginTop = '20px';
            savedNotice.style.textAlign = 'center';
            assessmentResults.appendChild(savedNotice);
            
            // Remove notice after 3 seconds
            setTimeout(() => {
                savedNotice.remove();
            }, 3000);
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('There was an error generating the PDF. Please try again.');
        } finally {
            // Restore button state
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }
    }, 100);
} 