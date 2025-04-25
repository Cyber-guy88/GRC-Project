// UI Components and Display Logic
class AssessmentUI {
    constructor() {
        this.statusIcons = {
            'Fully Compliant': '✅',
            'Mostly Compliant': '🟡',
            'Partially Compliant': '🟠',
            'Non-Compliant': '❌',
            'default': '❓'
        };
        
        // Initialize event listeners
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Add download button event listener
        const downloadBtn = document.getElementById('downloadReport');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                if (window.assessment) {
                    const results = window.assessment.analyzeCompliance();
                    window.generatePDF(results);
                } else {
                    console.error('Assessment instance not found');
                }
            });
        }
    }

    displayResults(results) {
        console.log('Displaying results:', results);
        this.updateScoreCircle(results);
        this.updateScoreDetails(results);
        this.displayRecommendations(results);
        this.showResultsSection();
    }

    updateScoreCircle(results) {
        const scoreCircle = document.querySelector('.score-circle');
        scoreCircle.innerHTML = `
            <div class="weighted-score">
                <span class="score-value">${Math.round(results.weightedScore)}%</span>
            </div>
        `;
    }

    updateScoreDetails(results) {
        const scoreDetails = document.querySelector('.score-details');
        const rawScore = (results.weightedScore * 0.32).toFixed(1);
        const complianceClass = results.complianceStatus.toLowerCase().replace(/\s+/g, '-');
        
        scoreDetails.innerHTML = `
            <div class="raw-score-container">
                <div class="raw-score-label">Total Score</div>
                <div class="raw-score-value">${rawScore}/32</div>
            </div>
            <div class="compliance-info ${complianceClass}">
                <div class="compliance-status">
                    <div class="status-text">
                        ${this.getStatusIcon(results.complianceStatus)} ${results.complianceStatus}
                    </div>
                </div>
            </div>
            <div class="status-counts">
                <div class="status-item implemented">
                    <i class="fas fa-check-circle"></i>
                    <span>${results.implemented}</span>
                    <small>Implemented</small>
                </div>
                <div class="status-item partial">
                    <i class="fas fa-exclamation-circle"></i>
                    <span>${results.partial}</span>
                    <small>Partial</small>
                </div>
                <div class="status-item missing">
                    <i class="fas fa-times-circle"></i>
                    <span>${results.missing}</span>
                    <small>Missing</small>
                </div>
            </div>
        `;
    }

    displayRecommendations(results) {
        const recommendationsList = document.getElementById('recommendationsList');
        recommendationsList.innerHTML = '';

        if (results.recommendations.length === 0) {
            recommendationsList.innerHTML = '<p class="no-recommendations">All requirements are fully implemented. No recommendations needed.</p>';
            return;
        }

        results.recommendations.forEach(rec => {
            const recItem = document.createElement('div');
            recItem.className = 'recommendation-item';
            
            let dynamicRecHTML = '';
            if (window.assessment && window.assessment.recommendationsDB[rec.requirement] && 
                window.assessment.recommendationsDB[rec.requirement].dynamicRecommendations) {
                dynamicRecHTML = this.createDynamicRecommendationsHTML(rec.requirement);
            }
            
            recItem.innerHTML = `
                <h3>${rec.requirement}</h3>
                <p><strong>Status:</strong> ${rec.status}</p>
                <p><strong>Recommendation:</strong> ${rec.recommendation}</p>
                ${dynamicRecHTML}
            `;
            recommendationsList.appendChild(recItem);
        });
    }

    createDynamicRecommendationsHTML(requirement) {
        if (!window.assessment || !window.assessment.recommendationsDB[requirement] || 
            !window.assessment.recommendationsDB[requirement].dynamicRecommendations) {
            return '';
        }

        const dynamicRecs = window.assessment.recommendationsDB[requirement].dynamicRecommendations;
        let html = `
            <div class="dynamic-recommendations">
                <h4>Additional Recommendations:</h4>
                <ul class="dynamic-rec-list">
        `;
        
        for (const [key, value] of Object.entries(dynamicRecs)) {
            html += `<li><strong>${key}:</strong> ${value}</li>`;
        }
        
        html += `</ul></div>`;
        return html;
    }

    showResultsSection() {
        const resultsSection = document.getElementById('assessmentResults');
        resultsSection.classList.remove('hidden');
        
        // Scroll to results section
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    getStatusIcon(status) {
        return this.statusIcons[status] || this.statusIcons.default;
    }
}

// Initialize UI components
const ui = new AssessmentUI();

// Make UI available globally
window.displayResults = (results) => ui.displayResults(results); 