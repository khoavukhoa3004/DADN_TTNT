const DeviceConstructor = require('../models/device.model').deviceModel;

exports.DeviceController = {
    patch: async (req, res) => {
        const deviceId = req.params.deviceId;
        console.log(req.params.deviceId);
        const state = req.params.state;
        const options = { new: true };

        try {
            console.log('before update device');
            await DeviceConstructor.findByIdAndUpdate(deviceId, state, options);
            console.log('update device');
            res.status(200).json(state);
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
            await DeviceConstructor.findByIdAndUpdate(deviceId, value, options);
            res.status(200).json(updates);
        } catch (error) {
            console.error(error);
            res.status(500).json({success: false, message: error.message});
        }
    }
};