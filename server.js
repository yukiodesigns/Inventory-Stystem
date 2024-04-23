const express = require('express')
const bodyParser =require('body-parser')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000

app.use(bodyParser.json())
mongoose.connect('mongodb://localhost:27017/inventory').then(()=> console.log('Connected to MongoDB'))
.catch(err => console.log('Failed to connect', err))

app.get('/', (req, res)=>{
    res.send("Yuki's Inventory System")
})

app.listen(PORT, (req, res)=>{
    console.log(`Listening on port: ${PORT}`)
})