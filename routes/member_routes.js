const memberController = require('../controller/member_controller');
const {withJWTAuthMiddleware} = require("express-kun");

module.exports = (app) => {
    const api = process.env.PREFIX_API;
    const protectedRouter = withJWTAuthMiddleware(app, process.env.SECRET_KEY);

    app.post(`${api}/members`, memberController.register);
    app.post(`${api}/login`, memberController.login);
    app.get(`${api}/members`, memberController.getAllMember)
    app.get(`${api}/members/:id`, memberController.getMemberById)
    protectedRouter.delete(`${api}/members/:id`, memberController.deleteMember)
    protectedRouter.patch(`${api}/members/exp`, memberController.addExp)
    protectedRouter.patch(`${api}/members/tag`, memberController.addTag)
    protectedRouter.patch(`${api}/members/upgrade`, memberController.upgradeMember)
};