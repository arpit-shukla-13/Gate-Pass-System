const Visit = require('../Models/Visit');
const QRCode = require('qrcode');
const Visitor = require('../Models/Visitor');

// @desc    Host approves a visit and generates QR Code
// @route   PUT /api/visits/approve/:id
const approveVisit = async (req, res) => {
    try {
        const visitId = req.params.id;

        // 1. Visit request find karo
        const visit = await Visit.findById(visitId);

        if (!visit) {
            return res.status(404).json({ message: 'Visit request not found' });
        }

        if (visit.status === 'Approved') {
            return res.status(400).json({ message: 'Visit is already approved' });
        }

        // 2. QR Code ke liye unique data taiyar karo
        const qrDataString = JSON.stringify({
            visitId: visit._id,
            visitorId: visit.visitorId,
            hostId: visit.hostId
        });

        // 3. QR Code ki image (Base64 format) generate karo
        const qrCodeImage = await QRCode.toDataURL(qrDataString);

        // 4. Database me update karo
        visit.status = 'Approved';
        visit.qrCodeData = qrCodeImage;
        // Pass 1 din ke liye valid rahega
        visit.validTill = new Date(Date.now() + 24 * 60 * 60 * 1000); 

        const updatedVisit = await visit.save();

        res.status(200).json({
            message: 'Visit Approved successfully. QR Code generated!',
            visit: updatedVisit
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Guard scans the QR code to allow entry/exit
// @route   POST /api/visits/scan
// @desc    Guard scans the QR code to allow entry/exit
// @route   POST /api/visits/scan
const scanQRCode = async (req, res) => {
    try {
        const { scannedData } = req.body; 

        if (!scannedData) {
            return res.status(400).json({ message: 'No QR data provided' });
        }

        console.log("Raw Scanned Data received in backend:", scannedData);

        let parsedData;
        let visitId;

        // SAFE PARSING LOGIC
        try {
             // Pehle dekhte hain agar ye properly formatted JSON string hai
             parsedData = typeof scannedData === 'string' ? JSON.parse(scannedData) : scannedData;
             visitId = parsedData.visitId || parsedData; // Agar seedha ID bhej di ho toh fallback
        } catch (parseError) {
             console.log("JSON Parse Failed, assuming scannedData is raw ID string.");
             // Agar parse nahi hua, toh maan lete hain ki raw string hi ID hai
             visitId = scannedData; 
        }

        console.log("Extracted Visit ID:", visitId);

        if(!visitId) {
             return res.status(400).json({ message: 'Could not extract Visit ID from QR Code' });
        }

        // Database me us visit ko dhundo aur details populate karo
        const visit = await Visit.findById(visitId).populate('visitorId', 'name phone photoUrl isBlacklisted').populate('hostId', 'name');

        if (!visit) {
            return res.status(404).json({ message: 'Invalid Pass: Visit not found' });
        }

        // 1. Check if Pass is Approved
        if (visit.status !== 'Approved') {
            return res.status(403).json({ message: 'Access Denied: Pass is not approved yet' });
        }

        // 2. Check if Blacklisted
        if (visit.visitorId.isBlacklisted) {
            return res.status(403).json({ message: 'Access Denied: Visitor is blacklisted!' });
        }

        // 3. Check Expiry
        const currentTime = new Date();
        if (currentTime > visit.validTill) {
            return res.status(403).json({ message: 'Access Denied: Pass has expired' });
        }

        // 4. Entry ya Exit mark karo (FIX: res.json bhejna hai message ke sath)
        if (!visit.entryTime) {
            visit.entryTime = currentTime;
            await visit.save();
            return res.status(200).json({ 
                status: 'Access Granted', 
                message: 'Check-In Successful', 
                visitorDetails: visit.visitorId 
            });
        } else if (!visit.exitTime) {
            visit.exitTime = currentTime;
            await visit.save();
            return res.status(200).json({ 
                status: 'Checkout Granted', 
                message: 'Check-Out Successful', 
                visitorDetails: visit.visitorId 
            });
        } else {
            return res.status(400).json({ message: 'Access Denied: This pass has already been used for both entry and exit' });
        }

    } catch (error) {
        console.error("Scanning Error in Backend:", error);
        res.status(500).json({ message: 'Server error while validating pass' });
    }
};

// @desc    Get all visits for a specific host
// @route   GET /api/visits/host/:hostId
const getHostVisits = async (req, res) => {
    try {
        // Host ki saari visits nikal rahe hain aur visitor ki details bhi join (populate) kar rahe hain
        const visits = await Visit.find({ hostId: req.params.hostId })
            .populate('visitorId', 'name phone photoUrl idProof')
            .sort({ createdAt: -1 }); // Nayi request sabse upar aayegi
        res.status(200).json(visits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get visit status by visitor's phone number
// @route   GET /api/visits/status/:phone
const getVisitStatusByPhone = async (req, res) => {
    try {
        const { phone } = req.params;

        // 1. Pehle visitor ko phone number se dhundo
        const visitor = await Visitor.findOne({ phone });
        if (!visitor) {
            return res.status(404).json({ message: 'No record found for this phone number' });
        }

        // 2. Us visitor ki sabse recent visit request nikalo
        const visit = await Visit.findOne({ visitorId: visitor._id })
            .populate('hostId', 'name') // Host ka naam bhi bhejenge
            .sort({ createdAt: -1 });   // Sabse latest request

        if (!visit) {
            return res.status(404).json({ message: 'No pass requests found' });
        }

        res.status(200).json({ visit, visitor });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// EXPORTS KO UPDATE KARNA MAT BHULNA:
module.exports = { approveVisit, scanQRCode, getHostVisits, getVisitStatusByPhone };
