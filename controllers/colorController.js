let controller = {};
let models = require("../models");
const { options } = require("../routes/indexRouter");
let Color = models.Color;
let Sequelize = require("sequelize");
let Op = Sequelize.Op;

controller.getAll = (query) => {
  return new Promise((resolve, reject) => {
    let options = {
      attributes: ["id", "name", "imagepath", "code"],
      include: [
        {
          model: models.ProductColor,
          include: [
            {
              model: models.Product,
              attributes: [],
              where: {},
            },
          ],
        },
      ],
    };
    if (query.category > 0) {
      options.include[0].include[0].where.categoryId = query.category;
    }
    if (query.brand > 0) {
      options.include[0].include[0].where.brandId = query.brand;
    }
    if (query.search != "") {
      options.include[0].include[0].where.name = {
        [Op.iLike]: `%${query.search}%`,
      };
    }
    Color.findAll(options)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

module.exports = controller;
