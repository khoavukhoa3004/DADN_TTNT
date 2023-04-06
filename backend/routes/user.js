const express = require('express')

const router = express.Router()
const {createUser, userSignIn} = require('../controllers/user.controller');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middlewares/validation/user.validation');
const { isAuthenticated } = require('../middlewares/authentication');

router.post('/create-user',validateUserSignUp, userValidation ,createUser);
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn)

router.post('/create-post', isAuthenticated, (req, res) => {
    res.send('In the secret route!');
})

module.exports = router;