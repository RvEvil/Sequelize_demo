const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.js');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};

db.User = require('./user.js')(sequelize, Sequelize);

module.exports = db;
