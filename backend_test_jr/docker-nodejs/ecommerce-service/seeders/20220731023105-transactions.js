'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Transaction', [{
      UserId: 1, 
    },
    {
      UserId: 1, 
    },
    {
      UserId: 2, 
    },
    {
      UserId: 2, 
    },
    {
      UserId: 3, 
    },
    {
      UserId: 4, 
    },
    {
      UserId: 5, 
    },
    {
      UserId: 5, 
    },
    {
      UserId: 4, 
    },
    {
      UserId: 5, 
    },
    {
      UserId: 5, 
    },
    {
      UserId: 6, 
    },
    {
      UserId: 6, 
    },
    {
      UserId: 7, 
    },
    {
      UserId: 7, 
    },
    {
      UserId: 8, 
    },
    {
      UserId: 8, 
    },
    {
      UserId: 7, 
    },
    {
      UserId: 8, 
    },
    {
      UserId: 8, 
    },
    {
      UserId: 6, 
    },
    {
      UserId: 5, 
    },
    {
      UserId: 4, 
    },
  ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transaction', null, {})
  }
};
