const Joi = require('joi');
const InvariantError = require("../exceptions/invariant_error");

module.exports = {
    validateRegistrationRequest(payload) {
        const registerSchema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            username: Joi.string().required(),
            password: Joi.string().required(),
        })
        const validationResult = registerSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    }
}