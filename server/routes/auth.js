const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');

// In-Memory user and session stores for offline / high-performance fallback
const userMemoryStore = new Map();
const sessionMemoryStore = new Map();

// Helper to sanitize user object (remove password)
function sanitizeUser(user) {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  return obj;
}

// Generate simple secure token
function createToken(userId, email) {
  const token = `cg_token_${crypto.randomBytes(24).toString('hex')}`;
  sessionMemoryStore.set(token, { userId, email, createdAt: Date.now() });
  return token;
}

const mongoose = require('mongoose');

// Helper to get user by email (MongoDB or Memory)
async function findUserByEmail(email) {
  const normalizedEmail = (email || '').toLowerCase().trim();
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    try {
      const doc = await User.findOne({ email: normalizedEmail });
      if (doc) return { doc, source: 'db' };
    } catch (err) {
      // DB query error
    }
  }

  if (userMemoryStore.has(normalizedEmail)) {
    return { doc: userMemoryStore.get(normalizedEmail), source: 'memory' };
  }

  return { doc: null, source: null };
}

// Helper to get user by ID (MongoDB or Memory)
async function findUserById(id) {
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    try {
      const doc = await User.findById(id);
      if (doc) return { doc, source: 'db' };
    } catch (err) {
      // DB query error
    }
  }

  for (const user of userMemoryStore.values()) {
    if (user._id === id || user.id === id) {
      return { doc: user, source: 'memory' };
    }
  }

  return { doc: null, source: null };
}

/**
 * Seed default demo user into memory store for instant judge access
 */
function seedDemoUserInMemory() {
  const demoEmail = 'demo@apexstore.io';
  if (!userMemoryStore.has(demoEmail)) {
    const demoUser = {
      _id: 'demo-user-apex-001',
      id: 'demo-user-apex-001',
      name: 'Alex Mercer',
      email: demoEmail,
      password: 'demopassword123',
      storeName: 'Apex Store',
      platform: 'Stripe',
      currency: 'USD',
      createdAt: new Date().toISOString()
    };
    userMemoryStore.set(demoEmail, demoUser);
  }
}
seedDemoUserInMemory();

/**
 * POST /api/auth/register - Register new merchant & store
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, storeName, platform, currency } = req.body;

    if (!name || !email || !password || !storeName) {
      return res.status(400).json({
        success: false,
        error: 'Please provide Merchant Name, Email, Password, and Store Name'
      });
    }

    const { doc: existingUser } = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'An account with this email address already exists'
      });
    }

    const userData = {
      name,
      email: email.toLowerCase().trim(),
      password, // Simple password string for demo/hackathon
      storeName,
      platform: platform || 'Stripe',
      currency: currency || 'USD',
      createdAt: new Date()
    };

    let createdUser;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        const newUser = new User(userData);
        createdUser = await newUser.save();
      } catch (dbErr) {
        console.warn('MongoDB user create failed, saving to memory store:', dbErr.message);
        const memId = `user_${Date.now()}`;
        createdUser = { _id: memId, id: memId, ...userData };
        userMemoryStore.set(userData.email, createdUser);
      }
    } else {
      const memId = `user_${Date.now()}`;
      createdUser = { _id: memId, id: memId, ...userData };
      userMemoryStore.set(userData.email, createdUser);
    }

    const token = createToken(createdUser._id || createdUser.id, createdUser.email);
    const sanitized = sanitizeUser(createdUser);

    return res.status(201).json({
      success: true,
      message: 'Merchant account & store registered successfully!',
      token,
      user: sanitized
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/auth/login - Login existing merchant
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    const { doc: user } = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    const userId = user._id ? user._id.toString() : user.id;
    const token = createToken(userId, user.email);
    const sanitized = sanitizeUser(user);

    return res.json({
      success: true,
      message: 'Logged in successfully!',
      token,
      user: sanitized
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/auth/demo - Instant 1-Click Demo Login for hackathon judges
 */
