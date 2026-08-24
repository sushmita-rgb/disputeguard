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

### 4. Frontend Setup
```bash
cd client
npm install
npm run dev       # Launches React dashboard on http://localhost:3000
```

---

## 📡 API Reference (`server/routes/disputes.js`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/health` | System status & Gemini/RocketRide status check |
| **GET** | `/api/disputes` | List all active chargeback cases with search & status filters |
| **GET** | `/api/disputes/:id` | Retrieve single dispute details & evidence proof |
| **POST** | `/api/disputes/:id/defend` | Trigger RocketRide pipeline & Gemini LLM defense generation |
| **PUT** | `/api/disputes/:id` | Update edited defense letter draft or status |
| **POST** | `/api/disputes/:id/submit` | Human-in-the-loop 1-click submit to acquiring bank network |
| **POST** | `/api/disputes/batch` | Ingest multiple dispute cases in bulk |

---

## 🛡️ Seeded Dispute Test Cases

ChargeGuard AI comes pre-loaded with 5 realistic dispute scenarios covering major chargeback reason codes:

1. **`DISP-892041` (Reason 10.4 - Fraud)**: UltraBook purchase with AVS/CVV match, FedEx signature delivery proof, and IP geolocation verification.
2. **`DISP-402918` (Reason 13.1 - Item Not Received)**: Executive Task Chair shipment with UPS dock receipt signature and GPS delivery logs.
3. **`DISP-118492` (Reason 10.4 - Unrecognized Charge)**: Enterprise SaaS annual subscription with OAuth2 login logs and 142 active session audits.
4. **`DISP-559382` (Reason 13.6 - Credit Not Processed)**: Camping tent purchase with partial refund credit transaction reference (ARN).
5. **`DISP-992015` (Reason 13.2 - Service Not Rendered)**: FinTech event VIP sponsorship with venue QR badge scan audit records.

---

## 🏆 Key Features & Highlights

- **RocketRide Pipeline Integration**: Standardized pipeline file (`pipelines/dispute_defense.pipe`) defining data lanes and Gemini LLM nodes.
- **Google Gemini 1.5 Engine**: Specialized card network representment prompts producing Visa CE3.0 compliant rebuttal briefs.
- **Side-by-Side Inspector**: Dual-pane modal allowing human risk analysts to inspect evidence proofs alongside editable AI briefs.
- **Human-in-the-Loop Action Bar**: One-click approval and submission workflow ensuring complete human governance before bank transmission.
- **Batch Multi-Case Ingestion**: Ingest multi-case JSON payloads to demonstrate high-throughput automated processing.
