const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
    manufacturer: { type: String, required: true },
    model: { type: String, required: true, unique: true },
    characteristics: {
        capacity: { type: String, required: true },
        generation: { type: String, required: true },
        speed: { type: String, required: true },
        latency: { type: String },
        form_factor: { type: String },
        features: { type: String }
    },
    presentation_date: { type: Date },
    initial_price_usd: { type: Number }
}, {
    timestamps: true
});

const Memory = mongoose.model('Memory', MemorySchema, 'memory'); 

module.exports = Memory;