const doorController = require("../controllers/doorController");

const doorRouter = require("express").Router();

// doorRouter.post("/createDoorSensor", doorController.createDoorSensor);
// doorRouter.get("/getAllDoorSensor", doorController.getAllDoorSensor);
// doorRouter.get("/getDoorSensorById/:id", doorController.getDoorSensorById);
// doorRouter.put("/updateDoorSensorStatus/:id/:updateStatus", doorController.updateDoorSensorStatus);
// doorRouter.delete("/deleteAllDoorSensor", doorController.deleteAllDoorSensor);
// doorRouter.delete("/deleteDoorSensorById/:id", doorController.deleteDoorSensorById);

doorRouter.post('/create', doorController.create);
doorRouter.get('/get', doorController.get);
doorRouter.put('/updateStatus', doorController.updateStatus);
doorRouter.delete('/delete', doorController.delete);

module.exports = doorRouter;