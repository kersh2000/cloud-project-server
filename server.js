const express = require('express');
const cors = require('cors');
const path = require('path');
const { Palette, User, sequeluze } = require('./models');

const { sequelize } = require('./db/db');
const seed = require('./db/seedFn');
const app = express();

const { PORT = 5000 } = process.env;

app.use(cors({origin: '*'}));
app.use(express.json());

app.get('/', (req, res) => {
  const title = 'Welcome to Colour Palette API';

  const css = `
    <style>
      body {
        background-color: #111;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-family: 'Arial Black', sans-serif;
      }

      .title {
        font-size: 8vw;
        font-weight: bold;
        text-align: center;
        background: linear-gradient(to right, #fc7fb2, #ff9e7c, #ffe070, #a4e57d, #77cdff, #c884e8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      }

    </style>
  `;

  const html = `
    <html>
      <head>
        <title>Welcome to Colour Palette API</title>
        ${css}
      </head>
      <body>
        <h1 class="title">${title}</h1>
      </body>
    </html>
  `;

  res.send(html);
});

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