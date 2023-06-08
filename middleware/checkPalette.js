const { Palette } = require('../models');

const verifyPaletteById = async (req, res, next) => {
  const { paletteId } = req.params;

  try {
    const palette = await Palette.findByPk(paletteId);

    if (!palette) {
      return res.status(404).send({ message: `Palette not found` });
    }

    // Attach the palette object to the request for further use in the route handlers
    req.palette = palette;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  verifyPaletteById
};