const Visitor = require('../Models/Visitor');
const Visit = require('../Models/Visit');
const User = require('../Models/User');

// @desc    Visitor gate pass ki request bheje (Creates Visitor & Visit)
// @route   POST /api/visitors/request-pass
const createGatePassRequest = async (req, res) => {
    const { name, phone, photoUrl, idProof, hostId, purpose } = req.body;

    try {
        // 1. Check karo ki jis Host se milna hai, wo exist karta bhi hai ya nahi
        const host = await User.findById(hostId);
        if (!host || host.role !== 'host') {
            return res.status(404).json({ message: 'Valid Host not found' });
        }

        // 2. Check karo ki visitor pehle se database me hai ya naya hai (Phone number se)
        let visitor = await Visitor.findOne({ phone });
        
        if (!visitor) {
            // Naya visitor hai toh create karo
            visitor = await Visitor.create({ name, phone, photoUrl, idProof });
        } else if (visitor.isBlacklisted) {
            // Agar pehle se hai aur blacklisted hai toh andar aane se mana kar do
            return res.status(403).json({ message: 'This visitor is blacklisted. Entry denied.' });
        }

        // 3. Visit (Pass) ki ek pending request create karo
        const visit = await Visit.create({
            visitorId: visitor._id,
            hostId: host._id,
            purpose,
            status: 'Pending'
        });

        res.status(201).json({ 
            message: 'Gate pass request successfully sent to Host for approval', 
            visit 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createGatePassRequest };