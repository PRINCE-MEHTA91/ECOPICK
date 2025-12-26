const express = require('express');
const router = express.Router();
const { getUsers, saveUsers } = require('../services/userData');
const { calculatePrice } = require('../utils/priceCalculator');

const fs = require('fs');
const path = require('path');
const pricesFilePath = path.join(__dirname, '..', 'prices.json');

// Helper function to generate a unique profile ID
function generateProfileId(phoneNumber) {
    return "user_" + phoneNumber.slice(-4) + Date.now().toString(36).slice(-4);
}

router.post('/login', async (req, res) => {
    const { name, phoneNumber } = req.body;
    console.log('Login attempt:', { name, phoneNumber });
    if (!name || !phoneNumber || !/^[0-9]{10}$/.test(phoneNumber)) {
        return res.status(400).json({ status: 'error', message: 'Invalid name or phone number.' });
    }

    const users = await getUsers();
    let user = Object.values(users).find(u => u.phoneNumber === phoneNumber);

    if (user) {
        // User found, "login" successful
        req.session.user = { profileId: user.profileId };
        console.log('Login successful, session created:', req.session);
        return res.json({ status: 'success', message: 'Logged in successfully.', user });
    } else {
        // User not found, create a new profile
        const profileId = generateProfileId(phoneNumber);
        const newUser = {
            profileId,
            name,
            phoneNumber,
            createdAt: new Date().toISOString(),
            stats: { detections: 0, totalWeight: 0, totalEarnings: 0 },
            transactions: []
        };
        users[profileId] = newUser;
        await saveUsers(users);
        
        req.session.user = { profileId };
        console.log('New profile created, session created:', req.session);
        return res.json({ status: 'success', message: 'Profile created successfully.', user: newUser });
    }
});

router.post('/profile/update', async (req, res) => {
    if (!req.session.user || !req.session.user.profileId) {
        return res.status(401).json({ status: 'error', message: 'Not authenticated' });
    }

    const { name, email, address } = req.body;
    if (!name) {
        return res.status(400).json({ status: 'error', message: 'Name is a required field.' });
    }

    const profileId = req.session.user.profileId;
    const users = await getUsers();
    const user = users[profileId];

    if (user) {
        user.name = name;
        user.email = email || user.email; // Keep old value if not provided
        user.address = address || user.address; // Keep old value if not provided
        
        await saveUsers(users);
        res.json({ status: 'success', message: 'Profile updated successfully.', user });
    } else {
        res.status(404).json({ status: 'error', message: 'User not found' });
    }
});



router.get('/prices', (req, res) => {
    try {
        const pricesData = fs.readFileSync(pricesFilePath, 'utf8');
        const prices = JSON.parse(pricesData);
        res.json({ status: 'success', prices }); // Pass status for consistency
    } catch (error) {
        console.error('Error reading prices file:', error);
        res.status(500).json({ status: 'error', message: 'Error fetching prices' });
    }
});

router.post('/calculate-price', (req, res) => {
    const { material, weight } = req.body;
    try {
        const earnings = calculatePrice(material, weight);
        res.json({ status: 'success', earnings });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

router.post('/submit-waste', async (req, res) => {
    if (!req.session.user || !req.session.user.profileId) {
        return res.status(401).json({ status: 'error', message: 'You must be logged in to submit waste.' });
    }
    
    const { material, weight, earnings } = req.body;
    if (!material || weight === undefined || earnings === undefined) {
        return res.status(400).json({ status: 'error', message: 'Missing material, weight, or earnings.' });
    }

    const profileId = req.session.user.profileId;
    const users = await getUsers();
    const user = users[profileId];

    if (user) {
        const transaction = {
            material,
            weight: parseFloat(weight),
            earnings: parseFloat(earnings),
            timestamp: new Date().toISOString()
        };
        
        user.transactions.push(transaction);
        user.stats.totalWeight = (user.stats.totalWeight || 0) + transaction.weight;
        user.stats.totalEarnings = (user.stats.totalEarnings || 0) + transaction.earnings;
        user.stats.detections = (user.stats.detections || 0) + 1;
        
        await saveUsers(users);
        res.json({ status: "success", message: "Transaction successful", user });
    } else {
        res.status(404).json({ status: "error", message: 'User not found' });
    }
});

router.get('/profile', async (req, res) => {
    console.log('Accessing /api/profile, session:', req.session);
    if (!req.session.user || !req.session.user.profileId) {
        return res.status(401).json({ status: 'error', message: 'Not authenticated' });
    }
    
    const profileId = req.session.user.profileId;
    const users = await getUsers();
    const user = users[profileId];

    if (user) {
        res.json({ status: 'success', user });
    } else {
        res.status(404).json({ status: 'error', message: 'User not found' });
    }
});

router.post('/logout', (req, res) => {
    console.log('Logging out, session:', req.session);
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Could not log out, please try again.' });
        }
        res.clearCookie('connect.sid'); // The default cookie name for express-session
        res.json({ status: 'success', message: 'Logged out successfully' });
    });
});

router.get('/dashboard', async (req, res) => {
    if (!req.session.user || !req.session.user.profileId) {
        return res.status(401).json({ status: 'error', message: 'Not authenticated' });
    }
    
    const profileId = req.session.user.profileId;
    const users = await getUsers();
    const user = users[profileId];

    if (user) {
        res.json({ status: 'success', user });
    } else {
        res.status(404).json({ status: 'error', message: 'User not found' });
    }
});

module.exports = router;
