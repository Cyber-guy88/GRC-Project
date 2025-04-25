/**
 * Framework Connector - Integrates existing compliance frameworks with the unified dashboard
 * This module allows for seamless data exchange between the individual framework implementations
 * and the central compliance dashboard.
 */

class FrameworkConnector {
    constructor() {
        this.frameworks = {};
        this.lastUpdated = new Date();
    }

    /**
     * Initialize the connector and register available frameworks
     */
    init() {
        // Register supported frameworks
        this.registerFramework('iso27001', 'ISO 27001', 'shield-alt', this.fetchIso27001Data);
        this.registerFramework('nist', 'NIST CSF', 'lock', this.fetchNistData);
        this.registerFramework('pci', 'PCI DSS', 'credit-card', this.fetchPciDssData);
        this.registerFramework('hipaa', 'HIPAA', 'hospital', this.fetchHipaaData);
        this.registerFramework('gdpr', 'GDPR', 'user-shield', this.fetchGdprData);
        
        console.log('Framework connector initialized with frameworks:', Object.keys(this.frameworks));
        return this;
    }

    /**
     * Register a framework with the connector
     */
    registerFramework(id, name, icon, fetchFunction) {
        this.frameworks[id] = {
            id: id,
            name: name,
            icon: icon,
            fetchData: fetchFunction.bind(this),
            score: 0,
            description: '',
            metrics: {
                implemented: 0,
                partial: 0,
                missing: 0
            },
            risk: {
                level: 'medium',
                high: 0,
                medium: 0,
                low: 0
            },
            maturity: {
                current: 1,
                target: 3
            },
            lastUpdated: null,
            trend: []
        };
    }

    /**
     * Get a list of all registered frameworks
     */
    getFrameworks() {
        return this.frameworks;
    }

    /**
     * Get data for a specific framework
     */
    getFrameworkData(frameworkId) {
        return this.frameworks[frameworkId] || null;
    }

    /**
     * Fetch data for all registered frameworks
     */
    async fetchAllFrameworkData() {
        const fetchPromises = Object.keys(this.frameworks).map(id => {
            return this.frameworks[id].fetchData();
        });
        
        try {
            await Promise.all(fetchPromises);
            this.lastUpdated = new Date();
            return this.frameworks;
        } catch (error) {
            console.error('Error fetching framework data:', error);
            throw error;
        }
    }

    /**
     * Calculate the overall compliance score and risk level
     */
    calculateOverallMetrics() {
        let totalScore = 0;
        let totalControls = 0;
        let highRisks = 0;
        let mediumRisks = 0;
        let lowRisks = 0;
        let totalMaturity = 0;
        
        Object.keys(this.frameworks).forEach(key => {
            const framework = this.frameworks[key];
            
            if (framework.score) {
                totalScore += framework.score;
                totalControls++;
            }
            
            highRisks += framework.risk.high || 0;
            mediumRisks += framework.risk.medium || 0;
            lowRisks += framework.risk.low || 0;
            
            if (framework.maturity && framework.maturity.current) {
                totalMaturity += framework.maturity.current;
            }
        });
        
        const frameworkCount = Object.keys(this.frameworks).length;
        const overallScore = frameworkCount > 0 ? Math.round(totalScore / frameworkCount) : 0;
        const maturityLevel = frameworkCount > 0 ? Math.round(totalMaturity / frameworkCount) : 1;
        
        let riskLevel = 'low';
        if (highRisks > 10 || (highRisks > 5 && mediumRisks > 15)) {
            riskLevel = 'high';
        } else if (highRisks > 5 || mediumRisks > 10) {
            riskLevel = 'medium';
        }
        
        return {
            score: overallScore,
            riskLevel: riskLevel,
            maturityLevel: maturityLevel,
            risks: {
                high: highRisks,
                medium: mediumRisks,
                low: lowRisks
            },
            lastUpdated: this.lastUpdated
        };
    }

