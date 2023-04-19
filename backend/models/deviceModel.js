const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');
const { Decimal128 } = require('mongodb');

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
        type: String,
        unique: true,
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