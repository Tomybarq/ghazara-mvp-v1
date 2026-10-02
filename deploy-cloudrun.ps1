<#
.SYNOPSIS
    Deploy Ghazara Website to Google Cloud Run with cold-start & concurrency optimizations.
.EXAMPLE
    .\deploy-cloudrun.ps1 -ProjectId "ghazara-production" -Region "me-central1"
#>

[CmdletBinding()]
param (
    [string]$ProjectId = "ghazara-production",
    [string]$Region = "me-central1",
    [string]$ServiceName = "ghazara-website"
)

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "🚀 Ghazara Platform — Google Cloud Run Deployment" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Project ID:   $ProjectId" -ForegroundColor Yellow
Write-Host "Region:       $Region" -ForegroundColor Yellow
Write-Host "Service Name: $ServiceName" -ForegroundColor Yellow
Write-Host "----------------------------------------------------------"

# Check if gcloud is installed
if (-not (Get-Command "gcloud" -ErrorAction SilentlyContinue)) {
    Write-Error "gcloud CLI is not installed or not in PATH. Please install Google Cloud SDK: https://cloud.google.com/sdk/docs/install"
    exit 1
}

Write-Host "[1/4] Setting active Google Cloud Project..." -ForegroundColor Green
gcloud config set project $ProjectId

Write-Host "[2/4] Ensuring required GCP APIs are enabled..." -ForegroundColor Green
gcloud services enable run.googleapis.com cloudbuild.googleapis.com containerregistry.googleapis.com

Write-Host "[3/4] Building container and deploying to Cloud Run..." -ForegroundColor Green
gcloud run deploy $ServiceName `
    --source . `
    --region $Region `
    --platform managed `
    --allow-unauthenticated `
    --port 8080 `
    --memory 512Mi `
    --cpu 1 `
    --concurrency 80 `
    --cpu-boost `
    --min-instances 0 `
    --max-instances 10 `
    --set-env-vars="NODE_ENV=production,PORT=8080,GOOGLE_CLIENT_ID=524920390434-f89r381evd9759c5pjs1656kjlr8qftv.apps.googleusercontent.com,GOOGLE_CLIENT_SECRET=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,JWT_SECRET=ghazara_secure_jwt_secret_key_2026_growth_axis,OAUTH_SERVER_URL=https://accounts.google.com"

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "✅ Deployment Complete! Checking service URL..." -ForegroundColor Green
$ServiceUrl = (gcloud run services describe $ServiceName --region $Region --format "value(status.url)")
Write-Host "Live Cloud Run URL: $ServiceUrl" -ForegroundColor Cyan
Write-Host "Health Check:       $ServiceUrl/health" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Green
