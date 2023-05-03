const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');
// const { Decimal128 } = require('mongodb');
const DeviceLog = require('./deviceLog.model')

const device = new mongoose.Schema({
    device_name: {
        type: String,
        required: true,
    },
    activate: {
        type: Boolean,
        required: true,
    },
    state: {
        type: String, 
        enum: ['ON', 'OFF'],
    },
    value: {
        type: Number,
    },
    haveRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',        
    },
    type: {
        type: String,
        required: true,
        enum: ['fan', 'bulb', 'door', 'light', 'temp'],
    },
},{timestamps: true});

device.pre('save', async function (next) {
    try {
        if(this.isNew){
            const deviceLog = new DeviceLog({
                time: new Date(),
                state: this.state,
                data: this.value,
                device: this._id,
                action: `${this.device_name} has been created`,
            })
            await deviceLog.save();
        }
        else {
            let action = '';
            let value = '';
            let modified = false;
            if(this.isModified('device_name')){
                action = 'device name';
                modified = true;
                value = this.device_name;
            }
            if(this.isModified('value')){
                action = 'value';
                modified = true;
                value = this.value;
            }
            else if(this.isModified('state')){
                action = 'state';
                modified = true;
                value = this.state;
            }
            else if(this.isModified('activate')){
                action = 'activate';
                modified = true;
                value = this.activate;
            }
            else if(this.isModified('room')){
                action = 'room';
                modified = true;
                value = this.room.toString();
            }
            if(modified) {
                const deviceLog = new DeviceLog({
                    time: new Date(),
                    state: this.state,
                    data: this.value,
                    device: this._id,
                    action: `${this.device_name} changed ${action} to ${value}`,
                });
                await deviceLog.save();
            }
        }
        next();
    } catch(error) {
        next(error);
    }
});

// const bulb = new mongoose.Schema({
//     bulbID: {
//         type: String,
//         unique: true,
//         required: true,
//     },
//     status: {
//         type: String,
//         required: true,
//     },
//     value: {
//         type: Number,
//         required: true,
//     },
//     isActive: {
//         type: Boolean,
//         required: true,
//     },
//     createdAt: {type: Date},
//     updatedAt: {type: Date}
// }, {timestamps: true});

// const door = new mongoose.Schema({
//     doorID: {
//         type: String,
//         unique: true,
//         required: true,
//     },
//     doorStatus: {
//         type: String,
//         required: true,
//     },
//     isActive: {
//         type: Boolean,
//         required: true,
//     },
// }, {timestamps: true});

// const fan = new mongoose.Schema({
//     fanID: {
//         type: String,
//         unique: true,
//         required: true,
//     },
//     status: {
//         type: String,
//         required: true,
//     },
//     value: {
//         type: Number,
//         required: true,
//     },
//     isActive: {
//         type: Boolean,
//         required: true,
//     },
// }, {timestamps: true});

// const light = new mongoose.Schema({
//     lightID: {
//         type: String,
//         unique: true,
//         required: true,
//     },
//     lightValue: {
//         type: Decimal128,
//         required: true,
//     },
//     isActive: {
//         type: Boolean,
//         required: true,
//     },
// }, {timestamps: true});

// const temp = new mongoose.Schema({
//     tempID: {
//         type: Number,
//         unique: true,
//         required: true,
//         default: 0,
//     },
//     tempName: {
//         type: String,
//         required: true,
//     },
//     tempValue: {
//         type: Decimal128,
//         required: true,
//     },
//     isActive: {
//         type: Boolean,
//         required: true,
//     },
// }, {timestamps: true});
const deviceModel = mongoose.model('Device', device);

// const fanSchema = mongoose.model('fan', fan);
// const bulbSchema = mongoose.model('bulb', bulb);
// const tempSchema = mongoose.model('temp', temp);
// const lightSchema = mongoose.model('light', light);
// const doorSchema = mongoose.model('door', door);


module.exports = {
    deviceModel
    // fanModel: fanSchema,
    // bulbModel: bulbSchema,
    // tempModel: tempSchema,
    // lightModel: lightSchema,
    // doorModel: doorSchema,
};