const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const serviciosRouter = require('./routes/servicios');
const equipoRouter = require('./routes/equipo');
const usuariosRouter = require('./routes/usuarios');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.use('/servicios', serviciosRouter);
app.use('/equipo', equipoRouter);
app.use('/perfil', usuariosRouter);
app.use('/login', usuariosRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;