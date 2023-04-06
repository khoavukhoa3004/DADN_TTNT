const PORT = 3000
const express = require('express');
require('dotenv').config();
require('./models/db');

const userRouter = require('./routes/user')

const User = require('./models/user.model');

const app = express();

// app.use((req, res, next) => {
//     req.on('data', (chunk) => {
//         const data = JSON.parse(chunk);
//         req.body = data;
//         next();
//     });
    
// });

app.use(express.json());
app.use(userRouter);

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