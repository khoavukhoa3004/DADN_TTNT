// Before these code, type these commands: npm install mqtt async-mqtt --save

const PORT = 3000
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mqttService = require('./services/mqttService');
const request = require('request');

require('dotenv').config();
//Connect to MongoDB Server:
require('./models/db');

const userRouter = require('./routes/user')

const User = require('./models/user.model');

const adafruitRouter = require('./routes/adafruit.js')

const app = express();

app.use(express.json());
app.use('/user',userRouter);
app.use('/sensor',adafruitRouter);

// // test("khoapro313@gmail.com", "hello212376")

// app.get('/test', (req, res) => {
//     res.send('Hello world!');
// });




// // app.post('/', (req, res) => {
// //     console.log(req.body)
// //     res.send('hello')
// // })

// app.listen(PORT,()=>{
//     console.log('server running in '+ PORT)
// })

