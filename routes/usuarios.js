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

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const filePath = path.join(__dirname, '../data/usuarios.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const usuarios = JSON.parse(data);
    const usuario = usuarios.find(u => u.mail === email && u.password === password);
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    console.log(`POST /login ejecutado - usuario: ${usuario.nombre}`);
    res.json({ id: usuario.id, nombre: usuario.nombre });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = router;