const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    visitorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Visitor', // Visitor model se link kar rahe hain
        required: true 
    },
    hostId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // User (Host) model se link kar rahe hain
        required: true 
    },
    purpose: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending' 
    },
    qrCodeData: { type: String }, // Approval ke baad jo unique string banegi
    entryTime: { type: Date }, // Jab guard andar aane dega
    exitTime: { type: Date },  // Jab visitor bahar jayega
    validTill: { type: Date }  // Pass kab tak valid hai
}, { timestamps: true });

module.exports = mongoose.model('Visit', visitSchema);