let controller = {};
let models = require('../models');
const { options } = require('../routes/indexRouter');
let Color = models.Color;

controller.getAll = (query) => {
    return new Promise((resolve, reject) => {
        let options = {
            attributes: ['id', 'name', 'imagepath'],
            include: [{ model: models.ProductColor }]
        };
        if (query.category) {
            
        }
        Color
            .findAll(options);
            .then(data => resolve(data))
            .catch(error => reject(error))
    });
}

module.exports = controller;