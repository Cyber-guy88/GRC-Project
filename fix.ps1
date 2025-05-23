$htmlFiles = Get-ChildItem -Path . -Filter "*.html"
foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $content = $content -replace '<link rel="stylesheet" href="css/https://', '<link rel="stylesheet" href="https://'
    Set-Content -Path $file.FullName -Value $content
    Write-Host "Fixed external links in $($file.Name)"
}
Write-Host "External links fixed successfully."
