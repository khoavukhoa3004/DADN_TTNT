const lightController = require("../controllers/lightController");

const lightRouter = require("express").Router();

lightRouter.post("/createLightSensor", lightController.createLightSensor);
lightRouter.get("/getAllLightSensor", lightController.getAllLightSensor);
lightRouter.get("/getLightSensorById/:id", lightController.getLightSensorById);
lightRouter.delete("/deleteAllLightSensor", lightController.deleteAllLightSensor);
lightRouter.delete("/deleteLightSensorById/:id", lightController.deleteLightSensorById);

module.exports = lightRouter;