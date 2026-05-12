const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile('./data/equipo.json', 'utf-8');
    const equipo = JSON.parse(data);
    console.log('GET /equipo ejecutado');
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el equipo' });
  }
});

module.exports = router;