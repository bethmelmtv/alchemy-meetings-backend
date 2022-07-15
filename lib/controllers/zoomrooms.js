const { Router } = require('express');
const Zoomroom = require('../models/Zoomroom');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Zoomroom.getAll();
      res.json(data);
    } catch (error) {
      next(error);
    }
  });