// Assessment System Core
class PCIDSSAssessment {
    constructor() {
        this.checklistItems = [
            "Install and Maintain Network Security Controls",
            "Apply Secure Configurations to All System Components",
            "Protect Stored Account Data",
            "Protect Cardholder Data with Strong Cryptography During Transmission",
            "Implement Strong Access Control Measures",
            "Regularly Monitor and Test Networks",
            "Maintain an Information Security Policy",
            "Implement Regular Security Awareness Training",
            "Protect Against Malware",
            "Implement Data Loss Prevention Measures",
            "Regularly Update Software and Systems",
            "Conduct Regular Security Assessments"
        ];

        this.requirementTiers = {
            "Protect Stored Account Data": { tier: 1, weight: 4 },
            "Protect Cardholder Data with Strong Cryptography During Transmission": { tier: 1, weight: 4 },
            "Protect Against Malware": { tier: 1, weight: 4 },
            "Install and Maintain Network Security Controls": { tier: 2, weight: 3 },
            "Implement Strong Access Control Measures": { tier: 2, weight: 3 },
            "Implement Data Loss Prevention Measures": { tier: 2, weight: 3 },
            "Regularly Update Software and Systems": { tier: 2, weight: 3 },
            "Apply Secure Configurations to All System Components": { tier: 3, weight: 2 },
            "Regularly Monitor and Test Networks": { tier: 3, weight: 2 },
            "Conduct Regular Security Assessments": { tier: 3, weight: 2 },
            "Maintain an Information Security Policy": { tier: 4, weight: 1 },
            "Implement Regular Security Awareness Training": { tier: 4, weight: 1 }
        };

        this.recommendationsDB = this.initializeRecommendationsDB();
        this.maxPossibleScore = 32; // (3×4) + (4×3) + (3×2) + (2×1) = 32
    }

