$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$pidFile = Join-Path $repoRoot ".sion-server.pid"

if (-not (Test-Path $pidFile)) {
    Write-Host "No Sion server PID file was found. Nothing to stop." -ForegroundColor Yellow
    exit 0
}

$serverPid = Get-Content -LiteralPath $pidFile -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $serverPid) {
    Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
    Write-Host "Removed an empty Sion server PID file." -ForegroundColor Yellow
    exit 0
}

$process = Get-Process -Id ([int]$serverPid) -ErrorAction SilentlyContinue
if ($process) {
    Stop-Process -Id $process.Id -Force
    Write-Host "Stopped Sion server process $($process.Id)." -ForegroundColor Green
}
else {
    Write-Host "Sion server process $serverPid was already stopped." -ForegroundColor Yellow
}

Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
