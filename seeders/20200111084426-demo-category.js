'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      let data = [
        { name: 'Men',}
      ];
      return queryInterface.bulkInsert('Categories', data,{});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
