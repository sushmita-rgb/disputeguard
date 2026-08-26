# ChargeGuard AI 🛡️⚡
> **RocketRide Buildathon — Problem Statement #1: Chargeback Defender**  
> Autonomous Chargeback Defense & Representment Automation Engine powered by **Google Gemini 1.5**, **RocketRide Pipelines**, and **MERN Stack**.

---

## 🌟 Overview

**ChargeGuard AI** empowers merchants, payment acquirers, and card processors to automatically contest fraudulent chargebacks with high-win representment defense packages.

By ingesting multi-source transaction evidence—including carrier delivery confirmations, digital signatures, customer IP geolocation matches, AVS/CVV authorization logs, and electronic Terms of Service consent timestamps—ChargeGuard AI evaluates card network rules (**Visa Compelling Evidence 3.0** and **Mastercard Revised Fraud Rules**) to:
1. Compute a numerical **Win Probability Score** (0-100%).
2. Extract key evidence highlights matching card brand rules.
3. Draft acquirer-compliant **Representment Defense Letters**.
4. Offer a **Human-in-the-Loop 1-Click Submission Dashboard** for risk teams.

---

## 🎯 Motivation & Use Cases

### Why We Created This Project
Every year, e-commerce merchants lose billions of dollars to **"friendly fraud"**—instances where cardholders purchase goods or services, successfully receive them, and then file fraudulent disputes claiming unauthorized transactions or non-delivery. 

Manually defending these disputes is an operational bottleneck:
1. **Evidence Isolation**: Gathering evidence requires manually extracting data from carrier databases, web traffic firewalls, CRM logs, and card authorization histories.
2. **Rule Matrix Complexity**: Payment card networks constantly update representment rules. For instance, **Visa Compelling Evidence (CE) 3.0** guidelines specify that merchants must verify prior undisputed transaction histories on the same card.
3. **Response Speed**: Chargeback operations teams spend valuable hours writing custom representment letters, often missing tight bank response deadlines.

Defendr/ChargeGuard AI was created to automate the compilation, analysis, scoring, and representment generation into a seamless **2-second automated flow** powered by AI.

### Key Use Cases
- **E-Commerce Physical Delivery Verification**: Connects tracking details (e.g., FedEx, UPS Priority) to AVS/CVV authorization logs.
- **Digital SaaS Subscription Audits**: Extracts login logs, active session audits, and electronic clickwrap agreement timestamps to verify recurring subscription validity.
- **Enterprise Bulk Dispute Management**: High-volume ingestion of multi-case JSON payloads to automate scaling risk queues for marketplaces.

---

## 📐 Architecture & RocketRide Pipeline Flow

```
                                  ┌──────────────────────────────────────────────┐
                                  │   Dispute Evidence Ingestion (JSON/DB/API)   │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                                         ▼
                                  ┌──────────────────────────────────────────────┐
                                  │   RocketRide Pipeline: dispute_defense.pipe   │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                    ┌────────────────────┴────────────────────┐
                                    ▼                                         ▼
                        ┌──────────────────────┐                  ┌──────────────────────┐
                        │ Evidence Data Lanes  │                  │  Google Gemini 1.5   │
                        │ (IP/TOS/Carrier/AVS) │                  │ LLM Synthesis Node   │
                        └──────────┬───────────┘                  └──────────┬───────────┘
                                   │                                         │
                                   └────────────────────┬────────────────────┘
                                                        │
                                                        ▼
                                  ┌──────────────────────────────────────────────┐
                                  │  Representment Defense Package Generation   │
                                  │  - Win Score (0-100)                         │
                                  │  - Acquirer Defense Letter                   │
                                  │  - Rule Match Summary Highlights             │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                                         ▼
                                  ┌──────────────────────────────────────────────┐
                                  │ Side-by-Side Human-in-the-Loop Review Modal  │
                                  │  [Edit Letter]  [Approve & Submit to Bank]   │
                                  └──────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
hack2/
├── pipelines/
│   └── dispute_defense.pipe       # RocketRide Pipeline JSON Definition
├── server/
│   ├── index.js                   # Express server entry point & fallback store
│   ├── seed.js                    # Database seed script (5 realistic cases)
│   ├── package.json               # Backend dependencies (@google/generative-ai, express, mongoose)
│   ├── models/
│   │   └── Dispute.js             # Mongoose schema for Dispute cases
│   ├── routes/
│   │   └── disputes.js            # Express API endpoints
│   └── services/
│       ├── geminiDefenseService.js # Google Gemini LLM representment generator & fallback
│       └── rocketrideService.js    # RocketRide pipeline wrapper service
├── client/
│   ├── index.html                 # HTML shell with Google Fonts (Outfit, Inter)
│   ├── vite.config.js             # Vite configuration & backend proxy
│   ├── src/
│   │   ├── index.css              # Dark mode glassmorphism UI design system
│   │   ├── App.jsx                # Main React dashboard controller
│   │   └── components/
│   │       ├── Header.jsx         # App header & pipeline status badges
│   │       ├── StatsOverview.jsx  # Metric cards (Dispute volume, win rates)
│   │       ├── DisputeTable.jsx   # Filterable disputes table
│   │       ├── SideBySideReviewModal.jsx # Dual-pane review & editing modal
│   │       └── BatchUploadModal.jsx      # Multi-case ingestion dropzone
├── .env.example                   # Environment configuration template
└── README.md                      # Documentation
```

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ and **npm**
- *(Optional)* Local MongoDB instance running on `mongodb://localhost:27017` *(If MongoDB is offline, ChargeGuard automatically runs in high-performance In-Memory mode)*
- *(Optional)* Google Gemini API Key set in `.env`

