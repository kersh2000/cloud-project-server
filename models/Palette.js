const {Sequelize, sequelize} = require('../db/db');

const Palette = sequelize.define('palette', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  colours: Sequelize.JSON,
  public: Sequelize.BOOLEAN
});

module.exports = { Palette };
