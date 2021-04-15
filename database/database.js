const Sequelize = require('sequelize');
const connection = new Sequelize('apirestfirst', 'root', 'Amanda@230406',{
host:'localhost',
dialect: 'mysql'
});
 module.exports = connection;