    initializeRecommendationsDB() {
        return {
            "Install and Maintain Network Security Controls": {
                "No": "Critical: Deploy enterprise-grade firewalls and implement strict access control lists (ACLs)",
                "Partial": "Enhance existing firewall rules and consider implementing next-gen firewall features",
                "Yes": "Maintain regular firewall rule reviews and updates",
                "dynamicRecommendations": {
                    "Low Budget": "Implement pfSense (open-source firewall) + free IDS like Snort",
                    "Medium Budget": "Cloud firewall (AWS Security Groups/Azure NSGs) + WAF",
                    "High Budget": "Next-gen firewall (Palo Alto/Cisco) + managed SIEM",
                    "Low Expertise": "Use managed cloud security services + basic firewall templates"
                }
            },
            "Apply Secure Configurations to All System Components": {
                "No": "Critical: Implement secure baseline configurations for all system components",
                "Partial": "Strengthen existing configurations and document security standards",
                "Yes": "Regularly review and update security configurations",
                "dynamicRecommendations": {
                    "Low Budget": "Implement CIS Benchmarks + manual configuration reviews",
                    "Medium Budget": "Configuration management tools + automated compliance checks",
                    "High Budget": "Enterprise configuration management + continuous compliance monitoring",
                    "Low Expertise": "Use managed security services + pre-configured templates"
                }
            },
            "Protect Stored Account Data": {
                "No": "Critical: Implement encryption for all stored sensitive data",
                "Partial": "Enhance existing data protection measures and review storage locations",
                "Yes": "Maintain encryption key management and regular security reviews",
                "dynamicRecommendations": {
                    "Low Budget": "Use AES-256 in database columns via OpenSSL + data masking",
                    "Medium Budget": "Cloud KMS (AWS KMS/Azure Key Vault) + tokenization",
                    "High Budget": "Hardware Security Modules (HSMs) + format-preserving encryption",
                    "Partial Compliance": "Implement tokenization for PANs while encrypting other fields",
                    "Low Expertise": "Use PCI-compliant payment processors to avoid direct storage"
                }
            },
            "Protect Cardholder Data with Strong Cryptography During Transmission": {
                "No": "Critical: Implement TLS 1.2+ for all data transmissions",
                "Partial": "Upgrade cryptographic protocols and review transmission paths",
                "Yes": "Regular monitoring of encryption effectiveness",
                "dynamicRecommendations": {
                    "Low Budget": "Let's Encrypt SSL + disable TLS 1.0",
                    "Medium Budget": "Wildcard certificates + quarterly cipher suite audits",
                    "High Budget": "Hardware SSL offloading + quarterly cipher audits",
                    "Partial Compliance": "Add HSTS header + implement certificate pinning"
                }
            },
            "Implement Strong Access Control Measures": {
                "No": "Critical: Establish role-based access control (RBAC) system",
                "Partial": "Strengthen access controls and review user privileges",
                "Yes": "Regular access review and privilege audit",
                "dynamicRecommendations": {
                    "Low Budget": "Implement LDAP/Active Directory + manual access reviews",
                    "Medium Budget": "Identity management system + quarterly access audits",
                    "High Budget": "PAM solution + just-in-time access + privileged session monitoring",
                    "Low Expertise": "Use managed identity services + predefined role templates"
                }
            },
            "Regularly Monitor and Test Networks": {
                "No": "Critical: Implement network monitoring and regular testing",
                "Partial": "Enhance monitoring capabilities and increase testing frequency",
                "Yes": "Maintain comprehensive monitoring and testing program",
                "dynamicRecommendations": {
                    "Low Budget": "Open-source monitoring tools + manual penetration testing",
                    "Medium Budget": "SIEM solution + quarterly vulnerability scans",
                    "High Budget": "Advanced SIEM + continuous security monitoring + red teaming",
                    "Low Expertise": "Use managed security services + automated scanning tools"
                }
            },
            "Maintain an Information Security Policy": {
                "No": "Critical: Develop comprehensive security policies",
                "Partial": "Enhance existing policies and ensure proper documentation",
                "Yes": "Regular policy reviews and updates",
                "dynamicRecommendations": {
                    "Low Budget": "Use free policy templates + manual reviews",
                    "Medium Budget": "Policy management system + annual reviews",
                    "High Budget": "GRC platform + continuous policy monitoring",
                    "Low Expertise": "Hire security consultant to develop policies"
                }
            },
            "Implement Regular Security Awareness Training": {
                "No": "Critical: Establish security awareness training program",
                "Partial": "Enhance training content and increase frequency",
                "Yes": "Maintain comprehensive training program",
                "dynamicRecommendations": {
                    "Low Budget": "Free training resources + quarterly sessions",
                    "Medium Budget": "Security awareness platform + monthly training",
                    "High Budget": "Custom training program + phishing simulations + gamification",
                    "Low Expertise": "Use managed training services + pre-built content"
                }
            },
            "Protect Against Malware": {
                "No": "Critical: Deploy anti-malware solutions across all systems",
                "Partial": "Enhance malware protection and monitoring",
                "Yes": "Regular malware protection updates and monitoring",
                "dynamicRecommendations": {
                    "Low Budget": "Windows Defender + free anti-malware tools",
                    "Medium Budget": "Enterprise anti-virus + web filtering",
                    "High Budget": "Advanced endpoint protection + EDR + threat hunting",
                    "Low Expertise": "Use managed security services + automated protection"
                }
            },
            "Implement Data Loss Prevention Measures": {
                "No": "Critical: Deploy DLP solutions across all channels",
                "Partial": "Enhance DLP rules and monitoring capabilities",
                "Yes": "Regular DLP policy reviews and updates",
                "dynamicRecommendations": {
                    "Low Budget": "Snoopy DLP + strict egress filtering",
                    "Medium Budget": "Microsoft Purview + email DLP",
                    "High Budget": "Forcepoint/Symantec DLP + UEBA",
                    "Partial Compliance": "Monitor email only"
                }
            },
            "Regularly Update Software and Systems": {
                "No": "Critical: Implement patch management system",
                "Partial": "Improve patch testing and deployment procedures",
                "Yes": "Maintain regular patch schedule and testing",
                "dynamicRecommendations": {
                    "Low Budget": "WSUS for Windows + manual Linux updates",
                    "Medium Budget": "ManageEngine Patch Manager",
                    "High Budget": "Ivanti/Qualys patch management + CI/CD integration",
                    "Partial Compliance": "Critical patches only"
                }
            },
            "Conduct Regular Security Assessments": {
                "No": "Critical: Establish regular security assessment schedule",
                "Partial": "Increase assessment scope and frequency",
                "Yes": "Maintain comprehensive assessment program",
                "dynamicRecommendations": {
                    "Low Budget": "OWASP ZAP scans + PCI DSS SAQ",
                    "Medium Budget": "ASV scans + annual QSA review",
                    "High Budget": "Continuous penetration testing + red teaming",
                    "Partial Compliance": "Vulnerability scans without remediation"
                }
            }
        };
    }

