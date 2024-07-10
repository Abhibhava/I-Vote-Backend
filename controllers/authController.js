// Signup Logic
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const signup = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body;

        // Check if the user being registered is attempting to register as the Root user
        if (email.toLowerCase() === 'root@example.com') {
            // Check if a user with the email 'root@example.com' already exists in the database
            const existingRootUser = await User.findOne({ email });
            if (existingRootUser) {
                // If a user with the email 'root@example.com' already exists, prevent duplicate registration
                return res.status(400).json({ message: 'Root user already exists' });
            }

            // If it's the Root user and no existing user found, create their record directly
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                username,
                email,
                password: hashedPassword,
                userType: 'Root'
            });
            return res.status(201).json({ message: 'Root user registered successfully' });
        }

        // Proceed with regular user registration
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword,
            userType: 'Normal'
        });
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login Logic
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, userType: user.userType },
            'your_secret_key',
            { expiresIn: '1h' }
        );

        // Return response with token and userType. This returned function is being used in the frontend, and set into localStorage
        return res.json({ userType: user.userType, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { login, signup };
