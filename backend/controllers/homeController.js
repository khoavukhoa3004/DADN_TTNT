const HomeConstructor = require('../models/home.model').homeModel;
const RoomConstructor = require('../models/home.model').roomModel;
const Device = require('../models/device.model')
const User = require('../models/user.model')

exports.HomeController = {
    create: async(req, res) => {
        try {
            const newHome = await new HomeConstructor({
                address: {
                    number: req.body.number,
                    street: req.body.street,
                    city: req.body.city,
                }
            })
            const saveHome = await newHome.save().then((savedHome) => {
                console.log('Home saved to database:', savedHome); 
            });
            res.status(200).json(saveHome);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    
    getAllHome: async(req, res) => {
        try {
            const getAllHome = await HomeConstructor.find();
            res.status(200).json(getAllHome);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getHomeByUserName: async (req, res) => {
        const { user } = req;
        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access!'
            });
        }
        try{
            console.log('getHomeByUserName', req.params.username)
            const user = await User.findOne({username: req.params.username});
            // console.log(user)
            if(!user) {
                return res.status(404).json({success: false, message: 'User not found'});
            }
            const home = user.haveHomes.map(home => home._id.toString());
            res.status(200).json({success: true, data: home});
        } catch (error) {
            console.error(error);
            res.status(500).json({success: false, message: error.message});
        }
    },
    getRooms: async (req, res) => {
        const { user } = req;
        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access!'
            });
        }
        try {
            console.log('getRooms');
            const homeInfo = await HomeConstructor.findOne({_id: req.params.homeId})
            // console.log(homeInfo)
            
            const roomIds = homeInfo.haveRooms.map(room => room._id.toString());
            console.log(typeof roomIds);
            res.status(200).json({success: true, data: roomIds});
        } catch (err) {
            console.error(err);
            res.status(500).json({success: false, message: err.message});
        }
    },
    getRoomsIdAndName: async (req, res) => {
        const { user } = req;
        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access!'
            });
        }
        try {
            console.log('getRooms');
            const homeInfo = await HomeConstructor.findOne({_id: req.params.homeId})
                .populate({
                    path: 'haveRooms',
                    select: '_id id name'
                })
            // console.log(homeInfo)
            
            const roomPairs = homeInfo.haveRooms.map(room => ({_id: room._id, name: room.name, id: room.id}));
            console.log(roomPairs);
            res.status(200).json({success: true, data: roomPairs});
        } catch (err) {
            console.error(err);
            res.status(500).json({success: false, message: err.message});
        }
    },
    getRoomIds: async (req, res) => {
        const { user } = req;
        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access!'
            });
        }
        try {
            console.log('getRoomIds');
            const homeInfo = await HomeConstructor.findOne({_id: req.params.homeId}).populate({ path: 'haveRooms', select: 'id' })
            // console.log(homeInfo)
            // console.log(homeInfo)
            const roomIds = homeInfo.haveRooms.map(room => room.id);
            // console.log(typeof roomIds);
            res.status(200).json({success: true, data: roomIds});
        } catch (err) {
            console.error(err);
            res.status(500).json({success: false, message: err.message});
        }
    },
    getAddress: async function (req, res) {
        const { user } = req;
        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access!'
            });
        }
        console.log('get Address: ', req.params.homeId)
        try {
        
            const address = await HomeConstructor.findOne({_id: req.params.homeId})
            console.log('getAddress: ', address)
            res.status(200).json({success: true, data: address.address});
        } catch (error) {
            console.error(error);
            res.status(500).json({success: false, message: error.message});
        }
    },
    
};

exports.RoomController = {
    create: async(req, res) => {
        try {
            const newRoom = await new RoomConstructor({
                name: req.body.name,
                id: req.body.id,
            })
            const saveRoom = await newRoom.save();
            res.status(200).json(saveRoom);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    get: async(req, res) => {
        try {
            const getAllRoom = await RoomConstructor.find();
            res.status(200).json(getAllRoom);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getName: async (req, res) => {
        const { user } = req;
        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access!'
            });
        }
        try {   
            console.log('getName of Room')
            const roomInfor = await RoomConstructor.findOne({_id: req.params.roomId});
            if(!roomInfor) {
                return res.status(404).json({success: false, message: 'Not found room._id'});
            }
            res.status(200).json({success: true, data: roomInfor.name});
            
        } catch(error) {
            console.error(error);
            res.status(500).json({success: false, message: error.message});        
        }
    },
    getDevices: async (req, res) => {
        const { user } = req;
        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access!'
            });
        }
        try {
            console.log('getDevices, roomID: ', req.params.roomId)
            const roomInfor = await RoomConstructor.findOne({_id: req.params.roomId});
            // console.log(roomInfor)
            if(!roomInfor) {
                return res.status(404).json({success: false, message: 'Not found room._id'});
            }
            const device_id = roomInfor.haveDevices.map(device => device._id.toString());
            res.status(200).json({success: true, data: device_id});
        } catch(error) {
            console.error(error);
            res.status(500).json({success: false, message: error.message});   
        }    
    },
    getDevicesIdAndType: async (req, res) => {
        const { user } = req;
        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access!'
            });
        }
        try {
            console.log('getDevicesId&Type: ', req.params.roomId);
            const roomInfo = await RoomConstructor.findOne({_id: req.params.roomId})
                .populate({
                    path: 'haveDevices',
                    select: '_id type device_name'
                })
            // console.log(homeInfo)
            
            const devicePairs = roomInfo.haveDevices.map(device => ({_id: device._id, type: device.type, name: device.device_name}));
            console.log(devicePairs);
            res.status(200).json({success: true, data: devicePairs});
        } catch (err) {
            console.error(err);
            res.status(500).json({success: false, message: err.message});
        }
    }

};
