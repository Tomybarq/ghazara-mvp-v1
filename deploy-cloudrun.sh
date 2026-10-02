#!/usr/bin/env bash
# ==============================================================================
# Deploy Ghazara Website to Google Cloud Run with cold-start & concurrency optimizations
# ==============================================================================
set -e

PROJECT_ID="${1:-ghazara-production}"
REGION="${2:-me-central1}"
SERVICE_NAME="${3:-ghazara-website}"

echo "=========================================================="
echo "🚀 Ghazara Platform — Google Cloud Run Deployment"
echo "=========================================================="
echo "Project ID:   ${PROJECT_ID}"
echo "Region:       ${REGION}"
echo "Service Name: ${SERVICE_NAME}"
echo "----------------------------------------------------------"

if ! command -v gcloud &> /dev/null; then
    echo "ERROR: gcloud CLI is not installed or not in PATH."
    echo "Install Google Cloud SDK from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

echo "[1/4] Setting active Google Cloud Project..."
gcloud config set project "${PROJECT_ID}"

echo "[2/4] Ensuring required GCP APIs are enabled..."
gcloud services enable run.googleapis.com \
                       cloudbuild.googleapis.com \
                       containerregistry.googleapis.com

echo "[3/4] Building container and deploying to Cloud Run..."
gcloud run deploy "${SERVICE_NAME}" \
    --source . \
    --region "${REGION}" \
    --platform managed \
    --allow-unauthenticated \
    --port 8080 \
    --memory 512Mi \
    --cpu 1 \
    --concurrency 80 \
    --cpu-boost \
    --min-instances 0 \
    --max-instances 10 \
    --set-env-vars="NODE_ENV=production,PORT=8080,GOOGLE_CLIENT_ID=524920390434-f89r381evd9759c5pjs1656kjlr8qftv.apps.googleusercontent.com,GOOGLE_CLIENT_SECRET=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,JWT_SECRET=ghazara_secure_jwt_secret_key_2026_growth_axis,OAUTH_SERVER_URL=https://accounts.google.com"

echo "=========================================================="
echo "✅ Deployment Complete! Checking service URL..."
SERVICE_URL=$(gcloud run services describe "${SERVICE_NAME}" --region "${REGION}" --format "value(status.url)")
echo "Live Cloud Run URL: ${SERVICE_URL}"
echo "Health Check:       ${SERVICE_URL}/health"
echo "=========================================================="
