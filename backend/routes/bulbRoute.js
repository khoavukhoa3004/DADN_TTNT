const bulbController = require('../controllers/bulbController');

const bulbRouter = require('express').Router();

// Create Bulb, and push to MongoDB (but inactive):
bulbRouter.post('/create', bulbController.create);
// Get Bulb Data from MongoDB (for DeviceListScreen = Device + Button):
bulbRouter.get('/get', bulbController.get);
// Get Bulb Data from Adafruit (Real-time) when active:
bulbRouter.get('/getInterval', bulbController.getInterval);
// Get Bulb Data from MongoDB (to do HistoryList) when active:
bulbRouter.get('/getHistory', bulbController.getHistory);
// Update Bulb Status on MongoDB and Adafruit (when active):
bulbRouter.put('/updateStatus', bulbController.updateStatus);
// Update Bulb Value on MongoDB and Adafruit (when active):
bulbRouter.put('/updateValue', bulbController.updateValue);
// Delete Bulb on MongoDB:
bulbRouter.delete('/delete', bulbController.delete);

module.exports = bulbRouter;