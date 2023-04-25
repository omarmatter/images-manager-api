'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     *
     */
    await queryInterface.createTable('users', { id: Sequelize.INTEGER ,
      name: Sequelize.STRING ,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE

    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * 
     */
    await queryInterface.dropTable('users');
  }
};
