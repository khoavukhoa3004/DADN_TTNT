const lightController = require("../controllers/lightController");

const lightRouter = require("express").Router();

// Create Sensor, and push to MongoDB (but inactive):
lightRouter.post('/create', lightController.create);
// Get Sensor Data from MongoDB (for DeviceListScreen = Device + Button):
lightRouter.get('/get', lightController.get);
// Get Sensor Data from Adafruit (Real-time) when active:
lightRouter.get('/getInterval', lightController.getInterval);
// Get Sensor Data from MongoDB (to do HistoryList) when active:
lightRouter.get('/getHistory', lightController.getHistory);
// Delete Sensor on MongoDB:
lightRouter.delete('/delete', lightController.delete);

module.exports = lightRouter;