const { DeviceController } = require('../controllers/deviceController');

const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/authentication');

router.get('/get/:username/:roomId/:deviceId', isAuthenticated, DeviceController.get);
router.patch('/update/:username/:roomID/:deviceId', isAuthenticated, DeviceController.patch);

module.exports = router;