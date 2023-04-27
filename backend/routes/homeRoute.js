const {HomeController, RoomController} = require('../controllers/homeController');
const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/authentication');


router.post('/createRoom', isAuthenticated, RoomController.create);
router.get('/getAllRoom', isAuthenticated, RoomController.get);

// router.post('/createHome', HomeController.create);
router.get('/getAllHome', isAuthenticated, HomeController.get);

module.exports = router;