    /**
     * Fetch ISO 27001 data from the existing implementation
     */
    async fetchIso27001Data() {
        try {
            // In a real implementation, you would use fetch API to get data from iso27001_score.html
            // For demo purposes, we're simulating data
            const score = Math.floor(Math.random() * 30) + 60; // Score between 60-90%
            
            this.frameworks['iso27001'].score = score;
            this.frameworks['iso27001'].description = 'Information Security Management';
            this.frameworks['iso27001'].metrics = {
                implemented: Math.floor(Math.random() * 20) + 30,
                partial: Math.floor(Math.random() * 10) + 10,
                missing: Math.floor(Math.random() * 10) + 5
            };
            
            this.frameworks['iso27001'].risk = {
                high: Math.floor(Math.random() * 5) + 3,
                medium: Math.floor(Math.random() * 10) + 5,
                low: Math.floor(Math.random() * 15) + 10
            };
            
            // Calculate risk level based on counts
            const { high, medium } = this.frameworks['iso27001'].risk;
            if (high > 5) {
                this.frameworks['iso27001'].risk.level = 'high';
            } else if (high > 2 || medium > 8) {
                this.frameworks['iso27001'].risk.level = 'medium';
            } else {
                this.frameworks['iso27001'].risk.level = 'low';
            }
            
            this.frameworks['iso27001'].maturity = {
                current: 2,
                target: 4
            };
            
            this.frameworks['iso27001'].lastUpdated = new Date();
            
            // Generate trend data
            this.generateTrendData('iso27001');
            
            return this.frameworks['iso27001'];
        } catch (error) {
            console.error('Error fetching ISO 27001 data:', error);
            throw error;
        }
    }

    /**
     * Fetch NIST CSF data from the existing implementation
     */
    async fetchNistData() {
        try {
            // Simulating data fetch from NIST_score.html
            const score = Math.floor(Math.random() * 30) + 50; // Score between 50-80%
            
            this.frameworks['nist'].score = score;
            this.frameworks['nist'].description = 'Cybersecurity Framework';
            this.frameworks['nist'].metrics = {
                implemented: Math.floor(Math.random() * 15) + 20,
                partial: Math.floor(Math.random() * 15) + 10,
                missing: Math.floor(Math.random() * 15) + 5
            };
            
            this.frameworks['nist'].risk = {
                high: Math.floor(Math.random() * 8) + 5,
                medium: Math.floor(Math.random() * 12) + 8,
                low: Math.floor(Math.random() * 10) + 5
            };
            
            // Calculate risk level based on counts
            const { high, medium } = this.frameworks['nist'].risk;
            if (high > 8) {
                this.frameworks['nist'].risk.level = 'high';
            } else if (high > 5 || medium > 12) {
                this.frameworks['nist'].risk.level = 'medium';
            } else {
                this.frameworks['nist'].risk.level = 'low';
            }
            
            this.frameworks['nist'].maturity = {
                current: 1,
                target: 3
            };
            
            this.frameworks['nist'].lastUpdated = new Date();
            
            // Generate trend data
            this.generateTrendData('nist');
            
            return this.frameworks['nist'];
        } catch (error) {
            console.error('Error fetching NIST CSF data:', error);
            throw error;
        }
    }

    /**
     * Fetch PCI DSS data from the existing implementation
     */
    async fetchPciDssData() {
        try {
            // Simulating data fetch from manual_1.html
            const score = Math.floor(Math.random() * 25) + 55; // Score between 55-80%
            
            this.frameworks['pci'].score = score;
            this.frameworks['pci'].description = 'Payment Card Security';
            this.frameworks['pci'].metrics = {
                implemented: Math.floor(Math.random() * 10) + 15,
                partial: Math.floor(Math.random() * 8) + 8,
                missing: Math.floor(Math.random() * 8) + 4
            };
            
            this.frameworks['pci'].risk = {
                high: Math.floor(Math.random() * 6) + 6,
                medium: Math.floor(Math.random() * 8) + 4,
                low: Math.floor(Math.random() * 6) + 3
            };
            
            // Calculate risk level based on counts
            const { high, medium } = this.frameworks['pci'].risk;
            if (high > 8) {
                this.frameworks['pci'].risk.level = 'high';
            } else if (high > 6 || medium > 8) {
                this.frameworks['pci'].risk.level = 'medium';
            } else {
                this.frameworks['pci'].risk.level = 'low';
            }
            
            this.frameworks['pci'].maturity = {
                current: 1,
                target: 3
            };
            
            this.frameworks['pci'].lastUpdated = new Date();
            
            // Generate trend data
            this.generateTrendData('pci');
            
            return this.frameworks['pci'];
        } catch (error) {
            console.error('Error fetching PCI DSS data:', error);
            throw error;
        }
    }

