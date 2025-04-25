document.addEventListener('DOMContentLoaded', function() {
// DOM Elements
    const form = document.getElementById('cobitForm');
    const themeToggle = document.getElementById('themeToggle');
    const modalElement = document.getElementById('recommendationModal');
    const modalCloseBtn = document.querySelector('.close-btn');
    const recommendationContent = document.getElementById('recommendationContent');
const downloadBtn = document.getElementById('downloadReport');
    const emailBtn = document.getElementById('emailReport');
    const companyNameInput = document.getElementById('companyName');
    const progressSteps = document.querySelectorAll('.progress-step');

    // Form navigation
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const backButtons = document.querySelectorAll('.btn-back');
    
    // Live preview elements
    const previewCompanyName = document.getElementById('previewCompanyName');
    const previewSize = document.getElementById('previewSize');
    const previewIndustry = document.getElementById('previewIndustry');
    const previewComplexity = document.getElementById('previewComplexity');
    const previewData = document.getElementById('previewData');
    const governanceMeter = document.getElementById('governanceMeter');
    const alignMeter = document.getElementById('alignMeter');
    const buildMeter = document.getElementById('buildMeter');

    // Store the last checked radio button for each name group
    const lastCheckedRadios = {};
    
    // Theme toggle
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        updateThemeIcon();
    });
    
    function updateThemeIcon() {
        if (document.body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    // Add tooltips to option cards
    document.querySelectorAll('.option-card').forEach(card => {
        card.setAttribute('data-tooltip', 'Click again to deselect');
    });
    
    // Add deselect functionality for radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        // Setup the lastCheckedRadios object with initial values
        if (!lastCheckedRadios[radio.name]) {
            lastCheckedRadios[radio.name] = null;
        }
        
        // Set initial state if radio is checked
        if (radio.checked) {
            lastCheckedRadios[radio.name] = radio;
        }
        
        // Handle the original radio change event to update our tracking
        radio.addEventListener('change', function() {
            if (this.checked) {
                lastCheckedRadios[this.name] = this;
            }
        });
        
        // Handle card clicks for toggling
        const card = radio.closest('.option-card');
        card.addEventListener('click', function(e) {
            // Prevent handling when clicking directly on the radio
            if (e.target === radio) return;
            
            // If this radio is already checked, uncheck it
            if (radio.checked) {
                e.preventDefault();
                e.stopPropagation();
                
                // Uncheck this radio
                radio.checked = false;
                lastCheckedRadios[radio.name] = null;
                
                // Trigger change event for any listeners
                radio.dispatchEvent(new Event('change'));
                updatePreview();
            }
        });
    });
    
    // Add deselect functionality for checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        const card = checkbox.closest('.option-card');
        
        card.addEventListener('click', function(e) {
            // Prevent handling when clicking directly on the checkbox
            if (e.target === checkbox) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle the checkbox
            checkbox.checked = !checkbox.checked;
            
            // Trigger change event for any listeners
            checkbox.dispatchEvent(new Event('change'));
            updatePreview();
        });
    });
    
    // Multi-step form navigation
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = parseInt(this.getAttribute('data-goto'));
            goToStep(currentStep);
            updateProgressBar(currentStep);
        });
    });
    
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = parseInt(this.getAttribute('data-goto'));
            goToStep(prevStep);
            updateProgressBar(prevStep);
        });
    });
    
    function goToStep(stepNumber) {
        formSteps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.getAttribute('data-step')) === stepNumber) {
                step.classList.add('active');
            }
        });
    }
    
    function updateProgressBar(currentStep) {
        progressSteps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            
            step.classList.remove('active', 'completed');
            
            if (stepNum === currentStep) {
                step.classList.add('active');
            } else if (stepNum < currentStep) {
                step.classList.add('active', 'completed');
            }
        });
    }

    // Update preview panel in real-time
    function updatePreview() {
        // Update company name
        const companyName = companyNameInput.value.trim() || 'Your Organization';
        previewCompanyName.textContent = companyName;
        
        // Update company size
        const selectedSize = document.querySelector('input[name="companySize"]:checked');
        if (selectedSize) {
            const sizeLabel = selectedSize.closest('.option-card').querySelector('.card-label').textContent;
            const sizeDescription = selectedSize.closest('.option-card').querySelector('.card-description').textContent;
            previewSize.querySelector('.item-value').textContent = `${sizeLabel} (${sizeDescription})`;
            
            // Update governance meter based on size
            let governanceLevel = 20;
            if (selectedSize.value === 'medium') governanceLevel = 60;
            if (selectedSize.value === 'large') governanceLevel = 90;
            animateMeter(governanceMeter, governanceLevel);
        } else {
            previewSize.querySelector('.item-value').textContent = 'Not selected';
            animateMeter(governanceMeter, 0);
        }
        
        // Update industry type
        const selectedIndustry = document.getElementById('industryType');
        if (selectedIndustry.value) {
            const industryText = selectedIndustry.options[selectedIndustry.selectedIndex].text;
            previewIndustry.querySelector('.item-value').textContent = industryText;
            
            // Update align meter based on industry
            let alignLevel = 30;
            if (selectedIndustry.value === 'finance') alignLevel = 80;
            if (selectedIndustry.value === 'healthcare') alignLevel = 70;
            if (selectedIndustry.value === 'government') alignLevel = 60;
            animateMeter(alignMeter, alignLevel);
        } else {
            previewIndustry.querySelector('.item-value').textContent = 'Not selected';
            animateMeter(alignMeter, 0);
        }
        
        // Update IT complexity
        const selectedComplexity = document.querySelector('input[name="itComplexity"]:checked');
        if (selectedComplexity) {
            const complexityLabel = selectedComplexity.closest('.option-card').querySelector('.card-label').textContent;
            previewComplexity.querySelector('.item-value').textContent = complexityLabel;
            
            // Update build meter based on complexity
            let buildLevel = 30;
            if (selectedComplexity.value === 'medium') buildLevel = 60;
            if (selectedComplexity.value === 'high') buildLevel = 90;
            animateMeter(buildMeter, buildLevel);
        } else {
            previewComplexity.querySelector('.item-value').textContent = 'Not selected';
            animateMeter(buildMeter, 0);
        }
        
        // Update data types
        const selectedDataTypes = Array.from(document.querySelectorAll('input[name="dataTypes"]:checked'))
            .map(checkbox => checkbox.closest('.option-card').querySelector('.card-label').textContent);
        
        const selectedRegulations = Array.from(document.querySelectorAll('input[name="regulatoryRequirements"]:checked'))
            .map(checkbox => checkbox.closest('.option-card').querySelector('.card-label').textContent);
            
        let dataPreview = [];
        if (selectedDataTypes.length > 0) dataPreview.push(...selectedDataTypes);
        if (selectedRegulations.length > 0) dataPreview.push(...selectedRegulations);
        
        if (dataPreview.length > 0) {
            previewData.querySelector('.item-value').textContent = dataPreview.join(', ');
        } else {
            previewData.querySelector('.item-value').textContent = 'Not selected';
        }
        
        // Update meter values text
        updateMeterValues();
    }
    
    function updateMeterValues() {
        // Get all meter sections
        const meterSections = document.querySelectorAll('.meter-section');
        
        // Update each meter section's value text
        meterSections.forEach(section => {
            const meterFill = section.querySelector('.meter-fill');
            const meterValue = section.querySelector('.meter-value');
            if (meterFill && meterValue) {
                const width = meterFill.style.width || '0%';
                meterValue.textContent = width;
            }
        });
    }
    
    function animateMeter(meterElement, value) {
        meterElement.style.width = `${value}%`;
    }
    
    // Listen for form field changes to update preview
    document.querySelectorAll('input[type="text"], input[type="radio"], input[type="checkbox"], select').forEach(input => {
        input.addEventListener('change', updatePreview);
    });
    
    // Special handling for text input
    companyNameInput.addEventListener('input', updatePreview);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Gather form data
        const formData = new FormData(form);
        showLoadingOverlay();
        
        // Simulate processing delay
        setTimeout(() => {
            generateRecommendations(formData);
            openModal();
            hideLoadingOverlay();
        }, 1000);
    });
    
    // Loading overlay
    function showLoadingOverlay() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <div class="loading-text">Analyzing your organization profile...</div>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
    }
    
    function hideLoadingOverlay() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loadingOverlay);
            }, 300);
        }
    }

    // Modal interactions
    function openModal() {
        modalElement.style.display = 'flex';
        setTimeout(() => {
            modalElement.style.opacity = '1';
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modalElement.style.opacity = '0';
        
        setTimeout(() => {
            modalElement.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
    
    modalCloseBtn.addEventListener('click', closeModal);
    
    // Close on backdrop click
    modalElement.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-backdrop')) {
            closeModal();
        }
    });
    
    // Generate recommendations based on form data
    function generateRecommendations(formData) {
        // Get form data
        const companyName = formData.get('companyName') || 'Your Organization';
        const companySize = formData.get('companySize');
        const industryType = formData.get('industryType');
        const itComplexity = formData.get('itComplexity');
        const businessUnits = formData.get('businessUnits');
        const dataTypes = formData.getAll('dataTypes');
        const regulations = formData.getAll('regulatoryRequirements');
        
        // Generate company summary
        const companySummary = generateCompanySummary(companyName, companySize, industryType, itComplexity, dataTypes);
        document.getElementById('companySummary').innerHTML = companySummary;
        
        // Build recommendation content
        let recommendations = '';
        
        // Governance recommendations
        recommendations += buildSectionRecommendations(
            'governance', 
            'Governance Domain Recommendations',
            generateGovernanceRecommendations(companySize, industryType, itComplexity)
        );
        
        // Align, Plan & Organize recommendations
        recommendations += buildSectionRecommendations(
            'align', 
            'Align, Plan & Organize Recommendations',
            generateAlignRecommendations(companySize, industryType, businessUnits)
        );
        
        // Build, Acquire & Implement recommendations
        recommendations += buildSectionRecommendations(
            'build', 
            'Build, Acquire & Implement Recommendations',
            generateBuildRecommendations(itComplexity, dataTypes)
        );
        
        // Monitor recommendations
        recommendations += buildSectionRecommendations(
            'monitor', 
            'Monitor & Evaluate Recommendations',
            generateMonitorRecommendations(companySize, regulations, dataTypes)
        );
        
        // Set recommendations content
        recommendationContent.innerHTML = recommendations;
        
        // Set up tab navigation
        setupTabNavigation();
    }
    
    function generateCompanySummary(companyName, companySize, industryType, itComplexity, dataTypes) {
        let summary = `<h3>COBIT Framework Recommendations for ${companyName}</h3>`;
        
        let profileDescription = 'Based on your profile as a ';
        
        // Company size
        if (companySize === 'small') {
            profileDescription += 'small-sized organization';
        } else if (companySize === 'medium') {
            profileDescription += 'medium-sized organization';
        } else if (companySize === 'large') {
            profileDescription += 'large enterprise';
        }
        
        // Industry type
        if (industryType) {
            let industryText = document.getElementById('industryType').options[document.getElementById('industryType').selectedIndex].text;
            profileDescription += ` in the ${industryText} industry`;
        }
        
        // IT complexity
        if (itComplexity) {
            if (itComplexity === 'low') {
                profileDescription += ' with a basic IT infrastructure';
            } else if (itComplexity === 'medium') {
                profileDescription += ' with a moderately complex IT environment';
            } else if (itComplexity === 'high') {
                profileDescription += ' with a highly complex IT environment';
            }
        }
        
        // Data types
        if (dataTypes.length > 0) {
            const formattedDataTypes = dataTypes.map(type => {
                return type.charAt(0).toUpperCase() + type.slice(1) + ' Data';
            });
            
            if (formattedDataTypes.length === 1) {
                profileDescription += ` handling ${formattedDataTypes[0]}`;
            } else if (formattedDataTypes.length === 2) {
                profileDescription += ` handling ${formattedDataTypes.join(' and ')}`;
            } else {
                const lastType = formattedDataTypes.pop();
                profileDescription += ` handling ${formattedDataTypes.join(', ')}, and ${lastType}`;
            }
        }
        
        profileDescription += ', we recommend the following COBIT processes to enhance your IT governance:';
        
        summary += `<p>${profileDescription}</p>`;
        
        return summary;
    }
    
    function buildSectionRecommendations(section, title, items) {
        if (!items || items.length === 0) return '';
        
        let html = `<div class="recommendation-section" id="${section}-section">`;
        html += `<h3>${title}</h3>`;
        html += `<ul>`;
        
        items.forEach(item => {
            html += `<li>${item}</li>`;
        });
        
        html += `</ul></div>`;
        
        return html;
    }
    
    function generateGovernanceRecommendations(companySize, industryType, itComplexity) {
        const recommendations = [];
        
        // EDM domain processes
        recommendations.push('EDM01 - Ensure Governance Framework Setting and Maintenance');
        
        if (companySize === 'medium' || companySize === 'large') {
            recommendations.push('EDM02 - Ensure Benefits Delivery');
        }
        
        recommendations.push('EDM03 - Ensure Risk Optimization');
        
        if (companySize === 'large' || industryType === 'finance' || industryType === 'government') {
            recommendations.push('EDM04 - Ensure Resource Optimization');
            recommendations.push('EDM05 - Ensure Stakeholder Transparency');
        }
        
        // Specific recommendations for small companies with low IT complexity
        if (companySize === 'small' && itComplexity === 'low') {
            recommendations.push('Small Business IT Governance Framework - Focus on essentials with minimal overhead');
            recommendations.push('NIST Cybersecurity Framework Core Functions - Identify, Protect, Detect, Respond, Recover');
            recommendations.push('ISO/IEC 27001 Annex A.5 - Simplified Information Security Policies');
            recommendations.push('IT Governance Lite - Streamlined decision rights and accountability framework');
        }
        
        return recommendations;
    }
    
    function generateAlignRecommendations(companySize, industryType, businessUnits) {
        const recommendations = [];
        
        // Basic APO domain processes for all
        recommendations.push('APO01 - Manage the IT Management Framework');
        recommendations.push('APO02 - Manage Strategy');
        recommendations.push('APO06 - Manage Budget and Costs');
        recommendations.push('APO12 - Manage Risk');
        
        // Additional processes based on company size
        if (companySize === 'medium' || companySize === 'large') {
            recommendations.push('APO03 - Manage Enterprise Architecture');
            recommendations.push('APO07 - Manage Human Resources');
            recommendations.push('APO13 - Manage Security');
        }
        
        // Additional processes for large companies or multiple business units
        if (companySize === 'large' || businessUnits === 'many') {
            recommendations.push('APO04 - Manage Innovation');
            recommendations.push('APO05 - Manage Portfolio');
            recommendations.push('APO08 - Manage Relationships');
            recommendations.push('APO09 - Manage Service Agreements');
            recommendations.push('APO10 - Manage Suppliers');
            recommendations.push('APO11 - Manage Quality');
            recommendations.push('APO14 - Manage Data');
        }
        
        // Industry-specific recommendations
        if (industryType === 'finance' || industryType === 'healthcare') {
            recommendations.push('APO01.08 - Maintain compliance with policies and procedures');
            recommendations.push('APO13.01 - Establish and maintain an information security management system');
        }
        
        // Specific recommendations for small business with single business unit
        if (companySize === 'small' && businessUnits === 'single') {
            recommendations.push('APO02.05 - Define a targeted IT strategic plan and roadmap');
            recommendations.push('APO06.02 - Prioritize resource allocation based on business priorities');
            recommendations.push('ITIL Lite - Simplified service management for small organizations');
            recommendations.push('Lean IT Governance - Focus on value delivery with minimal waste');
        }
        
        return recommendations;
    }
    
    function generateBuildRecommendations(itComplexity, dataTypes) {
        const recommendations = [];
        
        // Basic BAI domain processes for all
        recommendations.push('BAI01 - Manage Programs and Projects');
        recommendations.push('BAI02 - Manage Requirements Definition');
        recommendations.push('BAI06 - Manage Changes');
        
        // Additional processes based on IT complexity
        if (itComplexity === 'medium' || itComplexity === 'high') {
            recommendations.push('BAI03 - Manage Solutions Identification and Build');
            recommendations.push('BAI04 - Manage Availability and Capacity');
            recommendations.push('BAI05 - Manage Organizational Change Enablement');
            recommendations.push('BAI07 - Manage Change Acceptance and Transitioning');
        }
        
        // Additional processes for high complexity environments
        if (itComplexity === 'high') {
            recommendations.push('BAI08 - Manage Knowledge');
            recommendations.push('BAI09 - Manage Assets');
            recommendations.push('BAI10 - Manage Configuration');
            recommendations.push('BAI11 - Manage Projects');
        }
        
        // Data-specific recommendations
        if (dataTypes.includes('personal') || dataTypes.includes('healthcare') || dataTypes.includes('financial')) {
            recommendations.push('BAI09.03 - Manage asset risk');
            recommendations.push('BAI10.01 - Establish and maintain a configuration model');
        }
        
        // Specific recommendations for low complexity and handling personal data
        if (itComplexity === 'low' && dataTypes.includes('personal')) {
            recommendations.push('GDPR Minimum Viable Compliance Framework - Focus on personal data protection essentials');
            recommendations.push('Privacy by Design - Simple implementation guide for small businesses');
            recommendations.push('BAI09.02 - Lightweight asset inventory management focused on personal data storage');
        }

    return recommendations;
}

    function generateMonitorRecommendations(companySize, regulations, dataTypes) {
        const recommendations = [];
        
        // Basic DSS and MEA domain processes for all
        recommendations.push('DSS01 - Manage Operations');
        recommendations.push('DSS02 - Manage Service Requests and Incidents');
        recommendations.push('DSS03 - Manage Problems');
        recommendations.push('DSS04 - Manage Continuity');
        recommendations.push('DSS05 - Manage Security Services');
        
        // Additional processes based on company size
        if (companySize === 'medium' || companySize === 'large') {
            recommendations.push('MEA01 - Monitor, Evaluate and Assess Performance and Conformance');
            recommendations.push('DSS06 - Manage Business Process Controls');
        }
        
        // Regulatory requirements
        if (regulations.includes('gdpr')) {
            recommendations.push('MEA03 - Monitor, Evaluate and Assess Compliance with External Requirements');
            recommendations.push('MEA04 - Monitor, Evaluate and Assess the System of Internal Control');
        }
        
        if (regulations.includes('hipaa')) {
            recommendations.push('DSS06.06 - Secure information assets');
            recommendations.push('MEA03.01 - Identify external compliance requirements');
            recommendations.push('MEA03.03 - Confirm external compliance');
        }
        
        if (regulations.includes('pci')) {
            recommendations.push('DSS05.02 - Manage network and connectivity security');
            recommendations.push('DSS05.03 - Manage endpoint security');
            recommendations.push('DSS05.05 - Manage physical access to IT assets');
        }
        
        // Data type specific monitoring
        if (dataTypes.includes('personal') || dataTypes.includes('healthcare')) {
            recommendations.push('MEA02 - Monitor, Evaluate and Assess the System of Internal Control');
            recommendations.push('MEA03.04 - Obtain assurance of external compliance');
        }
        
        // Small business with personal data specific recommendations
        if (companySize === 'small' && dataTypes.includes('personal')) {
            recommendations.push('Simplified Data Protection Impact Assessment (DPIA) Framework');
            recommendations.push('DSS05.01 - Streamlined approach to protect against malware and external threats');
            recommendations.push('Personal Data Breach Response Plan - Essential approach for small businesses');
            recommendations.push('Cybersecurity for Small Business - NIST-inspired streamlined approach');
            recommendations.push('MEA01.03 - Lightweight approach to monitoring data access and processing activities');
        }
        
        return recommendations;
    }
    
    function setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the section ID
                const sectionId = this.getAttribute('data-section');
                
                // Find the corresponding section
                const targetSection = document.getElementById(`${sectionId}-section`);
                
                if (targetSection) {
                    const modalBody = document.querySelector('.modal-body');
                    const sectionOffset = targetSection.offsetTop - modalBody.offsetTop;
                    
                    modalBody.scrollTo({
                        top: sectionOffset - 20,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Download report functionality
    downloadBtn.addEventListener('click', function() {
        // Add download animation
        this.classList.add('downloading');
        
        const companyName = document.getElementById('companyName').value || 'Organization';
        const timestamp = new Date().toLocaleDateString().replace(/\//g, '-');
        const content = document.getElementById('recommendationContent').innerHTML;
        const summary = document.getElementById('companySummary').innerHTML;
        
        // Create PDF report HTML
        const reportHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>COBIT Framework Recommendations - ${companyName}</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                        font-family: 'Segoe UI', Roboto, Arial, sans-serif;
                    line-height: 1.6;
                        max-width: 1000px;
                    margin: 0 auto;
                        padding: 40px;
                        color: #1e293b;
                    }
                    
                .header {
                    text-align: center;
                        margin-bottom: 40px;
                        padding-bottom: 20px;
                        border-bottom: 2px solid #e2e8f0;
                    }
                    
                    .header h1 {
                        font-size: 28px;
                        color: #6466f1;
                        margin-bottom: 10px;
                    }
                    
                    .company-details {
                        color: #64748b;
                        font-size: 14px;
                    }
                    
                    .company-summary {
                        background-color: #f1f5f9;
                        border-left: 4px solid #6466f1;
                        padding: 20px;
                        margin-bottom: 30px;
                        border-radius: 4px;
                    }
                    
                    .company-summary h3 {
                        margin-top: 0;
                        color: #0f172a;
                        font-size: 18px;
                    }
                    
                    .recommendation-section {
                        margin-bottom: 30px;
                    }
                    
                    .recommendation-section h3 {
                        font-size: 20px;
                        padding-bottom: 10px;
                        border-bottom: 1px solid #e2e8f0;
                        margin-bottom: 15px;
                    }
                    
                    .recommendation-section ul {
                        padding-left: 20px;
                    }
                    
                    .recommendation-section li {
                        margin-bottom: 8px;
                    }
                    
                    #governance-section h3 {
                        color: #0369a1;
                    }
                    
                    #align-section h3 {
                        color: #7e22ce;
                    }
                    
                    #build-section h3 {
                        color: #15803d;
                    }
                    
                    #monitor-section h3 {
                        color: #b91c1c;
                    }
                    
                .footer {
                        margin-top: 50px;
                        padding-top: 20px;
                        border-top: 2px solid #e2e8f0;
                        font-size: 12px;
                        color: #64748b;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>COBIT Framework Recommendations</h1>
                    <div class="company-details">
                        <div>Prepared for: <strong>${companyName}</strong></div>
                        <div>Date: ${new Date().toLocaleDateString()}</div>
            </div>
            </div>

                <div class="company-summary">
                    ${summary}
            </div>

                ${content}

            <div class="footer">
                    <p>This report was generated based on the information provided in the COBIT Framework Recommendation Tool.</p>
                    <p>The recommendations are intended as guidance and should be assessed for applicability to your specific organizational context.</p>
            </div>
        </body>
        </html>
    `;

        // Create a Blob and download
        const blob = new Blob([reportHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
        a.download = `COBIT_Framework_Recommendations_${companyName.replace(/\s+/g, '_')}_${timestamp}.html`;
    document.body.appendChild(a);
        
        setTimeout(() => {
    a.click();
    document.body.removeChild(a);
            URL.revokeObjectURL(url);
            this.classList.remove('downloading');
        }, 800);
    });
    
    // Email report functionality
    emailBtn.addEventListener('click', function() {
        const companyName = document.getElementById('companyName').value || 'Organization';
        
        // Show email dialog or simulate email sending
        alert(`Email functionality would send the report to the recipient's email address.`);
    });
    
    // Initialize preview on page load
    updatePreview();
    
    // Initialize theme
    updateThemeIcon();
});
