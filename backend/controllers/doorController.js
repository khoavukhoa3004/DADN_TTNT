const doorSensor = require('../models/deviceModel').doorModel;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mqttClient = require('../server');

const doorController = {
    create: async(req, res) => {

    },

    get: async(req, res) => {

    },

    updateStatus: async(req, res) => {
        try {
            const topic = req.body.topic;
            const message = req.body.message;
            
            console.log(`Request Topic :: ${topic}`);
            console.log(`Request Message :: ${message}`);

            mqttClient.publish(topic, message);
            // server.mqttClient.publish(topic, message);
            res.status(200).json({status: "200", message: "Successfully published Door MQTT Message!"});
        } catch (error) {
            return res.status(400).json({status: "400", message: error.message});
        }
    },

    delete: async(req, res) => {

    }
}

module.exports = doorController;



    // createDoorSensor: async(req, res) => {
    //     try {
    //         const newDoorSensor = await new doorSensor({
    //             doorID: req.body.doorID,
    //             createdAt: Date.now() + 7 * 60 * 60 * 1000,
    //             updatedAt: Date.now() + 7 * 60 * 60 * 1000,
    //             doorStatus: req.body.doorStatus,
    //         })
    //         const DoorSensor = await newDoorSensor.save();
    //         res.status(200).json(DoorSensor);
    //     } catch (error) {
    //         res.status(500).json(error);   
    //     }
    // },

    // getAllDoorSensor: async(req, res) => {
    //     try {
    //         const getAll = await doorSensor.find();
    //         res.status(200).json(getAll);
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },

    // getDoorSensorById: async(req, res) => {
    //     try {
    //         const getSensorById = await doorSensor.findOne({doorID: req.params.id});
    //         if(getSensorById) res.status(200).json(getSensorById);
    //         else res.status(200).json("Door Sensor not found!");
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },

    // updateDoorSensorStatus: async(req, res) => {
    //     try {
    //         const doorById = await doorSensor.findOne({
    //             doorID: req.params.id,
    //         });
            
    //         if(doorById){
    //             const updateById = await doorSensor.updateOne({
    //                 doorID: req.params.id,
    //             }, {
    //                 doorStatus: req.params.updateStatus,
    //             }); 
    //             res.status(200).json("Update Successfully!");
    //         }
    //         else res.status(200).json("Door Sensor not found! Please try another ones.");
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },

    // deleteAllDoorSensor: async(req, res) => {
    //     try {
    //         const deleteAll = await doorSensor.deleteMany();
    //         res.status(200).json("Delete All Door Sensors!");
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },

    // deleteDoorSensorById: async(req, res) => {
    //     try {
    //         const deleteDoorSensor = await doorSensor.findOneAndDelete({doorID: req.params.id});
    //         if(deleteDoorSensor) res.status(200).json("Delete Successfully!");
    //         else res.status(200).json("Door Sensor not found! Delete failed.");
    //     } catch (error) {
    //         res.status(500).json(error);
    //     }
    // },