const bulbController = require('../controllers/bulbController');

const bulbRouter = require('express').Router();

bulbRouter.post('/create', bulbController.create);
bulbRouter.get('/get', bulbController.get);
bulbRouter.put('/updateStatus', bulbController.updateStatus);
bulbRouter.put('/updateValue', bulbController.updateValue);
bulbRouter.delete('/delete', bulbController.delete);

module.exports = bulbRouter;