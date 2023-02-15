const membersUserCase = require('../usecase/member_usecase');
const authUseCase = require('../usecase/authorization_usecase');
const responseFormat = require('../helper/response_format.js');
const clientError = require('../exceptions/client_error.js');


function handlingError(error, res) {
    if (error instanceof clientError) {
        res.status(error.statusCode).json(responseFormat.error(
            error.message, error.statusCode))
    } else {
        res.status(500).json(responseFormat.error(
            "Internal Server Error", error.message))
    }
}

module.exports = {
    async register(req, res) {
        try {
            const registerUser = await membersUserCase.registerUser(req.body);
            res.status(201).json(responseFormat.build(
                registerUser, 'success create user', '201',
            ));
        } catch (error) {
            handlingError(error, res);

        }
    },
    async login(req, res) {
        try {
            const accessToken = await membersUserCase.loginUser(req.body);
            res.status(200).json(responseFormat.build(
                {accessToken}, 'success login', '200',
            ));
        } catch (error) {
            handlingError(error, res)
        }
    },
    async getAllMember(req, res) {

    },
    async getMemberById(req, res) {

    },
    async deleteMember(req, res) {
        try {
            const {payload: memberId} = await authUseCase.checkValidTokenAndDecode(req);
            const successDeleted = membersUserCase.removeMemberById(memberId, req.params.id);
            res.status(200).json(responseFormat.build(
                { isSuccessDeleted: successDeleted}, 'success delete member', '200',
            ));
        } catch (error) {
            handlingError(error, res)
        }

    },
    async addExp(req, res) {

    },
    async addTag(req, res) {
        try {
            const {payload: memberId} = await authUseCase.checkValidTokenAndDecode(req);
            const member = membersUserCase.addTagByMemberId(memberId, req.body);
            res.status(200).json(responseFormat.build(
                { member }, 'success add tag to member', '200',
            ));
        } catch (error) {
            handlingError(error, res)
        }
    },
    async upgradeMember(req, res) {

    }

};