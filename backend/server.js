const express = require('express')
const bodyParser =  require('body-parser')
const app = express()
const PORT = 3000

app.use(bodyParser.json())


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