const express = require('express')

const router = express.Router()
const {createUser, userSignIn} = require('../controllers/user.controller');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middlewares/validation/user.validation');

router.post('/create-user',validateUserSignUp, userValidation ,createUser);
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn)


module.exports = router;