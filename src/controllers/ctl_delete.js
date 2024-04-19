const express = require('express');
const app = express();

// Endpoint para manejar la solicitud DELETE
app.delete('/delete/:userId', (req, res) => {
    const userId = req.params.userId;

    // Aquí se ejecutaría la lógica para eliminar la sesión de la base de datos
    // Por ejemplo, usando un ORM como Mongoose para MongoDB, o consultas SQL para bases de datos relacionales

    // Código de ejemplo usando Mongoose (para MongoDB)
    // Supongamos que tienes un modelo de sesión llamado Session
    // Session.deleteOne({ userId: userId })
    //     .then(() => {
    //         res.status(200).send('Sesión eliminada exitosamente');
    //     })
    //     .catch(err => {
    //         console.error('Error al eliminar sesión:', err);
    //         res.status(500).send('Error al eliminar sesión');
    //     });

    // Ejemplo de código usando SQL (para bases de datos relacionales)
    // pool.query('DELETE FROM sessions WHERE userId = ?', [userId], (error, results) => {
    //     if (error) {
    //         console.error('Error al eliminar sesión:', error);
    //         res.status(500).send('Error al eliminar sesión');
    //     } else {
    //         res.status(200).send('Sesión eliminada exitosamente');
    //     }
    // });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
