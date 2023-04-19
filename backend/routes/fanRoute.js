const fanController = require('../controllers/fanController');

const fanRouter = require('express').Router();

// Create Fan, and push to MongoDB (but inactive):
fanRouter.post('/create', fanController.create);
// Get Fan Data from MongoDB (for DeviceListScreen = Device + Button):
fanRouter.get('/get', fanController.get);
// Get Fan Data from Adafruit (Real-time) when active:
fanRouter.get('/getInterval', fanController.getInterval);
// Get Fan Data from MongoDB (to do HistoryList) when active:
fanRouter.get('/getHistory', fanController.getHistory);
// Update Fan Status on MongoDB and Adafruit (when active):
fanRouter.put('/updateStatus', fanController.updateStatus);
// Update Fan Value on MongoDB and Adafruit (when active):
fanRouter.put('/updateValue', fanController.updateValue);
// Delete Fan on MongoDB:
fanRouter.delete('/delete', fanController.delete);

module.exports = fanRouter;