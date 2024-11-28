require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// الاتصال بقاعدة البيانات
connectDB();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/visions', require('./routes/visionRoutes')); 
// Start the server
app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
});
