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

module.exports = {
    getAll,
    getSingle,
    memoryCreate

}