const { DeviceController } = require('../controllers/deviceController');

const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/authentication');

router.patch('/updateState/:deviceId/:state', isAuthenticated, DeviceController.patch);
router.patch('/updateValue/:deviceId/:value', isAuthenticated, DeviceController.patchValue);

module.exports = router;