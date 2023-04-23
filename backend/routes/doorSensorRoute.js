const doorController = require("../controllers/doorController");

const doorRouter = require("express").Router();

// Create Sensor, and push to MongoDB (but inactive):
doorRouter.post('/create', doorController.create);
// Get Sensor Data from MongoDB (for DeviceListScreen = Device + Button):
doorRouter.get('/get', doorController.get);
// Get Sensor Data from Adafruit (Real-time) when active:
doorRouter.get('/getInterval', doorController.getInterval);
// Get Sensor Data from MongoDB (to do HistoryList) when active:
doorRouter.get('/getHistory', doorController.getHistory);
// Update Sensor Status on MongoDB and Adafruit (when active):
doorRouter.put('/updateStatus', doorController.updateStatus);
// Delete Sensor on MongoDB and Adafruit:
doorRouter.delete('/delete', doorController.delete);

module.exports = doorRouter;