// This file is used to connect to Server.
const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.MONGODB_TEST, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        // useCreateIndex: true,
    })
    .then(()=>{
        console.log('our db is connected');
    })
    .catch(
        err => {console.error(err.message);
    })