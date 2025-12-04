// const mongodb = require('../config/db');
// const ObjectId = require('mongodb').ObjectId;

const Memory = require('../models/Memory'); 

const getAll = async (req, res) => {
    // #swagger.tags = ['Memories']
    try {
        
        const memories = await Memory.find({}); 
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(memories);
    } catch (error) {
        console.error(`Error fetching memories list: ${error}`);
        res.status(500).json({ error: 'Internal Server Error'});
    }
}

const getSingle = async (req, res) => {
    // #swagger.tags = ['Memories']
    try {
        const { id } = req.params;
        
        const device = await Memory.findById(id); 

        if (!device) {
            return res.status(404).json({ error: 'Memory not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(device);
    } catch (error) {
        console.error('Error fetching memory:', error);
        // CastError ocurre si el formato del ID es inválido
        if (error.name === 'CastError') {
             return res.status(400).json({ error: 'Invalid ID format', message: 'The provided ID is not a valid MongoDB ObjectId.' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

const memoryCreate = async (req, res) => {
    // #swagger.tags = ['Memories']
    /* #swagger.parameters['body'] = {
            in: 'body',
            description: 'New memory module info',
            required: true,
            schema: {
                manufacturer: "",
                model: "",
                characteristics: {
                    capacity: "",
                    generation: "",
                    speed: "",
                    latency: "",
                    form_factor: "",
                    features: ""
                },
                presentation_date: "2023-01-01",
                initial_price_usd: 50.00
            }
    } */
    try {
        const newMemory = new Memory(req.body);

        const response = await newMemory.save(); 
        res.status(201).json(response); 

    } catch (error) {
        console.error('Error creating device:', error);
        
        if (error.code === 11000) {
            return res.status(409).json({ 
                error: 'Conflict', 
                message: 'A memory module with this model already exists.' 
            });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                error: 'Validation Failed', 
                message: error.message 
            });
        }
        
        res.status(500).json({ error: 'Internal server error' });
    };
}

const deleteMemory = async (req, res) => {
    // #swagger.tags = ['Memories']
    try {
        const { id } = req.params;

        const response = await Memory.findByIdAndDelete(id);

        if (!response) {
            return res.status(404).json({ 
                error: 'Memory ID not found or already deleted',
                message: `The record with ID ${id} does not exist.`
            });
        }
        
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting Memory ID:', err);

        if (err.name === 'CastError') {
             return res.status(400).json({ error: 'Invalid ID format', message: 'The provided ID is not a valid MongoDB ObjectId.' });
        }

        res.status(500).json({
             error: 'Internal server error',
             details: err.message || 'An unexpected error occurred during the deletion process.'
        });
    }
}

const updateMemory = async (req, res) => {
    // #swagger.tags = ['Memories']
    /* #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update only the fields you need it',
            required: true,
            schema: {
                manufacturer: "",
                model: "",
                characteristics: {
                    capacity: "",
                    generation: "",
                    speed: "",
                    latency: "",
                    form_factor: ""
                },
                initial_price_usd: 0.00
            }
    } */
    try {
        const { id } = req.params;

        const response = await Memory.findByIdAndUpdate(id, req.body, { 
            new: true, 
            runValidators: true 
        });

        if (!response) {
            return res.status(404).json({ error: 'Memory not found or no changes applied' });
        }

        res.status(200).json({ message: 'Memory updated successfully', memory: response });

    } catch (error) {
        console.error('Error updating Memory:', error);
        
         if (error.name === 'CastError') {
             return res.status(400).json({ error: 'Invalid ID format', message: 'The provided ID is not a valid MongoDB ObjectId.' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation Failed', message: error.message });
        }
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

// const getAll = async (req, res) => {
//     // #swagger.tags = ['Memories']
//     try {
//         const result = await mongodb.getDB().db('hardware').collection('memory').find();
//         const processor = await result.toArray()
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(memory);
//     } catch (error) {
//         console.error(`Error ${error} fetching memories list `);
//         res.status(500).json({ error: 'Internal Server Error'});
//     }
// }

// const getSingle = async (req, res) => {
//   // #swagger.tags = ['Memories']
//   try {
//     const { id } = req.params;
//     if (!id || !ObjectId.isValid(id)) {
//       return res.status(400).json({ error: 'Invalid or missing ID' });
//     }
//     const itemId = new ObjectId(req.params.id);
//     const result = await mongodb
//       .getDB()
//       .db('hardware')
//       .collection('memory')
//       .find({ _id: itemId });

//     const device = await result.toArray();

//     if (device.length === 0) {
//       return res.status(404).json({ error: 'Memory not found' });
//     }

//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(device);
//   } catch (error) {
//     console.error('Error fetching memory:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const memoryCreate = async (req, res) => {
//     // #swagger.tags = ['Memories']
//     try {
//         const memorie = {
//             manufacturer: req.body.manufacturer,
//             model: req.body.model,
//             characteristics: {
//                 capacity: req.body.characteristics.capacity,
//                 generation: req.body.characteristics.generation,
//                 speed: req.body.characteristics.speed,
//                 latency: req.body.characteristics.latency,
//                 form_factor: req.body.characteristics.form_factor,
//                 features: req.body.characteristics.features
//             },
//             presentation_date: req.body.presentation_date,
//             initial_price_usd: req.body.initial_price_usd
//         };

//         const response = await mongodb.getDB().db('hardware')
//                              .collection('memory').insertOne( memorie );

//         if (response.acknowledged) {
//             res.status(201).json({ message: 'Mmeory created successfully', id: response.insertedId });
//         } else {
//             res.status(400).json({ error: 'Failed to create Memory' });
//         };

//     } catch (error) {
//         console.error('Error creating device:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     };
// }

// const deleteMemory = async (req, res) => {
//     // #swagger.tags = ['Memories']
//     try {
//         const deviceId = new ObjectId(req.params.id);

//         const response = await mongodb.getDB().db('hardware').collection('memory').deleteOne({ _id: deviceId});

//         if (response.deleteCount > 0) {
//             res.status(204).end();
//         } else {
//             res.status(404).json({ 
//                 error: 'Memory ID not found or already deleted',
//                 message: 'The record with ID ${req.params.id} does not exist.'
//             });
//         }
//     } catch (err) {
//         console.error('Error deleting Memory ID:', err);

//         if (err.message && err.message.includes('Argument passed in must be a string of 12 bytes or a string of 24 hex characters')) {
//              return res.status(400).json({ error: 'Invalid ID format', message: 'The provided ID is not a valid MongoDB ObjectId.' });
//         }

//         res.status(500).json({
//              err: 'Internal server error',
//              details: err.message || 'An unexpected error occurred during the deletion process.'
//         });
//     }
// }

// const updateMemory = async (req, res) => {
//     // #swagger.tags = ['Memories']
//     try {
//         const deviceId = new ObjectId(req.params.id);

//         const updateFields = {};

//         if (req.body.manufacturer) updateFields.manufacturer = req.body.manufacturer;
//         if (req.body.model) updateFields.model = req.body.model;
//         if (req.body.presentation_date) updateFields.presentation_date = req.body.presentation_date;
//         if (req.body.initial_price_usd) updateFields.initial_price_usd = req.body.initial_price_usd;

//         if (req.body.characteristics) {
//             updateFields.characteristics = {};
//             const c = req.body.characteristics;
//             if (c.capacity) updateFields.characteristics.capacity = c.capacity;
//             if (c.generation) updateFields.characteristics.generation = c.generation;
//             if (c.speed) updateFields.characteristics.speed = c.speed;
//             if (c.latency) updateFields.characteristics.latency = c.latency;
//             if (c.form_factor) updateFields.characteristics.form_factor = c.form_factor;
//             if (c.features) updateFields.characteristics.features = c.features;
//         }

//         const response = await mongodb.getDB().db('hardware').collection('memory').updateOne({ _id: deviceId }, { $set: updateFields });

//         if (response.modifiedCount > 0) {
//             res.status(200).json({ message: 'Memmory updated successfully' });
//         } else {
//             res.status(404).json({ error: 'Memory not found or no changes applied' });
//         }
//     } catch (error) {
//         console.error('Error updating Memory:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }