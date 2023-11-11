const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("todo", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
