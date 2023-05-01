
// const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

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
    username: {
        type: String, 
        required: true,
        unique: true,
    },
    activate: {
        type: Boolean,
        required: true,
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

// execute before sending data
userSchema.pre('save', function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password, 8, (err, hash) => {
            if(err) return next(err);
            this.password = hash;
            next();
        });
    }
});

userSchema.methods.comparePassword = async function(password) {
    if(!password) throw new Error('Password is missed, cannot compare!');

    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        console.log('Error while comparing password!', error.message);
    }
}

userSchema.statics.isThisEmailInUse = async function(email) {
    // if(email ==='') {
    //     console.log("Failed");
    //     throw new Error('Invalid email');
    // }
    try {
        const isEmail = await this.findOne({email})
        if(isEmail) return false;
        return true;
    } catch (error) {
        console.log('Error inside isThisEmailInUse method ', error.message);
        return false;
    }

}
userSchema.statics.isThisUserNameInUse = async function(username) {
    try {
        const isUser = await this.findOne({username});
        if(isUser) return false;
        return true;
    } catch (error) {
        console.log('Error inside isThisEmailUse method ', error.message);
        return false;
    }
}
// userSchema.methods.isThisEmailInUse

module.exports = mongoose.model('user', userSchema);



