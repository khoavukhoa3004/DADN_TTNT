const {HomeController, RoomController} = require('../controllers/homeController');
const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/authentication');


router.get('/getAllHome', isAuthenticated, HomeController.getAllHome);
router.get('/getAddress/:homeId', isAuthenticated, HomeController.getAddress);
router.get('/getHomes/:username', isAuthenticated, HomeController.getHomeByUserName);
router.get('/getRooms/:homeId', isAuthenticated, HomeController.getRooms);
router.get('/getRoomsId&Name/:homeId', isAuthenticated, HomeController.getRoomsIdAndName);
router.get('/getRoomIds/:homeId', isAuthenticated, HomeController.getRoomIds);
router.post('/createHome', HomeController.create);



router.post('/createRoom', isAuthenticated, RoomController.create);
router.get('/getAllRoom', isAuthenticated, RoomController.get);
router.get('/getName/:roomId', isAuthenticated, RoomController.getName);
router.get('/getDevices/:roomId', isAuthenticated, RoomController.getDevices);
router.get('/getDevicesId&Type/:roomId', isAuthenticated, RoomController.getDevicesIdAndType);
module.exports = router;