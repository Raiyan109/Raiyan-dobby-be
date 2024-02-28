const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()
const userRoutes = require('./routes/users.js')
const imageRoutes = require('./routes/images.js')
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/users', userRoutes)
app.use('/api/images', imageRoutes)

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, (req, res) => {
            console.log(`Server listening on ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
