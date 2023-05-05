const { DeviceController } = require('../controllers/deviceController');

const express = require('express');
const router = express.Router();

// const { isAuthenticated } = require('../middlewares/authentication');

router.patch('/updateState/:deviceId/:state', DeviceController.patch);
router.patch('/updateValue/:deviceId/:value', DeviceController.patchValue);

router.get('/getData/:deviceId', DeviceController.getDataByDeviceId);

module.exports = router;