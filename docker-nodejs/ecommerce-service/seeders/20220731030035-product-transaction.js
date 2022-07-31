'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_transaction', [{
      ProductId: 1,
      TransactionId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 1,
      TransactionId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 4,
      TransactionId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 1,
      TransactionId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 3,
      TransactionId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 5,
      TransactionId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 8,
      TransactionId: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 2,
      TransactionId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 5,
      TransactionId: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 4,
      TransactionId: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 3,
      TransactionId: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 7,
      TransactionId: 12,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 5,
      TransactionId: 13,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 4,
      TransactionId: 14,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 3,
      TransactionId: 15,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 2,
      TransactionId: 16,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 5,
      TransactionId: 17,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 4,
      TransactionId: 18,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 3,
      TransactionId: 19,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 7,
      TransactionId: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 5,
      TransactionId: 21,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 4,
      TransactionId: 22,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 1,
      TransactionId: 23,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {})
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('product_transaction', null, {});
    
  }
};
