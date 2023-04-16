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

const app = express();
// const mqttClient = new mqttService();
// mqttClient.connect();
// module.exports = mqttClient;

app.use(cors());

app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.json());

// API Configurations through ROUTES:
const fanRoute = require('./routes/fanRoute');
const bulbRoute = require('./routes/bulbRoute');
// const tempSensorRoute = require('./routes/tempSensorRoute');
// const lightSensorRoute = require('./routes/lightSensorRoute');
const doorSensorRoute = require('./routes/doorSensorRoute');

// app.get('/', (req, res) => {
//     res.send('<h1>Hello World</h1>');
// })

app.use('/fan', fanRoute);
app.use('/bulb', bulbRoute);
// app.use('/temp', tempSensorRoute);
// app.use('/light', lightSensorRoute);
app.use('/door', doorSensorRoute);


//Test API:
app.get('/data', (req, res) => {
    const feed = 'dangnguyen/feeds/button1';
    const options = {
      url: `https://io.adafruit.com/api/v2/dangnguyen/feeds/${feed}`,
      headers: {
        'X-AIO-Key': 'aio_Tpns72HEyXkIXko7394emsFLSZPL'
      }
    };
    request(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.json(data);
      } else {
        res.status(500).send('Error fetching data from Adafruit IO');
      }
    });
});

app.post('/data', (req, res) => {
    const feed = 'dangnguyen/feeds/button1';
    const value = req.body.value;
    const options = {
      url: `https://io.adafruit.com/api/v2/dangnguyen/feeds/${feed}`,
      headers: {
        'X-AIO-Key': 'aio_Tpns72HEyXkIXko7394emsFLSZPL'
      },
      json: {
        value: value
      }
    };
    request.post(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.send('Data sent to Adafruit IO');
      } else {
        res.status(500).send('Error sending data to Adafruit IO');
      }
    });
});


// module.exports = mqttClient;

app.listen(PORT, () => {
    console.log('server running in '+ PORT)
})







// client.on('connect', () => {
//     // sub đúng kênh để nhận dữ liệu
//     for (const topic in feed){
//         client.subscribe(feed[topic]);
//         console.log('connected ' + feed[topic]);
//     }
// });

// client.on('reconnect', () => {
//     for (const topic in feed){
//         client.subscribe(feed[topic]);
//         // console.log('connected ' + feed[topic]);
//     }
// });

//Auto Generate when Errors:
// client.on('error', (err) => console.log('error', err));

// client.on('offline', () => connected = false);















// const userRouter = require('./routes/user')

// const User = require('./models/user.model');
// const Fan = require('./models/deviceModel').fanModel;
// const Bulb = require('./models/deviceModel').bulbModel;
// const Temp = require('./models/deviceModel').tempModel;
// const Light = require('./models/deviceModel').lightModel;
// const Door = require('./models/deviceModel').doorModel;

//ROUTES:
// app.use('/device', deviceRoute);
// // app.use('/fanDevice', fanRoute);
// // app.use('/bulbDevice', bulbRoute);
// app.use('/tempSensor', tempSensorRoute);
// app.use('/lightSensor', lightSensorRoute);
// app.use('/doorSensor', doorSensorRoute);

// app.post('/createDevice', async (req, res) => {
//     const deviceIDname = 'fan3';
//     deviceModel.checkDeviceDuplication(deviceIDname);
//     if(!deviceModel) return res.json({
//         success: false,
//         message: 'This device\'s name is already in use. Try another name.',
//     })
//     const device = await deviceModel({
//         deviceID: deviceIDname,
//         fanCurrentStatus: 'ON',
//     })
//     await device.save();
//     res.json(device);
// });

// app.use((req, res, next) => {
//     req.on('data', (chunk) => {
//         const data = JSON.parse(chunk);
//         req.body = data;
//         next();
//     });
    
// });

// // Don't care about codes below:
// app.use(express.json());
// app.use(userRouter);

// // const test = async (email, password) => {
// //     const user = await User.findOne({ email: email});
// //     const result = await user.comparePassword(password);
// //     console.log(result);
// // }

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

