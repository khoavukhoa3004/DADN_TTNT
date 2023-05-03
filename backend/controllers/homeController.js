const HomeConstructor = require('../models/home.model').homeModel;
const RoomConstructor = require('../models/home.model').roomModel;
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
            const user = await User.findOne({username: req.params.username});
            if(!user) {
                return res.status(404).json({success: false, message: 'User not found'});
            }
            const home = user.haveHomes.map(home => home._id.toString());
            res.status(200).json({sucess: true, data: home});
        } catch (error) {
            console.error(error);
            res.status(500).json({success: false, message: error.message});
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
        try {
            const address = await HomeConstructor.findOne({_id: req.params.homeId})
            res.status(200).json({success: true, data: address.address});
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
            const homeInfo = await HomeConstructor.findOne({_id: req.params.id})
            const room_id = homeInfo.haveRooms.map(room => room._id.toString());
            res.status(200).json({success: true, data: room_id});
        } catch (err) {
            console.error(err);
            res.status(500).json({success: false, message: err.message});
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
            const roomInfor = RoomConstructor.findOne({_id: req.params.roomId});
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
            const roomInfor = RoomConstructor.findOne({_id: req.params.roomId});
            if(!roomInfor) {
                return res.status(404).json({success: false, message: 'Not found room._id'});
            }
            const device_id = roomInfor.haveDevices.map(device => device._id.toString());
            res.status(200).json({success: true, data: device_id});
        } catch(error) {
            console.error(error);
            res.status(500).json({success: false, message: error.message});   
        }    
    }
};
