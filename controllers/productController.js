let controller = {};
let models = require('../models');
const { response } = require('express');
let Product = models.Product;

controller.getTrendingProduct = () => {
    return new Promise((resolve, reject) => {
        Product
                .findAll({
                    order: [
                        ['overallReview', "DESC"]
                    ],
                    limit: 8,
                    include: [{ model: models.Category }],
                    attributes: ['id', 'name', 'imagepath', 'price']
                })
                .then(data => {
                    resolve(data);
                })
                .catch(error => reject(new Error(error)));
    });
};

controller.getAll = () => {
    return new Promise((resolve, reject) => {
        Product
            .findAll({
                include: [{ model: models.Category }],
                attributes: ['id', 'name', 'imagepath', 'price'],
                limit: 9
            })
            .then(data => resolve(data))
            .catch(error => new Error(error));
    });
}

controller.getById = (id) => {
    return new Promise((resolve, reject) => {
        let product;
        Product
            .findOne({
                where: { id : id},
                include: [{ model: models.Category}]
            })
            .then(result => {
                product = result;
                return models.ProductSpecification.findAll({
                    where: { productId : id },
                    include: [{ model: models.Specification }]
                });
            })
            .then(productSpecification => {
                product.ProductSpecification = productSpecification;
                resolve(product);
            })
            .catch(error => reject(new Error(error)));
    });
}

module.exports = controller;