const membersUserCase = require('../usecase/member_usecase');
const responseFormat = require('../helper/response_format.js');
const clientError = require('../exceptions/client_error.js');


module.exports = {
    async register(req, res) {
        try {
            const registerUser = await membersUserCase.registerUser(req);
            res.status(200).json(responseFormat.build(
                registerUser, 'success create user', '201',
            ));
        } catch (error) {
            if(error instanceof clientError) {
                res.status(error.statusCode).json(responseFormat.error(
                    error.message, error.statusCode))
            } else {
                res.status(500).json(responseFormat.error(
                   "Internal Server Error", error.message))
            }

        }
    },
};