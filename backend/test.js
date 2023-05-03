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
        let user = await User.findOne({ username: username}).populate('haveHomes'); 
        console.log('User ',user)
        const homeIds = user.haveHomes[0]._id;
        console.log('Home id: ', homeIds);
        const oldHome = await homeModel.findOne({_id: homeIds}).exec();
        const newRoom1 = new roomModel({
            "name": "Phòng khách",
            "id" : "0",
            haveHome: newHome._id,
        });



        // const newHome = new homeModel({
        //     "address": {
        //         "number": "2",
        //         "street": "Nguyễn Huệ",
        //         "city": "Hồ Chí Minh",
        //     },
        //     "id":"2",
        // });
        // try {
        //     await newHome.save();
        //     console.log('Home added successfully');
        // }
        // catch (error) {
        //     console.error(error.message);
        // }
        // try {
        //     console.log('okeeefsfasdf')
        //     user.haveHomes.push(newHome._id);
        //     console.log('dfafsd')
        //     await user.save();
        //     console.log('user added successfully')
        // } catch(error){
        //     console.error('Can push user', error.message);
        //     return;
        // }              

        // try {
        //     newHome.haveResidents.push(user._id);
        //     console.log('ok')
        //     newHome.haveOwner = user._id;
        //     console.log('okela')
        //     newHome.save();
        // } catch(error){
        //     console.error('Can push user', error.message);
        //     return;            
        // }




        //Create New Home:
        // const newHome = new homeModel({
        //     "address": {
        //         "number": "1",
        //         "street": "Tạ Quang Bửu",
        //         "city": "Hồ Chí Minh",
        //     }
        // });
        // try{
        //     await newHome.save()
        //     console.log('Home added successfully!');
        // } catch(error){
        //     console.error(error.message);
        //     return;
        // }
        
        // try {
        //     console.log('okeeefsfasdf')
        //     user.haveHomes.push(newHome._id);
        //     console.log('dfafsd')
        //     await user.save();
        //     console.log('user added successfully')
        // } catch(error){
        //     console.error('Can push user', error.message);
        //     return;
        // }      
        // const newRoom = new roomModel({
        //     "name": "Phòng khách",
        //     "id" : "0",
        //     haveHome: newHome._id,
        // });
        // try {
        //     await newRoom.save();
        //     console.log('room added successfully!');  
        // } catch(error) {
        //     console.error(error.message);
        //     return;
        // }

        
        // try{
        //     newHome.haveResidents.push(user._id);
        //     console.log('ok')
        //     newHome.haveOwner = user._id;
        //     console.log('okela')
        //     newHome.haveRooms.push(newRoom._id);
        //     console.log('okelaalala')
        //     await newHome.save();
            
        //     console.log('User added to residents successfully');
        // }
        // catch(error){
        //     console.error(error.message);
        //     console.error('Loi cho nay')
        // }

        // const fan_device = new deviceModel({
        //     device_name: 'fanstatus-1',
        //     activate: true,
        //     state: 'ON',
        //     value: 20,
        //     type: 'fan',
        // });
        // try {
        //     await fan_device.save();
        //     console.log('fan device added successfully!');  
        // } catch(error){
        //     console.error(error.message);
        //     return;
        // }
        
        // fan_device.haveRoom = newRoom._id;
        // fan_device.save();
        
        // const door_device = new deviceModel({
        //     device_name: 'doorstatus-1',
        //     activate: true,
        //     state: 'OFF',
        //     value: 0,
        //     type: 'door',
        //     haveRoom: newRoom._id,
        // })

        // try {
        //     await door_device.save();
        //     console.log('door device added successfully!');   
        // } catch(error) {
        //     console.error(error.message);
        //     return;
        // }

        // const led_device = new deviceModel({
        //     device_name: 'ledstatus-1',
        //     activate: true,
        //     state: 'OFF',
        //     value: 63,
        //     type: 'bulb',
        //     haveRoom: newRoom._id,
        // })

        // try{
        //     await led_device.save();
        //     console.log('door device added successfully!');
        // } catch(error) {
        //     console.error(error.message);
        //     return;
        // }

        // const light_sensor = new deviceModel({
        //     device_name: 'lightsensor-1',
        //     activate: true,
        //     state: 'ON',
        //     value: 40,
        //     type: 'light',
        //     haveRoom: newRoom._id,
        // });
        // try {
        //     await light_sensor.save();
        //     console.log('light sensor added successfully!'); 
        // } catch(error){
        //     console.error(error.message);
        //     return;
        // }
        // const temp_sensor = new deviceModel({
        //     device_name: 'tempsensor-1',
        //     activate: true,
        //     state: 'ON',
        //     value: 28,
        //     type: 'temp',
        //     haveRoom: newRoom._id,
        // });

        // try {
        //     await temp_sensor.save();
        // } catch(error){
        //     console.error(error.message);
        //     return;
        // }
        // newRoom.haveDevices.push(fan_device._id);
        // newRoom.haveDevices.push(led_device._id);
        // newRoom.haveDevices.push(light_sensor._id);
        // newRoom.haveDevices.push(temp_sensor._id);
        // newRoom.haveDevices.push(door_device._id);
        // try {
        //     await newRoom.save();
        //     console.log('adding devices successfully to newRoom');
        // }
        // catch(error){
        //     console.error(error.message);
        //     return;
        // }

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