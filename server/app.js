const express = require('express');
const app = require('express')();
const router = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')

//MONGOOSE connect
mongoose.connect('mongodb://localhost/fancytodo', { useNewUrlParser: true });

//APP
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/', router)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})