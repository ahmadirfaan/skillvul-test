const members = require('../models').members;
const validator = require("../validator/validator_request");

module.exports = {
    registerUser(req) {
        validator.validateRegistrationRequest(req)
        return members.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            password: req.body.password,
        });
    },

};