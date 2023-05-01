const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

exports.createUser = async (req, res) => {
    const {
        fName, 
        lName, 
        email, 
        username,
        activate,
        password, 
        dateOfBirth, 
        phoneNumber
    } = req.body;
    const isNewUser = await User.isThisEmailInUse(email);
    if(!isNewUser){
        return res.json({
            success: false, 
            message: 'This email is already in use, try sign-in',
            type: 'email',
        });
    }
    const user = await User({
        fName, 
        lName, 
        email, 
        username,
        activate,
        password, 
        dateOfBirth, 
        phoneNumber,
    })
    await user.save()
    res.json(user);
};

exports.userSignIn = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email: email});

    if(!user) {
        res.json({ success: false, message: "not found email",type: 'email' });
    }
    else{
        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return res.json({ 
                success: false, 
                message: "wrong password",
                type: 'password'
            });
        }
        const token = jwt.sign(
            {userID: user._id}, 
            process.env.JWT_SECRET, 
            {expiresIn: '5d'}
        )
        res.json({ success: true, user, token});
    }

};

// {
//     "fName": "Vu Dang",
//     "lName": "Khoa",
//     "email": "khoapro313@gmail.com",
//     "password": "hello12376",
//     "confirmPassword": "hello12376",
//     "dateOfBirth": "2002-08-08",
//     "phoneNumber": "0123456789"
// }
