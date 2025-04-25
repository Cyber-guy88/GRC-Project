// Store responses
let responses = {};
let chartInstance = null; // For storing chart instance

// Function to handle button selection
function selectButton(button, questionId, value) {
    // Remove active class from sibling buttons
    const buttons = button.parentElement.getElementsByClassName('btn');
    Array.from(buttons).forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Store response
    responses[questionId] = value;
    
    // Enable submit button if at least one question is answered
    checkSubmitButton();
}

// Function to check if any questions are answered
function checkSubmitButton() {
    const submitBtn = document.getElementById('submitBtn');
    
    if (Object.keys(responses).length > 0) {
        submitBtn.removeAttribute('disabled');
    } else {
        submitBtn.setAttribute('disabled', 'true');
    }
}

// Function to calculate score
function calculateScore() {
    let answeredYes = 0;
    let totalAnswered = Object.keys(responses).length;
    const totalQuestions = 113; // Total available questions

    // Count 'Yes' responses
    for (let questionId in responses) {
        if (responses[questionId] === 'Yes') {
            answeredYes++;
        }
    }

    // Calculate percentage based on total questions (113)
    let score = (answeredYes / totalQuestions) * 100;
    
    return {
        score: score.toFixed(2),
        totalQuestions: totalQuestions,
        totalAnswered: totalAnswered,
        answeredYes: answeredYes,
        unanswered: totalQuestions - totalAnswered,
        notCompliant: totalAnswered - answeredYes
    };
}

// Function to display score
function displayScore(scoreData) {
    const scoreDisplay = document.getElementById('scoreDisplay');
    let scoreClass = '';
    let scoreMessage = '';
    
    // Determine score class and message based on percentage
    if (scoreData.score >= 80) {
        scoreClass = 'high-score';
        scoreMessage = 'Excellent! Your organization demonstrates strong HIPAA compliance.';
    } else if (scoreData.score >= 60) {
        scoreClass = 'medium-score';
        scoreMessage = 'Fair. Some improvements needed to strengthen HIPAA compliance.';
    } else {
        scoreClass = 'low-score';
        scoreMessage = 'Attention needed. Significant improvements required for HIPAA compliance.';
    }

    // Display score with color coding
    scoreDisplay.innerHTML = `
        <div class="${scoreClass}">
            <h3>HIPAA Compliance Score</h3>
            <p class="score-value">${scoreData.score}%</p>
            <p class="score-details">Questions Answered Yes: ${scoreData.answeredYes} out of ${scoreData.totalQuestions} total questions</p>
            <p class="score-info">Questions Answered: ${scoreData.totalAnswered} | Unanswered: ${scoreData.unanswered}</p>
            <p class="score-message">${scoreMessage}</p>
        </div>
    `;
    
    scoreDisplay.style.display = 'block';

    // Generate and display recommendations
    const recommendations = generateRecommendations(parseFloat(scoreData.score), responses);
    displayResults(parseFloat(scoreData.score), recommendations, scoreData);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Disable submit button initially
    document.getElementById('submitBtn').setAttribute('disabled', 'true');

    // Add event listeners
    document.getElementById('submitBtn').addEventListener('click', function(e) {
        e.preventDefault();
        const scoreData = calculateScore();
        displayScore(scoreData);
    });

    document.getElementById('resetBtn').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Clear all responses
        responses = {};
        
        // Remove active class from all buttons
        const buttons = document.getElementsByClassName('btn');
        Array.from(buttons).forEach(btn => btn.classList.remove('active'));
        
        // Clear score display
        const scoreDisplay = document.getElementById('scoreDisplay');
        scoreDisplay.style.display = 'none';
        scoreDisplay.innerHTML = '';
        
        // Hide modal if open
        document.getElementById('recommendationModal').style.display = 'none';
        
        // Disable submit button
        document.getElementById('submitBtn').setAttribute('disabled', 'true');
        
        // Destroy chart if exists
        if (chartInstance) {
            chartInstance.destroy();
            chartInstance = null;
        }
    });
});

