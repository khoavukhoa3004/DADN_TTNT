const tempSensor = require('../models/deviceModel').tempModel;
const bcrypt = require('bcrypt');

const tempController = {
    create: async(req, res) => {
        try {
            const newTempSensor = await new tempSensor({
                
            })
        } catch (error) {
            res.status(500).json(error);
        }
    },

    get: async(req, res) => {

    },

    getInterval: async(req, res) => {

    },

    getHistory: async(req, res) => {

    },

    // Delete Sensor on MongoDB:
        // When inactive: only delete on MongoDB + UI.
        // When active: delete on MongoDB + Adafruit + UI.
    delete: async(req, res) => {
        try {
            const deleteTempSensor = await tempSensor.findOneAndDelete({
                tempID: req.params.id,
            });
        } catch (error) {
            
        }
    },

    // createTempSensor: async(req, res) => {
    //     try {
    //         const newTempSensor = await new tempSensor({
    //             tempID: req.body.tempID,
    //             createdAt: Date.now() + 7 * 60 * 60 * 1000,
    //             updatedAt: Date.now() + 7 * 60 * 60 * 1000,
    //             tempValue: req.body.tempValue,
    //         });
    //         const TempSensor = await newTempSensor.save();
    //         res.status(200).json(TempSensor);
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },

    // getAllTempSensor: async(req, res) => {
    //     try {
    //         const allTempSensor = await tempSensor.find();
    //         res.status(200).json(allTempSensor);
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },

    // getTempSensorById: async(req, res) => {
    //     try {
    //         const TempSensor = await tempSensor.findOne({
    //             tempID: req.params.id,
    //         });
    //         if(TempSensor) res.status(200).json(TempSensor);
    //         else res.status(200).json("Temp Sensor not found!");
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },

    // deleteTempSensorByID: async(req, res) => {
    //     try {
    //         const deleteTempSensor = await tempSensor.findOneAndDelete({
    //             tempID: req.params.id,
    //         });
    //         if(deleteTempSensor) res.status(200).json("Delete Successfully");
    //         else res.status(200).json("Temp Sensor not found! Delete failed.");
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },

    // deleteAllTempSensor: async(req, res) => {
    //     try {
    //         const deleteAll = await tempSensor.deleteMany();
    //         res.status(200).json("Deleted All Temp Sensors!");
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // }
};

module.exports = tempController;
