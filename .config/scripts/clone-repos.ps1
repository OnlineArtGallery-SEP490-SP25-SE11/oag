# Định nghĩa repositories
$repositories = @(
   @{
       name = "api"
       url = "https://github.com/OnlineArtGallery-SEP490-SP25-SE11/OAG-BE.git"
       branch = "master"
       envFile = ".env"
   },
   @{
       name = "client"
       url = "https://github.com/OnlineArtGallery-SEP490-SP25-SE11/OAG-FE.git"
       branch = "master"
       envFile = ".env.local"
   },
   @{
       name = "client-admin"
       url = "https://github.com/OnlineArtGallery-SEP490-SP25-SE11/OAG-FE-ADMIN.git"
       branch = "master"
       envFile = ".env.local"
   }
)

# Total repositories for progress bar
$totalRepos = $repositories.Count
$repoIndex = 0

# Header
Write-Host "`n📦 Starting repository setup process..." -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor DarkCyan

foreach ($repo in $repositories) {
   $repoIndex++
   Write-Host "`n🔄 Cloning $($repo.name) from branch $($repo.branch)..." -ForegroundColor Cyan
   
   # Update progress bar
   Write-Progress -PercentComplete (($repoIndex / $totalRepos) * 100) `
                 -Activity "Cloning Repositories" `
                 -Status "Processing $($repo.name) ($repoIndex of $totalRepos)"
   
   if (-not (Test-Path $repo.name)) {
       Write-Host "  📁 Creating directory $($repo.name)..." -ForegroundColor Gray
       New-Item -ItemType Directory -Path $repo.name | Out-Null
   }
   
   try {
       # Clone repository
       $output = git clone -b $repo.branch $repo.url $repo.name 2>&1
       
       if ($LASTEXITCODE -eq 0) {
           Write-Host "  ✅ Successfully cloned $($repo.name)" -ForegroundColor Green
           
           # Create env file
           $envPath = Join-Path $repo.name $repo.envFile
           New-Item -ItemType File -Path $envPath -Force | Out-Null
           Write-Host "  📄 Created $($repo.envFile) successfully" -ForegroundColor Green
           
           # Add separator
           Write-Host "  -----------------------------------" -ForegroundColor DarkGray
       } else {
           Write-Host "  ❌ Failed to clone $($repo.name)" -ForegroundColor Red
           Write-Host "  🔍 Error: $output" -ForegroundColor Red
       }
   }
   catch {
       Write-Host "  ❌ Error occurred while processing $($repo.name)" -ForegroundColor Red
       Write-Host "  🔍 Details: $($_.Exception.Message)" -ForegroundColor Red
   }
}

# Complete progress bar
Write-Progress -Completed -Activity "Cloning Repositories"

# Footer
Write-Host "`n✨ All repositories have been processed successfully!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor DarkCyan
Write-Host "📊 Summary:" -ForegroundColor Yellow
Write-Host "  • Total repositories: $totalRepos" -ForegroundColor Yellow
Write-Host "  • Processed: $repoIndex" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor DarkCyan
Write-Host "🎉 Setup complete! You can now proceed with development.`n" -ForegroundColor Magenta
