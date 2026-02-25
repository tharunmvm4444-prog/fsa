const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    title: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }], // Array of image URLs
    price: { type: Number, required: true },
    stock: { type: Number, default: 1 },
    type: { type: String, enum: ['product', 'service'], default: 'product' },
    deliveryType: { type: String, enum: ['shipping', 'pickup'], default: 'shipping' },
    deliveryEstimate: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Listing', listingSchema);
