const tempController = require("../controllers/tempController");

const tempRouter = require("express").Router();

tempRouter.post("/createTempSensor", tempController.createTempSensor);
tempRouter.get("/getAllTempSensor", tempController.getAllTempSensor);
tempRouter.get("/getTempSensorById/:id", tempController.getTempSensorById);
tempRouter.delete("/deleteAllTempSensor", tempController.deleteAllTempSensor);
tempRouter.delete("/deleteTempSensorById/:id", tempController.deleteTempSensorByID);

module.exports = tempRouter;