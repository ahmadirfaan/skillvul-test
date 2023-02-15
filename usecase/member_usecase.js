const members = require('../models').members;
const validator = require("../validator/validator_request");
const bcrypt = require("bcrypt")


module.exports = {
    async registerUser(req) {
        const payload = req.body;
        validator.validateRegistrationRequest(payload)
        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(payload.password, salt);
        const { firstName, lastName, username, age} = await members.create({
            firstName: payload.firstName,
            username: payload.username,
            lastName: payload.lastName,
            age: payload.age,
            password: passwordHash,
        });
        return {firstName, lastName, username, age}
    },

};