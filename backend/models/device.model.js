const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');
const { Decimal128 } = require('mongodb');

const deviceSchema = mongoose.Schema({
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
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    },
    haveDeviceType: {
        type: String,
        required: true,
        enum: ['fan', 'bulb', 'sensor', 'door'],
    }
},{discriminatorKey: 'device_type'});

deviceSchema.pre('save', async function (next) {
    try {
        if(this.isModified('value')){
            const deviceLog = new DeviceLog({
                time: new Date(),
                state: this.state,
                data: this.value,
                device: this._id,
                action: "Changed value",
            });
            await deviceLog.save();
        }
        else if(isModified('state')){
            const deviceLog = new DeviceLog({
                time: new Date(),
                state: this.state,
                data: this.value,
                device: this._id,
                action: "Changed state",
            });
            await deviceLog.save();            
        }
        else if(isModified('activate')){
            const deviceLog = new DeviceLog({
                time: new Date(),
                state: this.state,
                data: this.value,
                device: this._id,
                action: "Changed activate",
            });
            await deviceLog.save();  
        }
        next();
    } catch(error) {
        next(error);
    }
});

const bulb = new mongoose.Schema({
    bulbID: {
        type: String,
        unique: true,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    createdAt: {type: Date},
    updatedAt: {type: Date}
}, {timestamps: true});

const door = new mongoose.Schema({
    doorID: {
        type: String,
        unique: true,
        required: true,
    },
    doorStatus: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    createdAt: {type: Date},
    updatedAt: {type: Date},
}, {timestamps: true});

const fan = new mongoose.Schema({
    fanID: {
        type: String,
        unique: true,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    createdAt: {type: Date},
    updatedAt: {type: Date}
}, {timestamps: true});

const light = new mongoose.Schema({
    lightID: {
        type: String,
        unique: true,
        required: true,
    },
    lightValue: {
        type: Decimal128,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    createdAt: {type: Date},
    updatedAt: {type: Date}
}, {timestamps: true});

const temp = new mongoose.Schema({
    tempID: {
        type: Number,
        unique: true,
        required: true,
        default: 0,
    },
    tempName: {
        type: String,
        required: true,
    },
    tempValue: {
        type: Decimal128,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    createdAt: {type: Date},
    updatedAt: {type: Date}
}, {timestamps: true});
module.exports = mongoose.model('Device', deviceSchema);

const fanSchema = mongoose.model('fan', fan);
const bulbSchema = mongoose.model('bulb', bulb);
const tempSchema = mongoose.model('temp', temp);
const lightSchema = mongoose.model('light', light);
const doorSchema = mongoose.model('door', door);


module.exports = {
    fanModel: fanSchema,
    bulbModel: bulbSchema,
    tempModel: tempSchema,
    lightModel: lightSchema,
    doorModel: doorSchema,
};