### 2. Environment Configuration
Copy `.env.example` to `.env` in the root directory (and/or `server/.env`):
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/chargeguard
GEMINI_API_KEY=your_gemini_api_key_here
ROCKETRIDE_URI=ws://localhost:5565
ROCKETRIDE_APIKEY=local
```

### 3. Backend Setup
```bash
cd server
npm install
npm run seed      # Seeds 5 realistic dispute test cases (Fraud, Item Not Received, etc.)
npm start         # Starts backend API on http://localhost:5000
```

### 4. Frontend Setup (Standalone)
```bash
cd client
npm install
npm run dev       # Launches Vite React dashboard on http://localhost:3000
```

### 5. Defendr UI Micro-frontend Setup (RocketRide App Integration)
The application compiles into an isolated Module Federation remote loaded by the RocketRide App Builder platform:
```bash
cd apps/defendr-ui
pnpm install
pnpm run dev      # Launches local MFE remote server on http://localhost:3580 / http://localhost:3581
```

To run and package inside the App Builder:
1. Open the `.rrapp` builder file inside the workspace shell.
2. Select the **Package** tab to configure MFE manifest packaging rules.
3. Access the **Deploy** tab to publish to RocketRide staging cloud.

---

## 🚀 Deployed Staging Cloud & App Platform Integration

Defendr is integrated with **RocketRide Cloud staging (`https://staging.rocketride.ai`)** under the MFE app ID `sushmita_dev.defendr`.

To ensure optimal operations when loaded in the sandboxed cloud shell, we implemented the following container-focused architectural safeguards:
1. **Dynamic Tailwind Inlining**:
   Rsbuild compiles and inlines Tailwind CSS stylesheet rules directly inside the exposed Javascript bundle (`injectStyles: true`), resolving asset 404s when loading the CSS resources remotely.
2. **Branding Integrity (Inline SVG Logos)**:
   Replaced all relative icon/logo file calls with 100% inline SVG vector layouts to prevent broken logo images due to origin mismatches in the micro-frontend shell environment.
3. **Local Storage Hybrid State Engine**:
   When network proxy calls fail or staging services respond with Access Denied, the app degrades gracefully into secure client-side sandbox mode, loading dispute data from `localStorage` fallbacks so all main workflows operate correctly with zero server-side exceptions.

---

## 🛠️ Walkthrough & Usage Steps

Here is the step-by-step user flow demonstrating the capabilities of Defendr:

### Step 1: Demo Sandbox Authentication
- When the dashboard is accessed, a premium animated Intro Splash Screen loads.
- If not authenticated, the onboarding screen is presented. Click the **Demo Login** button to authenticate cleanly.
- The app bypasses external network validations and registers a local session token `demo_token_authenticated`.

### Step 2: Dashboard Overview & KPIs
- The merchant main dashboard renders 4 core metrics (Total Disputed Volume, Pending Review cases, Average Gemini Win Probability score, and Submitted Representments) in a wide, high-contrast, responsive grid.
- A filterable queue table renders active disputes.

### Step 3: Simulating Dispute Ingestion (Stripe Webhook)
- Click the **Simulate Stripe Dispute** action in the header.
- The simulator mimics a live payment gateway callback, injecting a new $520.00 chargeback (`DIS-2026-6292`) into local storage.
- A success toast is displayed, and the metrics are updated.

### Step 4: AI Rebuttal Defense Synthesis
- Find a case marked as `Pending Review` (e.g. `DIS-2024-001`) and click **AI Defend**.
- An active loader displays while Gemini AI constructs the representment package, matching network rules (such as AVS matches, FedEx tracking details, or clickwrap agreements) and calculating the Win Probability.

### Step 5: Side-by-Side Representment Review
- Click **Review & Edit** on the defended dispute.
- The inspect modal displays evidence details (Carrier signature tracking, billing footprint, IP address check) on the left, alongside the editable Gemini Defense Letter brief on the right.
- You can edit the text and click **Save Draft**.

### Step 6: Bank Representment Submission
- Click **Submit to Bank** inside the review modal.
- The status changes to `'SUBMITTED TO BANK'`, indicating the representation is transmitting to card processors.

### Step 7: Batch Case Ingestion
- Click **Batch Ingest** in the header.
- Paste multiple case JSON strings into the console and submit to demonstrate automated processing.

