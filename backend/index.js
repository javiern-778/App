const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Backend funcionando en Render!');
});

app.get("/perfiles", (req, res) => {
  res.json([
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Docente' },
    { id: 3, nombre: 'Residente' }
  ]);
});

app.post("/perfiles", (req, res) => {
  const nuevoPerfil = req.body;
  console.log('Perfil recibido:', nuevoPerfil);
  res.status(201).json({ mensaje: 'Perfil registrado', perfil: nuevoPerfil });
});

// 👇 Nueva ruta agregada
app.get("/evaluaciones", (req, res) => {
  // Aquí normalmente obtendrías datos de una base de datos
  res.json([
    { id: 1, evaluador: "Docente 1", resultado: "Aprobado" },
    { id: 2, evaluador: "Docente 2", resultado: "Pendiente" }
  ]);
});

app.post("/evaluaciones", (req, res) => {
  const nuevaEvaluacion = req.body;
  console.log('Evaluación recibida:', nuevaEvaluacion);

  // Aquí normalmente guardarías la evaluación en la base de datos

  res.status(201).json({ mensaje: 'Evaluación registrada', evaluacion: nuevaEvaluacion });
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
