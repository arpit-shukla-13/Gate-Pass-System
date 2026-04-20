const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // JSON data parse karne ke liye

// --- SARE API ROUTES YAHA HAIN ---
const authRoutes = require('./routes/authRoutes');
const visitorRoutes = require('./routes/visitorRoutes'); 
const visitRoutes = require('./routes/visitRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/visitors', visitorRoutes); 
app.use('/api/visits', visitRoutes); 
// ---------------------------------

// Test Route
app.get('/', (req, res) => {
    res.send('Gate Pass System API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in development mode on port ${PORT}`);
});