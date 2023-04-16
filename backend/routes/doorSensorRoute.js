const doorController = require("../controllers/doorController");

const doorRouter = require("express").Router();

doorRouter.post('/create', doorController.create);
doorRouter.get('/get', doorController.get);
doorRouter.put('/updateStatus', doorController.updateStatus);
doorRouter.delete('/delete', doorController.delete);

module.exports = doorRouter;