
const mongoose = require('mongoose');

const deviceLog = new mongoose.Schema({
    time:{
        type: Date,
        require: true,
    },
    state: {
        type: String,
        enum: ['ON', 'OFF'],
    },
    data: {
        type: Number,
    },
    action: {
        type: String,
    },
    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
        required: true,
    },
}); 

const deviceLogModel = mongoose.model('DeviceLog', deviceLog);

module.exports = {deviceLogModel};