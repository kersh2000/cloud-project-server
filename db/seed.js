const {sequelize} = require('./db');
const seed = require('./seedFn');

seed()
  .then(() => {
    console.log('Seeding data...');
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    console.log('Completed!');
    sequelize.close();
  });
  