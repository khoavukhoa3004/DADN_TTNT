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
        // enum: ['fan', 'bulb', 'door', 'light', 'temp'],
    },

    haveLogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeviceLog'
    }]
},{timestamps: true});
const deviceModel = mongoose.model('Device', device);

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
                this.haveLogs.push(deviceLog._id);

            }
        }
        next();
    } catch(error) {
        next(error);
    }
});

device.post('findOneAndUpdate', async function(doc) {
    console.log('findOneAndUpdate is currently running')
    const updatedFields = Object.keys(this.getUpdate().$set || {});
    const deviceId = this.getQuery()._id;
    // console.log('deviceId: ', deviceId);
    const data = this.getQuery().value;
    // console.log('data', data)
    const deviceState = doc.state;
    // console.log(doc);
    // console.log(updatedFields);
    // console.log(updatedFields.length)
    let needUpdate = false;
    let actions = `${doc.device_name}: {`;
    for (i = 0; i < updatedFields.length; i++) {
        if(updatedFields[i] === 'device_name'){
            actions += `device_name changed: ${doc.device_name}; `;
            needUpdate= true;
        }
        if(updatedFields[i] === 'activation'){
            actions += `activate changed: ${doc.activate}; `;
            needUpdate= true;
        }
        if(updatedFields[i] === 'state'){
            actions += `state changed: ${doc.state}; `;
            needUpdate= true;
        }
        if(updatedFields[i] === 'value'){
            actions += `value changed: ${doc.value}; `;
            needUpdate= true;
        }
        if(updatedFields[i] === 'haveRoom'){
            actions += 'Room changed; ';
            needUpdate= true;
        }
        if(updatedFields[i] === 'type'){
            actions += `type changed: ${doc.type}; `;
            needUpdate= true;
        }
    }
    actions += ' }';
    if(needUpdate){
        console.log('action', actions);
        const deviceLog = new DeviceLog({
            time: new Date(),
            state: deviceState,
            data: data,
            device: deviceId,
            action: actions,
        });
        
        await deviceLog.save();
        try {
            const device = await deviceModel.findById(deviceId);
            device.haveLogs.push(deviceLog._id);
            await deviceLog.save();
            console.log('save successfully')
        } catch(error){
            console.error('Error adding deviceLog: ', error);
        }
    }

    
});





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