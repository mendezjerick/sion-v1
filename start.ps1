param(
    [int]$Port = 4173,
    [switch]$OpenBrowser,
    [string]$PythonPath,
    [switch]$SkipDependencies,
    [switch]$IncludeYolo
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$pidFile = Join-Path $repoRoot ".sion-server.pid"
$logDir = Join-Path $repoRoot ".sion-server"
$outLog = Join-Path $logDir "server.out.log"
$errLog = Join-Path $logDir "server.err.log"
$venvDir = Join-Path $repoRoot ".venv"
$venvPython = Join-Path $venvDir "Scripts\python.exe"
$requirements = Join-Path $repoRoot "requirements.txt"
$requirementsYolo = Join-Path $repoRoot "requirements-yolo.txt"
$dependencyStamp = Join-Path $logDir "dependencies.hash"
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

if (-not $SkipDependencies) {
    if (-not (Test-Path $venvPython)) {
        Write-Host "Creating the local Python environment..." -ForegroundColor Cyan
        & $pythonPath -m venv $venvDir
        if ($LASTEXITCODE -ne 0 -or -not (Test-Path $venvPython)) {
            throw "Could not create the local Python environment at $venvDir"
        }
    }

    $requirementsToInstall = @($requirements)
    if ($IncludeYolo) { $requirementsToInstall += $requirementsYolo }
    $requirementsHash = (($requirementsToInstall | ForEach-Object { (Get-FileHash -LiteralPath $_ -Algorithm SHA256).Hash }) -join "|")
    $installedHash = if (Test-Path $dependencyStamp) { Get-Content -LiteralPath $dependencyStamp -Raw } else { "" }

    if ($requirementsHash -ne $installedHash.Trim()) {
        Write-Host "Installing computer-vision dependencies..." -ForegroundColor Cyan
        & $venvPython -m pip install --upgrade pip
        if ($LASTEXITCODE -ne 0) { throw "Could not upgrade pip in the local environment." }
        & $venvPython -m pip install -r $requirements
        if ($LASTEXITCODE -ne 0) { throw "Core dependency installation failed. Re-run with -SkipDependencies to open the browser-only UI." }
        if ($IncludeYolo) {
            & $venvPython -m pip install -r $requirementsYolo
            if ($LASTEXITCODE -ne 0) { throw "YOLO dependency installation failed. Re-run without -IncludeYolo for the core lab workspace." }
        }
        Set-Content -LiteralPath $dependencyStamp -Value $requirementsHash -Encoding ascii
    }
    $pythonPath = $venvPython
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
