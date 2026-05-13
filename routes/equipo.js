const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/equipo.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const equipo = JSON.parse(data);
    console.log('GET /equipo ejecutado');
    res.json(equipo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener el equipo' });
  }
});

module.exports = router;