const mongoose = require('mongoose');

// Define the parent schema
const deviceSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    // other device properties
  });
  
  // Define the child schemas
  const fanSchema = new mongoose.Schema({
    speed: {
      type: Number,
      required: true
    },
    // other fan properties
  });
  
  const bulbSchema = new mongoose.Schema({
    brightness: {
      type: Number,
      required: true
    },  
    // other bulb properties
  });
  
  // Set up the inheritance relationship between the schemas
  const Device = mongoose.model('Device', deviceSchema);
  const Fan = Device.discriminator('Fan', fanSchema);
  const Bulb = Device.discriminator('Bulb', bulbSchema);