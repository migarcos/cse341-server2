// const mongodb = require('../config/db');
// const ObjectId = require('mongodb').ObjectId;
const Processor = require('../models/Processor');

const getAll = async (req, res) => {
    // #swagger.tags = ['Processors']
    try {
        const processors = await Processor.find({}); 
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(processors);
    } catch (error) {
        console.error(`Error fetching processors list: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['Processors']
    try {
        const { id } = req.params;
        
        const device = await Processor.findById(id); 

        if (!device) { 
            return res.status(404).json({ error: 'Processor not found' });
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(device);
    } catch (error) {
        // Este catch ahora también atrapará IDs malformados que Mongoose no pueda convertir
        console.error('Error fetching processor:', error); 
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createProcessor = async(req, res) => {
    // #swagger.tags = ['Processors']
    try {
        const newProcessor = new Processor({
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            characteristics: req.body.characteristics, 
            presentation_date: req.body.presentation_date,
            initial_price_usd: req.body.initial_price_usd
        });

        const response = await newProcessor.save(); 

        res.status(201).json(response); 
        
    } catch (error) {
        console.error('Error creating device:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateProcessor = async (req, res) => {
  // #swagger.tags = ['Processors']
  try {
    const itemId = new ObjectId(req.params.id);

    const updateFields = {};

    if (req.body.manufacturer) updateFields.manufacturer = req.body.manufacturer;
    if (req.body.model) updateFields.model = req.body.model;
    if (req.body.presentation_date) updateFields.presentation_date = req.body.presentation_date;
    if (req.body.initial_price_usd) updateFields.initial_price_usd = req.body.initial_price_usd;

    if (req.body.characteristics) {
        updateFields.characteristics = {};
        const c = req.body.characteristics;
        if (c.cores) updateFields.characteristics.cores = c.cores;
        if (c.threads) updateFields.characteristics.threads = c.threads;
        if (c.base_clock) updateFields.characteristics.base_clock = c.base_clock;
        if (c.max_boost_clock) updateFields.characteristics.max_boost_clock = c.max_boost_clock;
        if (c.cache) updateFields.characteristics.cache = c.cache;
        if (c.socket) updateFields.characteristics.socket = c.socket;
        if (c.integrated_graphics) updateFields.characteristics.integrated_graphics = c.integrated_graphics;
        if (c.target_use) updateFields.characteristics.target_use = c.target_use;
    }

    const response = await mongodb.getDB().db('hardware').collection('processor').updateOne({ _id: itemId }, { $set: updateFields });

    if (response.modifiedCount > 0) {
        res.status(200).json({ message: 'Processor updated successfully' });
    } else {
        res.status(404).json({ error: 'Processor not found or no changes applied' });
    }
  } catch (error) {
    console.error('Error updating processor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const replaceProcessor = async(req, res) => {
    // #swagger.tags = ['Processors']
    try {
        const itemId = new ObjectId(req.params.id);

        const processor = {
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            characteristics: {
                cores: req.body.characteristics.cores,
                threads: req.body.characteristics.threads,
                base_clock: req.body.characteristics.base_clock,
                max_boost_clock: req.body.characteristics.max_boost_clock,
                cache: req.body.characteristics.cache,
                socket: req.body.characteristics.socket,
                integrated_graphics: req.body.characteristics.integrated_graphics,
                target_use: req.body.characteristics.target_use
            },
            presentation_date: req.body.presentation_date,
            initial_price_usd: req.body.initial_price_usd
        };

        const response = await mongodb.getDB().db('hardware').collection('processor').replaceOne({_id: itemId}, processor);

        if (response.modifiedCount > 0) {
            res.status(204).json({ message: 'Processor updated successfully' }); // info the user the success
        } else {
            res.status(404).json({ error: 'Processor not found or no changes applied' });
        }
    } catch (error) {
        console.error('Error replacing processor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteProcessor = async(req, res) => {
    // #swagger.tags = ['Processors']
    try {
        const itemId = new ObjectId(req.params.id);

        const response = await mongodb.getDB().db('hardware').collection('processor').deleteOne({ _id: itemId });

        if (response.deletedCount > 0) {
            res.status(204).json({ message: 'Processor deleted successfully' }); 
        } else {
            res.status(404).json({ error: 'Processor not found or already deleted' });
        }
    } catch (error) {
        console.error('Error deleting Processor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { 
    getAll,
    getSingle,
    createProcessor,
    updateProcessor,
    replaceProcessor,
    deleteProcessor
};

// const getAll = async (req, res) => {
//     // #swagger.tags = ['Processors']
//     try {
//             const result = await mongodb.getDB().db().collection('processor').find();
//             const processor = await result.toArray()
//             res.setHeader('Content-Type', 'application/json');
//             res.status(200).json(processor);
//     } catch (error) {
//         console.error(`Error ${error} fetching processors list `);
//         res.status(500).json({ error: 'Internal Server Error'});
//     }
// }

// const getSingle = async (req, res) => {
//     // #swagger.tags = ['Processors']
//     try {
//         const { id } = req.params;
//         if (!id || !ObjectId.isValid(id)) {
//             return res.status(400).json({ error: 'Invalid or missing ID' });
//         }
//         const itemId =  new ObjectId(req.params.id);
//         // console.log(itemId);
//         const result = await mongodb.getDB().db('hardware').collection('processor').find({_id: itemId});
//         const device = await result.toArray();

//         if (device.length === 0) {
//         return res.status(404).json({ error: 'Processor not found' });
//         }
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(device);        
//     } catch (error) {
//         console.error('Error fetching processor:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

// const createProcessor = async(req, res) => {
//     // #swagger.tags = ['Processors']
//     try {
//         const processor = {
//             manufacturer: req.body.manufacturer,
//             model: req.body.model,
//             characteristics: {
//                 cores: req.body.characteristics.cores,
//                 threads: req.body.characteristics.threads,
//                 base_clock: req.body.characteristics.base_clock,
//                 max_boost_clock: req.body.characteristics.max_boost_clock,
//                 cache: req.body.characteristics.cache,
//                 socket: req.body.characteristics.socket,
//                 integrated_graphics: req.body.characteristics.integrated_graphics,
//                 target_use: req.body.characteristics.target_use
//             },
//             presentation_date: req.body.presentation_date,
//             initial_price_usd: req.body.initial_price_usd
//         };

//         const response = await mongodb.getDB().db('hardware').collection('processor').insertOne(processor);

//         if (response.acknowledged) {
//             res.status(201).json({ message: 'Processor created successfully', id: response.insertedId });
//         } else {
//             res.status(400).json({ error: 'Failed to create processor' });
//         }
//     } catch (error) {
//         console.error('Error creating device:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };
