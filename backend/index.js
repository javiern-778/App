// backend/index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Permitir peticiones desde otros orígenes (por ejemplo, tu frontend en localhost o Render)
const cors = require('cors');
app.use(cors());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Backend funcionando en Render!');
});

// Ruta /perfiles
app.get('/perfiles', (req, res) => {
  res.json([
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Docente' },
    { id: 3, nombre: 'Residente' }
  ]);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
