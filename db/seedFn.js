const {sequelize} = require('./db');
const {Palette, User} = require('../models');
const {palettes, users} = require('./seedData');

const seed = async () => {
  await sequelize.sync({ force: true });
  const paletteArr = await Palette.bulkCreate(palettes);
  const userArr = await User.bulkCreate(users);

  paletteArr.forEach( async palette => {
    const randomIndex = Math.floor(Math.random() * userArr.length);
    await userArr[randomIndex].addPalette(palette);
  });
};

module.exports = seed;
