const {check, validationResult} = require('express-validator');
const validator = require('validator');

function parseFeedName(str) {
    const parts = str.split('-');
    const userName = parts[0];
    const room = parseInt(parts[1]);
    const deviceName = parts[2];
    const index = parseInt(parts[3]);
    
    return {
        userName,
        room,
        deviceName,
        index
    };
}

exports.dataValidation = (req, res, next) => {
    const result = validationResult(req).array();
    console.log(result);
    if(!result.length){
        return next();
    }
    const error = result[0].msg;
    res.json({success: false, message: error});
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
            // console.log(feedName);
            const {userName, room, deviceName, index} = parseFeedName(feedName);
            // console.log(deviceName);
            if (deviceName === 'fanvalue' || deviceName === 'ledvalue' || deviceName === 'lightsensor' || deviceName === 'tempsensor') {
                if(!(validator.isFloat(value) || validator.isInt(value))){
                    throw new Error('Value must be a number');
                }
                // if(validator.isFloat(value)) && (validator.isInt(value)){
                //     if()
                // }
                if(deviceName === 'fanvalue' || deviceName === 'ledvalue'){
                    if(parseFloat(value < 0) || parseFloat(value) > 100){
                        throw new Error(`${deviceName} must have value in range [0, 100]`);
                    }
                }
                
                return true;
                // return (validator.isFloat(value) >= 0) && (validator.isInt(value) <= 100);
            }
            else if (deviceName === 'fanstatus' || deviceName === 'doorstatus' || deviceName === 'ledstatus') {
                return value === 'ON' || value === 'OFF';
            }
            throw new Error("Invalid value: "+ feedName + " not compatible with " + value);
        })
]