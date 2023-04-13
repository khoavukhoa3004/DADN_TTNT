const bulbModel = require('../models/deviceModel').bulbModel;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mqttClient = require('../server');
// const mqttService = require('../services/mqttService');
// const { updateStatus, updateValue } = require('./fanController');

// const mqttClient = new mqttService();
// mqttClient.connect();

const bulbController = {
    create: async(req, res) => {
        
    },

    get: async(req, res) => {

    },

    updateStatus: async (req, res) => {
        try {
            const topic = req.body.topic;
            const message = req.body.message;
            
            console.log(`Request Topic :: ${topic}`);
            console.log(`Request Message :: ${message}`);

            mqttClient.publish(topic, message);
            // server.mqttClient.publish(topic, message);
            res.status(200).json({status: "200", message: "Successfully published Bulb MQTT Message!"});
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
                res.status(200).json({status: "200", message: "Successfully published Bulb MQTT Message!"});
            }
            else res.status(200).json({status: "200", message: "Invalid value"});
        } catch (error) {
            return res.status(400).json({status: "400", message: error.message});
        }
    },

    delete: async(req, res) => {

    }
}

module.exports = bulbController;