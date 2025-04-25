document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const totalScoreElement = document.getElementById('totalScore');
    const generateReportBtn = document.getElementById('generateReport');
    const modal = document.getElementById('reportModal');
    const closeBtn = document.querySelector('.close');
    const downloadReportBtn = document.getElementById('downloadReport');
    const reportContent = document.getElementById('reportContent');
    const sections = document.querySelectorAll('.checklist-section');
    
    // Create progress indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'progress-indicator';
    progressIndicator.innerHTML = '<div class="progress-bar"></div>';
    document.body.appendChild(progressIndicator);
    
    // Create navigation buttons
    const navigationButtons = document.createElement('div');
    navigationButtons.className = 'navigation-buttons';
    navigationButtons.innerHTML = `
        <button class="nav-btn" id="prevBtn" disabled>
            <span>←</span> Previous Section
        </button>
        <button class="nav-btn" id="nextBtn">
            Next Section <span>→</span>
        </button>
    `;
    document.querySelector('.checklist-container').appendChild(navigationButtons);
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSectionIndex = 0;
    
    // Initialize sections
    function initializeSections() {
        sections.forEach((section, index) => {
            if (index === 0) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        updateNavigationButtons();
    }
    
    // Update navigation buttons
    function updateNavigationButtons() {
        prevBtn.disabled = currentSectionIndex === 0;
        nextBtn.disabled = currentSectionIndex === sections.length - 1;
    }
    
    // Navigate to section
    function navigateToSection(index) {
        sections[currentSectionIndex].classList.remove('active');
        currentSectionIndex = index;
        sections[currentSectionIndex].classList.add('active');
        updateNavigationButtons();
        updateProgress();
    }
    
    // Event listeners for navigation
    prevBtn.addEventListener('click', () => {
        if (currentSectionIndex > 0) {
            navigateToSection(currentSectionIndex - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentSectionIndex < sections.length - 1) {
            navigateToSection(currentSectionIndex + 1);
        }
    });
    
    // Update progress bar
    function updateProgress() {
        const total = checkboxes.length;
        const checked = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const progress = (checked / total) * 100;
        document.querySelector('.progress-bar').style.width = `${progress}%`;
    }
    
    // Calculate score
    function calculateScore() {
        let totalScore = 0;
        let totalWeight = 0;
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                totalScore += parseFloat(checkbox.dataset.weight);
            }
            totalWeight += parseFloat(checkbox.dataset.weight);
        });
        
        return Math.round((totalScore / totalWeight) * 100);
    }
    
    // Update score display
    function updateScore() {
        totalScoreElement.textContent = calculateScore();
        updateProgress();
    }
    
    // Generate report
    function generateReport() {
        const score = calculateScore();
        let reportHTML = `
            <div class="report-section">
                <h3>Overall Score: ${score}%</h3>
                <h4>Compliance Status: ${score >= 80 ? 'Compliant' : score >= 60 ? 'Partially Compliant' : 'Non-Compliant'}</h4>
            </div>
            <div class="report-section">
                <h3>Missing Requirements</h3>
                <ul>
        `;
        
        const missingItems = [];
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                const section = checkbox.closest('.checklist-item').querySelector('h4').textContent;
                const question = checkbox.parentElement.textContent.trim();
                missingItems.push({ section, question });
            }
        });
        
        if (missingItems.length === 0) {
            reportHTML += '<li>All requirements are met!</li>';
        } else {
            missingItems.forEach(item => {
                reportHTML += `<li><strong>${item.section}:</strong> ${item.question}</li>`;
            });
        }
        
        reportHTML += `
                </ul>
            </div>
            <div class="report-section">
                <h3>Recommendations</h3>
                <ul>
        `;
        
        if (missingItems.length === 0) {
            reportHTML += '<li>Maintain current compliance level</li>';
        } else {
            missingItems.forEach(item => {
                reportHTML += `<li>Implement ${item.question}</li>`;
            });
        }
        
        reportHTML += `
                </ul>
            </div>
        `;
        
        reportContent.innerHTML = reportHTML;
        modal.style.display = 'block';
        
        // Save assessment results
        saveAssessmentResults(score, missingItems);
    }
    
    // Function to save assessment results
    function saveAssessmentResults(score, missingItems) {
        // Get current user info (or use a default)
        const currentUser = getCurrentUser();
        
        // Count implemented and missing items
        const totalItems = checkboxes.length;
        const implemented = totalItems - missingItems.length;
        
        // Create recommendations list
        const recommendations = missingItems.map(item => ({
            id: item.section,
            requirement: item.section,
            original: item.question,
            recommendation: `Implement "${item.question}"`,
            status: 'No',
            priority: score < 60 ? 'critical' : score < 80 ? 'high' : 'medium'
        }));
        
        // Create assessment data object
        const assessmentData = {
            framework: 'ISO 27001',
            date: new Date().toISOString(),
            score: score,
            status: score >= 80 ? 'Compliant' : score >= 60 ? 'Partially Compliant' : 'Non-Compliant',
            details: {
                implemented: implemented,
                partial: 0, // ISO assessment is binary (implemented or not)
                missing: missingItems.length,
                recommendations: recommendations
            }
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
        
        // Show save confirmation (add to the modal)
        const savedNotice = document.createElement('div');
        savedNotice.className = 'saved-notice';
        savedNotice.innerHTML = '<p><i class="fa fa-check-circle"></i> Assessment saved to dashboard</p>';
        savedNotice.style.backgroundColor = '#e8f5e9';
        savedNotice.style.color = '#2e7d32';
        savedNotice.style.padding = '10px';
        savedNotice.style.borderRadius = '4px';
        savedNotice.style.marginTop = '20px';
        savedNotice.style.textAlign = 'center';
        reportContent.appendChild(savedNotice);
    }
    
    // Helper function to get current user
    function getCurrentUser() {
        // Try to get username from localStorage (set during login)
        const user = localStorage.getItem('currentUser');
        return user || 'default_user'; // Return default if not found
    }
    
    // Download report
    function downloadReport() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFontSize(20);
        doc.text('ISO27001 Compliance Report', 20, 20);
        
        doc.setFontSize(12);
        doc.text(`Overall Score: ${calculateScore()}%`, 20, 40);
        doc.text(`Compliance Status: ${calculateScore() >= 80 ? 'Compliant' : calculateScore() >= 60 ? 'Partially Compliant' : 'Non-Compliant'}`, 20, 50);
        
        doc.setFontSize(14);
        doc.text('Missing Requirements:', 20, 70);
        
        let y = 80;
        const missingItems = [];
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                const section = checkbox.closest('.checklist-item').querySelector('h4').textContent;
                const question = checkbox.parentElement.textContent.trim();
                missingItems.push({ section, question });
            }
        });
        
        if (missingItems.length === 0) {
            doc.text('All requirements are met!', 30, y);
        } else {
            missingItems.forEach(item => {
                doc.setFontSize(12);
                doc.text(`${item.section}: ${item.question}`, 30, y);
                y += 10;
            });
        }
        
        doc.save('ISO27001_Compliance_Report.pdf');
    }
    
    // Event listeners
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateScore);
    });
    
    generateReportBtn.addEventListener('click', generateReport);
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    downloadReportBtn.addEventListener('click', downloadReport);
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Initialize
    initializeSections();
    updateScore();
}); 