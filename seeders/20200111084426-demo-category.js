'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      let data = [
        { name: 'Men', imagepath: '/img/home/hero-slide1.png'},
        { name: 'Women', imagepath: '/img/home/hero-slide1.png'},
        { name: 'Accessories', imagepath: '/img/home/hero-slide1.png'},
        { name: 'Footwear', imagepath: '/img/home/hero-slide1.png'},
        { name: 'Bay item', imagepath: '/img/home/hero-slide1.png'},
        { name: 'Electronic', imagepath: '/img/home/hero-slide1.png'},
        { name: 'Food', imagepath: '/img/home/hero-slide1.png'},
      ];
      data.map(item => {
        item.createdAt = Sequelize.literal('NOW()');
        item.updatedAt = Sequelize.literal('NOW()');
        return item;
      });
      return queryInterface.bulkInsert('Categories', data,{});
  },

  down: (queryInterface, Sequelize) => {  
      return queryInterface.bulkDelete('People', null, {});
  }
};
