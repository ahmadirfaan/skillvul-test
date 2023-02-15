const members = require('../models').members;
const validator = require("../validator/validator_request");
const bcrypt = require("bcrypt")
const clientError = require('../exceptions/client_error.js');



module.exports = {
    async registerUser(payload) {
        validator.validateRegistrationRequest(payload)
        const passwordHash = bcrypt.hashSync(payload.password, 10);
        const {firstName, lastName, username, age} = await members.create({
            firstName: payload.firstName,
            username: payload.username,
            lastName: payload.lastName,
            age: payload.age,
            password: passwordHash,
        });
        return {firstName, lastName, username, age}
    },
    async loginUser(payload) {
        validator.validateLoginRequest(payload)
        const member = await members.findAll({
            where: {
                username: payload.username,
            },
            raw : true,
            nest : true
        });
        const passwordDb = member[0].password;
        if(!passwordDb) {
            throw clientError("username not exist", 403)
        }
        const isValidPassword = bcrypt.compareSync(payload.password, passwordDb);
        if(!isValidPassword) {
            throw new clientError("password not same", 403)
        }
        return isValidPassword;
    }

};