const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/servicios.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const servicios = JSON.parse(data);
    console.log('GET /servicios ejecutado');
    res.json(servicios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener los servicios' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/servicios.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const servicios = JSON.parse(data);
    const servicio = servicios.find(s => s.id === parseInt(req.params.id));
    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }
    console.log(`GET /servicios/${req.params.id} ejecutado`);
    res.json(servicio);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener el servicio' });
  }
});

module.exports = router;