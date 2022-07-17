const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

class AuthController {
    // GET api/auth
    // Check if user is logged in
    // Public
    isLoggedIn = async (req, res) => {
        try {
            const user = await User.findById(req.userId).select('-password');
            if (!user) {
                return res.status(400).json({ success: false, message: 'User not found' });
            }

            res.json({ success: true, user });
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    };

    // POST api/auth/register
    // Register user
    // Public
    register = async (req, res) => {
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Missing username or password' });
        }

        try {
            // Check for existing user
            const user = await User.findOne({ username });

            if (user) {
                return res.status(400).json({ success: false, message: 'Username already existed' });
            }

            // All good
            const hashedPassword = await argon2.hash(password);
            const newUser = new User({
                username,
                password: hashedPassword,
            });
            await newUser.save();

            // Return token
            const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
            res.json({ success: true, message: 'Signing up successfully', accessToken });
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    };

    // POST api/auth/login
    // Login
    // Public
    login = async (req, res) => {
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Missing username or password' });
        }

        try {
            // Check for existing user
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ success: false, message: 'Incorrect username or password' });
            }

            // Username found
            const passwordValid = await argon2.verify(user.password, password);
            if (!passwordValid) {
                return res.status(400).json({ success: false, message: 'Incorrect username or password' });
            }

            // All good
            // Return token
            const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
            res.json({ success: true, message: 'Logged in successfully', accessToken });
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    };
}

module.exports = new AuthController();
