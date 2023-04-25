const { Sequelize, DataTypes } = require('sequelize');
const  db = require('../config/db');
const User = require('./user');
const Tag = db.define('Tag', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    // Other fields specific to your Tag model
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        onUpdate: 'CASCADE',
    },
});

// Define the association between User and Tag models
Tag.associate = (models) => {
    Tag.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });
    Tag.belongsToMany(models.File, {
        through: 'FileTags',
        foreignKey: 'tagId',
        onDelete: 'CASCADE',
    });
};


module.exports = Tag;
