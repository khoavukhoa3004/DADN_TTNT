const HomeConstructor = require('../models/home.model').homeModel;
const RoomConstructor = require('../models/home.model').roomModel;

exports.HomeController = {
    // create: async(req, res) => {
    //     try {
    //         const newHome = await new HomeConstructor({

    //         })
    //     } catch (error) {
            
    //     }
    // },
    
    get: async(req, res) => {
        try {
            const getAllHome = await HomeConstructor.find();
            res.status(200).json(getAllHome);
        } catch (error) {
            res.status(500).json(error);
        }
    }
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
};
