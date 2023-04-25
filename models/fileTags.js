const { Sequelize, DataTypes } = require('sequelize');
const  db = require('../config/db');
const FileTags = db.define('file_tags', {

    // Other fields specific to your FileTags model
    fileId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'files',
            key: 'id'
        },
        onUpdate: 'CASCADE',
    },
    tagId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tags',
            key: 'id'
        },
        onUpdate: 'CASCADE',
    },


});

// Define the association between User and Tag models
FileTags.associate = (models) => {
    FileTags.belongsTo(models.File, {
        foreignKey: 'fileId',
        onDelete: 'CASCADE',
    });
    FileTags.belongsTo(models.Tag, {
        foreignKey: 'tagId',
        onDelete: 'CASCADE',
    });
};
module.exports = FileTags;
