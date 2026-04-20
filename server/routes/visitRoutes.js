const express = require('express');
const router = express.Router();
// getVisitStatusByPhone ko import me add kiya
const { approveVisit, scanQRCode, getHostVisits, getVisitStatusByPhone } = require('../controllers/visitController'); 

router.put('/approve/:id', approveVisit);
router.post('/scan', scanQRCode);
router.get('/host/:hostId', getHostVisits);
router.get('/status/:phone', getVisitStatusByPhone); // NAYI LINE: Visitor ke status check ke liye

module.exports = router;