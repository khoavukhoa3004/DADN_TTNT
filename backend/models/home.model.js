const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
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

const userHomeSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    homeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Home',
        required: true,
    }
})

const roomSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Home', homeSchema);
module.exports = mongoose.model('Room', roomSchema);
module.exports = mongoose.model('UserHome', userHomeSchema);