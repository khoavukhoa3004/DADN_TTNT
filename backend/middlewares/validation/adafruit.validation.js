const {check, validationResult} = require('express-validator');
const validator = require('validator');

exports.dataValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(422).json({
        success: false,
        errors: errorMessages
    });
}

exports.validateData = [
    check("feedName")
        .trim()
        .custom((value) => {
            return true;
            
        }),
    check("value")
        .trim()
        .custom((value, { req }) => {
            const feedName = req.body.feedName;
            if (feedName === 'temperature') {
                return validator.isFloat(value) || validator.isInt(value);
            }
            else if (feedName.startsWith('button')) {
                return value === 'ON' || value === 'OFF';
            }
            throw new Error("Invalid value: "+ feedName + "not compatible with " + value);
        })
]