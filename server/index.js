const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config();

const { router: disputesRouter, memoryStore } = require('./routes/disputes');
const { router: authRouter } = require('./routes/auth');
const { seedDisputes } = require('./seed');
const { generateDefensePackage } = require('./services/geminiDefenseService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Defendr AI Server',
    timestamp: new Date().toISOString(),
    rocketrideUri: process.env.ROCKETRIDE_URI || 'https://staging.rocketride.ai',
    geminiConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here' && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY'),
    rocketrideConfigured: !!(process.env.ROCKETRIDE_URI && process.env.ROCKETRIDE_APIKEY && process.env.ROCKETRIDE_APIKEY !== 'YOUR_ROCKETRIDE_STAGING_KEY')
  });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/disputes', disputesRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
});

// Database & Server Initialization
async function startServer() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/chargeguard';

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
    console.log('MongoDB connected successfully to chargeguard DB');
  } catch (err) {
    console.warn('MongoDB connection unavailable. Operating in high-performance In-Memory mode:', err.message);
    
    // Seed initial data into memory store if empty
    if (memoryStore.size === 0) {
      console.log('Initializing in-memory dispute seed database...');
      for (const item of seedDisputes) {
        const defense = await generateDefensePackage(item);
        memoryStore.set(item.disputeId, {
          ...item,
          aiDefenseLetter: defense.aiDefenseLetter,
          winProbabilityScore: defense.winProbabilityScore,
          evidenceSummary: defense.evidenceSummary
        });
      }
    }
  }

  app.listen(PORT, () => {
    console.log(`======================================================`);
    console.log(`  Defendr AI Backend listening on port ${PORT}`);
    console.log(`  Health check: http://localhost:${PORT}/api/health`);
    console.log(`  Disputes API: http://localhost:${PORT}/api/disputes`);
    console.log(`======================================================`);
  });
}

startServer();
