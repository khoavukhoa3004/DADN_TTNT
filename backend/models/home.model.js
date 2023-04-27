const mongoose = require('mongoose');

const home = new mongoose.Schema({
    address: {
        number: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        }
    },
    haveUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    haveRooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    }],
    haveOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const room = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
});

const homeSchema = mongoose.model('Home', home);
const roomSchema = mongoose.model('Room', room);

module.exports = {
    homeModel: homeSchema,
    roomModel: roomSchema,
};