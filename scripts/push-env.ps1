$envFile = Join-Path $PSScriptRoot ".." ".env.local"
$vars = Get-Content $envFile | Where-Object { $_ -match "^\s*[^#]" -and $_ -match "=" }

foreach ($line in $vars) {
    $name, $value = $line -split "=", 2
    $name = $name.Trim()
    $value = $value.Trim()
    Write-Host "Setting $name..."
    $value | vercel env add $name production --force 2>&1
}

Write-Host "Done. Trigger a redeploy: vercel --prod"
