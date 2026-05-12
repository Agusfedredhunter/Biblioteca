const express = require('express');
const cors = require('cors');
require('dotenv').config();

const serviciosRouter = require('./routes/servicios');
const equipoRouter = require('./routes/equipo');
const usuariosRouter = require('./routes/usuarios');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/servicios', serviciosRouter);
app.use('/equipo', equipoRouter);
app.use('/perfil', usuariosRouter);
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Helenic Works funcionando correctamente' });
});
module.exports = app;