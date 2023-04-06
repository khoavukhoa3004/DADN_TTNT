const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const sequencing = require('../config/sequencing');


const userSchema = new mongoose.Schema({

    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    avatar: Buffer,

});


userSchema.statics.isThisEmailInUse = async function(email){
    // if(email ==='') {
    //     console.log("Failed");
    //     throw new Error('Invalid email');
    // }
    try {
        const isEmail = await this.findOne({email})
        if(isEmail) return false;
        return true;
    } catch (error) {
        console.log('error inside isThisEmailInUse method ', error.message);
        return false;
    }

}
// userSchema.methods.isThisEmailInUse

module.exports = mongoose.model('user', userSchema);



