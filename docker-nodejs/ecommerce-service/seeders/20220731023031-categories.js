'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categorie', [{
      name: 'Categoria 1',
      description: 'descripcion categoria 1',
    },
    {
      name: 'Categoria 2',
      description: 'descripcion categoria 2',
    },
    {
      name: 'Categoria 3',
      description: 'descripcion categoria 3',
    },
    {
      name: 'Categoria 4',
      description: 'descripcion categoria 4',
    },
    {
      name: 'Categoria 5',
      description: 'descripcion categoria 5',
    },
    {
      name: 'Categoria 6',
      description: 'descripcion categoria 6',
    },
    {
      name: 'Categoria 7',
      description: 'descripcion categoria 7',
    },
    {
      name: 'Categoria 8',
      description: 'descripcion categoria 8',
    },
    {
      name: 'Categoria 9',
      description: 'descripcion categoria 9',
    },
    {
      name: 'Categoria 10',
      description: 'descripcion categoria 10',
    },
  ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categorie', null, {})
  }
};
