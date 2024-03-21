const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/register', async (req, res) => {
    try {
        const { name, password } = req.body;
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, password: hashedPassword });
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        // Create a JWT token
        const token = jwt.sign({ userId: user._id, name: user.name }, secretKey, {
            expiresIn: '1h',
        });
        res.status(200).json({ token, userId: user._id, name: user.name });
    } catch (error) {
        res.status(500).json({ error: 'Authentication failed' });
    }
});

module.exports = router;