    initializeChecklist() {
        const tbody = document.getElementById('checklistBody');
        tbody.innerHTML = ''; // Clear existing content
        
        this.checklistItems.forEach((item, index) => {
            const row = this.createChecklistRow(item, index);
            tbody.appendChild(row);
        });
    }

    createChecklistRow(item, index) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item}</td>
            <td class="status-cell">
                <div class="status-indicator"></div>
            </td>
            <td class="implementation-cell">
                <button class="impl-btn" data-status="Yes">Yes</button>
                <button class="impl-btn" data-status="Partial">Partial</button>
                <button class="impl-btn" data-status="No">No</button>
            </td>
        `;

        // Add event listeners to buttons
        const buttons = row.querySelectorAll('.impl-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => this.handleImplementationSelection(button));
        });

        return row;
    }

    handleImplementationSelection(button) {
        const row = button.closest('tr');
        const buttons = row.querySelectorAll('.impl-btn');
        const status = button.dataset.status;
        
        // Update button states
        buttons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');

        // Update status indicator
        const statusCell = row.querySelector('.status-indicator');
        statusCell.className = `status-indicator ${status.toLowerCase()}`;
        this.updateStatusIcon(statusCell, status);
    }

    updateStatusIcon(cell, status) {
        const iconMap = {
            'Yes': '<i class="fas fa-check-circle"></i>',
            'Partial': '<i class="fas fa-exclamation-circle"></i>',
            'No': '<i class="fas fa-times-circle"></i>'
        };
        cell.innerHTML = iconMap[status];
    }

    analyzeCompliance() {
        const results = {
            implemented: 0,
            partial: 0,
            missing: 0,
            recommendations: [],
            score: 0,
            weightedScore: 0,
            complianceStatus: '',
            tierScores: {
                tier1: { total: 0, yes: 0, partial: 0, no: 0 },
                tier2: { total: 0, yes: 0, partial: 0, no: 0 },
                tier3: { total: 0, yes: 0, partial: 0, no: 0 },
                tier4: { total: 0, yes: 0, partial: 0, no: 0 }
            }
        };

        const rows = document.querySelectorAll('#checklistBody tr');
        
        rows.forEach(row => {
            const requirement = row.querySelector('td:nth-child(2)').textContent;
            const selectedBtn = row.querySelector('.impl-btn.selected');
            
            if (selectedBtn) {
                const status = selectedBtn.dataset.status;
                const tierInfo = this.requirementTiers[requirement];
                
                this.updateResults(results, requirement, status, tierInfo);
            }
        });

        this.calculateFinalScores(results);
        return results;
    }

    updateResults(results, requirement, status, tierInfo) {
        // Update basic counts
        if (status === 'Yes') results.implemented++;
        else if (status === 'Partial') results.partial++;
        else if (status === 'No') results.missing++;

        // Update weighted score
        if (tierInfo) {
            const statusValue = status === 'Yes' ? 1 : status === 'Partial' ? 0.5 : 0;
            const weightedValue = statusValue * tierInfo.weight;
            results.weightedScore += weightedValue;

            // Update tier scores
            const tierKey = `tier${tierInfo.tier}`;
            if (status === 'Yes') results.tierScores[tierKey].yes++;
            else if (status === 'Partial') results.tierScores[tierKey].partial++;
            else if (status === 'No') results.tierScores[tierKey].no++;
            results.tierScores[tierKey].total++;
        }

        // Add recommendations if not fully implemented
        if (status !== 'Yes') {
            results.recommendations.push({
                requirement: requirement,
                status: status,
                recommendation: this.recommendationsDB[requirement][status]
            });
        }
    }

    calculateFinalScores(results) {
        const totalItems = document.querySelectorAll('#checklistBody tr').length;
        results.score = ((results.implemented + (results.partial * 0.5)) / totalItems) * 100;
        results.weightedScore = (results.weightedScore / this.maxPossibleScore) * 100;
        results.complianceStatus = this.determineComplianceStatus(results);
    }

    determineComplianceStatus(results) {
        if (results.weightedScore >= 90.625 &&
            results.tierScores.tier1.yes === results.tierScores.tier1.total &&
            (results.tierScores.tier2.partial + results.tierScores.tier3.partial + results.tierScores.tier4.partial) <= 2) {
            return 'Fully Compliant';
        }
        else if (results.weightedScore >= 75 &&
            results.tierScores.tier1.yes === results.tierScores.tier1.total &&
            (results.tierScores.tier2.no + results.tierScores.tier3.no) <= 1) {
            return 'Mostly Compliant';
        }
        else if (results.weightedScore >= 56.25 &&
            results.tierScores.tier1.no === 0 &&
            results.tierScores.tier1.partial + results.tierScores.tier1.yes === results.tierScores.tier1.total) {
            return 'Partially Compliant';
        }
        return 'Non-Compliant';
    }

    saveResults(results) {
        const currentUser = this.getCurrentUser();
        const assessmentData = {
            framework: 'PCI DSS',
            date: new Date().toISOString(),
            score: Math.round(results.weightedScore),
            status: results.complianceStatus,
            details: {
                implemented: results.implemented,
                partial: results.partial,
                missing: results.missing,
                tierScores: results.tierScores,
                recommendations: results.recommendations
            }
        };

        let userAssessments = JSON.parse(localStorage.getItem('userAssessments') || '{}');
        if (!userAssessments[currentUser]) {
            userAssessments[currentUser] = [];
        }
        userAssessments[currentUser].push(assessmentData);
        localStorage.setItem('userAssessments', JSON.stringify(userAssessments));
        localStorage.setItem('currentUser', currentUser);

        this.showSaveConfirmation();
    }

    getCurrentUser() {
        return localStorage.getItem('currentUser') || 
               sessionStorage.getItem('userEmail') || 
               JSON.parse(localStorage.getItem('userData') || '{}').email || 
               localStorage.getItem('userName') || 
               sessionStorage.getItem('userName') || 
               'default_user';
    }

    showSaveConfirmation() {
        const assessmentResults = document.getElementById('assessmentResults');
        const savedNotice = document.createElement('div');
        savedNotice.className = 'saved-notice';
        savedNotice.innerHTML = '<i class="fas fa-check"></i> Assessment saved to dashboard';
        assessmentResults.appendChild(savedNotice);
        setTimeout(() => savedNotice.remove(), 3000);
    }
}

// Initialize the assessment system
document.addEventListener('DOMContentLoaded', () => {
    // Create and make the assessment instance globally available
    window.assessment = new PCIDSSAssessment();
    window.assessment.initializeChecklist();

    // Add event listeners
    document.getElementById('analyzeBtn').addEventListener('click', () => {
        console.log('Analyze button clicked');
        const results = window.assessment.analyzeCompliance();
        console.log('Analysis results:', results);
        window.displayResults(results);
        window.assessment.saveResults(results);
    });

    document.getElementById('downloadReport').addEventListener('click', () => {
        const results = window.assessment.analyzeCompliance();
        window.generatePDF(results);
    });
}); 