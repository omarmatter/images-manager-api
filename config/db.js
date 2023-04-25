// config/db.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();



const sequelize = new Sequelize(
    process.env.DB_NAME || 'test',
     process.env.DB_USERNAME || 'root',
     process.env.DB_PASSWORD || '',{
  host: process.env.DB_HOST || 'localhost',
  dialect: process.env.DB_CONNECTIONo || 'mysql', // replace with your database dialect
});
// test connection
sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.log('Unable to connect to the database:');
});

module.exports = sequelize;