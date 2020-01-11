'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    name: DataTypes.STRING,
    summary: DataTypes.TEXT,
    imagepath: DataTypes.TEXT
  }, {});
  Brand.associate = function(models) {
    // associations can be defined here
    Brand.hasMany(models.Product, {foreignKey: 'brandId'});
  };
  return Brand;
};