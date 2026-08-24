const mongoose = require('mongoose');

const disputeSchema = new mongoose.Schema({
  disputeId: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  reasonCode: {
    type: String,
    required: true
  },
  reasonCategory: {
    type: String,
    enum: ['FRAUD', 'ITEM_NOT_RECEIVED', 'UNRECOGNIZED', 'CREDIT_NOT_PROCESSED', 'SERVICE_NOT_RENDERED'],
    default: 'FRAUD'
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  chargebackDate: {
    type: Date,
    default: Date.now
  },
  evidenceData: {
    orderId: String,
    orderDate: String,
    itemDescription: String,
    billingAddress: String,
    shippingAddress: String,
    carrier: String,
    trackingNumber: String,
    deliveryDate: String,
    customerIp: String,
    tosAcceptedAt: String,
    digitalSignature: String,
    additionalLogs: [String]
  },
  aiDefenseLetter: {
    type: String,
    default: ''
  },
  winProbabilityScore: {
    type: Number,
    default: 0
  },
  evidenceSummary: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    enum: ['PENDING_REVIEW', 'APPROVED', 'SUBMITTED', 'WON', 'LOST'],
    default: 'PENDING_REVIEW'
  },
  submittedAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Dispute', disputeSchema);
