'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Product', [{
      name: 'Producto 1',
      description: 'Descripcion del producto 1.',
      quantity: 15, 
      status: 1,
      CategorieId: 1,
      UserId: 2,
    },
    {
      name: 'Producto 2',
      description: 'Descripcion del producto 2.',
      quantity: 11, 
      status: 1,
      CategorieId: 3,
      UserId: 2,
    },
    {
      name: 'Producto 3',
      description: 'Descripcion del producto 3.',
      quantity: 15, 
      status: 1,
      CategorieId: 4,
      UserId: 1,
    },
    {
      name: 'Producto 4',
      description: 'Descripcion del producto 4.',
      quantity: 15, 
      status: 1,
      CategorieId: 6,
      UserId: 5,
    },
    {
      name: 'Producto 5',
      description: 'Descripcion del producto 5.',
      quantity: 15, 
      status: 1,
      CategorieId: 8,
      UserId: 4,
    },
    {
      name: 'Producto 6',
      description: 'Descripcion del producto 6.',
      quantity: 15, 
      status: 1,
      CategorieId: 6,
      UserId: 2,
    },
    {
      name: 'Producto 7',
      description: 'Descripcion del producto 7.',
      quantity: 15, 
      status: 1,
      CategorieId: 8,
      UserId: 1,
    },
    {
      name: 'Producto 8',
      description: 'Descripcion del producto 8.',
      quantity: 15, 
      status: 1,
      CategorieId: 4,
      UserId: 7,
    },
  ], {})
  },

  async down (queryInterface, Sequelize) { 
    await queryInterface.bulkDelete('Product', null, {});
     
  }
};
