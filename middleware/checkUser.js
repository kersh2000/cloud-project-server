const { User } = require('../models');

const verifyUser = async (req, res, next) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Attach the user object to the request for further use in the route handlers
    req.user = user;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const verifyNewUser = async (req, res, next) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (user) {
      return res.status(400).send({ message: 'User already exists' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const verifyUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ message: `User not found` });
    }

    // Attach the user object to the request for further use in the route handlers
    req.user = user;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  verifyUser,
  verifyNewUser,
  verifyUserById
};