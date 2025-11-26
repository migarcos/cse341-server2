const mongoose = require('mongoose');

const processorSchema = new mongoose.Schema({
    manufacturer: { type: String, required: true },
    model: { type: String, required: true, unique: true },
    characteristics: {
        cores: { type: Number, required: true },
        threads: { type: Number, required: true },
        base_clock: { type: String },
        max_boost_clock: { type: String },
        cache: { type: String },
        socket: { type: String, required: true },
        integrated_graphics: { type: String },
        target_use: { type: String }
    },
    presentation_date: { type: Date },
    initial_price_usd: { type: Number }
}, {
    timestamps: true // Add automatically createdAt y updatedAt
});

const Processor = mongoose.model('Processor', processorSchema, 'processor');

module.exports = Processor;