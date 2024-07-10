const jwt = require("jsonwebtoken");

function jwtDecoder(token){
    return jwt.verify(token,'your_secret_key');
}

module.exports = jwtDecoder;