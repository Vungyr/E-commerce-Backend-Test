'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [{
      name: 'Admin 1',
      email: 'admin1@gmail.com',
      password: '$2b$10$qKWDIG772Xl6aFuLehhTQucTnpB9FoKhrAPXXsGyfbvFtxLh83B.C', //123
      is_admin: 1,
    },
    {
      name: 'Admin 2',
      email: 'admin2@gmail.com',
      password: '$2b$10$qKWDIG772Xl6aFuLehhTQucTnpB9FoKhrAPXXsGyfbvFtxLh83B.C', //123
      is_admin: 1,
    },
    {
      name: 'Admin 3',
      email: 'admin3@gmail.com',
      password: '$2b$10$qKWDIG772Xl6aFuLehhTQucTnpB9FoKhrAPXXsGyfbvFtxLh83B.C', //123
      is_admin: 1,
    },
    {
      name: 'Admin 4',
      email: 'admin4@gmail.com',
      password: '$2b$10$qKWDIG772Xl6aFuLehhTQucTnpB9FoKhrAPXXsGyfbvFtxLh83B.C', //123
      is_admin: 1,
    },
    {
      name: 'User 1',
      email: 'user1@gmail.com',
      password: '$2b$10$qKWDIG772Xl6aFuLehhTQucTnpB9FoKhrAPXXsGyfbvFtxLh83B.C', //123
      is_admin: 0,
    },
    {
      name: 'User 2',
      email: 'user2@gmail.com',
      password: '$2b$10$qKWDIG772Xl6aFuLehhTQucTnpB9FoKhrAPXXsGyfbvFtxLh83B.C', //123
      is_admin: 0,
    },
    {
      name: 'User 3',
      email: 'user3@gmail.com',
      password: '$2b$10$qKWDIG772Xl6aFuLehhTQucTnpB9FoKhrAPXXsGyfbvFtxLh83B.C', //123
      is_admin: 0,
    },
    {
      name: 'User 4',
      email: 'user4@gmail.com',
      password: '$2b$10$qKWDIG772Xl6aFuLehhTQucTnpB9FoKhrAPXXsGyfbvFtxLh83B.C', //123
      is_admin: 0,
    },
  ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {})
  }
};
