// PDF Generator functionality
function generatePDF(results) {
    // Create new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set document properties
    doc.setProperties({
        title: 'PCI DSS Compliance Assessment Report',
        subject: 'Compliance Assessment Results',
        author: 'GRC System',
        keywords: 'PCI DSS, Compliance, Assessment',
        creator: 'GRC System'
    });

    // Add header
    doc.setFontSize(20);
    doc.text('PCI DSS Compliance Assessment Report', 105, 20, { align: 'center' });
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });

    // Add score section
    doc.setFontSize(16);
    doc.text('Assessment Score', 105, 45, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text(`Weighted Score: ${Math.round(results.weightedScore)}%`, 105, 55, { align: 'center' });
    doc.text(`Raw Score: ${(results.weightedScore * 0.32).toFixed(1)}/32`, 105, 65, { align: 'center' });
    doc.text(`Compliance Status: ${results.complianceStatus}`, 105, 75, { align: 'center' });

    // Add implementation counts
    doc.setFontSize(14);
    doc.text('Implementation Summary', 105, 90, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Implemented: ${results.implemented}`, 105, 100, { align: 'center' });
    doc.text(`Partial: ${results.partial}`, 105, 110, { align: 'center' });
    doc.text(`Missing: ${results.missing}`, 105, 120, { align: 'center' });

    // Add recommendations section
    if (results.recommendations && results.recommendations.length > 0) {
        doc.setFontSize(16);
        doc.text('Recommendations', 105, 140, { align: 'center' });

        let yPos = 150;
        results.recommendations.forEach((rec, index) => {
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }

            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text(`${index + 1}. ${rec.requirement}`, 20, yPos);
            
            doc.setFont(undefined, 'normal');
            doc.text(`Status: ${rec.status}`, 20, yPos + 10);
            
            // Split recommendation text into multiple lines if needed
            const splitText = doc.splitTextToSize(`Recommendation: ${rec.recommendation}`, 170);
            doc.text(splitText, 20, yPos + 20);
            
            yPos += 30 + (splitText.length * 7);

            // Add dynamic recommendations if available
            if (window.assessment && 
                window.assessment.recommendationsDB[rec.requirement] && 
                window.assessment.recommendationsDB[rec.requirement].dynamicRecommendations) {
                
                const dynamicRecs = window.assessment.recommendationsDB[rec.requirement].dynamicRecommendations;
                
                if (yPos > 250) {
                    doc.addPage();
                    yPos = 20;
                }

                doc.setFont(undefined, 'bold');
                doc.text('Additional Recommendations:', 20, yPos);
                doc.setFont(undefined, 'normal');
                
                yPos += 10;
                
                for (const [key, value] of Object.entries(dynamicRecs)) {
                    if (yPos > 250) {
                        doc.addPage();
                        yPos = 20;
                    }
                    
                    const dynamicText = doc.splitTextToSize(`${key}: ${value}`, 170);
                    doc.text(dynamicText, 20, yPos);
                    yPos += dynamicText.length * 7;
                }
                
                yPos += 10; // Add extra space after dynamic recommendations
            }
        });
    }

    // Save the PDF
    doc.save('PCI_DSS_Compliance_Report.pdf');
}

// Make the function globally available
window.generatePDF = generatePDF; 