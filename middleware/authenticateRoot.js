const jwt = require("jsonwebtoken");
const jwtDecoder = require("../utils/jwtDecoder");

const authenticateRoot = (req, res, next) => {
    // Extract token from headers
    const token = req.headers['authorization']; // Assuming the token is in the 'authorization' header
    console.log(token);

    // Verify the token
    try {
        const decodeToken = jwt.verify(token, 'your_secret_key');
        console.log(decodeToken);
        if (decodeToken.userType !== 'Root') {
            return res.status(403).json({ message: 'Forbidden' });

        }
        else{
            res.json({message: "this is the root user",userType: decodeToken.userType })
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticateRoot;
