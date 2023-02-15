const memberController = require('../controller/member_controller');

module.exports = (app) => {
    app.post(`${process.env.PREFIX_API}/member`, memberController.postCategory);
    app.get(`${process.env.PREFIX_API}/member`, memberController.getListCategory);
    app.put(`${process.env.PREFIX_API}/member/:memberId`, memberController.updateCategory);
    app.get(`${process.env.PREFIX_API}/member/:memberId`, memberController.getCategoryDetail);
    app.delete(`${process.env.PREFIX_API}/member/Id`, memberController.deleteCategory);
};