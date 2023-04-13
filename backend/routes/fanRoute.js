const fanController = require('../controllers/fanController');

const fanRouter = require('express').Router();

fanRouter.post('/create', fanController.create);
fanRouter.get('/get', fanController.get);
fanRouter.put('/updateStatus', fanController.updateStatus);
fanRouter.put('/updateValue', fanController.updateValue);
fanRouter.delete('/delete', fanController.delete);

module.exports = fanRouter;