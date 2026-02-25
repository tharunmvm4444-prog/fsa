const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    logo: { type: String }, // URL to logo
    category: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    followersCount: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
    yearsActive: { type: Number },
    contactInfo: {
        email: { type: String },
        phone: { type: String }
    },
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Business', businessSchema);
