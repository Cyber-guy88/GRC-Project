const fs = require('fs');
const path = require('path');

// Function to create the case study HTML template
function createCaseStudyHTML(title, content) {
    // Extract first line for title if not provided
    if (!title && content) {
        const lines = content.split('\n');
        if (lines.length > 0) {
            title = lines[0].replace(/^\d+\.\s*/, '').replace(/:$/, '').trim();
        }
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | GRC Hub</title>
    <link rel="stylesheet" href="blog-post-style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Top Navigation -->
    <nav class="top-nav">
        <div class="nav-container">
            <div class="nav-left">
                <a href="../home.html" class="logo">
                    <i class="fas fa-shield-alt"></i>
                    <span>GRC Hub</span>
                </a>
            </div>
        </div>
    </nav>

    <div class="blog-container">
        <header class="case-study-header">
            <div class="blog-category">Case Study</div>
            <h1 class="blog-title">${title}</h1>
            <div class="case-study-meta">
                <span><i class="far fa-building"></i> Industry: Security & Compliance</span>
                <span><i class="far fa-calendar"></i> Year: 2023</span>
                <span><i class="fas fa-tag"></i> Type: Security Incident</span>
            </div>
            <a href="../blog.html" class="blog-close" title="Close and return to case studies"></a>
        </header>

        <article class="case-study-content">
            ${formatCaseStudyContent(content)}
        </article>

        <a href="../blog.html" class="back-to-blog">
            <i class="fas fa-arrow-left"></i> Back to Case Studies
        </a>
    </div>
</body>
</html>`;
}

// Function to create the blog post HTML template
function createBlogHTML(title, content) {
    // Extract first line for title if not provided
    if (!title && content) {
        const lines = content.split('\n');
        if (lines.length > 0 && lines[0].includes('title')) {
            title = lines[0].replace(/blog \d+ title\s*:\s*/, '').trim();
        }
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | GRC Hub</title>
    <link rel="stylesheet" href="blog-post-style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Top Navigation -->
    <nav class="top-nav">
        <div class="nav-container">
            <div class="nav-left">
                <a href="../home.html" class="logo">
                    <i class="fas fa-shield-alt"></i>
                    <span>GRC Hub</span>
                </a>
            </div>
        </div>
    </nav>

    <div class="blog-container">
        <header class="blog-header">
            <div class="blog-category">GRC</div>
            <h1 class="blog-title">${title}</h1>
            <div class="blog-meta">
                <span><i class="far fa-calendar"></i> June 15, 2023</span>
                <span><i class="far fa-clock"></i> 8 min read</span>
                <span><i class="far fa-user"></i> By GRC Expert</span>
            </div>
            <a href="../blog.html" class="blog-close" title="Close and return to blog list"></a>
        </header>

        <article class="blog-content">
            ${formatBlogContent(content)}
        </article>

        <a href="../blog.html" class="back-to-blog">
            <i class="fas fa-arrow-left"></i> Back to Blog
        </a>
    </div>
</body>
</html>`;
}

// Function to format case study content
function formatCaseStudyContent(content) {
    if (!content) return '';
    
    // Remove title line (usually the first line)
    let lines = content.split('\n');
    if (lines.length > 0 && (lines[0].includes(':') || /^\d+\./.test(lines[0]))) {
        lines = lines.slice(1);
    }
    
    content = lines.join('\n').trim();
    
    // Replace section headers (lines that end with :)
    content = content.replace(/^([^:\n]+):\s*$/gm, '<h3>$1</h3>');
    
    // Convert paragraphs 
    const paragraphs = content.split('\n\n');
    return paragraphs
        .map(p => {
            p = p.trim();
            if (!p) return '';
            
            // Skip the "For more information" line
            if (p.startsWith('For more information')) {
                // Extract URLs and create reference section
                const urlMatch = p.match(/https?:\/\/[^\s]+/g);
                if (urlMatch && urlMatch.length > 0) {
                    return `<div class="case-study-footer">
                        <h4>References & Additional Resources</h4>
                        <ul>
                            <li><a href="${urlMatch[0]}" target="_blank">${urlMatch[0]}</a></li>
                        </ul>
                    </div>`;
                }
                return '';
            }
            
            // If it's already a heading, don't wrap it
            if (p.startsWith('<h3>')) return p;
            
            // Convert bullet points
            if (p.includes('- ')) {
                const listItems = p.split('\n').map(line => {
                    if (line.trim().startsWith('- ')) {
                        return `<li>${line.replace(/^-\s+/, '')}</li>`;
                    }
                    return line;
                });
                
                // If the first line is not a list item, it's probably a heading for the list
                if (!listItems[0].includes('<li>')) {
                    return `<p>${listItems[0]}</p>\n<ul>${listItems.slice(1).join('\n')}</ul>`;
                }
                
                return `<ul>${listItems.join('\n')}</ul>`;
            }
            
            return `<p>${p}</p>`;
        })
        .join('\n\n');
}

// Function to format blog content
function formatBlogContent(content) {
    if (!content) return '';
    
    // Remove title and data lines
    let lines = content.split('\n');
    let startIndex = 0;
    
    // Skip title and data lines
    while (startIndex < lines.length && 
          (lines[startIndex].includes('title') || 
           lines[startIndex].includes('data') || 
           lines[startIndex].trim() === '')) {
        startIndex++;
    }
    
    content = lines.slice(startIndex).join('\n').trim();
    
    // Replace headers (numeric headers like "1. Title")
    content = content.replace(/^(\d+)\.\s+([^\n]+)$/gm, '<h2>$1. $2</h2>');
    
    // Replace subheaders (titles without numbers, followed by empty line)
    content = content.replace(/^([^:\n]+):\s*$/gm, '<h3>$1</h3>');
    
    // Convert paragraphs 
    const paragraphs = content.split('\n\n');
    return paragraphs
        .map(p => {
            p = p.trim();
            if (!p) return '';
            
            // If it's already a heading, don't wrap it
            if (p.startsWith('<h2>') || p.startsWith('<h3>')) return p;
            
            // Convert bullet points
            if (p.includes('- ') || p.includes('• ')) {
                const listItems = p.split('\n').map(line => {
                    line = line.trim();
                    if (line.startsWith('- ') || line.startsWith('• ')) {
                        return `<li>${line.replace(/^[-•]\s+/, '')}</li>`;
                    }
                    return line;
                });
                
                // If the first line is not a list item, it's probably a heading for the list
                if (!listItems[0].includes('<li>')) {
                    return `<p>${listItems[0]}</p>\n<ul>${listItems.slice(1).join('\n')}</ul>`;
                }
                
                return `<ul>${listItems.join('\n')}</ul>`;
            }
            
            // Handle "Example:" lines (make them italic)
            if (p.startsWith('Example:')) {
                return `<p><em>${p}</em></p>`;
            }
            
            // Handle "Best Practices:" lines
            if (p.startsWith('Best Practices:')) {
                return `<p><strong>${p}</strong></p>`;
            }
            
            // Handle "Key Regulations & Standards:" lines
            if (p.includes('Regulations') || p.includes('Standards') || p.includes('KPIs')) {
                return `<p><strong>${p}</strong></p>`;
            }
            
            return `<p>${p}</p>`;
        })
        .join('\n\n');
}

// Function to process all files
function processAllFiles() {
    const blogDir = __dirname;
    const files = fs.readdirSync(blogDir);
    
    let processed = 0;
    
    files.forEach(file => {
        if (file.endsWith('.html') && 
            !file.includes('update_') && 
            file !== 'blog-post-template.html' && 
            file !== 'case-study-template.html') {
            
            const filePath = path.join(blogDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Skip if file already has proper HTML structure
            if (content.includes('<!DOCTYPE html>')) {
                console.log(`Skipping already formatted file: ${file}`);
                return;
            }
            
            let newContent = '';
            
            if (file.startsWith('case_study')) {
                newContent = createCaseStudyHTML(null, content);
            } else if (file.startsWith('blog')) {
                newContent = createBlogHTML(null, content);
            }
            
            if (newContent) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                processed++;
                console.log(`Updated: ${file}`);
            }
        }
    });
    
    console.log(`Processing complete. Updated ${processed} files.`);
}

// Run the script
processAllFiles(); 