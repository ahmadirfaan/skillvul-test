
const Joi = require('joi');
const InvariantError = require("../exceptions/invariant_error");

module.exports = {
    validateRegistrationRequest(payload) {
        const registerSchema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            age: Joi.number().integer().min(0).required(),
            username: Joi.string().required(),
            password: Joi.string().required(),
        })
        const validationResult = registerSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
    validateLoginRequest(payload) {
        const loginSchema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        })
        const validationResult = loginSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
    validateTagName(payload) {
        const addTagSchema = Joi.object({
            tagName: Joi.string().required(),
        })
        const validationResult = addTagSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    }
}