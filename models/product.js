'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    imagepath: DataTypes.TEXT,
    thumbnailpath: DataTypes.TEXT,
    availability: DataTypes.BOOLEAN,
    summary: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Category, {foreignKey: 'categoryid'});
    Product.belongsTo(models.Brand, {foreignKey: 'brandId'});
    Product.hasMany(models.ProductColor, {foreignKey: 'productId'});
    Product.hasMany(models.ProductSpecification, {foreignKey: 'productId'});
    Product.hasMany(models.User, {foreignKey: 'productId'});
    Product.hasMany(models.Comment, {foreignKey: 'productId'});
    Product.hasMany(models.Review, {foreignKey: 'productId'});
  };
  return Product;
};