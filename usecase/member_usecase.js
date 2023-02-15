const members = require('../models').members;
const tags = require('../models').tags;
const relMemberTags = require('../models').relMemberTags
const validator = require("../validator/validator_request");
const bcrypt = require("bcrypt")
const clientError = require('../exceptions/client_error.js');
const authUseCase = require('./authorization_usecase');

const getMemberById =  async (memberId) => {
    return members.findByPk(memberId, {
        raw: true
    });
}

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
        const member = await members.findOne({
            where: {
                username: payload.username,
            },
            raw: true,
            nest: true
        });
        const passwordDb = member.password
        if (!passwordDb) {
            throw clientError("username not exist", 403)
        }
        const isValidPassword = bcrypt.compareSync(payload.password, passwordDb);
        if (!isValidPassword) {
            throw new clientError("password not same", 403)
        }

        return authUseCase.generateToken(member.id);
    },
    async removeMemberById(memberId, paramId) {
        if (memberId == paramId) {
            members.destroy({
                where: {
                    id: memberId
                }
            })
            relMemberTags.destroy({
                where: {
                    memberId: memberId
                }
            })
            return true;
        } else {
            throw new clientError("can't delete other member", 403)
        }
    },
    async addTagByMemberId(memberId, body) {
        validator.validateTagName(body);
        const member = await getMemberById(memberId);
        const tag = await tags.findOrCreate({
            where: {
                name: body.tagName,
            },
            raw: true,
            nest: true
        });
        const {count} = await relMemberTags.findAndCountAll({
            where: {
                members_id: memberId,
                tags_id: tag[0].id
            },
        });
        const isMaxMemberFree = member.type === "free" && count < 3
        const isMaxMemberPaid = member.type === "paid" && count < 20
        if(isMaxMemberFree || isMaxMemberPaid) {
            relMemberTags.create({
                members_id: memberId,
                tags_id: tag[0].id
            })
            return true;
        } else {
            throw new clientError("has reached maximum tag", "400")
        }
    }


}
;