// Generate recommendations based on score and responses
function generateRecommendations(score, responses) {
    const recommendations = {
        overall: '',
        critical: [],
        improvements: [],
        nextSteps: []
    };

    // Overall assessment
    if (score >= 80) {
        recommendations.overall = 'Your organization demonstrates strong HIPAA compliance practices for the answered questions.';
    } else if (score >= 60) {
        recommendations.overall = 'Your organization has moderate HIPAA compliance but needs some improvements based on the answered questions.';
    } else {
        recommendations.overall = 'Your organization needs significant improvements to meet HIPAA compliance requirements based on the answered questions.';
    }

    // Critical findings
    Object.entries(responses).forEach(([questionId, response]) => {
        if (response === 'No') {
            const questionRow = document.querySelector(`button[onclick*="selectButton(this, ${questionId}"]`).closest('tr');
            const question = questionRow.cells[2].textContent;
            const specification = questionRow.cells[0].textContent;
            recommendations.critical.push(`Critical: ${specification} - ${question}`);
        }
    });

    // Improvement recommendations
    if (score < 80) {
        recommendations.improvements.push('Conduct regular security risk assessments');
        recommendations.improvements.push('Implement comprehensive security policies and procedures');
        recommendations.improvements.push('Provide regular HIPAA compliance training to staff');
        recommendations.improvements.push('Review and update access controls');
        recommendations.improvements.push('Establish incident response procedures');
    }

    // Next steps
    recommendations.nextSteps = [
        'Complete any unanswered questions in the assessment',
        'Schedule a detailed HIPAA compliance audit',
        'Develop an action plan for addressing identified gaps',
        'Review and update security policies',
        'Conduct staff training on HIPAA requirements'
    ];

    return recommendations;
}

