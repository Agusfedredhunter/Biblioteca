const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/usuarios.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const usuarios = JSON.parse(data);
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    console.log(`GET /perfil/${req.params.id} ejecutado`);
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
});

module.exports = router;