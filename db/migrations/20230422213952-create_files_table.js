'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable ('files', { id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
     },
        name: Sequelize.STRING,
        url: Sequelize.STRING,
        // reference to user table
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
        },
        // reference to folder table
        folderId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'folders',
            key: 'id'
          },
          onUpdate: 'CASCADE',
      },
      
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
