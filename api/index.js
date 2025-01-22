const express = require('express');
//const bodyParser = require('body-parser');
//require('dotenv').config();
const cors = require('cors');

const timeSheetsRoutes = require('./routes/timeSheets');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
//app.use(bodyParser.json());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});


// Rutas
app.use('/api', timeSheetsRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;



