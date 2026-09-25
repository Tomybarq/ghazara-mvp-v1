# 🚀 Ghazara Website Deployment & Verification Guide
## Google Cloud Console • Hostinger DNS (`ghazara.net`) • Business Email (`info@ghazara.net`) • Google OAuth

This guide provides the exact configuration steps to deploy **Ghazara for Trading & Marketing (غزارة للتجارة والتسويق)** live to the internet using **Google Cloud**, connect your custom domain **`ghazara.net`** on **Hostinger**, configure business email **`info@ghazara.net`**, and verify your **Google OAuth Consent Screen**.

---

## 📋 Part 1: Google Cloud Deployment (Cloud Run)

Using your Google Account: **`ghazaranet@gmail.com`**

### Step 1: Install & Authenticate Google Cloud CLI
```bash
# 1. Login with your Google account
gcloud auth login ghazaranet@gmail.com

# 2. Create or select your Google Cloud Project
gcloud projects create ghazara-production --name="Ghazara Platform"
gcloud config set project ghazara-production

# 3. Enable necessary Google Cloud APIs
gcloud services enable run.googleapis.com \
                       cloudbuild.googleapis.com \
                       containerregistry.googleapis.com
```

### Step 2: Build & Deploy via Cloud Run
```bash
# Direct deployment from source code with automatic container build:
gcloud run deploy ghazara-website \
  --source . \
  --region me-central1 \
  --allow-unauthenticated \
  --set-env-vars="NODE_ENV=production,PORT=8080,GOOGLE_CLIENT_ID=524920390434-f89r381evd9759c5pjs1656kjlr8qftv.apps.googleusercontent.com,GOOGLE_CLIENT_SECRET=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,JWT_SECRET=ghazara_secure_jwt_secret_key_2026_growth_axis,OAUTH_SERVER_URL=https://accounts.google.com"
```

*(You can also use region `us-central1` or `europe-west1` if desired).*

---

## 🌐 Part 2: Custom Domain Mapping on Google Cloud & Hostinger DNS

### Step 1: Add Custom Domain Mapping in Google Cloud Console
1. Open **Google Cloud Console** → **Cloud Run** → Select `ghazara-website`.
2. Click **Manage Custom Domains** (or **Integrations** → **Domain Mappings**).
3. Click **Add Mapping** → Select Service `ghazara-website`.
4. Enter your domain: `ghazara.net` and `www.ghazara.net`.
5. Google Cloud will provide you with **DNS Records** (A records / AAAA records or CNAME `ghs.googlehosted.com`).

---

### Step 2: Configure Hostinger DNS Zone Editor for `ghazara.net`
Log in to **Hostinger hPanel** → **Domains** → Select **`ghazara.net`** → **DNS / Nameservers**:

#### A. Website Routing Records (Point to Google Cloud):
| Type | Name / Host | Points to / Value | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `216.239.32.21` *(Google Hosted IP 1)* | `300` (or default 14400) |
| **A** | `@` | `216.239.34.21` *(Google Hosted IP 2)* | `300` |
| **A** | `@` | `216.239.36.21` *(Google Hosted IP 3)* | `300` |
| **A** | `@` | `216.239.38.21` *(Google Hosted IP 4)* | `300` |
| **CNAME** | `www` | `ghs.googlehosted.com` | `300` |

---

## 📧 Part 3: Business Email Setup for `info@ghazara.net`

To activate **`info@ghazara.net`** on Hostinger Titan Mail (or Google Workspace) and ensure **100% email inbox delivery** without spam flags:

### 1. MX Records (Hostinger Email)
| Type | Name / Host | Priority | Points to / Value | TTL |
| :--- | :--- | :---: | :--- | :--- |
| **MX** | `@` | `10` | `mx1.titan.email` | `3600` |
| **MX** | `@` | `20` | `mx2.titan.email` | `3600` |

*(If using Google Workspace instead, use `1 ASPMX.L.GOOGLE.COM`, `5 ALT1.ASPMX.L.GOOGLE.COM`, etc.)*

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
2. Select your Project (or create `Ghazara Platform`).
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

## 🌐 Live Website URLs (Production)

| Resource | URL | Purpose |
| :--- | :--- | :--- |
| **Main Website** | `https://ghazara.net` | Homepage & Single-Page Marketing Funnel |
| **Privacy Policy** | `https://ghazara.net/privacy` | Privacy Policy & Google User Data Policy Limited Use |
| **Terms of Service** | `https://ghazara.net/terms` | Public Terms & Conditions |
| **OAuth Callback** | `https://ghazara.net/api/oauth/callback` | OAuth redirect handler |
| **Contact Email** | `info@ghazara.net` | Official corporate email |
