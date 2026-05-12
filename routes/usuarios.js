const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile('./data/usuarios.json', 'utf-8');
    const usuarios = JSON.parse(data);
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    console.log(`GET /perfil/${req.params.id} ejecutado`);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
});

module.exports = router;