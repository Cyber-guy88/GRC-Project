document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('grcForm');
    const themeToggle = document.getElementById('themeToggle');
    const modalElement = document.querySelector('.recommendation-modal');
    const modalCloseBtn = document.querySelector('.close-btn');
    const recommendationContent = document.getElementById('recommendationContent');
    const downloadBtn = document.getElementById('downloadReport');
    const emailBtn = document.getElementById('emailReport');
    const financialOptions = document.querySelector('.financial-options');
    const isFinancialRadios = document.querySelectorAll('input[name="isFinancial"]');
    const companyNameInput = document.getElementById('companyName');
    const progressSteps = document.querySelectorAll('.progress-step');

    // Form navigation
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const backButtons = document.querySelectorAll('.btn-back');
    
    // Live preview elements
    const previewCard = document.getElementById('previewCard');
    const previewCompanyName = document.getElementById('previewCompanyName');
    const previewSize = document.getElementById('previewSize');
    const previewRegions = document.getElementById('previewRegions');
    const previewFinancial = document.getElementById('previewFinancial');
    const previewData = document.getElementById('previewData');
    const governanceMeter = document.getElementById('governanceMeter');
    const riskMeter = document.getElementById('riskMeter');
    const complianceMeter = document.getElementById('complianceMeter');

    // Add animation to form sections
    formSteps.forEach((section, index) => {
        section.style.setProperty('--animation-order', index + 1);
    });

    // Form validation tracking
    let formValid = false;
    
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
    
    // Multi-step form navigation
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = parseInt(this.getAttribute('data-goto'));
            
            // Validate current step before proceeding
            if (validateStep(currentStep - 1)) {
                goToStep(currentStep);
                updateProgressBar(currentStep);
            } else {
                showValidationError(currentStep - 1);
            }
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
                step.classList.add('completed');
            }
        });
    }
    
    function validateStep(stepNumber) {
        const currentStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        let isValid = true;
        
        if (stepNumber === 1) {
            // Validate company name
            if (!companyNameInput.value.trim()) {
                companyNameInput.classList.add('invalid');
                isValid = false;
            } else {
                companyNameInput.classList.remove('invalid');
                companyNameInput.classList.add('valid');
            }
            
            // Validate company size
            const companySizeSelected = document.querySelector('input[name="companySize"]:checked');
            if (!companySizeSelected) {
                document.querySelector('.option-cards[role="radiogroup"]').classList.add('invalid');
                isValid = false;
            } else {
                document.querySelector('.option-cards[role="radiogroup"]').classList.remove('invalid');
            }
        }
        
        if (stepNumber === 2) {
            // Validate financial status
            const isFinancialSelected = document.querySelector('input[name="isFinancial"]:checked');
            if (!isFinancialSelected) {
                document.querySelector('.yes-no-group').classList.add('invalid');
                isValid = false;
            } else {
                document.querySelector('.yes-no-group').classList.remove('invalid');
                
                // If yes is selected, validate financial services
                if (isFinancialSelected.value === 'yes') {
                    const financialServicesSelected = document.querySelector('input[name="financialServices"]:checked');
                    if (!financialServicesSelected) {
                        financialOptions.classList.add('invalid');
                        isValid = false;
                    } else {
                        financialOptions.classList.remove('invalid');
                    }
                }
            }
        }
        
        return isValid;
    }
    
    function showValidationError(stepNumber) {
        const currentStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        currentStep.classList.add('highlight-error');
        
        setTimeout(() => {
            currentStep.classList.remove('highlight-error');
        }, 1000);
    }

    // Financial options toggle
    isFinancialRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const showFinancialOptions = this.value === 'yes';
            toggleFinancialOptions(showFinancialOptions);
            updatePreview();
        });
    });

    function toggleFinancialOptions(show) {
        if (show) {
            financialOptions.style.display = 'block';
            setTimeout(() => {
                financialOptions.style.opacity = '1';
                financialOptions.style.transform = 'translateY(0)';
            }, 10);
        } else {
            financialOptions.style.opacity = '0';
            financialOptions.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                financialOptions.style.display = 'none';
                
                // Uncheck all financial service checkboxes
                document.querySelectorAll('input[name="financialServices"]').forEach(checkbox => {
                    checkbox.checked = false;
                });
            }, 300);
        }
    }
    
    // Update preview panel in real-time
    function updatePreview() {
        // Update company name
        const companyName = companyNameInput.value.trim() || 'Your Company';
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
        
        // Update regions
        const selectedRegions = Array.from(document.querySelectorAll('input[name="regions"]:checked'))
            .map(checkbox => checkbox.closest('.option-card').querySelector('.card-label').textContent);
            
        if (selectedRegions.length > 0) {
            previewRegions.querySelector('.item-value').textContent = selectedRegions.join(', ');
            
            // Update compliance meter based on regions
            let complianceLevel = 30 * Math.min(selectedRegions.length, 3);
            animateMeter(complianceMeter, complianceLevel);
        } else {
            previewRegions.querySelector('.item-value').textContent = 'Not selected';
            animateMeter(complianceMeter, 0);
        }
        
        // Update financial status
        const selectedFinancial = document.querySelector('input[name="isFinancial"]:checked');
        if (selectedFinancial) {
            if (selectedFinancial.value === 'yes') {
                const selectedServices = Array.from(document.querySelectorAll('input[name="financialServices"]:checked'))
                    .map(checkbox => checkbox.closest('.option-card').querySelector('.card-label').textContent);
                
                if (selectedServices.length > 0) {
                    previewFinancial.querySelector('.item-value').textContent = selectedServices.join(', ');
                    
                    // Update risk meter based on financial services
                    const riskLevel = 50 + (selectedServices.length * 10);
                    animateMeter(riskMeter, Math.min(riskLevel, 90));
                } else {
                    previewFinancial.querySelector('.item-value').textContent = 'Financial (no services selected)';
                    animateMeter(riskMeter, 50);
                }
            } else {
                previewFinancial.querySelector('.item-value').textContent = 'Non-financial';
                animateMeter(riskMeter, 30);
            }
        } else {
            previewFinancial.querySelector('.item-value').textContent = 'Not selected';
            animateMeter(riskMeter, 0);
        }
        
        // Update data types
        const selectedDataTypes = Array.from(document.querySelectorAll('input[name="dataTypes"]:checked'))
            .map(checkbox => checkbox.closest('.option-card').querySelector('.card-label').textContent);
        
        const selectedServices = Array.from(document.querySelectorAll('input[name="serviceType"]:checked'))
            .map(checkbox => checkbox.closest('.option-card').querySelector('.card-label').textContent);
            
        let dataPreview = [];
        if (selectedDataTypes.length > 0) dataPreview.push(...selectedDataTypes);
        if (selectedServices.length > 0) dataPreview.push(...selectedServices);
        
        if (dataPreview.length > 0) {
            previewData.querySelector('.item-value').textContent = dataPreview.join(', ');
        } else {
            previewData.querySelector('.item-value').textContent = 'Not selected';
        }
    }
    
    function animateMeter(meterElement, value) {
        meterElement.style.width = `${value}%`;
    }
    
    // Listen for form field changes to update preview
    document.querySelectorAll('input[type="text"], input[type="radio"], input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', updatePreview);
    });
    
    // Special handling for text input
    companyNameInput.addEventListener('input', updatePreview);
    
    // Input field focus effects
    companyNameInput.addEventListener('focus', function() {
        this.closest('.floating-label').classList.add('focused');
    });
    
    companyNameInput.addEventListener('blur', function() {
        this.closest('.floating-label').classList.remove('focused');
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all steps before submission
        let isValid = true;
        for (let i = 1; i <= 3; i++) {
            if (!validateStep(i)) {
                isValid = false;
                goToStep(i);
                updateProgressBar(i);
                showValidationError(i);
                break;
            }
        }
        
        if (isValid) {
            const formData = new FormData(form);
            showLoadingOverlay();
            
            // Simulate a processing delay
            setTimeout(() => {
                generateRecommendations(formData);
                openModal();
                hideLoadingOverlay();
            }, 1500);
        }
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

    // Reset all form inputs on page load with animation
    form.reset();
    financialOptions.style.display = 'none';
    financialOptions.style.opacity = '0';
    financialOptions.style.transform = 'translateY(-10px)';

    // Clear all checkboxes and radio buttons explicitly
    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
        input.checked = false;
    });

    // Add input animation and validation
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(input => {
        // Label animation on focus
        input.addEventListener('focus', function() {
            const label = this.closest('.form-group').querySelector('label');
            if (label) {
                label.classList.add('active');
            }
        });

        input.addEventListener('blur', function() {
            const label = this.closest('.form-group').querySelector('label');
            if (label && this.value === '') {
                label.classList.remove('active');
            }
        });

        // Validate on input
        input.addEventListener('input', function() {
            this.classList.toggle('valid', this.checkValidity() && this.value.trim() !== '');
            this.classList.toggle('invalid', !this.checkValidity() || this.value.trim() === '');
            validateForm();
        });
    });

    // Checkbox groups require at least one selection
    const checkboxGroups = document.querySelectorAll('.checkbox-group');
    checkboxGroups.forEach(group => {
        const checkboxes = group.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                validateCheckboxGroup(group);
                validateForm();
            });
        });
    });

    // Radio button groups validation
    const radioGroups = document.querySelectorAll('.radio-group');
    radioGroups.forEach(group => {
        const radios = group.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                validateRadioGroup(group);
                validateForm();
            });
        });
    });

    // Modal interactions
    function openModal() {
        modalElement.style.display = 'flex';
        
        // Animate in
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
        if (e.target === modalElement || e.target.classList.contains('modal-backdrop')) {
            closeModal();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalElement.style.display === 'flex') {
            closeModal();
        }
    });

    // Generate recommendations based on form data
    function generateRecommendations(formData) {
        // Get form data
        const companyName = formData.get('companyName') || 'Your Company';
        const companySize = formData.get('companySize');
        const regions = formData.getAll('regions');
        const isFinancial = formData.get('isFinancial');
        const financialServices = formData.getAll('financialServices');
        const dataTypes = formData.getAll('dataTypes');
        const serviceTypes = formData.getAll('serviceType');
        
        // Generate company summary
        const companySummary = generateCompanySummary(companyName, companySize, regions, isFinancial, dataTypes);
        document.getElementById('companySummary').innerHTML = companySummary;
        
        // Get recommendations with reasons
        const governanceRecs = generateGovernanceRecommendations(companySize, isFinancial, financialServices, serviceTypes, dataTypes);
        const riskRecs = generateRiskRecommendations(companySize, isFinancial, dataTypes, regions, serviceTypes);
        const complianceRecs = generateComplianceRecommendations(regions, isFinancial, dataTypes, serviceTypes);
        const grcRecs = generateGRCRecommendations(companySize, dataTypes, serviceTypes, regions);
        
        // Build recommendation content with reasons
        let recommendations = '';
        
        recommendations += buildSectionRecommendationsWithReasons(
            'governance',
            'Governance Framework Recommendations',
            governanceRecs.recommendations,
            governanceRecs.reasons
        );
        
        recommendations += buildSectionRecommendationsWithReasons(
            'risk',
            'Risk Management Recommendations',
            riskRecs.recommendations,
            riskRecs.reasons
        );
        
        recommendations += buildSectionRecommendationsWithReasons(
            'compliance',
            'Compliance Recommendations',
            complianceRecs.recommendations,
            complianceRecs.reasons
        );
        
        recommendations += buildSectionRecommendationsWithReasons(
            'grc',
            'Other Suggestions',
            grcRecs.recommendations,
            grcRecs.reasons
        );
        
        // Set recommendations content
        recommendationContent.innerHTML = recommendations;
        
        // Set up tab navigation
        setupTabNavigation();
    }
    
    function generateCompanySummary(companyName, companySize, regions, isFinancial, dataTypes) {
        let summary = `<h3>Tailored Recommendations for ${companyName}</h3>`;
        
        let profileDescription = 'Based on your profile as a ';
        
        // Company size
        if (companySize === 'small') {
            profileDescription += 'small-sized organization';
        } else if (companySize === 'medium') {
            profileDescription += 'medium-sized organization';
        } else if (companySize === 'large') {
            profileDescription += 'large enterprise';
        }
        
        // Regions
        if (regions.length > 0) {
            const formattedRegions = regions.map(region => {
                if (region === 'usa') return 'United States';
                if (region === 'eu') return 'European Union';
                return region.charAt(0).toUpperCase() + region.slice(1);
            });
            
            if (formattedRegions.length === 1) {
                profileDescription += ` operating in ${formattedRegions[0]}`;
            } else if (formattedRegions.length === 2) {
                profileDescription += ` operating in ${formattedRegions.join(' and ')}`;
            } else {
                const lastRegion = formattedRegions.pop();
                profileDescription += ` operating in ${formattedRegions.join(', ')}, and ${lastRegion}`;
            }
        }
        
        // Financial services
        if (isFinancial === 'yes') {
            profileDescription += ' in the financial sector';
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
        
        profileDescription += ', we recommend the following frameworks to enhance your GRC posture:';
        
        summary += `<p>${profileDescription}</p>`;
        
        return summary;
    }
    
    function buildSectionRecommendationsWithReasons(section, title, items, reasons) {
        if (!items || items.length === 0) return '';
        
        let html = `<div class="recommendation-section" id="${section}-section-container">`;
        html += `<h3 id="${section}-section">${title}</h3>`;
        html += `<ul>`;
        
        items.forEach(item => {
            const frameworkName = item.split('(')[0].trim();
            const reason = reasons.get(frameworkName) || '';
            html += `
                <li>
                    <strong>${item}</strong>
                    ${reason ? `<p class="recommendation-reason">${reason}</p>` : ''}
                </li>
            `;
        });
        
        html += `</ul></div>`;
        
        return html;
    }
    
    function generateGovernanceRecommendations(companySize, isFinancial, financialServices, serviceTypes, dataTypes) {
        const recommendations = [];
        const reasons = new Map();
        
        // Base recommendations by company size
        if (companySize === 'small') {
            recommendations.push('COBIT (Basic IT governance framework)');
            recommendations.push('ITIL (IT service management)');
            reasons.set('COBIT', 'Essential IT governance for small organizations');
            reasons.set('ITIL', 'Streamline IT service delivery');
        } else if (companySize === 'medium') {
            recommendations.push('COBIT (Comprehensive IT governance framework)');
            recommendations.push('ITIL (IT service management framework)');
            recommendations.push('ISO/IEC 38500 (Corporate governance of IT)');
            reasons.set('COBIT', 'Comprehensive IT governance for growing organizations');
            reasons.set('ITIL', 'Enhanced IT service management');
            reasons.set('ISO/IEC 38500', 'Strategic IT governance alignment');
        } else if (companySize === 'large') {
            recommendations.push('COBIT 2019 (Enterprise IT governance framework)');
            recommendations.push('ISO/IEC 38500 (Corporate governance of IT)');
            recommendations.push('TOGAF (Enterprise architecture framework)');
            reasons.set('COBIT 2019', 'Enterprise-wide IT governance');
            reasons.set('ISO/IEC 38500', 'Corporate-level IT governance');
            reasons.set('TOGAF', 'Enterprise architecture management - Optional based on enterprise architecture maturity');
        }
        
        // Service-specific recommendations
        if (serviceTypes.includes('development')) {
            recommendations.push('NIST Secure Software Development Framework (SSDF)');
            reasons.set('NIST SSDF', 'Secure software development practices');
        }
        
        if (serviceTypes.includes('consulting')) {
            recommendations.push('ITIL (IT service management best practices)');
            reasons.set('ITIL', 'IT consulting service delivery framework');
        }

        // Healthcare SaaS specific recommendations
        if (serviceTypes.includes('saas') && dataTypes.includes('patient')) {
            // Add ISO 27799 as a priority recommendation
            recommendations.unshift('ISO/IEC 27799 (Healthcare Information Security Management)');
            reasons.set('ISO/IEC 27799', 'Essential extension of ISO 27001 specifically for healthcare information security management');
            
            // Add ITIL for SaaS operations if not already present
            if (!recommendations.some(rec => rec.startsWith('ITIL'))) {
                recommendations.push('ITIL (IT service management for healthcare SaaS)');
                reasons.set('ITIL', 'Critical for managing healthcare SaaS operations and service delivery');
            }
        }
    
        return { recommendations, reasons };
    }
    
    function generateRiskRecommendations(companySize, isFinancial, dataTypes, regions, serviceTypes) {
        const recommendations = [];
        const reasons = new Map();
        
        // Base risk frameworks
        recommendations.push('ISO 31000 (Risk management)');
        recommendations.push('NIST CSF (Cybersecurity Framework)');
        reasons.set('ISO 31000', 'Comprehensive risk management foundation');
        reasons.set('NIST CSF', 'Cybersecurity risk management');
        
        // Size-based additions
        if (companySize === 'medium' || companySize === 'large') {
            recommendations.push('NIST 800-53 (Security and Privacy Controls)');
            reasons.set('NIST 800-53', 'Detailed security and privacy controls');
        }

        // Data type specific
        if (dataTypes.includes('classified') || dataTypes.includes('government')) {
            recommendations.push('CMMC (Cybersecurity Maturity Model Certification)');
            recommendations.push('NIST 800-171 (Protecting Controlled Unclassified Information)');
            reasons.set('CMMC', 'Required for handling government data');
            reasons.set('NIST 800-171', 'Protection of controlled unclassified information');
        }

        if (dataTypes.includes('personal')) {
            recommendations.push('ISO/IEC 27701 (Privacy Information Management)');
            recommendations.push('NIST Privacy Framework');
            reasons.set('ISO/IEC 27701', 'Privacy-specific risk management');
            reasons.set('NIST Privacy Framework', 'Privacy risk management');
        }

        // Healthcare SaaS specific recommendation
        if (dataTypes.includes('patient') && serviceTypes.includes('saas')) {
            recommendations.push('NIST 800-66 (Guide for Implementing HIPAA Security)');
            reasons.set('NIST 800-66', 'Essential guide for implementing HIPAA security requirements in healthcare IT environments');
        }

        return { recommendations, reasons };
    }
    
    function generateComplianceRecommendations(regions, isFinancial, dataTypes, serviceTypes) {
        const recommendations = [];
        const reasons = new Map();
        
        // Base compliance
        recommendations.push('ISO/IEC 27001 (Information Security Management)');
        reasons.set('ISO/IEC 27001', 'Global information security standard');

        // Healthcare SaaS specific compliance for EU
        if (dataTypes.includes('patient') && serviceTypes.includes('saas') && regions.includes('eu')) {
            recommendations.unshift('ISO/IEC 27799 (Healthcare Information Security Management)');
            reasons.set('ISO/IEC 27799', 'Most important addition as it extends ISO 27001 specifically for healthcare information security management');
        }
		
		  // Payment Processing specific compliance
        if (isFinancial === 'yes' && document.querySelector('input[name="financialServices"][value="payment"]:checked')) {
            recommendations.push('PCI DSS (Payment Card Industry Data Security Standard)');
            reasons.set('PCI DSS', 'Essential compliance for organizations handling payment card data');
            
            // If India is also selected, add RBI Guidelines
            if (regions.includes('india')) {
                recommendations.push('RBI Guidelines for Payment and Settlement Systems');
                reasons.set('RBI Guidelines', 'Required compliance for payment systems operating in India');
            }
        }

        // Region-specific
        if (regions.includes('india')) {
            recommendations.push('Digital Personal Data Protection Act (DPDPA)');
            recommendations.push('Information Technology Act, 2000');
            reasons.set('DPDPA', 'Indian personal data protection compliance');
            reasons.set('IT Act', 'Indian IT law compliance');
        }

        // Patient Health Data specific compliance
        if (dataTypes.includes('patient')) {
            if (regions.includes('usa')) {
                // Prioritize HIPAA for US healthcare organizations
                recommendations.unshift('HIPAA (Health Insurance Portability and Accountability Act)');
                reasons.set('HIPAA', 'Mandatory compliance for handling US healthcare data');
                
                // Suggest GDPR consideration
                recommendations.push('GDPR (General Data Protection Regulation)');
                reasons.set('GDPR', 'Required if handling health data of EU citizens');
            } else if (regions.includes('eu')) {
                // For EU organizations, prioritize GDPR but mention HIPAA
                recommendations.push('GDPR (General Data Protection Regulation)');
                recommendations.push('HIPAA (Health Insurance Portability and Accountability Act)');
                reasons.set('GDPR', 'Mandatory for handling EU patient data');
                reasons.set('HIPAA', 'Consider HIPAA compliance if managing health data of US citizens');
            } else {
                // For other regions, suggest both as considerations
                recommendations.push('HIPAA (Health Insurance Portability and Accountability Act)');
                recommendations.push('GDPR (General Data Protection Regulation)');
                reasons.set('HIPAA', 'Consider HIPAA compliance if managing health data of US citizens');
                reasons.set('GDPR', 'Consider GDPR compliance if handling EU citizen health data');
            }
        } else {
            // Regular region-specific compliance without patient data
            if (regions.includes('usa')) {
                if (dataTypes.includes('classified') || dataTypes.includes('government')) {
                    recommendations.push('FedRAMP');
                    recommendations.push('CMMC');
                    reasons.set('FedRAMP', 'US federal cloud security compliance');
                    reasons.set('CMMC', 'Defense contract requirements');
                }
                if (dataTypes.includes('personal')) {
                    recommendations.push('CCPA (California Consumer Privacy Act)');
                    reasons.set('CCPA', 'US personal data protection');
                }
            }

            if (regions.includes('eu')) {
                recommendations.push('GDPR (General Data Protection Regulation)');
                reasons.set('GDPR', 'EU data protection compliance');
            }
        }

        // Service-specific compliance
        if (serviceTypes.includes('development') && dataTypes.includes('classified')) {
            recommendations.push('DO-178C (Software Considerations in Airborne Systems)');
            reasons.set('DO-178C', 'Critical software development compliance');
        }

        return { recommendations, reasons };
    }
    
    function generateGRCRecommendations(companySize, dataTypes, serviceTypes, regions) {
        const recommendations = [];
        const reasons = new Map();
        
        // Size-based GRC solutions
        if (companySize === 'small') {
            recommendations.push('Basic GRC implementation with documentation');
            recommendations.push('Simplified NIST CSF implementation');
            reasons.set('Basic GRC', 'Cost-effective GRC for small organizations');
            reasons.set('Simplified NIST CSF', 'Essential cybersecurity framework');
        } else if (companySize === 'medium') {
            recommendations.push('Integrated GRC Platform');
            recommendations.push('RSA Archer GRC (Mid-tier)');
            reasons.set('Integrated GRC', 'Unified GRC management');
            reasons.set('RSA Archer', 'Comprehensive GRC solution');
        } else if (companySize === 'large') {
            recommendations.push('ServiceNow GRC');
            recommendations.push('IBM OpenPages GRC');
            recommendations.push('MetricStream GRC Platform');
            reasons.set('ServiceNow GRC', 'Enterprise-grade GRC automation');
            reasons.set('IBM OpenPages', 'Advanced risk and compliance management');
            reasons.set('MetricStream', 'Enterprise GRC with AI capabilities');
        }

        // Data-specific GRC
        if (dataTypes.includes('classified') || dataTypes.includes('government')) {
            recommendations.push('Unified Compliance Framework (UCF) with NIST controls');
            reasons.set('UCF', 'Unified compliance for government requirements');
        }

        return { recommendations, reasons };
    }
    
    function setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        // Set first tab as active by default
        tabButtons[0].classList.add('active');
        
        // Initially show only the first section
        const sections = document.querySelectorAll('.recommendation-section');
        sections.forEach((section, index) => {
            section.style.display = index === 0 ? 'block' : 'none';
        });
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the section ID from the button's data attribute
                const sectionId = this.getAttribute('data-section');
                
                // Hide all sections and show only the selected one
                sections.forEach(section => {
                    const sectionIdAttr = section.id;
                    if (sectionIdAttr && sectionIdAttr === `${sectionId}-section-container`) {
                        section.style.display = 'block';
                        
                        // Ensure the section scrolls into view smoothly
                        setTimeout(() => {
                            const tabsContent = document.querySelector('.tabs-content');
                            if (tabsContent) {
                                tabsContent.scrollTop = 0;
                            }
                        }, 10);
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Download report functionality
    downloadBtn.addEventListener('click', function() {
        // Add download animation
        this.classList.add('downloading');
        
        const companyName = document.getElementById('companyName').value || 'Company';
        const timestamp = new Date().toLocaleDateString().replace(/\//g, '-');
        const content = document.getElementById('recommendationContent').innerHTML;
        const summary = document.getElementById('companySummary').innerHTML;
        
        // Create PDF report HTML
        const reportHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>GRC Framework Recommendations - ${companyName}</title>
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
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                        gap: 15px;
                        padding: 0;
                    }
                    
                    .recommendation-section li {
                        list-style: none;
                        padding: 15px;
                        background-color: #f8fafc;
                        border-radius: 4px;
                        border-left: 3px solid;
                    }
                    
                    #governance-section, 
                    #governance-section + ul li {
                        color: #0369a1;
                        border-color: #0369a1;
                    }
                    
                    #risk-section, 
                    #risk-section + ul li {
                        color: #7e22ce;
                        border-color: #7e22ce;
                    }
                    
                    #compliance-section, 
                    #compliance-section + ul li {
                        color: #15803d;
                        border-color: #15803d;
                    }
                    
                    #grc-section, 
                    #grc-section + ul li {
                        color: #b91c1c;
                        border-color: #b91c1c;
                    }
                    
                    .footer {
                        margin-top: 50px;
                        padding-top: 20px;
                        border-top: 2px solid #e2e8f0;
                        font-size: 12px;
                        color: #64748b;
                        text-align: center;
                    }
                    
                    @media print {
                        body {
                            padding: 20px;
                        }
                        
                        .recommendation-section ul {
                            grid-template-columns: 1fr;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>GRC Framework Recommendations</h1>
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
                    <p>This report was generated based on the information provided in the GRC Framework Advisor tool.</p>
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
        a.download = `GRC_Framework_Recommendations_${companyName.replace(/\s+/g, '_')}_${timestamp}.html`;
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
        const companyName = document.getElementById('companyName').value || 'Company';
        
        // Show email dialog or simulate email sending
        alert(`Email functionality would send the report to the recipient's email address.`);
    });
    
    // Initialize preview on page load
    updatePreview();
    
    // Initialize theme
    updateThemeIcon();
    
    // Reset form on page load
    form.reset();
    toggleFinancialOptions(false);
}); 