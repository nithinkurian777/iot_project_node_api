const express = require('express')
const todoRoutes = require('./routes/todoRoutes')
const connectDB = require('./config/db')
const cors = require('cors')

connectDB()

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use('/api/', todoRoutes)

app.listen(8000, () => console.log("Server started on port 8000"))