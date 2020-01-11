'use strict';
module.exports = (sequelize, DataTypes) => {
  const Specification = sequelize.define('Specification', {
    name: DataTypes.STRING,
    summary: DataTypes.TEXT
  }, {});
  Specification.associate = function(models) {
    // associations can be defined here
    Specification.hasMany(models.ProductSpecification, {foreignkey: 'specificationId'});
  };
  return Specification;
};