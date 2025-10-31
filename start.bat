@echo off
echo ========================================
echo Starting AI Skill Gap Analyzer
echo ========================================
echo.

echo Starting Backend...
start cmd /k "cd backend && venv\Scripts\activate && python main.py"

timeout /t 3 /nobreak > nul

echo Starting Frontend...
start cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Application is starting!
echo ========================================
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to stop all services...
pause > nul

echo Stopping services...
taskkill /FI "WindowTitle eq *backend*" /F
taskkill /FI "WindowTitle eq *frontend*" /F
