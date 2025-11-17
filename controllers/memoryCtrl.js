const mongodb = require('../config/db');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags = ['Memories']
    const result = await mongodb.getDB().db('hardware').collection('memory').find();
    result.toArray().then( (device) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(device);
    });
}

const getSingle = async (req, res) => {
    // #swagger.tags = ['Memories']
    const itemId = new ObjectId( req.params.id );
    const result = await mongodb.getDB().db('hardware').collection('memory').find({_id: itemId});
        result.toArray().then( (device) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(device);
    });
}

const memoryCreate = async (req, res) => {
    // #swagger.tags = ['Memories']
    try {
        const memorie = {
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            characteristics: {
                capacity: req.body.characteristics.capacity,
                generation: req.body.characteristics.generation,
                speed: req.body.characteristics.speed,
                latency: req.body.characteristics.latency,
                form_factor: req.body.characteristics.form_factor,
                features: req.body.characteristics.features
            },
            presentation_date: req.body.presentation_date,
            initial_price_usd: req.body.initial_price_usd
        };

        const response = await mongodb.getDB().db('hardware').collection('memory').insertOne( memorie );

        if (response.acknowledged) {
            res.status(201).json({ message: 'Mmeory created successfully', id: response.insertedId });
        } else {
            res.status(400).json({ error: 'Failed to create Memory' });
        };

    } catch (error) {
        console.error('Error creating device:', error);
        res.status(500).json({ error: 'Internal server error' });
    };
}

const deleteMemory = async (req, res) => {
    // #swagger.tags = ['Memories']
    try {
        const deviceId = new ObjectId(req.params.id);

        const response = await mongodb.getDB().db('hardware').collection('memory').deleteOne({ _id: deviceId});

        if (response.deleteCount > 0) {
            res.status(200).json( { message: 'Memory ID record deleted SUCCESSFULLY'})
        } else {
            res.status(404).json({ error: 'Memory ID not found or already deleted'});
        }
    } catch (err) {
        console.error('Error deleting Memory ID:', err);
        res.status(500).json({ err: 'Internal server error' });
    }
}

const updateMemory = async (req, res) => {
    // #swagger.tags = ['Memories']
    try {
        const deviceId = new ObjectId(req.params.id);

        const updateFields = {};

        if (req.body.manufacturer) updateFields.manufacturer = req.body.manufacturer;
        if (req.body.model) updateFields.model = req.body.model;
        if (req.body.presentation_date) updateFields.presentation_date = req.body.presentation_date;
        if (req.body.initial_price_usd) updateFields.initial_price_usd = req.body.initial_price_usd;

        if (req.body.characteristics) {
            updateFields.characteristics = {};
            const c = req.body.characteristics;
            if (c.capacity) updateFields.characteristics.capacity = c.capacity;
            if (c.generation) updateFields.characteristics.generation = c.generation;
            if (c.speed) updateFields.characteristics.speed = c.speed;
            if (c.latency) updateFields.characteristics.latency = c.latency;
            if (c.form_factor) updateFields.characteristics.form_factor = c.form_factor;
            if (c.features) updateFields.characteristics.features = c.features;
        }

        const response = await mongodb.getDB().db('hardware').collection('memory').updateOne({ _id: deviceId }, { $set: updateFields });

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Memmory updated successfully' });
        } else {
            res.status(404).json({ error: 'Memory not found or no changes applied' });
        }
    } catch (error) {
        console.error('Error updating Memory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAll,
    getSingle,
    memoryCreate,
    deleteMemory,
    updateMemory
}