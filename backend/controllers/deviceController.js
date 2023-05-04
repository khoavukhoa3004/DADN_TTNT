const DeviceConstructor = require('../models/device.model').deviceModel;

exports.DeviceController = {
    patch: async (req, res) => {

        // console.log('deviceController path: ',req.params.deviceId, req.params.state);
        const deviceId = req.params.deviceId;
        
        const state = req.params.state;
        const options = { new: true };

        try {
            console.log('before update device state');
            await DeviceConstructor.findOneAndUpdate({_id: deviceId}, {state}, options);
            console.log('update device state');
            res.status(200).json({success: true, message: state});
        } catch (error) {
            console.error(error);
            res.status(500).json({success: false, message: error.message});
        }
    },

    patchValue: async (req, res) => {
        const deviceId = req.params.deviceId;
        const value = req.params.value;
        const options = { new: true };
        try {
            await DeviceConstructor.findOneAndUpdate(deviceId, { value }, options);
            console.log('update device value');
            res.status(200).json(updates);
        } catch (error) {
            console.error(error);
            res.status(500).json({success: false, message: error.message});
        }
    }
};