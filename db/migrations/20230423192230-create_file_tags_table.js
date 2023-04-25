'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('file_tags', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      fileId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'files',
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tags',
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
