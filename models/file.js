 
const { Sequelize, DataTypes } = require('sequelize');
const  db = require('../config/db');
const User = require('./user');
const Tag = require('./tag');
const FileTags = require('./fileTags');
const dotenv = require('dotenv');
dotenv.config();
const File = db.define('File', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    url : {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            const url = this.getDataValue('url');
            return `${process.env.APP_URL}/files/${url}`;
          }


    },

    // Other fields specific to your Folder model
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        onUpdate: 'CASCADE',
    },
    folderId :{
        type: DataTypes.INTEGER,
        references: {
            model: 'folders',
            key: 'id'
        },
        onUpdate: 'CASCADE',

    },
     

  });
  
  // Define the association between User and Folder models
  File.associate = (models) => {
    File.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    File.belongsTo(models.Folder, {
        foreignKey: 'folderId',
        onDelete: 'CASCADE',
      });

     
  };

  File.belongsToMany(Tag, {
    through: FileTags,
    foreignKey: 'fileId',
    onDelete: 'CASCADE',
});

  module.exports = File;

  
  
  
  
  
  
  