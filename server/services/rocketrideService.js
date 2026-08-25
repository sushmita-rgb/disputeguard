const fs = require('fs');
const path = require('path');
const { generateDefensePackage } = require('./geminiDefenseService');

/**
 * RocketRide Pipeline Service
 * Loads pipelines/dispute_defense.pipe and executes automated defense generation workflows.
 */
class RocketRideService {
  constructor() {
    this.pipelinePath = path.join(__dirname, '../../pipelines/dispute_defense.pipe');
    this.pipelineConfig = null;
    this.loadPipeline();
  }

  loadPipeline() {
    try {
      if (fs.existsSync(this.pipelinePath)) {
        const raw = fs.readFileSync(this.pipelinePath, 'utf-8');
        this.pipelineConfig = JSON.parse(raw);
        const name = this.pipelineConfig.name || this.pipelineConfig.project_id || 'RocketRide Defense Pipeline';
        const version = this.pipelineConfig.version || 1;
        console.log(`RocketRide Pipeline loaded successfully: ${name} (v${version})`);
      }
    } catch (err) {
      console.warn('Could not load RocketRide pipeline configuration:', err.message);
    }
  }

  /**
   * Run dispute through RocketRide pipeline
   */
  async processDisputePipeline(dispute) {
    const targetHost = process.env.ROCKETRIDE_URI || 'https://staging.rocketride.ai';
    const pipelineName = this.pipelineConfig?.project_id || this.pipelineConfig?.name || 'chargeguard_dispute_defense';
    console.log(`Executing RocketRide pipeline [${pipelineName}] via ${targetHost} for Dispute ID: ${dispute.disputeId}`);

    // Execute transformation & Gemini LLM node
    const defenseResult = await generateDefensePackage(dispute);

    return {
      pipelineId: pipelineName,
      targetHost,
      executedAt: new Date().toISOString(),
      componentsProcessed: this.pipelineConfig?.components?.map(c => c.name) || ['Webhook', 'Gemini', 'Return Answers'],
      result: defenseResult
    };
  }
}

module.exports = new RocketRideService();
