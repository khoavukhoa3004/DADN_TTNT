const {get10DevicesLog} = require('../controllers/deviceLogController')

const express = require('express');
const router = express.Router();
router.get('/get10DeviceLogs', get10DevicesLog);

module.exports = router;