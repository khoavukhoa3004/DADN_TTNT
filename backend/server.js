const PORT = 3000
const express = require('express');
require('dotenv').config();
require('./models/db');

const userRouter = require('./routes/user')

const User = require('./models/user.model');

const adafruitRouter = require('./routes/adafruit.js')

const app = express();

app.use(express.json());
app.use('/user',userRouter);
app.use('/sensor',adafruitRouter);

// const test = async (email, password) => {
//     const user = await User.findOne({ email: email});
//     const result = await user.comparePassword(password);
//     console.log(result);
// }

// test("khoapro313@gmail.com", "hello212376")

app.get('/test', (req, res) => {
    res.send('Hello world!');
});



app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
})
// app.post('/', (req, res) => {
//     console.log(req.body)
//     res.send('hello')
// })

app.listen(PORT,()=>{
    console.log('server running in '+ PORT)
})