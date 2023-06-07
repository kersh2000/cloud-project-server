const { User } = require('./User');
const { Palette } = require('./Palette');
const {sequelize, Sequelize} = require('../db/db');

Palette.belongsTo(User);
User.hasMany(Palette);

module.exports = {
  Palette,
  User,
  sequelize,
  Sequelize
};