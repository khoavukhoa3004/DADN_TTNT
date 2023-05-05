const DeviceConstructor = require('../models/device.model').deviceModel;
const DeviceLogConstructor = require('../models/deviceLog.model').deviceLogModel;



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
            await DeviceConstructor.findOneAndUpdate({_id: deviceId}, { value }, options);
            console.log('update device value');
            res.status(200).json({success: true, message: value});
        } catch (error) {
            console.error(error);
            res.status(500).json({success: false, message: error.message});
        }
    },

    getDataByDeviceId: async (req, res) => {
        try {
            console.log('GetDeviceHistory!');

            // const deviceInfo = await DeviceConstructor.findOne({_id: req.params.deviceId}).populate({
            //     path: 'haveLogs',
            //     // select: '_id state data'
            // });
            // console.log(deviceInfo)
            // console.log("----------------------------------------------------------------------------------")

            // const devicePairs = deviceInfo.haveLogs.map(device => ({
            //     _id: device._id, state: device.state, data: device.data
            // }));
            // console.log(devicePairs);

            // const deviceHistory = await DeviceLogConstructor.find({device: req.params.deviceId}).select("time state data").sort({_id: -1}).limit(5);
            const deviceHistory = await DeviceLogConstructor.find({device: req.params.deviceId})
                .select("time state data")
                .sort({ time: -1 });
            // console.log(deviceHistory);

            res.status(200).json({success: true, data: deviceHistory});
        } catch (error) {
            console.error(error);
            res.status(500).json({success: false, message: error.message});
        }
    }
};