# scripts/start_dev.ps1

Set-Location "$PSScriptRoot/.."

# Start database in the background
.\scripts\db\start.ps1

# Start backend in a new PowerShell window
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-ExecutionPolicy", "Bypass",
    "-File", ".\scripts\backend\start.ps1"
)

# Start frontend in a new PowerShell window
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-ExecutionPolicy", "Bypass",
    "-File", ".\scripts\frontend\start.ps1"
)