// Initialize the assessment system
document.addEventListener('DOMContentLoaded', () => {
    // Create assessment instance
    window.assessment = new PCIDSSAssessment();
    
    // Initialize the checklist
    window.assessment.initializeChecklist();
    
    // Debug button for development
    const debugBtn = document.getElementById('debugState');
    if (debugBtn) {
        debugBtn.addEventListener('click', () => {
            console.log('Assessment instance:', window.assessment);
            console.log('Current results:', window.assessment.analyzeCompliance());
        });
    }
}); 