// Display results in modal
function displayResults(score, recommendations, scoreData) {
    const modal = document.getElementById('recommendationModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <div class="score-section">
            <h3>Overall Score: ${score.toFixed(2)}%</h3>
            <p>${recommendations.overall}</p>
        </div>

        <div class="chart-container">
            <canvas id="complianceChart" width="400" height="200"></canvas>
        </div>

        ${recommendations.critical.length > 0 ? `
            <div class="critical-section">
                <h3>Critical Findings</h3>
                <ul>
                    ${recommendations.critical.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        ` : ''}

        <div class="improvements-section">
            <h3>Recommended Improvements</h3>
            <ul>
                ${recommendations.improvements.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="next-steps-section">
            <h3>Next Steps</h3>
            <ul>
                ${recommendations.nextSteps.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="form-actions">
            <button id="downloadReportHtml" class="btn-secondary" aria-label="Download HTML Report">
                <i class="fas fa-file-code"></i> HTML Report
            </button>
            <button id="downloadReportPdf" class="btn-primary" aria-label="Download PDF Report">
                <i class="fas fa-file-pdf"></i> PDF Report
            </button>
            <button id="printReport" class="btn-secondary" aria-label="Print Report">
                <i class="fas fa-print"></i> Print
            </button>
            <button id="emailReport" class="btn-secondary" aria-label="Email Report">
                <i class="fas fa-envelope"></i> Email
            </button>
        </div>
        <div id="emailForm" style="display: none; margin-top: 15px;">
            <div class="form-group">
                <input type="email" id="emailInput" placeholder="Enter recipient email" class="form-control" required>
                <button id="sendEmailBtn" class="btn-primary">Send</button>
                <button id="cancelEmailBtn" class="btn-secondary">Cancel</button>
            </div>
            <div id="emailStatus"></div>
        </div>
    `;

    modal.style.display = 'block';
    
    // Create chart
    createComplianceChart(scoreData);
    
    // Save assessment results to localStorage
    saveAssessmentResults(score, recommendations);
    
    // Add event listeners to buttons
    document.getElementById('downloadReportHtml').addEventListener('click', () => downloadReport('html'));
    document.getElementById('downloadReportPdf').addEventListener('click', () => {
        showLoading('Generating PDF...');
        setTimeout(() => downloadReport('pdf'), 500);
    });
    document.getElementById('printReport').addEventListener('click', printReport);
    document.getElementById('emailReport').addEventListener('click', toggleEmailForm);
    document.getElementById('sendEmailBtn')?.addEventListener('click', sendReportByEmail);
    document.getElementById('cancelEmailBtn')?.addEventListener('click', toggleEmailForm);
}

// Create data visualization chart
function createComplianceChart(scoreData) {
    const ctx = document.getElementById('complianceChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    // Create new chart
    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Compliant', 'Non-Compliant', 'Unanswered'],
            datasets: [{
                label: 'HIPAA Compliance Status',
                data: [
                    scoreData.answeredYes, 
                    scoreData.notCompliant, 
                    scoreData.unanswered
                ],
                backgroundColor: [
                    '#4caf50',  // Green - Compliant
                    '#f44336',  // Red - Non-Compliant
                    '#9e9e9e'   // Grey - Unanswered
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Download report in HTML or PDF format
function downloadReport(format = 'html') {
    // Get the visible modal content
    const modalContent = document.getElementById('modalContent');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const date = new Date().toLocaleDateString();
    
    // Create a simple container for the report content
    const reportContainer = document.createElement('div');
    reportContainer.className = 'pdf-report';
    
    // Add a header
    const header = document.createElement('div');
    header.innerHTML = `
        <h1 style="color: #0050a2; text-align: center; margin-bottom: 10px;">HIPAA Compliance Assessment Report</h1>
        <p style="text-align: center; color: #666; margin-bottom: 20px;">Date: ${date}</p>
    `;
    reportContainer.appendChild(header);
    
    // Add score section - clone it directly to preserve all styling and content
    const scoreSection = document.createElement('div');
    scoreSection.innerHTML = `
        <h2 style="color: #0050a2; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Assessment Results</h2>
    `;
    
    // Clone the score display to preserve its exact content
    const scoreClone = scoreDisplay.cloneNode(true);
    // Remove any "saved to dashboard" messages that might be present
    const savedNotices = scoreClone.querySelectorAll('.saved-notice');
    savedNotices.forEach(notice => notice.remove());
    
    scoreSection.appendChild(scoreClone);
    reportContainer.appendChild(scoreSection);
    
    // Add the modal content (which contains the chart, critical findings, etc.)
    const resultsSection = document.createElement('div');
    resultsSection.className = 'results-section';
    
    // Clone modal content (excluding buttons and forms)
    const modalClone = modalContent.cloneNode(true);
    
    // Remove buttons and forms from the clone
    const buttons = modalClone.querySelectorAll('button');
    buttons.forEach(button => button.remove());
    
    const emailForm = modalClone.querySelector('#emailForm');
    if (emailForm) emailForm.remove();
    
    const formActions = modalClone.querySelector('.form-actions');
    if (formActions) formActions.remove();
    
    resultsSection.appendChild(modalClone);
    reportContainer.appendChild(resultsSection);
    
    // Add basic styling to make the PDF look nice
    const style = document.createElement('style');
    style.textContent = `
        .pdf-report {
            font-family: Arial, sans-serif;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .pdf-report h1, .pdf-report h2, .pdf-report h3 {
            color: #0050a2;
        }
        .pdf-report ul {
            padding-left: 20px;
        }
        .pdf-report li {
            margin-bottom: 8px;
        }
        .score-value {
            font-size: 36px !important;
            font-weight: bold;
            color: #0050a2;
            text-align: center;
            margin: 15px 0;
        }
        .chart-container {
            text-align: center;
            margin: 20px auto;
        }
        @media print {
            body * {
                visibility: hidden;
            }
            .pdf-report, .pdf-report * {
                visibility: visible;
            }
            .pdf-report {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
            }
        }
    `;
    reportContainer.appendChild(style);
    
    // Handle HTML report download
    if (format === 'html') {
        // Create the HTML content
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>HIPAA Compliance Assessment Report</title>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        color: #333;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    h1, h2, h3 {
                        color: #0050a2;
                    }
                    ul {
                        padding-left: 20px;
                    }
                    li {
                        margin-bottom: 8px;
                    }
                    .score-value {
                        font-size: 36px;
                        font-weight: bold;
                        color: #0050a2;
                        text-align: center;
                        margin: 15px 0;
                    }
                    .chart-container {
                        text-align: center;
                        margin: 20px auto;
                    }
                </style>
            </head>
            <body>
                ${reportContainer.innerHTML}
            </body>
            </html>
        `;
        
        // Download as HTML file
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hipaa-compliance-report-${date.replace(/\//g, '-')}.html`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        hideLoading();
    } 
    // Handle PDF report download
    else if (format === 'pdf') {
        try {
            // Add the report container to the document for PDF generation
            document.body.appendChild(reportContainer);
            reportContainer.style.position = 'absolute';
            reportContainer.style.left = '-9999px';
            reportContainer.style.top = '0';
            reportContainer.style.width = '8.5in';
            reportContainer.style.zIndex = '-1000';
            reportContainer.style.backgroundColor = 'white';
            
            // MAIN APPROACH: Use html2pdf with very simple settings
            const pdfOptions = {
                margin: 10,
                filename: `hipaa-compliance-report-${date.replace(/\//g, '-')}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2, 
                    useCORS: true,
                    allowTaint: true,
                    logging: false 
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait',
                }
            };
            
            // Get direct chart data if possible
            let chartData = null;
            if (chartInstance) {
                chartData = {
                    compliant: chartInstance.data.datasets[0].data[0],
                    nonCompliant: chartInstance.data.datasets[0].data[1],
                    unanswered: chartInstance.data.datasets[0].data[2]
                };
                
                // Check if chart container exists
                const chartContainer = modalClone.querySelector('.chart-container');
                if (chartContainer) {
                    // Create a simpler representation of the chart for improved compatibility
                    chartContainer.innerHTML = `
                        <div style="margin: 20px auto; width: 100%; text-align: center;">
                            <div style="font-weight: bold; margin-bottom: 10px;">Compliance Breakdown:</div>
                            <div style="display: inline-block; margin: 5px 15px; text-align: left;">
                                <div><span style="display: inline-block; width: 15px; height: 15px; background-color: #4caf50; margin-right: 5px;"></span> Compliant: ${chartData.compliant}</div>
                            </div>
                            <div style="display: inline-block; margin: 5px 15px; text-align: left;">
                                <div><span style="display: inline-block; width: 15px; height: 15px; background-color: #f44336; margin-right: 5px;"></span> Non-Compliant: ${chartData.nonCompliant}</div>
                            </div>
                            <div style="display: inline-block; margin: 5px 15px; text-align: left;">
                                <div><span style="display: inline-block; width: 15px; height: 15px; background-color: #9e9e9e; margin-right: 5px;"></span> Unanswered: ${chartData.unanswered}</div>
                            </div>
                        </div>
                    `;
                }
            }
            
            // Try to generate PDF using html2pdf library
            setTimeout(() => {
                try {
                    html2pdf().from(reportContainer).set(pdfOptions).save()
                        .then(() => {
                            document.body.removeChild(reportContainer);
                            hideLoading();
                        })
                        .catch(error => {
                            console.error("PDF generation failed with html2pdf:", error);
                            tryFallbackMethod();
                        });
                } catch (error) {
                    console.error("Error using html2pdf:", error);
                    tryFallbackMethod();
                }
            }, 500);
            
            // FALLBACK APPROACH 1: Try window.print() method if html2pdf fails
            function tryFallbackMethod() {
                try {
                    alert("Using alternative PDF method. Your browser's print dialog will open. Please select 'Save as PDF'.");
                    
                    // Position the report container for printing
                    reportContainer.style.left = '0';
                    reportContainer.style.zIndex = '9999';
                    
                    // Add a temporary print style
                    const printStyle = document.createElement('style');
                    printStyle.innerHTML = `
                        @media print {
                            body * {
                                visibility: hidden;
                            }
                            .pdf-report, .pdf-report * {
                                visibility: visible;
                            }
                            .pdf-report {
                                position: absolute;
                                left: 0;
                                top: 0;
                                width: 100%;
                                height: auto;
                            }
                        }
                    `;
                    document.head.appendChild(printStyle);
                    
                    // Print the document
                    window.print();
                    
                    // Clean up after printing
                    setTimeout(() => {
                        document.head.removeChild(printStyle);
                        document.body.removeChild(reportContainer);
                        hideLoading();
                    }, 2000);
                    
                } catch (printError) {
                    console.error("Print method failed:", printError);
                    tryDataURIMethod();
                }
            }
            
            // FALLBACK APPROACH 2: Try data URI method if both previous methods fail
            function tryDataURIMethod() {
                try {
                    alert("Using basic PDF generation method. A new window will open with your report. Use your browser's print function to save as PDF.");
                    
                    const reportHTML = `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <title>HIPAA Compliance Assessment Report</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    padding: 20px;
                                    color: #333;
                                }
                                h1, h2, h3 {
                                    color: #0050a2;
                                }
                                .score-value {
                                    font-size: 36px;
                                    font-weight: bold;
                                    color: #0050a2;
                                    text-align: center;
                                }
                                .chart-data {
                                    margin: 20px 0;
                                    padding: 10px;
                                    border: 1px solid #ddd;
                                    background-color: #f9f9f9;
                                }
                                .print-btn {
                                    background-color: #0050a2;
                                    color: white;
                                    padding: 10px 15px;
                                    border: none;
                                    border-radius: 4px;
                                    cursor: pointer;
                                    font-size: 16px;
                                    margin: 20px 0;
                                }
                            </style>
                        </head>
                        <body>
                            ${reportContainer.innerHTML}
                            <button class="print-btn" onclick="window.print()">Print/Save as PDF</button>
                            <script>
                                window.onload = function() {
                                    // Auto-open print dialog after 1 second
                                    setTimeout(function() {
                                        window.print();
                                    }, 1000);
                                };
                            </script>
                        </body>
                        </html>
                    `;
                    
                    // Open a new window with the report
                    const reportWindow = window.open('', '_blank');
                    if (reportWindow) {
                        reportWindow.document.open();
                        reportWindow.document.write(reportHTML);
                        reportWindow.document.close();
                    } else {
                        alert("Unable to open new window. Please check your popup blocker settings.");
                    }
                    
                    // Clean up
                    document.body.removeChild(reportContainer);
                    hideLoading();
                    
                } catch (dataURIError) {
                    console.error("Data URI method failed:", dataURIError);
                    alert("We're unable to generate a PDF. Please try the HTML report option instead.");
                    document.body.removeChild(reportContainer);
                    hideLoading();
                }
            }
            
        } catch (mainError) {
            console.error("Main PDF generation error:", mainError);
            alert("Error creating PDF. Please try the HTML report option instead.");
            if (document.body.contains(reportContainer)) {
                document.body.removeChild(reportContainer);
            }
            hideLoading();
        }
    }
}

// Print report directly
function printReport() {
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
        alert('Please allow pop-ups to print the report');
        return;
    }
    
    const score = document.getElementById('scoreDisplay').textContent;
    const recommendations = document.getElementById('modalContent').innerHTML;
    const date = new Date().toLocaleDateString();
    const chartImage = chartInstance ? chartInstance.toBase64Image() : null;
    
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>HIPAA Compliance Assessment Report</title>
            <style>
                body {
                    font-family: 'Segoe UI', Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 0.5in;
                }
                h1, h2, h3 {
                    color: #0050a2;
                }
                ul {
                    list-style-type: none;
                    padding-left: 0;
                }
                li {
                    margin-bottom: 0.5rem;
                    padding: 0.5rem;
                    background-color: #f5f7fa;
                    border-left: 4px solid #0050a2;
                }
                .critical-section li {
                    border-left-color: #f44336;
                }
                .header {
                    text-align: center;
                    margin-bottom: 1.5rem;
                }
                .footer {
                    margin-top: 1.5rem;
                    text-align: center;
                    font-size: 0.9rem;
                    color: #666;
                }
                .btn-container, .form-actions, #emailForm {
                    display: none !important;
                }
                .chart-container {
                    margin: 1rem auto;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>HIPAA Compliance Assessment Report</h1>
                <p>Date: ${date}</p>
            </div>

            <div class="score-section">
                ${score.replace(/✓ Assessment saved to dashboard/g, '')}
            </div>

            ${chartImage ? `
            <div class="chart-container">
                <img src="${chartImage}" alt="Compliance Chart" style="max-width: 100%; height: auto;">
            </div>
            ` : ''}

            <div class="recommendations">
                ${recommendations.replace(/<button.*?<\/button>/g, '')
                    .replace(/<div class="chart-container">.*?<\/div>/s, '')
                    .replace(/<div id="emailForm".*?<\/div>/s, '')
                    .replace(/<div class="form-actions">.*?<\/div>/s, '')}
            </div>

            <div class="footer">
                <p>This report was generated using the HIPAA Compliance Assessment Tool.</p>
            </div>
            
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(function() { window.close(); }, 500);
                };
            </script>
        </body>
        </html>
    `;
    
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
}

// Email functionality
function toggleEmailForm() {
    const emailForm = document.getElementById('emailForm');
    emailForm.style.display = emailForm.style.display === 'none' ? 'block' : 'none';
    
    if (emailForm.style.display === 'block') {
        document.getElementById('emailInput').focus();
    }
}

function sendReportByEmail() {
    const email = document.getElementById('emailInput').value;
    const statusDiv = document.getElementById('emailStatus');
    
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        statusDiv.innerHTML = '<p style="color: #f44336;">Please enter a valid email address</p>';
        return;
    }
    
    showLoading('Sending email...');
    statusDiv.innerHTML = '';
    
    // In a real implementation, you would call an API to send the email
    // This is a simulation for demonstration purposes
    setTimeout(() => {
        statusDiv.innerHTML = '<p style="color: #4caf50;">Report successfully sent to ' + email + '</p>';
        document.getElementById('emailInput').value = '';
        hideLoading();
        
        // Hide the form after 3 seconds
        setTimeout(() => {
            document.getElementById('emailForm').style.display = 'none';
            statusDiv.innerHTML = '';
        }, 3000);
    }, 2000);
}

// Loading indicator
function showLoading(message = 'Loading...') {
    let loadingDiv = document.getElementById('loadingIndicator');
    
    if (!loadingDiv) {
        loadingDiv = document.createElement('div');
        loadingDiv.id = 'loadingIndicator';
        loadingDiv.innerHTML = `
            <div class="loading-spinner"></div>
            <p id="loadingMessage">${message}</p>
        `;
        document.body.appendChild(loadingDiv);
    } else {
        document.getElementById('loadingMessage').textContent = message;
        loadingDiv.style.display = 'flex';
    }
}

function hideLoading() {
    const loadingDiv = document.getElementById('loadingIndicator');
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
}

// Close modal when clicking the close button
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('recommendationModal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('recommendationModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Function to save assessment results
function saveAssessmentResults(score, recommendations) {
    // Get current user info (or use a default)
    const currentUser = getCurrentUser();
    
    // Calculate implementation metrics
    const totalQuestions = 113;
    const answeredCount = Object.keys(responses).length;
    const yesCount = Object.values(responses).filter(val => val === 'Yes').length;
    const noCount = Object.values(responses).filter(val => val === 'No').length;
    
    // Create assessment data object
    const assessmentData = {
        framework: 'HIPAA',
        date: new Date().toISOString(),
        score: Math.round(score),
        status: score >= 80 ? 'Compliant' : score >= 60 ? 'Partially Compliant' : 'Non-Compliant',
        details: {
            implemented: yesCount,
            partial: 0, // HIPAA assessment is binary (Yes/No)
            missing: noCount,
            unanswered: totalQuestions - answeredCount,
            recommendations: recommendations.critical.map(item => ({
                id: 'HIPAA-' + Math.floor(Math.random() * 1000),
                requirement: item.split(' - ')[0].replace('Critical: ', ''),
                recommendation: item,
                status: 'No',
                priority: 'critical'
            }))
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
    
    // Show confirmation
    const savedNotice = document.createElement('div');
    savedNotice.className = 'saved-notice';
    savedNotice.innerHTML = '<p>✓ Assessment saved to dashboard</p>';
    savedNotice.style.backgroundColor = '#e8f5e9';
    savedNotice.style.color = '#2e7d32';
    savedNotice.style.padding = '10px';
    savedNotice.style.borderRadius = '4px';
    savedNotice.style.marginTop = '20px';
    savedNotice.style.textAlign = 'center';
    modalContent.appendChild(savedNotice);
}

// Helper function to get current user
function getCurrentUser() {
    // Try to get username from localStorage (set during login)
    const user = localStorage.getItem('currentUser');
    return user || 'default_user'; // Return default if not found
} 