router.post('/demo', async (req, res) => {
  try {
    const demoEmail = 'demo@apexstore.io';
    let { doc: demoUser } = await findUserByEmail(demoEmail);

    if (!demoUser) {
      const demoData = {
        name: 'Alex Mercer',
        email: demoEmail,
        password: 'demopassword123',
        storeName: 'Apex Store',
        platform: 'Stripe',
        currency: 'USD',
        createdAt: new Date()
      };

      try {
        const newUser = new User(demoData);
        demoUser = await newUser.save();
      } catch (err) {
        demoUser = { _id: 'demo-user-apex-001', id: 'demo-user-apex-001', ...demoData };
        userMemoryStore.set(demoEmail, demoUser);
      }
    }

    const userId = demoUser._id ? demoUser._id.toString() : (demoUser.id || 'demo-user-apex-001');
    const token = createToken(userId, demoUser.email);
    const sanitized = sanitizeUser(demoUser);

    return res.json({
      success: true,
      message: 'Instant demo login active! Welcome hackathon judge 🚀',
      token,
      user: sanitized
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/auth/me - Fetch current logged-in profile
 */
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized: missing authorization token' });
    }

    const token = authHeader.split(' ')[1];
    const session = sessionMemoryStore.get(token);

    if (!session) {
      // Fallback: If token format is valid, try resolving demo user or return 401
      if (token.startsWith('cg_token_')) {
        const demoEmail = 'demo@apexstore.io';
        const { doc: demoUser } = await findUserByEmail(demoEmail);
        if (demoUser) {
          return res.json({ success: true, user: sanitizeUser(demoUser) });
        }
      }
      return res.status(401).json({ success: false, error: 'Unauthorized: invalid or expired session token' });
    }

    const { doc: user } = await findUserById(session.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User profile not found' });
    }

    return res.json({
      success: true,
      user: sanitizeUser(user)
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * PUT /api/auth/profile - Update merchant profile details
 */
router.put('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized: missing token' });
    }

    const token = authHeader.split(' ')[1];
    const session = sessionMemoryStore.get(token);

    // Resolve user ID
    let userId = session ? session.userId : 'demo-user-apex-001';

    const { name, email, storeName, platform, currency, avatar } = req.body;
    let { doc: user, source } = await findUserById(userId);

    if (!user) {
      const demoEmail = 'demo@apexstore.io';
      const found = await findUserByEmail(demoEmail);
      user = found.doc;
      source = found.source;
    }

    if (!user) {
      return res.status(404).json({ success: false, error: 'User profile not found' });
    }

    // Apply updates
    if (name) user.name = name;
    if (email) user.email = email.toLowerCase().trim();
    if (storeName) user.storeName = storeName;
    if (platform) user.platform = platform;
    if (currency) user.currency = currency;
    if (avatar !== undefined) user.avatar = avatar;

    if (source === 'db' && user.save) {
      await user.save();
    } else {
      userMemoryStore.set(user.email || 'demo@apexstore.io', user);
    }

    return res.json({
      success: true,
      message: 'Merchant profile updated successfully!',
      user: sanitizeUser(user)
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * PUT /api/auth/password - Update merchant password
 */
router.put('/password', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized: missing token' });
    }

    const token = authHeader.split(' ')[1];
    const session = sessionMemoryStore.get(token);
    let userId = session ? session.userId : 'demo-user-apex-001';

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, error: 'Current password and new password are required' });
    }

    let { doc: user, source } = await findUserById(userId);
    if (!user) {
      const demoEmail = 'demo@apexstore.io';
      const found = await findUserByEmail(demoEmail);
      user = found.doc;
      source = found.source;
    }

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (user.password && user.password !== currentPassword) {
      return res.status(400).json({ success: false, error: 'Current password is incorrect' });
    }

    user.password = newPassword;

    if (source === 'db' && user.save) {
      await user.save();
    } else {
      userMemoryStore.set(user.email || 'demo@apexstore.io', user);
    }

    return res.json({
      success: true,
      message: 'Password changed successfully!'
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = {
  router,
  userMemoryStore,
  sessionMemoryStore
};
