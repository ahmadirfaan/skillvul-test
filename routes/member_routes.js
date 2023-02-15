const memberController = require('../controller/member_controller');

module.exports = (app) => {
    app.post(`${process.env.PREFIX_API}/members`, memberController.register);
};