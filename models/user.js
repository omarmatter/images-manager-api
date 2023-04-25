 
const { Sequelize, DataTypes } = require('sequelize');
const  db = require('../config/db');
const Folder = require('./folder');
    const User =   db.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Name is required'
                }
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Email is required'
                },
                isEmail: {
                    msg: 'Email is not valid'
                },
               // unqiue email
                isUnique: async (value, next) => {
                    const user = await User.findOne({ where: { email: value } });
                    if (user) {
                        return next('Email address already in use');
                    }
                    return next();
                }
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Password is required'
                },
                len: {
                    args: [6],
                    msg: 'Password must be between 6 and 20 characters'
                }
            },

        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        // Reference to folder table
       


    },
     
    );
Folder.belongsTo(User);
User.hasMany(Folder);
module.exports = User;