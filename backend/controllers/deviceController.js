const DeviceConstructor = require('../models/device.model').deviceModel;
// const DeviceLog = require('../models/deviceLog.model');

exports.DeviceController = {
    patch: async (req, res) => {
        const deviceId = req.params.deviceId;
        const state = req.params.state;
        const options = { new: true };

        try {
            await DeviceConstructor.findOneAndUpdate(deviceId, state, options);
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
            await DeviceConstructor.findOneAndUpdate(deviceId, value, options);
            res.status(200).json(updates);
        } catch (error) {
            console.error(error);
            res.status(500).json({success: false, message: error.message});
        }
    },

    getDataByDeviceId: async (req, res) => {
        try {
            console.log('GetDeviceHistory!');
            const deviceInfo = await DeviceConstructor.findOne({_id: req.params.deviceId}).populate({
                path: 'haveLogs',
                select: '_id state data'
            });

            const devicePairs = deviceInfo.haveLogs.map(device => ({
                _id: device._id, state: device.state, data: device.data
            }));
            console.log(devicePairs);
            res.status(200).json({success: true, data: devicePairs});
        } catch (error) {
            console.error(error);
            res.status(500).json({success: false, message: error.message});
        }
    }
};