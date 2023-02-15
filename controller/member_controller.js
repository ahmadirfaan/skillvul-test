const membersUserCase = require('../usecase/member_usecase');
const responseFormat = require('../helper/response_format.js');

module.exports = {
    register(req, res) {
        return membersUserCase.registerUser(req)
            .then((category) => {
                res.status(200).json(responseFormat.build(
                    category, 'success create user', '201',
                ));
            })
            .catch((error) => res.status(400).json(responseFormat.error(
                error, 400,
            )));
    },
    getListCategory(req, res) {
        return membersUserCase.getListCategory(req)
            .then((category) => res.status(200).json(responseFormat.build(
                category, 'Category Information Reterive successfully', 200,
            )))
            .catch((error) => res.status(400).json(responseFormat.error(
                error, 400,
            )));
    },
    getCategoryDetail(req, res) {
        const categoryId = req.params.categoryId;
        return membersUserCase.getCategoryDetailById(categoryId)
            .then((category) => {
                if (!category) {
                    return res.status(404).json(
                        responseFormat.error('Tidak menemukan category', 400),
                    );
                }
                return res.status(200).json(
                    responseFormat.build(
                        category,
                        'success',
                        200,
                    ),
                );
            })
            .catch((error) => res.status(500).json(
                responseFormat.error(error, 500),
            ));
    },
    updateCategory(req, res) {
        return membersUserCase.updateCategoryById(req)
            .then((category) => {
                if (category) {
                    res.status(200).json(
                        responseFormat.build(category,
                            'Berhasil update category', 200));
                } else {
                    res.status(400).json(
                        responseFormat.error('Error delete category', 400));
                }
            })
            .catch((error) => res.status(500).json(
                responseFormat.error(error, 500),
            ));
    },
    deleteCategory(req, res) {
        const categoryId = req.params.categoryId;
        return membersUserCase.deleteCategoryById(categoryId)
            .then((category) => {
                if (category) {
                    res.status(200).json(
                        responseFormat.build(null,
                            'Berhasil menghapus category', 200));
                } else {
                    res.status(400).json(
                        responseFormat.error('Error delete category', 400));
                }
            })
            .catch((error) => res.status(500).json(
                responseFormat.error(error, 500),
            ));
    },
};