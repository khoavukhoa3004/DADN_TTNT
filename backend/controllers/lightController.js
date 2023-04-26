const lightSensor = require('../models/deviceModel').lightModel;
const bcrypt = require('bcrypt');

const lightController = {
    // createLightSensor: async(req, res) => {
    //     try {
    //         const newLightSensor = await new lightSensor({
    //             lightID: req.body.lightID,
    //             createdAt: Date.now() + 7 * 60 * 60 * 1000,
    //             updatedAt: Date.now() + 7 * 60 * 60 * 1000,
    //             lightValue: req.body.lightValue,
    //         });
    //         const LightSensor = await newLightSensor.save();
    //         res.status(200).json(LightSensor);
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },

    // getAllLightSensor: async(req, res) => {
    //     try {
    //         const allLightSensor = await lightSensor.find();
    //         res.status(200).json(allLightSensor);
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },

    // getLightSensorById: async(req, res) => {
    //     try {
    //         const LightSensor = await lightSensor.findOne({
    //             lightID: req.params.id,
    //         });
    //         if(LightSensor) res.status(200).json(LightSensor);
    //         else res.status(200).json("Light Sensor not found!");
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },

    // deleteLightSensorById: async(req, res) => {
    //     try {
    //         const deleteLightSensor = await lightSensor.findOneAndDelete({
    //             lightID: req.params.id,
    //         });
    //         if(deleteLightSensor) res.status(200).json("Delete Successfully");
    //         else res.status(200).json("Light Sensor not found! Delete failed.");
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },

    // deleteAllLightSensor: async(req, res) => {
    //     try {
    //         const deleteAll = await lightSensor.deleteMany();
    //         res.status(200).json("Deleted All Light Sensors!");
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // }
}

module.exports = lightController;