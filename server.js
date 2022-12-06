const express = require('express')
const todoRoutes = require('./routes/todoRoutes')
const connectDB = require('./config/db')
const cors = require('cors')

const port = process.env.PORT || 3000
connectDB()

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use('/api/', todoRoutes)

app.listen(port, () => console.log(`app listening on port ${port}!`));