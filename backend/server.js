// Before these code, type these commands: npm install mqtt async-mqtt --save

const PORT = 3000
const express = require('express');

// const mqttService = require('./services/mqttService');
// const request = require('request');

require('dotenv').config();
//Connect to MongoDB Server:
require('./models/db');

const userRouter = require('./routes/user')
const adafruitRouter = require('./routes/adafruit.js')
const homeRouter = require('./routes/homeRoute');
const deviceRouter = require('./routes/deviceRoute');
const deviceLogRouter = require('./routes/deviceLogRoute');
const app = express();

app.use(express.json());
app.use('/user',userRouter);
app.use('/sensor',adafruitRouter);
app.use('/home', homeRouter);
app.use('/device', deviceRouter);
app.use('/deviceLog', deviceLogRouter);

app.get('/', (req, res) => {
    res.json({success: true, message: 'Welcome to backend zone!'})
})




// app.post('/', (req, res) => {
//     console.log(req.body)
//     res.send('hello')
// })

app.listen(PORT,()=>{
    console.log('server running in '+ PORT)
})

