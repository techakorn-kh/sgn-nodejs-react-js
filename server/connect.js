const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_HOST) // Example for postgres

sequelize.authenticate().then(() => {
    console.log(`****** Connection has been established successfully. ******`);
}).catch((err) => {
    console.error('Unable to connect to the database: ', err);
});

module.exports = {
    sequelize
}