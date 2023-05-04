const deviceLog = require('../models/deviceLog.model');
const User = require('../models/user.model');
const Home = require('../models/home.model').homeModel;
const Room = require('../models/home.model').roomModel;

exports.get10DevicesLog = async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({username: username});
    const homes = user.haveHomes.map(home => home._id.toString());
    let rooms = [];
    for(item in homes) {
        let room = 
    } 
}