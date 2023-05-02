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
            if (deviceName === 'fanvalue' || deviceName === 'ledvalue' || deviceName === 'lightsensor' || deviceName === 'tempsensor' || deviceName === 'soundai') {
                return validator.isFloat(value) || validator.isInt(value);
            }
            else if (deviceName === 'fanstatus' || deviceName === 'doorstatus' || deviceName === 'ledstatus') {
                return value === 'ON' || value === 'OFF';
            }
            throw new Error("Invalid value: "+ feedName + " not compatible with " + value);
        })
]