const express = require('express')

const router = express.Router()
const {createUser} = require('../controllers/user.controller');
const { validateUserSignUp, userValidation } = require('../middlewares/validation/user.validation');

router.post('/create-user',validateUserSignUp, userValidation ,createUser);

module.exports = router;