    /**
     * Fetch HIPAA data from the existing implementation
     */
    async fetchHipaaData() {
        try {
            // Simulating data fetch from hipaa.html
            const score = Math.floor(Math.random() * 25) + 60; // Score between 60-85%
            
            this.frameworks['hipaa'].score = score;
            this.frameworks['hipaa'].description = 'Healthcare Security & Privacy';
            this.frameworks['hipaa'].metrics = {
                implemented: Math.floor(Math.random() * 12) + 18,
                partial: Math.floor(Math.random() * 10) + 5,
                missing: Math.floor(Math.random() * 8) + 3
            };
            
            this.frameworks['hipaa'].risk = {
                high: Math.floor(Math.random() * 5) + 4,
                medium: Math.floor(Math.random() * 8) + 6,
                low: Math.floor(Math.random() * 10) + 8
            };
            
            // Calculate risk level based on counts
            const { high, medium } = this.frameworks['hipaa'].risk;
            if (high > 6) {
                this.frameworks['hipaa'].risk.level = 'high';
            } else if (high > 4 || medium > 10) {
                this.frameworks['hipaa'].risk.level = 'medium';
            } else {
                this.frameworks['hipaa'].risk.level = 'low';
            }
            
            this.frameworks['hipaa'].maturity = {
                current: 2,
                target: 4
            };
            
            this.frameworks['hipaa'].lastUpdated = new Date();
            
            // Generate trend data
            this.generateTrendData('hipaa');
            
            return this.frameworks['hipaa'];
        } catch (error) {
            console.error('Error fetching HIPAA data:', error);
            throw error;
        }
    }

    /**
     * Fetch GDPR data (simulated as it doesn't have an existing implementation yet)
     */
    async fetchGdprData() {
        try {
            // Simulating data since GDPR doesn't have an existing implementation
            const score = Math.floor(Math.random() * 30) + 50; // Score between 50-80%
            
            this.frameworks['gdpr'].score = score;
            this.frameworks['gdpr'].description = 'Data Protection Regulation';
            this.frameworks['gdpr'].metrics = {
                implemented: Math.floor(Math.random() * 10) + 15,
                partial: Math.floor(Math.random() * 12) + 8,
                missing: Math.floor(Math.random() * 10) + 5
            };
            
            this.frameworks['gdpr'].risk = {
                high: Math.floor(Math.random() * 6) + 3,
                medium: Math.floor(Math.random() * 10) + 5,
                low: Math.floor(Math.random() * 8) + 4
            };
            
            // Calculate risk level based on counts
            const { high, medium } = this.frameworks['gdpr'].risk;
            if (high > 5) {
                this.frameworks['gdpr'].risk.level = 'high';
            } else if (high > 3 || medium > 8) {
                this.frameworks['gdpr'].risk.level = 'medium';
            } else {
                this.frameworks['gdpr'].risk.level = 'low';
            }
            
            this.frameworks['gdpr'].maturity = {
                current: 2,
                target: 4
            };
            
            this.frameworks['gdpr'].lastUpdated = new Date();
            
            // Generate trend data
            this.generateTrendData('gdpr');
            
            return this.frameworks['gdpr'];
        } catch (error) {
            console.error('Error fetching GDPR data:', error);
            throw error;
        }
    }

    /**
     * Generate trend data for historical charts
     */
    generateTrendData(frameworkId) {
        if (!this.frameworks[frameworkId]) return;
        
        const trendData = [];
        const currentDate = new Date();
        let prevScore = this.frameworks[frameworkId].score - Math.floor(Math.random() * 30);
        if (prevScore < 0) prevScore = 10;
        
        // Generate 12 months of historical data
        for (let i = 11; i >= 0; i--) {
            const date = new Date();
            date.setMonth(currentDate.getMonth() - i);
            
            // Calculate a score that trends upward with some variation
            let score;
            if (i === 0) {
                score = this.frameworks[frameworkId].score;
            } else {
                const change = Math.floor(Math.random() * 8) - 2; // -2 to +5
                prevScore += change;
                if (prevScore > 100) prevScore = 100;
                if (prevScore < 0) prevScore = 0;
                score = prevScore;
            }
            
            trendData.push({
                date: date,
                score: score
            });
        }
        
        this.frameworks[frameworkId].trend = trendData;
    }

