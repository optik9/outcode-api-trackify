const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const timeSheetsRoutes = require('./routes/timeSheets');

const app = express();

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api', timeSheetsRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});