const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/tu_basededatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexión a MongoDB establecida'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir un esquema para las sesiones
const sessionSchema = new mongoose.Schema({
  // Define aquí la estructura de tus sesiones
});

// Definir un modelo para las sesiones
const Session = mongoose.model('Session', sessionSchema);

// Endpoint para eliminar una sesión
app.delete('/sessions/:id', async (req, res) => {
  try {
    const deletedSession = await Session.findByIdAndDelete(req.params.id);
    if (!deletedSession) {
      return res.status(404).send('La sesión no fue encontrada');
    }
    res.send('Sesión eliminada correctamente');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