    /**
     * Get recommendations based on framework data
     */
    getRecommendations(frameworkId = null, riskLevel = null, limit = 10) {
        // This would normally fetch recommendations from a database or API
        // For demo purposes, we'll return dummy recommendations
        const recommendations = [];
        
        // Sample recommendations for each framework
        const sampleRecommendations = {
            'iso27001': [
                {
                    id: 'iso-rec-1',
                    framework: 'iso27001',
                    title: 'Implement Information Security Policies',
                    risk: 'high',
                    description: 'Develop and document comprehensive information security policies aligned with ISO 27001 requirements.',
                    remediation: [
                        'Create a policy framework covering all required domains',
                        'Get management approval for policies',
                        'Distribute policies to all staff and relevant parties',
                        'Implement training program for security policies'
                    ],
                    effort: 'Medium (3-4 weeks)',
                    priority: 'Critical',
                    references: ['ISO/IEC 27001:2013 A.5.1.1', 'ISO/IEC 27001:2013 A.5.1.2']
                },
                {
                    id: 'iso-rec-2',
                    framework: 'iso27001',
                    title: 'Establish Access Control Mechanisms',
                    risk: 'high',
                    description: 'Implement formal access control procedures for information systems and applications.',
                    remediation: [
                        'Document access control policy',
                        'Implement role-based access controls',
                        'Establish user registration and de-registration procedures',
                        'Review access rights regularly'
                    ],
                    effort: 'High (4-6 weeks)',
                    priority: 'High',
                    references: ['ISO/IEC 27001:2013 A.9.2.1', 'ISO/IEC 27001:2013 A.9.2.2']
                },
                {
                    id: 'iso-rec-3',
                    framework: 'iso27001',
                    title: 'Implement Security Incident Response',
                    risk: 'medium',
                    description: 'Establish formal incident response procedures to address security incidents promptly.',
                    remediation: [
                        'Develop incident response plan',
                        'Define incident classification criteria',
                        'Establish incident response team',
                        'Test incident response procedures regularly'
                    ],
                    effort: 'Medium (3-4 weeks)',
                    priority: 'Medium',
                    references: ['ISO/IEC 27001:2013 A.16.1.1', 'ISO/IEC 27001:2013 A.16.1.2']
                }
            ],
            'nist': [
                {
                    id: 'nist-rec-1',
                    framework: 'nist',
                    title: 'Implement Asset Management',
                    risk: 'high',
                    description: 'Establish comprehensive asset inventory and management practices.',
                    remediation: [
                        'Implement automated asset discovery tools',
                        'Maintain detailed asset inventory',
                        'Classify assets based on criticality',
                        'Establish asset lifecycle management procedures'
                    ],
                    effort: 'High (4-6 weeks)',
                    priority: 'Critical',
                    references: ['NIST CSF v1.1 ID.AM-1', 'NIST CSF v1.1 ID.AM-2']
                }
            ],
            'pci': [
                {
                    id: 'pci-rec-1',
                    framework: 'pci',
                    title: 'Secure Cardholder Data',
                    risk: 'high',
                    description: 'Implement encryption for all stored cardholder data.',
                    remediation: [
                        'Inventory all cardholder data storage locations',
                        'Implement strong encryption (AES-256)',
                        'Establish key management procedures',
                        'Minimize cardholder data storage'
                    ],
                    effort: 'High (6-8 weeks)',
                    priority: 'Critical',
                    references: ['PCI DSS v3.2.1 Req 3.4', 'PCI DSS v3.2.1 Req 3.5']
                }
            ],
            'hipaa': [
                {
                    id: 'hipaa-rec-1',
                    framework: 'hipaa',
                    title: 'Conduct Risk Analysis',
                    risk: 'high',
                    description: 'Perform comprehensive risk analysis of systems containing PHI.',
                    remediation: [
                        'Inventory all systems containing PHI',
                        'Evaluate potential threats and vulnerabilities',
                        'Assess current security measures',
                        'Document risk analysis findings'
                    ],
                    effort: 'High (6-8 weeks)',
                    priority: 'Critical',
                    references: ['45 CFR § 164.308(a)(1)(ii)(A)']
                }
            ],
            'gdpr': [
                {
                    id: 'gdpr-rec-1',
                    framework: 'gdpr',
                    title: 'Implement Data Protection Impact Assessments',
                    risk: 'high',
                    description: 'Establish process for conducting Data Protection Impact Assessments for high-risk processing.',
                    remediation: [
                        'Define criteria for DPIA requirement',
                        'Develop DPIA methodology and templates',
                        'Train staff on DPIA process',
                        'Implement findings from DPIAs'
                    ],
                    effort: 'Medium (4-6 weeks)',
                    priority: 'High',
                    references: ['GDPR Article 35']
                }
            ]
        };
        
        // If framework is specified, filter by framework
        if (frameworkId && sampleRecommendations[frameworkId]) {
            let filtered = sampleRecommendations[frameworkId];
            
            // Further filter by risk level if specified
            if (riskLevel) {
                filtered = filtered.filter(rec => rec.risk === riskLevel);
            }
            
            return filtered.slice(0, limit);
        }
        
        // If no specific framework, get recommendations from all frameworks
        Object.keys(sampleRecommendations).forEach(key => {
            let frameworkRecs = sampleRecommendations[key];
            
            // Filter by risk level if specified
            if (riskLevel) {
                frameworkRecs = frameworkRecs.filter(rec => rec.risk === riskLevel);
            }
            
            recommendations.push(...frameworkRecs);
        });
        
        // Sort by risk level (high to low) and return limited number
        return recommendations
            .sort((a, b) => {
                const riskOrder = { 'high': 3, 'medium': 2, 'low': 1 };
                return riskOrder[b.risk] - riskOrder[a.risk];
            })
            .slice(0, limit);
    }
}

