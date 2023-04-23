const tempController = require("../controllers/tempController");

const tempRouter = require("express").Router();

// Create Sensor, and push to MongoDB (but inactive):
tempRouter.post('/create', tempController.create);
// Get Sensor Data from MongoDB (for DeviceListScreen = Device + Button):
tempRouter.get('/get', tempController.get);
// Get Sensor Data from Adafruit (Real-time) when active:
tempRouter.get('/getInterval', tempController.getInterval);
// Get Sensor Data from MongoDB (to do HistoryList) when active:
tempRouter.get('/getHistory', tempController.getHistory);
// Delete Sensor on MongoDB:
tempRouter.delete('/delete/:id', tempController.delete);

module.exports = tempRouter;