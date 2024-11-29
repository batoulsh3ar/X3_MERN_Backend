
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/database')
const session = require('express-session');



const app = express()
const PORT = 3000

connectDB()

app.use(session({
    secret: 'schoolWebsite', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/testimonial',require('./routes/Testimonial'))
app.use('/api/auth' ,require('./routes/auth'))
app.use('/api/teachers' ,require('./routes/teachers'))
app.use('/api/faqsection',require('./routes/faqSection'))

app.listen(PORT , ()=>{
    console.log(`server is running on port : ${PORT}`)
})