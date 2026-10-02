# 🚀 Ghazara Website Deployment & Operations Guide
## Google Cloud Run • Cloud Build • Hostinger DNS (`ghazara.net`) • Google OAuth • Health & Monitoring

This document provides the definitive guide for building, containerizing, deploying, and maintaining **Ghazara for Trading & Marketing (مؤسسة غزارة للتجارة والتسويق)** live on **Google Cloud Run**, mapped to custom domain **`ghazara.net`** on **Hostinger DNS**, configured with business email **`info@ghazara.net`**, and verified under the **Google Cloud Console OAuth Consent Screen**.

---

## 🏗️ Architecture Overview

- **Frontend Client:** React 19 + TypeScript + Vite + Tailwind CSS (Bilingual Arabic RTL / English LTR)
- **Backend API:** Node.js 20 + Express + tRPC v11 + Drizzle ORM
- **Container Runtime:** Google Cloud Run (Serverless Container in `me-central1` or `us-central1`)
- **Automated CI/CD:** Google Cloud Build (`cloudbuild.yaml`) / GitHub Actions
- **Custom Domain:** `https://ghazara.net` & `https://www.ghazara.net` (Hostinger DNS Zone)
- **Health Check Endpoint:** `GET /health` & `GET /api/health`

---

## 📋 Part 1: Quick Deployment to Google Cloud Run

### Option A: One-Command CLI Deployment (Recommended)

Using **Google Cloud SDK (`gcloud`)**:

```bash
# 1. Authenticate with your Google Account
gcloud auth login ghazaranet@gmail.com

# 2. Select or create your Google Cloud Project
gcloud projects create ghazara-production --name="Ghazara Platform"
gcloud config set project ghazara-production

# 3. Enable necessary Google Cloud APIs
gcloud services enable run.googleapis.com \
                       cloudbuild.googleapis.com \
                       containerregistry.googleapis.com

# 4. Deploy directly from source with high-performance configurations:
gcloud run deploy ghazara-website \
  --source . \
  --region me-central1 \
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
```

*(Note: If `me-central1` (Saudi Arabia / Dammam) is not available on your billing account, use `us-central1` or `europe-west1`)*.

### Option B: Automated Google Cloud Build Pipeline

Submit the build using `cloudbuild.yaml`:
```bash
gcloud builds submit --config=cloudbuild.yaml .
```

---

## 🌐 Part 2: Custom Domain Mapping on Google Cloud & Hostinger DNS

### Step 1: Add Custom Domain Mapping in Google Cloud Console
1. Open **Google Cloud Console** → **Cloud Run** → Select `ghazara-website`.
2. Click **Manage Custom Domains** (or **Integrations** → **Custom Domains**).
3. Click **Add Mapping** → Select Service `ghazara-website`.
4. Enter your domain: `ghazara.net` and `www.ghazara.net`.
5. Google Cloud will provide you with **DNS Records** (A records / AAAA records or CNAME `ghs.googlehosted.com`).

---

### Step 2: Configure Hostinger DNS Zone Editor for `ghazara.net`
Log in to **Hostinger hPanel** → **Domains** → Select **`ghazara.net`** → **DNS / Nameservers**:

#### A. Website Routing Records (Point to Google Cloud):
| Type | Name / Host | Points to / Value | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `216.239.32.21` *(Google Hosted IP 1)* | `300` |
| **A** | `@` | `216.239.34.21` *(Google Hosted IP 2)* | `300` |
| **A** | `@` | `216.239.36.21` *(Google Hosted IP 3)* | `300` |
| **A** | `@` | `216.239.38.21` *(Google Hosted IP 4)* | `300` |
| **CNAME** | `www` | `ghs.googlehosted.com` | `300` |

---

## 📧 Part 3: Business Email Setup for `info@ghazara.net`

To activate **`info@ghazara.net`** on Hostinger Titan Mail (or Google Workspace) with 100% email inbox delivery without spam flags:

### 1. MX Records (Hostinger Email)
| Type | Name / Host | Priority | Points to / Value | TTL |
| :--- | :--- | :---: | :--- | :--- |
| **MX** | `@` | `10` | `mx1.titan.email` | `3600` |
| **MX** | `@` | `20` | `mx2.titan.email` | `3600` |

### 2. SPF Record (Anti-Spoofing & Deliverability)
| Type | Name / Host | Value | TTL |
| :--- | :--- | :--- | :--- |
| **TXT** | `@` | `v=spf1 include:spf.titan.email ~all` | `3600` |

### 3. DMARC Security Record
| Type | Name / Host | Value | TTL |
| :--- | :--- | :--- | :--- |
| **TXT** | `_dmarc` | `v=DMARC1; p=none; rua=mailto:info@ghazara.net` | `3600` |

---

## 🔒 Part 4: Google Cloud Console OAuth Consent Screen Setup

To verify your Google Cloud OAuth app for **`ghazaranet@gmail.com`**:

1. Open [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials/consent).
2. Select your Project (e.g., `Ghazara Platform`).
3. Under **OAuth consent screen**:
   - **User Type:** `External`
   - **App Name:** `غزارة للتجارة والتسويق - Ghazara for Trading & Marketing`
   - **User Support Email:** `info@ghazara.net` (or `ghazaranet@gmail.com`)
   - **App Logo:** Upload `/branding/ghazara-logo.png`
   - **Application Home Page:** `https://ghazara.net`
   - **Application Privacy Policy Link:** `https://ghazara.net/privacy`
   - **Application Terms of Service Link:** `https://ghazara.net/terms`
   - **Authorized Domains:** `ghazara.net`
   - **Developer Contact Information:** `info@ghazara.net` / `ghazaranet@gmail.com`

4. Under **Scopes**:
   - Add non-sensitive scopes: `.../auth/userinfo.email`, `.../auth/userinfo.profile`, `openid`.

5. Under **Credentials** → **OAuth 2.0 Client IDs** (your Client ID `524920390434-f89r381evd9759c5pjs1656kjlr8qftv`):
   - **Authorized JavaScript Origins:**
     - `https://ghazara.net`
     - `https://www.ghazara.net`
     - `http://localhost:3000`
   - **Authorized Redirect URIs:**
     - `https://ghazara.net/api/oauth/callback`
     - `https://www.ghazara.net/api/oauth/callback`
     - `http://localhost:3000/api/oauth/callback`

---

## 🔍 Verification & Health Checking

Test your deployed service using curl or browser:

```bash
# Health Check Endpoint
curl -s https://ghazara.net/health
# Expected Output: {"status":"ok","service":"ghazara-website","timestamp":"...","uptime":...}

# tRPC System Health Check
curl -s "https://ghazara.net/api/trpc/system.health?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%7D%7D"

# Robots.txt Verification
curl -s https://ghazara.net/robots.txt

# Sitemap Verification
curl -s https://ghazara.net/sitemap.xml
```
