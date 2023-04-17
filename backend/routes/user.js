const express = require('express')


const router = express.Router()
const {createUser, userSignIn} = require('../controllers/user.controller');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middlewares/validation/user.validation');
const { isAuthenticated } = require('../middlewares/authentication');
const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
    if(file.mimetype.startsWith('image')){
        callback(null, true);
    }
    else {
        callback('invalide image file', false);
    }
}

const uploads = multer({storage, fileFilter: (req, file, cb)})

// to resize the image 
const sharp = require('sharp');


router.post('/create-user',validateUserSignUp, userValidation ,createUser);
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn)

// router.post('/create-post', isAuthenticated, (req, res) => {
//     res.send('In the secret route!');
// })

router.post('/upload-profile', isAuthenticated, uploads.single('profile'), async (req, res) => {
    const { user } = req;
    if(!user)
        return res.status(401).json({success: false, message: 'unauthorized access!'});  

    const profileBuffer = req.file.buffer;
    const imageInfo = await sharp(profileBuffer).metadata();
    console.log(imageInfo); 
    res.send('ok');
});
module.exports = router;