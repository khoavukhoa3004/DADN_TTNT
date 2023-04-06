const User = require('../models/user.model')

exports.createUser = async (req, res) => {
    const {
        Fname, 
        Lname, 
        email, 
        password, 
        dateOfBirth, 
        phoneNumber
    } = req.body;
    const isNewUser = await User.isThisEmailInUse(email);
    if(!isNewUser){
        return res.json({
            success: false, 
            message: 'This email is already in use, try sign-in'
        });
    }
    const user = await User({
        Fname, 
        Lname, 
        email, 
        password, 
        dateOfBirth, 
        phoneNumber,
    })
    await user.save()
    res.json(user);
}