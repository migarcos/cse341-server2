const {body} = require("express-validator");

const validateProcessor = [
  body('manufacturer')
    .trim().escape().isLength({ min: 3 })
    .notEmpty().withMessage('Manufacturer is required')
    .isString().withMessage('Manufacturer must be a string'),

  body('model')
    .escape()
    .notEmpty().withMessage('Model is required')
    .isString().withMessage('Model must be a string')
    .isLength({ min: 10 }),

  body('characteristics.cores')
    .notEmpty().withMessage('Cores is required')
    .isInt({ min: 1 }).withMessage('Cores must be a positive integer'),

  body('characteristics.threads')
    .notEmpty().withMessage('Threads is required')
    .isInt({ min: 1 }).withMessage('Threads must be a positive integer'),

  body('characteristics.socket')
    .notEmpty().withMessage('Socket is required')
    .isString().withMessage('Socket must be a string')
];

const validateUpdProcessor = [
  body('manufacturer')
    .optional().trim().escape().isLength({ min: 3 })
    .notEmpty().withMessage('Manufacturer is required')
    .isString().withMessage('Manufacturer must be a string'),

  body('model')
    .optional().escape()
    .notEmpty().withMessage('Model is required')
    .isString().withMessage('Model must be a string')
    .isLength({ min: 10 }),

  body('characteristics.cores')
    .optional().notEmpty().withMessage('Cores is required')
    .isInt({ min: 1 }).withMessage('Cores must be a positive integer'),

  body('characteristics.threads')
    .optional().notEmpty().withMessage('Threads is required')
    .isInt({ min: 1 }).withMessage('Threads must be a positive integer'),

  body('characteristics.socket')
    .optional().notEmpty().withMessage('Socket is required')
    .isString().withMessage('Socket must be a string')
];

const validMemoryCreate = [
    body('manufacturer')
    .escape().isLength({ min: 5 })
    .notEmpty().withMessage('Manufacturer is required')
    .isString().withMessage('Manufacturer must be a string'),

  body('model')
    .escape()
    .notEmpty().withMessage('Model is required')
    .isString().withMessage('Model must be a string')
    .isLength({ min: 10 }),

  body('characteristics.capacity')
    .notEmpty().withMessage('Capacity is required'),

  body('characteristics.generation')
    .notEmpty().withMessage('Generation is required'),

  body('characteristics.speed')
    .notEmpty().withMessage('speed is required')
    .isString().withMessage('speed must be a string'),
  
  body('characteristics.form_factor')
    .notEmpty().withMessage('form_factor is required')
    .isString().withMessage('form_factor must be a string')
]

module.exports = { validateProcessor, validateUpdProcessor, validMemoryCreate }