const express = require('express');
const cors = require('cors');
const { Palette, User, sequelize } = require('./models');
const seed = require('./db/seedFn');
const { verifyUser, verifyNewUser, verifyUserById } = require('./middleware/checkUser');
const { verifyPaletteById } = require('./middleware/checkPalette');

const app = express();
const { PORT = 5000 } = process.env;

app.use(cors({ origin: '*', exposedHeaders: '*' }));
app.use(express.json());

// Welcome page
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

// Seed data endpoint
app.get('/seed', async (req, res) => {
  try {
    await seed();
    res.status(200).send({"message": "Successfully seeded database."})
  } catch (error){
    console.error(error);
    res.status(500).send({"message": "Internal error when attempting to seed database."})
  }
});

// Login endpoint
app.post('/login', verifyUser, async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    if (req.user.password === password) {
      res.status(200).send({ message: 'Login successful', id: req.user.id });
    } else {
      res.status(400).send({ message: 'Invalid details' });
    }
  } else {
    res.status(400).send({ message: 'Invalid credentials' });
  }
});

// Register new user endpoint
app.post('/register', verifyNewUser, async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const {id} = await User.create({username, password});
    res.status(201).send({ message: 'User registered successfully', id: id });
  } else {
    res.status(400).send({ message: 'Invalid registration details'});
  }
});

// Create palette for a user endpoint
app.post('/users/:userId/palettes', verifyUserById, async (req, res) => {
  const { title, description, colours, public } = req.body;
  if (title && description && colours && public) {
    try {
      const palette = await Palette.create({title, description, colours, public});
      await palette.setUser(req.user);
      res.status(201).send({ message: 'Palette created successfully' });
    } catch (error) {
      res.status(400).send({ message: 'Invalid palette details' })
      console.error(error)
    }
  } else {
    res.status(400).send({ message: 'Missing palette details' });
  }
});

// Edit a palette for a user endpoint
app.put('/users/:userId/palettes/:paletteId', verifyPaletteById, verifyUserById, async (req, res) => {
  const { title, description, colours, public } = req.body;
  if (title && description && colours && public) {
    try {
      await req.palette.update({
        title, description, colours, public
      });
      res.status(201).send({ message: 'Palette successfully updated' });
    } catch (error) {
      res.status(400).send({ message: 'Invalid palette details' })
      console.error(error)
    }
  } else {
    res.status(400).send({ message: 'Missing palette details' });
  }
});

// Delete a palette for a user endpoint
app.delete('/users/:userId/palettes/:paletteId', verifyPaletteById, verifyUserById, async (req, res) => {
  try {
    await req.palette.destroy();
    res.status(200).send({ message: 'Palette deleted successfully' });
  } catch {
    res.status(400).send({ message: 'Unable to delete palette' })
  }
});

// Get a user's palettes endpoint
app.get('/users/:userId/palettes', verifyUserById, async (req, res) => {
  const palettes = await req.user.getPalettes();
  res.status(200).send(palettes);
});

// Get all public palettes endpoint
app.get('/palettes/public', async (req, res) => {
  try {
    const publicPalettes = await Palette.findAll({
      where: {
        public: true
      },
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const formattedPalettes = publicPalettes.map((palette) => {
      const { id, title, description, colours, public, user } = palette;
      return {
        id,
        title,
        description,
        colours,
        public,
        creator: user.username
      };
    });

    res.status(200).send(formattedPalettes);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Unable to fetch public palettes' });
  }
});


app.listen(PORT, () => {
  sequelize.sync({ force: false });
  console.log(`Listening on port ${PORT}...`);
});
