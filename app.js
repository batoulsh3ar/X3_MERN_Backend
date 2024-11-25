require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/database')

connectDB()

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth' ,require('./routes/auth'))

app.listen(PORT , ()=>{
    console.log(`server is running on port : ${PORT}`)
})