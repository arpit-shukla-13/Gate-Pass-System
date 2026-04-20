const express = require('express');
const router = express.Router();

// Saare functions ko controller se import kiya
const { 
    registerUser, 
    loginUser, 
    getHosts, 
    getAllUsers, 
    updateUser, 
    deleteUser 
} = require('../controllers/authController');

// Purane Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/hosts', getHosts);

// --- NAYE ADMIN ROUTES ---
router.get('/users', getAllUsers);        // Saare staff ko dekhne ke liye
router.put('/users/:id', updateUser);     // Staff ki detail edit karne ke liye
router.delete('/users/:id', deleteUser);  // Staff ko delete karne ke liye

module.exports = router;