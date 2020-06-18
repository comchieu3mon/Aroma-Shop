let controller = {};
let models = require('../models');
let Color = models.Color;

controller.getAll = () => {
    return new Promise((resolve, reject) => {
        Color
            .findAll({
                attributes: ['id', 'name', 'imagepath'],
                include: [{ model: models.ProductColor }]
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
    });
}

module.exports = controller;