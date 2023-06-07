const express = require('express');
const cors = require('cors');
const path = require('path');
const { Palette, User, sequeluze } = require('./models');

const { sequelize } = require('./db/db');
const seed = require('./db/seedFn');
const app = express();

const { PORT = 5000 } = process.env;

app.use(express.json());
app.use(cors({origin: 'https://cloud-project-client.onrender.com/'}));

app.get('/api', (req, res) => {
  res.status(200).send({
    "data": ["userOne", "userTwo", "userThree"]
  });
});

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.status(200).send(users);
});

app.get('/seed', async (req, res) => {
  try {
    await seed();
    res.status(200).send({"message": "Successfully seeded database."})
  } catch (error){
    console.error(error);
    res.status(500).send({"message": "Internal error when attempting to seed database."})
  }
});

app.listen(PORT, () => {
  sequelize.sync({ force: false});
  console.log(`Listening on port ${PORT}...`)
});