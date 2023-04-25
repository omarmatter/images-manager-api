 
const { Sequelize, DataTypes } = require('sequelize');
const  db = require('../config/db');
const User = require('./user');
const Folder = db.define('Folder', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
  });
  
  // Define the association between User and Folder models
  
  module.exports = Folder;

  
  
  
  
  
  
  