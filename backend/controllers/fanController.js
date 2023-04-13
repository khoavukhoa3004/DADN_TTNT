const fanModel = require('../models/deviceModel').fanModel;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mqttClient = require('../server');
// const server = require('../server');
// import { mqttClient } from '../server';
// const mqttService = require('../services/mqttService');
// const mqttClient = require('../services/mqttService');

// const mqttClient = new mqttService();
// mqttClient.connect();

const fanController = {
    create: async(req, res) => {
        try {
            const newFan = await new fanModel({
                fanID: req.body.fanID,
                createdAt: Date.now() + 7 * 60 * 60 * 1000,
                updatedAt: Date.now() + 7 * 60 * 60 * 1000,
                status: req.body.status,
                value: req.body.value,
            });
            const FanDevice = await newFan.save();
            res.status(200).json(FanDevice);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    get: async(req, res) => {
        // try {
        //     const topic = req.body.topic;
        //     // const message = req.body.message;

        //     console.log(`Request Topic :: ${topic}`);
        //     // console.log(`Request Message :: ${message}`);

        //     mqttClient.subscribe(topic);
        //     res.status(200).json({status: "200", message: "Successfully published MQTT Message!"});
        // } catch (error) {
        //     return res.status(400).json({status: "400", message: error.message});
        // }
    },

    updateStatus: async(req, res) => {
        try {
            const topic = req.body.topic;
            const message = req.body.message;
            
            console.log(`Request Topic :: ${topic}`);
            console.log(`Request Message :: ${message}`);

            mqttClient.publish(topic, message);
            // server.mqttClient.publish(topic, message);
            res.status(200).json({status: "200", message: "Successfully published Fan MQTT Message!"});
        } catch (error) {
            return res.status(400).json({status: "400", message: error.message});
        }
    },

    updateValue: async(req, res) => {
        try {
            const topic = req.body.topic;
            const message = req.body.message;

            console.log(`Request Topic :: ${topic}`);
            console.log(`Request Message :: ${message}`);

            if(message >= 0 && message <= 100){
                mqttClient.publish(topic, message);
                res.status(200).json({status: "200", message: "Successfully published Fan MQTT Message!"});
            }
            else res.status(200).json({status: "200", message: "Invalid value"});
        } catch (error) {
            return res.status(400).json({status: "400", message: error.message});
        }
    },

    delete: async(req, res) => {

    }
};

module.exports = fanController;
