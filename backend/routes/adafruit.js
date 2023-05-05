const express = require('express');
const axios = require('axios');
// const bodyParser = require('body-parser');

const { isAuthenticated } = require('../middlewares/authentication');
const { dataValidation, validateData } = require('../middlewares/validation/adafruit.validation');
const { postData, getCurrentData, getAllData, getCurrentDataWithoutAuthenticated, postDataWithoutAuthenticated } = require('../controllers/adafruit.controller');

const router = express.Router();

router.post('/post-current', isAuthenticated, validateData, dataValidation, postData);

router.get('/get-current/:feedKey', isAuthenticated, getCurrentData);

router.get('/get-all/:feedKey', isAuthenticated, getAllData);

router.get('/get-current-without-authenticated/:feedKey', getCurrentDataWithoutAuthenticated);

router.post('/post-current-without-authenticated', validateData, dataValidation, postDataWithoutAuthenticated);

module.exports = router;

