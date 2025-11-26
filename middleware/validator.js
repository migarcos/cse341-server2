const { body, validationResult } = require("express-validator");

const validateProcessor = [
    body('manufacturer')
        .exists().withMessage('Manufacturer is required.')
        .trim().escape()
        .isString().withMessage('Manufacturer must be a string')
        .isLength({ min: 3 }).withMessage('Manufacturer must be at least 3 characters long.'),

    body('model')
        .exists().withMessage('Model is required.')
        .trim().escape()
        .isString().withMessage('Model must be a string')
        .isLength({ min: 10 }).withMessage('Model must be at least 10 characters long.'),

    body('characteristics.cores')
        .exists().withMessage('Cores is required.')
        .isInt({ min: 1 }).withMessage('Cores must be a positive integer.'),

    body('characteristics.threads')
        .exists().withMessage('Threads is required.')
        .isInt({ min: 1 }).withMessage('Threads must be a positive integer.'),

    body('characteristics.socket')
        .exists().withMessage('Socket is required.')
        .trim().escape()
        .isString().withMessage('Socket must be a string'),

    body('presentation_date')
        .optional()
        .isISO8601().withMessage('Presentation date must be a valid date format (YYYY-MM-DD)'),

    body('initial_price_usd')
        .optional()
        .isFloat({ min: 0 }).withMessage('Initial price must be a non-negative number.'),

    (req, res, next) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                validationErrors: errors.array({ onlyFirstError: true }),
                message: 'Validation failed for the request data.'
            });
        }
        next();
    }
];

// const validateProcessor = [
//   body('manufacturer')
//     .trim().escape().isLength({ min: 3 })
//     .notEmpty().withMessage('Manufacturer is required')
//     .isString().withMessage('Manufacturer must be a string'),

//   body('model')
//     .escape()
//     .notEmpty().withMessage('Model is required')
//     .isString().withMessage('Model must be a string')
//     .isLength({ min: 10 }),

//   body('characteristics.cores')
//     .notEmpty().withMessage('Cores is required')
//     .isInt({ min: 1 }).withMessage('Cores must be a positive integer'),

//   body('characteristics.threads')
//     .notEmpty().withMessage('Threads is required')
//     .isInt({ min: 1 }).withMessage('Threads must be a positive integer'),

//   body('characteristics.socket')
//     .notEmpty().withMessage('Socket is required')
//     .isString().withMessage('Socket must be a string')
// ];

const validateUpdProcessor = [
    body('manufacturer')
        .optional({ checkFalsy: true }).trim().escape()
        .isString().withMessage('Manufacturer must be a string')
        .isLength({ min: 3 }).withMessage('Manufacturer must be at least 3 characters long.'),

    body('model')
        .optional({ checkFalsy: true }).trim().escape()
        .isString().withMessage('Model must be a string')
        .isLength({ min: 10 }).withMessage('Model must be at least 10 characters long.'),

    body('characteristics.cores')
        .optional({ checkFalsy: true })
        .isInt({ min: 1 }).withMessage('Cores must be a positive integer if provided.'),
    
    body('characteristics.threads')
        .optional({ checkFalsy: true })
        .isInt({ min: 1 }).withMessage('Threads must be a positive integer if provided.'),

    body('characteristics.socket')
        .optional({ checkFalsy: true }).trim().escape()
        .isString().withMessage('Socket must be a string if provided.'),

    (req, res, next) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                validationErrors: errors.array({ onlyFirstError: true }),
                message: 'Validation failed for the request data.'
            });
        }
        next();
    }
];
// const validateUpdProcessor = [
//   body('manufacturer')
//     .optional().trim().escape().isLength({ min: 3 })
//     .notEmpty().withMessage('Manufacturer is required')
//     .isString().withMessage('Manufacturer must be a string'),

//   body('model')
//     .optional().escape()
//     .notEmpty().withMessage('Model is required')
//     .isString().withMessage('Model must be a string')
//     .isLength({ min: 10 }),

//   body('characteristics.cores')
//     .optional().notEmpty().withMessage('Cores is required')
//     .isInt({ min: 1 }).withMessage('Cores must be a positive integer'),

//   body('characteristics.threads')
//     .optional().notEmpty().withMessage('Threads is required')
//     .isInt({ min: 1 }).withMessage('Threads must be a positive integer'),

//   body('characteristics.socket')
//     .optional().notEmpty().withMessage('Socket is required')
//     .isString().withMessage('Socket must be a string')
// ];

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

const validMemoryUpd = [
    body('manufacturer')
    .optional().escape().isLength({ min: 5 })
    .notEmpty().withMessage('Manufacturer is required')
    .isString().withMessage('Manufacturer must be a string'),

  body('model')
    .optional().escape()
    .notEmpty().withMessage('Model is required')
    .isString().withMessage('Model must be a string')
    .isLength({ min: 10 }),

  body('characteristics.capacity')
    .optional()
    .notEmpty().withMessage('Capacity is required'),

  body('characteristics.generation')
    .optional()
    .notEmpty().withMessage('Generation is required'),

  body('characteristics.speed')
    .optional()
    .notEmpty().withMessage('speed is required')
    .isString().withMessage('speed must be a string'),
  
  body('characteristics.form_factor')
    .optional()
    .notEmpty().withMessage('form_factor is required')
    .isString().withMessage('form_factor must be a string')
];

module.exports = { validateProcessor, validateUpdProcessor, validMemoryCreate, validMemoryUpd }