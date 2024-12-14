require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/database');
const authRoutes = require('../routes/auth.routes');
const inventoryRoutes = require('../routes/inventory.routes');
const supplierRoutes = require('../routes/supplier.routes');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: 'Server is running', environment: process.env.NODE_ENV });
});

// Routes
app.use("/auth", authRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/supplier", supplierRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error' 
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
