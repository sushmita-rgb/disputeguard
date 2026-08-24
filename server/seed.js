const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const Dispute = require('./models/Dispute');
const { memoryStore } = require('./routes/disputes');
const { generateDefensePackage } = require('./services/geminiDefenseService');

const seedDisputes = [
  {
    disputeId: 'DISP-892041',
    amount: 1299.99,
    currency: 'USD',
    reasonCode: '10.4',
    reasonCategory: 'FRAUD',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.vance@techcorp.io',
    chargebackDate: new Date('2026-08-20'),
    status: 'PENDING_REVIEW',
    evidenceData: {
      orderId: 'ORD-993821',
      orderDate: '2026-08-12 14:22:04 UTC',
      itemDescription: 'UltraBook Pro 16" M3 - 32GB RAM / 1TB SSD',
      billingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
      shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
      carrier: 'FedEx Express Direct',
      trackingNumber: '772940219482',
      deliveryDate: '2026-08-14 11:45:00 UTC',
      customerIp: '198.51.100.42 (AVS Zip Match: 97477)',
      tosAcceptedAt: '2026-08-12 14:21:58 UTC',
      digitalSignature: 'SIG_M_VANCE_SECURE_TOKEN_99382',
      additionalLogs: [
        'AVS Result: Y (Street & 9-Digit Zip Match)',
        'CVV Result: M (Match)',
        '2FA SMS Challenge: PASSED (+1 541-555-0199)',
        'Carrier Proof of Delivery: Signed by M. Vance'
      ]
    }
  },
  {
    disputeId: 'DISP-402918',
    amount: 449.50,
    currency: 'USD',
    reasonCode: '13.1',
    reasonCategory: 'ITEM_NOT_RECEIVED',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@designlab.co',
    chargebackDate: new Date('2026-08-18'),
    status: 'APPROVED',
    evidenceData: {
      orderId: 'ORD-882014',
      orderDate: '2026-08-05 09:15:30 UTC',
      itemDescription: 'Ergonomic Executive Mesh Task Chair - Slate Gray',
      billingAddress: '100 Montgomery St Suite 1200, San Francisco, CA 94104',
      shippingAddress: '100 Montgomery St Suite 1200, San Francisco, CA 94104',
      carrier: 'UPS Ground Signature Required',
      trackingNumber: '1Z9999999999999999',
      deliveryDate: '2026-08-08 15:30:12 UTC',
      customerIp: '203.0.113.195 (San Francisco, CA)',
      tosAcceptedAt: '2026-08-05 09:14:50 UTC',
      digitalSignature: 'UPS_DOCK_RECEIPT_STAMPED_E_ROSTOVA',
      additionalLogs: [
        'UPS GPS Coordinates at Delivery: 37.7909° N, 122.4014° W',
        'Dock Reception Signee: E. Rostova',
        'Customer Support Chat Log: Confirmation of delivery acknowledgment on Aug 9'
      ]
    }
  },
  {
    disputeId: 'DISP-118492',
    amount: 199.00,
    currency: 'USD',
    reasonCode: '10.4',
    reasonCategory: 'UNRECOGNIZED',
    customerName: 'David K. Chen',
    customerEmail: 'dchen@innovate.net',
    chargebackDate: new Date('2026-08-22'),
    status: 'PENDING_REVIEW',
    evidenceData: {
      orderId: 'ORD-771029',
      orderDate: '2026-08-01 00:01:10 UTC',
      itemDescription: 'Enterprise Cloud Security Annual Subscription Tier 2',
      billingAddress: '450 Lexington Ave, New York, NY 10017',
      shippingAddress: 'N/A (Digital SaaS)',
      carrier: 'Instant Digital Delivery / Cloud Access API',
      trackingNumber: 'SaaS-LIC-KEY-NYC-771029',
      deliveryDate: '2026-08-01 00:01:12 UTC',
      customerIp: '198.51.100.88 (New York, NY)',
      tosAcceptedAt: '2026-08-01 00:00:55 UTC',
      digitalSignature: 'OAUTH2_GOOGLE_SSO_DCHEN_NY',
      additionalLogs: [
        'User Login Session Count post-purchase: 142 sessions',
        'Data Export Activity Log: 12GB exported on Aug 15',
        'Renewal Reminder Email Opened: Aug 25 08:00 UTC'
      ]
    }
  },
  {
    disputeId: 'DISP-559382',
    amount: 780.00,
    currency: 'USD',
    reasonCode: '13.6',
    reasonCategory: 'CREDIT_NOT_PROCESSED',
    customerName: 'Sarah Jenkins',
    customerEmail: 's.jenkins@outdoors.com',
    chargebackDate: new Date('2026-08-15'),
    status: 'SUBMITTED',
    evidenceData: {
      orderId: 'ORD-662910',
      orderDate: '2026-07-20 18:40:00 UTC',
      itemDescription: 'All-Weather Expedition 4-Person Camping Tent',
      billingAddress: '1200 Pine St, Boulder, CO 80302',
      shippingAddress: '1200 Pine St, Boulder, CO 80302',
      carrier: 'DHL Express',
      trackingNumber: 'DHL-98402819',
      deliveryDate: '2026-07-23 14:10:00 UTC',
      customerIp: '74.125.18.30 (Boulder, CO)',
      tosAcceptedAt: '2026-07-20 18:39:15 UTC',
      digitalSignature: 'S_JENKINS_BOULDER_PASS',
      additionalLogs: [
        'Partial Refund Processed: $150.00 Credit applied on Aug 2 (ARN: 749302819028)',
        'Merchant Return Policy: Final Sale after 14 days',
        'Return Authorization Status: Item was kept by customer'
      ]
    }
  },
  {
    disputeId: 'DISP-992015',
    amount: 2450.00,
    currency: 'USD',
    reasonCode: '13.2',
    reasonCategory: 'SERVICE_NOT_RENDERED',
    customerName: 'Global FinTech Summit LLC',
    customerEmail: 'events@fintechsummit.io',
    chargebackDate: new Date('2026-08-23'),
    status: 'PENDING_REVIEW',
    evidenceData: {
      orderId: 'ORD-554109',
      orderDate: '2026-07-10 11:00:00 UTC',
      itemDescription: 'VIP Sponsorship Package & Keynote Speaker Pass',
      billingAddress: '500 Boylston St, Boston, MA 02116',
      shippingAddress: 'Virtual Event Portal & On-site Badge',
      carrier: 'Badge Pass Ticket Scanner / QR Validation',
      trackingNumber: 'QR-EVENT-VIP-BOSTON-554109',
      deliveryDate: '2026-08-10 09:00:00 UTC',
      customerIp: '66.249.64.10 (Boston, MA)',
      tosAcceptedAt: '2026-07-10 10:58:45 UTC',
      digitalSignature: 'QR_SCAN_ENTRY_GATE_3_VIP_BOSTON',
      additionalLogs: [
        'On-site Badge Scan Audit: Gate 3 Scanned on Aug 10 08:45 EST',
        'VIP Lounge Access Log: 4 Session Check-ins recorded',
        'Exhibitor Directory Listing: Published and live on summit site'
      ]
    }
  }
];

async function seed() {
  console.log('Seeding ChargeGuard AI dispute database...');

  // Generate initial defense packages for seed cases
  for (const caseData of seedDisputes) {
    const defense = await generateDefensePackage(caseData);
    caseData.aiDefenseLetter = defense.aiDefenseLetter;
    caseData.winProbabilityScore = defense.winProbabilityScore;
    caseData.evidenceSummary = defense.evidenceSummary;
  }

  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/chargeguard';

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
    console.log('Connected to MongoDB for seeding');
    await Dispute.deleteMany({});
    await Dispute.insertMany(seedDisputes);
    console.log('Successfully seeded 5 dispute cases into MongoDB!');
    process.exit(0);
  } catch (err) {
    console.warn('MongoDB connection unavailable for seeding. Populating in-memory fallback store:', err.message);
    for (const item of seedDisputes) {
      memoryStore.set(item.disputeId, item);
    }
    console.log(`Successfully populated ${seedDisputes.length} dispute cases in memory store!`);
  }
}

if (require.main === module) {
  seed();
}

module.exports = { seedDisputes };
