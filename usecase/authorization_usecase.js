const {getTokenFromBearer} = require("express-kun");
const jwt = require("jsonwebtoken");
const clientError = require('../exceptions/client_error.js');
const secretKey = process.env.SECRET_KEY;


module.exports = {
    async checkValidTokenAndDecode(request) {
        const token = getTokenFromBearer(request);
        const isVerified = jwt.verify(token, secretKey);
        if(!isVerified) {
            throw new clientError("Invalid Authorization", 401)
        }
        return jwt.decode(token);
    },
    async generateToken(payload) {
        return jwt.sign({ payload }, secretKey, {
            expiresIn: "24h"
        });
    }
};