param(
    [int]$Port = 4173,
    [switch]$OpenBrowser,
    [string]$PythonPath
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$pidFile = Join-Path $repoRoot ".sion-server.pid"
$logDir = Join-Path $repoRoot ".sion-server"
$outLog = Join-Path $logDir "server.out.log"
$errLog = Join-Path $logDir "server.err.log"
$url = "http://127.0.0.1:$Port/"

function Test-PortInUse {
    param([int]$CheckPort)

    try {
        return [bool](Get-NetTCPConnection -LocalPort $CheckPort -State Listen -ErrorAction Stop)
    }
    catch {
        return $false
    }
}

if (Test-Path $pidFile) {
    $existingPid = Get-Content -LiteralPath $pidFile -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($existingPid -and (Get-Process -Id ([int]$existingPid) -ErrorAction SilentlyContinue)) {
        Write-Host "Sion is already running at $url" -ForegroundColor Cyan
        if ($OpenBrowser) { Start-Process $url }
        exit 0
    }
    Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
}

if (Test-PortInUse $Port) {
    Write-Host "Port $Port is already in use. Try: .\start.ps1 -Port 4174" -ForegroundColor Yellow
    exit 1
}

New-Item -ItemType Directory -Path $logDir -Force | Out-Null

function Test-PythonExecutable {
    param([string]$Executable, [string[]]$VersionArguments)

    try {
        & $Executable @VersionArguments *> $null
        return $LASTEXITCODE -eq 0
    }
    catch {
        return $false
    }
}

$pythonArgs = @("-m", "http.server", "$Port", "--bind", "127.0.0.1")
if ($PythonPath) {
    if (-not (Test-PythonExecutable $PythonPath @("--version"))) {
        throw "The supplied PythonPath is not a working Python executable: $PythonPath"
    }
}
else {
    $pythonPath = $null
    $pyLauncher = Get-Command py -ErrorAction SilentlyContinue
    if ($pyLauncher -and (Test-PythonExecutable $pyLauncher.Source @("-3", "--version"))) {
        $pythonPath = $pyLauncher.Source
        $pythonArgs = @("-3") + $pythonArgs
    }
    else {
        $pythonCommand = Get-Command python -ErrorAction SilentlyContinue
        if ($pythonCommand -and (Test-PythonExecutable $pythonCommand.Source @("--version"))) {
            $pythonPath = $pythonCommand.Source
        }
    }
    if (-not $pythonPath) {
        throw "Python 3 was not found. Install Python 3, then run this script again. You can also pass -PythonPath with the full path to python.exe."
    }
}

$server = Start-Process `
    -FilePath $pythonPath `
    -ArgumentList $pythonArgs `
    -WorkingDirectory $repoRoot `
    -WindowStyle Hidden `
    -RedirectStandardOutput $outLog `
    -RedirectStandardError $errLog `
    -PassThru

Set-Content -LiteralPath $pidFile -Value $server.Id -Encoding ascii
Start-Sleep -Milliseconds 350

if (-not (Get-Process -Id $server.Id -ErrorAction SilentlyContinue)) {
    Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
    $details = if (Test-Path $errLog) { Get-Content -LiteralPath $errLog -Raw } else { "No server output was captured." }
    throw "Sion could not start.`n$details"
}

Write-Host "Sion is running at $url" -ForegroundColor Green
Write-Host "Stop it with: .\stop.ps1" -ForegroundColor DarkGray
if ($OpenBrowser) { Start-Process $url }