// Create and export a singleton instance
const frameworkConnector = new FrameworkConnector();
export default frameworkConnector;

/**
 * Framework Connector
 * Provides standardized functions for assessment tools to connect with the unified dashboard
 */

// Helper function to get the current logged-in user
function getLoggedInUser() {
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

// Save assessment results to localStorage in standardized format
function saveToLocalStorage(framework, score, status, details) {
    const currentUser = getLoggedInUser();
    
    // Create assessment data object
    const assessmentData = {
        framework: framework,
        date: new Date().toISOString(),
        score: Math.round(score),
        status: status,
        details: details
    };
    
    // Get existing assessments or create empty object
    let userAssessments = JSON.parse(localStorage.getItem('userAssessments') || '{}');
    
    // Add assessment to user's assessments
    if (!userAssessments[currentUser]) {
        userAssessments[currentUser] = [];
    }
    
    userAssessments[currentUser].push(assessmentData);
    
    // Save back to localStorage
    localStorage.setItem('userAssessments', JSON.stringify(userAssessments));
    
    // Also set the current user to ensure the dashboard can find it
    localStorage.setItem('currentUser', currentUser);
    
    return true;
}

// Show a notification that assessment was saved to dashboard
function showSavedNotification(elementId) {
    const container = document.getElementById(elementId);
    if (!container) return false;
    
    // Create notification
    const savedNotice = document.createElement('div');
    savedNotice.className = 'saved-notice';
    savedNotice.innerHTML = '<i class="fas fa-check"></i> Assessment saved to dashboard';
    savedNotice.style.backgroundColor = '#e8f5e9';
    savedNotice.style.color = '#2e7d32';
    savedNotice.style.padding = '10px';
    savedNotice.style.borderRadius = '4px';
    savedNotice.style.marginTop = '20px';
    savedNotice.style.textAlign = 'center';
    container.appendChild(savedNotice);
    
    // Remove notice after 3 seconds
    setTimeout(() => {
        savedNotice.remove();
    }, 3000);
    
    return true;
}

// Add dashboard navigation button to results
function addDashboardButton(container, buttonText = "View in Dashboard") {
    const dashboardBtn = document.createElement('button');
    dashboardBtn.id = 'viewDashboard';
    dashboardBtn.className = 'dashboard-btn';
    dashboardBtn.innerHTML = `<i class="fas fa-tachometer-alt"></i> ${buttonText}`;
    
    // Add click event
    dashboardBtn.addEventListener('click', () => {
        window.location.href = 'unified_dashboard.html';
    });
    
    // Add to container
    const containerEl = document.getElementById(container);
    if (containerEl) {
        containerEl.appendChild(dashboardBtn);
        return true;
    }
    
    return false;
}

// Add the standardized CSS for dashboard button
function addDashboardStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .dashboard-btn {
            background-color: #0f4c81;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
        }
        
        .dashboard-btn:hover {
            background-color: #0a3258;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .dashboard-btn i {
            font-size: 16px;
        }
        
        .saved-notice {
            animation: fadeInUp 0.5s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
} 