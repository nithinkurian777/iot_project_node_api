const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://nithinkurian:IotProject%23123@cluster0.jtkdjod.mongodb.net/FarmMate?retryWrites=true&w=majority')

        console.log(`Connected to MongoDB : ${conn.connection.host}`)
    } catch (error) {
        console.log(error)

        process.exit(1)
    }
}

module.exports = connectDB