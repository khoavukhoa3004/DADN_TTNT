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
                this.haveLog.push(deviceLog._id);
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
    let actions = `${doc.device_name}: {`;
    for (i = 0; i < updatedFields.length; i++) {
        if(updatedFields[i] === 'device_name'){
            actions += `device_name changed: ${doc.device_name}; `;
        }
        if(updatedFields[i] === 'activation'){
            actions += `activate changed: ${doc.activate}; `;
        }
        if(updatedFields[i] === 'state'){
            actions += `state changed: ${doc.state}; `;
        }
        if(updatedFields[i] === 'value'){
            actions += `value changed: ${doc.value}; `;
        }
        if(updatedFields[i] === 'haveRoom'){
            actions += 'Room changed; ';
        }
        if(updatedFields[i] === 'type'){
            actions += `type changed: ${doc.type}; `;
        }
    }
    actions += ' }';
    console.log('action', actions);
    const deviceLog = new DeviceLog({
      time: new Date(),
      state: deviceState,
      data: data,
      device: deviceId,
      action: actions,
    });
    await deviceLog.save();
  });
  
//   function getAction(updatedFields, device) {
//     const actionMap = {
//         device_name: 'device name',
//         activate: 'activate',
//         state: 'state',
//         value: 'value',
//         haveRoom: "Device'room",
//         type: 'Device type',
//     };
//     let action = '';
//     let value = '';
//     let modified = false;
    
//     for (let i = 0; i < updatedFields.length; i++) {
//       const field = updatedFields[i];
//       if (field in device._update) {
//         if (actionMap[field]) {
//           action = actionMap[field];
//           modified = true;
//           value = device.get(field);
//           break;
//         }
//       }
//     }
//     if (modified) {
//       return `${device.device_name} changed ${action} to ${value}`;
//     } else {
//       return `${device.device_name} has been created`;
//     }
//   }

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