const express = require('express')


const router = express.Router()
const {createUser, userSignIn} = require('../controllers/user.controller');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middlewares/validation/user.validation');
const { isAuthenticated } = require('../middlewares/authentication');

const User = require('../models/user.model')
// Load image 
const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
    if(file.mimetype.startsWith('image')){
        callback(null, true);
    }
    else {
        callback('invalid image file', false);
    }
}

const uploads = multer({ storage, fileFilter})

// to resize the image 
const sharp = require('sharp');


router.post('/create-user',validateUserSignUp, userValidation ,createUser);
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn)

// router.post('/create-post', isAuthenticated, (req, res) => {
//     res.send('In the secret route!');
// })

router.post('/upload-profile', isAuthenticated, uploads.single('profile'), async (req, res) => {
    const { user } = req;
    if(!user){
        return res.status(401).json({
            success: false, 
            message: 'unauthorized access!'
        });  
    }

    try {
        const profileBuffer = req.file.buffer;
        const { width, height} = await sharp(profileBuffer).metadata();  // {height, width}
        const avatar = await sharp(profileBuffer)
                        .resize(Math.round(width * 0.5, Math.round(height * 0.5)))
                        .toBuffer();
        console.log(avatar);
        await User.findByIdAndUpdate(user._id, {avatar});
        res.status(201).json({
            success: true, 
            message: 'Your profile is updated!'
        });
    } catch(error) {
        res.status(500).json({
            success: false, 
            message: 'Server error, try after some time'
        });
        console.log('Error while uploading profile image', error.message);
    }
});
module.exports = router;

// {
//     "fName": "Vu Dang",
//     "lName": "Khoa",
//     "email": "khoapro31223@gmail.com",
//     "password": "hello12376",
//     "confirmPassword": "helldfso12376",
//     "dateOfBirth": "2002-08-08",
//     "phoneNumber": "0123456789"
// }