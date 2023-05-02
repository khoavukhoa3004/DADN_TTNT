const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user.model')
const { homeModel, roomModel }  = require('./models/home.model');
const { deviceModel } = require('./models/device.model')


mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,    
    })
    .then(async () => {
        console.log('Connected to MongoDB Atlas');

        const username = 'nmdk';
        const user = await User.findOne({ username: username}); 

        const newHome = new homeModel({
            "address": {
                "number": "1",
                "street": "Tạ Quang Bửu",
                "city": "Hồ Chí Minh",
            }
        });
        try{
            await newHome.save()
            console.log('Home added successfully!');
        } catch(error){
            console.error(error.message);
            return;
        }
        
        const newRoom = new roomModel({
            "name": "Phòng khách",
            "id" : "0",
        });
        try {
            await newRoom.save();
            console.log('room added successfully!');  
        } catch(error) {
            console.error(error.message);
            return;
        }

        
        try{
            newHome.residents.push(user._id);
            console.log('ok')
            newHome.haveOwner = user._id;
            console.log('okela')
            newHome.haveRooms.push(newRoom._id);
            console.log('okelaalala')
            await newHome.save();
            console.log('User added to residents successfully');
        }
        catch(error){
            console.error(error.message);
        }

        const fan_device = new deviceModel({
            device_name: 'fanstatus-1',
            activate: true,
            state: 'ON',
            value: 20,
            type: 'fan',
        });
        try {
            await fan_device.save();
            console.log('fan device added successfully!');  
        } catch(error){
            console.error(error.message);
            return;
        }
        
        fan_device.inRoom = newRoom._id;
        fan_device.save();
        
        const door_device = new deviceModel({
            device_name: 'doorstatus-1',
            activate: true,
            state: 'OFF',
            value: 0,
            type: 'door',
            inRoom: newRoom._id,
        })

        try {
            await door_device.save();
            console.log('door device added successfully!');   
        } catch(error) {
            console.error(error.message);
            return;
        }

        const led_device = new deviceModel({
            device_name: 'ledstatus-1',
            activate: true,
            state: 'OFF',
            value: 63,
            type: 'bulb',
            inRoom: newRoom._id,
        })

        try{
            await led_device.save();
            console.log('door device added successfully!');
        } catch(error) {
            console.error(error.message);
            return;
        }

        const light_sensor = new deviceModel({
            device_name: 'lightsensor-1',
            activate: true,
            state: 'ON',
            value: 40,
            type: 'light',
            inRoom: newRoom._id,
        });
        try {
            await light_sensor.save();
            console.log('light sensor added successfully!'); 
        } catch(error){
            console.error(error.message);
            return;
        }
        const temp_sensor = new deviceModel({
            device_name: 'tempsensor-1',
            activate: true,
            state: 'ON',
            value: 28,
            type: 'temp',
            inRoom: newRoom._id,
        });

        try {
            await temp_sensor.save();
        } catch(error){
            console.error(error.message);
            return;
        }
    })
    .catch((err) => {
        console.error(err.message);
    });

    // const newUser = new User({
        //     "fName": "Elon",
        //     "lName": "Musk",
        //     "email": "elonmusk1234@gmail.com",
        //     "username": "nmdk",
        //     "activate": true,
        //     "password": "hello1234",
        //     "dateOfBirth": new Date("28/06/1971"),
        //     "phoneNumber": "0123456789",
        // });

        // newUser.save((err) => {
        //     if (err) {
        //         console.error(err.message);
        //         return;
        //     }
        //     console.log('User added successfully');
        //     mongoose.connection.close();
        // });