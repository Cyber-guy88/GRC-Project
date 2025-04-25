$htmlFiles = Get-ChildItem -Path . -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Update the CSS file paths
    $updatedContent = $content -replace '<link rel="stylesheet" href="([^"]+)\.css"', '<link rel="stylesheet" href="css/$1.css"'
    
    # Save the updated content back to the file
    Set-Content -Path $file.FullName -Value $updatedContent
    
    Write-Host "Updated $($file.Name)"
}

Write-Host "All HTML files have been updated." 