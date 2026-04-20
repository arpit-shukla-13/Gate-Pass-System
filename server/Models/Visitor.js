const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    photoUrl: { type: String }, // Firebase ya Cloudinary ka link aayega yaha
    idProof: { type: String },  // Aadhar ya koi ID
    isBlacklisted: { type: Boolean, default: false } // Agar kisi ko ban karna ho
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);