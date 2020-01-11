'use strict';
module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
    name: DataTypes.STRING,
    code: DataTypes.TEXT,
    imagepath: DataTypes.TEXT
  }, {});
  Color.associate = function(models) {
    // associations can be defined here
    Color.hasMany(models.ProductColor, {foreignKey: 'colorId'});
  };
  return Color;
};