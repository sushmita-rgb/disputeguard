const express = require('express');
const router = express.Router();
const Dispute = require('../models/Dispute');
const rocketrideService = require('../services/rocketrideService');
const { generateDefensePackage } = require('../services/geminiDefenseService');

// In-Memory store fallback if MongoDB is not connected
const memoryStore = new Map();

/**
 * Helper to query DB or Memory store
 */
async function getDisputeById(id) {
  try {
    const doc = await Dispute.findOne({ disputeId: id });
    if (doc) return { doc, source: 'db' };
  } catch (err) {
    // MongoDB error or offline
  }

  if (memoryStore.has(id)) {
    return { doc: memoryStore.get(id), source: 'memory' };
  }

  return { doc: null, source: null };
}

/**
 * GET /api/disputes - List all cases
 */
router.get('/', async (req, res) => {
  try {
    let disputes = [];
    try {
      disputes = await Dispute.find().sort({ createdAt: -1 });
    } catch (err) {
      console.warn('MongoDB query failed, serving from memory store');
    }

    if (!disputes || disputes.length === 0) {
      disputes = Array.from(memoryStore.values());
    }

    return res.json({
      success: true,
      count: disputes.length,
      data: disputes
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/disputes/:id - Case detail
 */
router.get('/:id', async (req, res) => {
  try {
    const { doc } = await getDisputeById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, error: 'Dispute not found' });
    }
    return res.json({ success: true, data: doc });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/disputes/:id/defend - Trigger Gemini AI / RocketRide defense generation
 */
router.post('/:id/defend', async (req, res) => {
  try {
    const { doc, source } = await getDisputeById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, error: 'Dispute not found' });
    }

    // Execute RocketRide pipeline
    const pipelineRun = await rocketrideService.processDisputePipeline(doc);
    const { aiDefenseLetter, winProbabilityScore, evidenceSummary } = pipelineRun.result;

    doc.aiDefenseLetter = aiDefenseLetter;
    doc.winProbabilityScore = winProbabilityScore;
    doc.evidenceSummary = evidenceSummary;
    if (doc.status === 'PENDING_REVIEW') {
      doc.status = 'PENDING_REVIEW';
    }

    if (source === 'db') {
      await doc.save();
    } else {
      memoryStore.set(doc.disputeId, doc);
    }

    return res.json({
      success: true,
      message: 'Defense letter generated via RocketRide pipeline and Google Gemini',
      pipelineRun,
      data: doc
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * PUT /api/disputes/:id - Update/edit drafted defense letter
 */
router.put('/:id', async (req, res) => {
  try {
    const { doc, source } = await getDisputeById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, error: 'Dispute not found' });
    }

    const { aiDefenseLetter, status, winProbabilityScore } = req.body;
    if (aiDefenseLetter !== undefined) doc.aiDefenseLetter = aiDefenseLetter;
    if (status !== undefined) doc.status = status;
    if (winProbabilityScore !== undefined) doc.winProbabilityScore = winProbabilityScore;

    if (source === 'db') {
      await doc.save();
    } else {
      memoryStore.set(doc.disputeId, doc);
    }

    return res.json({ success: true, message: 'Dispute updated successfully', data: doc });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/disputes/:id/submit - Human-in-the-loop 1-click submit to bank acquirer
 */
router.post('/:id/submit', async (req, res) => {
  try {
    const { doc, source } = await getDisputeById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, error: 'Dispute not found' });
    }

    doc.status = 'SUBMITTED';
    doc.submittedAt = new Date();

    if (source === 'db') {
      await doc.save();
    } else {
      memoryStore.set(doc.disputeId, doc);
    }

    return res.json({
      success: true,
      message: `Dispute ${doc.disputeId} successfully submitted to acquiring bank network!`,
      data: doc
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/disputes/batch - Batch ingestion of dispute cases
 */
router.post('/batch', async (req, res) => {
  try {
    const { cases } = req.body;
    if (!Array.isArray(cases) || cases.length === 0) {
      return res.status(400).json({ success: false, error: 'Invalid payload: cases array expected' });
    }

    const created = [];
    for (const item of cases) {
      const disputeId = item.disputeId || `DISP-${Math.floor(100000 + Math.random() * 900000)}`;
      const disputeData = {
        disputeId,
        amount: item.amount || 150.00,
        currency: item.currency || 'USD',
        reasonCode: item.reasonCode || '10.4',
        reasonCategory: item.reasonCategory || 'FRAUD',
        customerName: item.customerName || 'John Doe',
        customerEmail: item.customerEmail || 'john@example.com',
        evidenceData: item.evidenceData || {},
        status: item.status || 'PENDING_REVIEW'
      };

      try {
        const newDoc = new Dispute(disputeData);
        await newDoc.save();
        created.push(newDoc);
      } catch (dbErr) {
        memoryStore.set(disputeId, disputeData);
        created.push(disputeData);
      }
    }

    return res.json({
      success: true,
      message: `Successfully ingested ${created.length} dispute cases`,
      data: created
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Export memory store for seeding reference when offline
module.exports = {
  router,
  memoryStore
};
