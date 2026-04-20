const express = require('express');
const router = express.Router();
const { createGatePassRequest } = require('../controllers/visitorController');

router.post('/request-pass', createGatePassRequest);

module.exports = router;