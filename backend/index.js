const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Backend funcionando en Render!');
});

app.get('/perfiles', (req, res) => {
  res.json([
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Docente' },
    { id: 3, nombre: 'Residente' }
  ]);
});

app.post('/perfiles', (req, res) => {
  const nuevoPerfil = req.body;
  console.log('Perfil recibido:', nuevoPerfil);
  res.status(201).json({ mensaje: 'Perfil registrado', perfil: nuevoPerfil });
});

// 👇 Nueva ruta agregada
app.post('/usuarios', (req, res) => {
  const nuevoUsuario = req.body;
  console.log('Usuario recibido:', nuevoUsuario);
  res.status(201).json({ mensaje: 'Usuario registrado', usuario: nuevoUsuario });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
