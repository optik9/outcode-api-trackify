const express = require('express');
const cors = require('cors');
//const standupRoutes = require('./routes/standupRoutes');
const timeSheetsRoutes = require('./routes/timeSheets');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', timeSheetsRoutes);

// Manejo de errores global xoxo
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


